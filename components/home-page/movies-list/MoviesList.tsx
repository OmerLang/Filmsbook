"use client";

import { MovieCard } from "@/components/common/movie-card/MovieCard";
import { MovieCardSkeleton } from "../../common/movie-card/MovieCardSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getMoviesDiscoverOptions } from "@/utils/query_options/options";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFilters } from "@/app/providers";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import React from "react";

const cardVariants: Variants = {
  hidden: {
    y: 18,
    opacity: 0,
  },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: Math.min((index % 20) * 0.025, 0.3),
    },
  }),
};

type MovieHovered = {
  movieId: number;
  horizontal: "left" | "right" | "both";
  vertical: "top" | "bottom" | "both";
};

export const MoviesList = () => {
  const [isMovieHovered, setIsMovieHovered] = useState<MovieHovered | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState<number | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView();
  const { filters } = useFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(getMoviesDiscoverOptions(filters));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching]);

  const handleHovered = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, movieId: number) => {
      if (timer?.current !== null) {
        clearTimeout(timer.current);
      }
      const cardRect = e.currentTarget.getBoundingClientRect();
      const gridRect = gridRef?.current?.getBoundingClientRect();
      const leftSpace = cardRect.left - (gridRect?.left ?? 0) > cardRect.width;
      const rightSpace =
        (gridRect?.right ?? 0) - cardRect.right > cardRect.width;
      const topSpace = cardRect.top - (gridRect?.top ?? 0) > cardRect.height;
      const bottomSpace =
        (gridRect?.bottom ?? 0) - cardRect.bottom > cardRect.height;

      const horizontal =
        leftSpace && rightSpace ? "both" : !leftSpace ? "right" : "left";
      const vertical =
        topSpace && bottomSpace ? "both" : !topSpace ? "bottom" : "top";

      timer.current = setTimeout(() => {
        setIsMovieHovered({ movieId, horizontal, vertical });
        timer.current = null;
      }, 300);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIsMovieHovered(null);
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(158px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(205px,1fr))] overflow-visible"
    >
      {data?.pages.map((page, pageIndex) =>
        page.results.map((movie, movieIndex) => (
          <div
            className={`relative cursor-pointer ${isAnimating === movie.id + movieIndex || isMovieHovered?.movieId === movie.id + movieIndex ? "z-50" : ""} p-2 isolate overflow-visible`}
            key={`${movie.id}-${movieIndex}`}
            onMouseLeave={handleMouseLeave}
          >
            {" "}
            {isMovieHovered?.movieId === movie.id + movieIndex ? (
              <motion.div
                className="flex absolute w-101 h-150 bg-red-800 z-10 pointer-events-auto transform-gpu"
                layoutId={`layout-${movie.id}-${movieIndex}`}
                onLayoutAnimationStart={() =>
                  setIsAnimating(movie.id + movieIndex)
                }
                onLayoutAnimationComplete={() => setIsAnimating(null)}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                style={{
                  borderRadius: 16,
                  willChange: "transform",
                  top:
                    isMovieHovered.vertical === "both"
                      ? "-50%"
                      : isMovieHovered.vertical === "bottom"
                        ? 0
                        : "auto",
                  bottom: isMovieHovered.vertical === "top" ? 0 : "auto",
                  left:
                    isMovieHovered.horizontal === "both"
                      ? "-50%"
                      : isMovieHovered.horizontal === "left"
                        ? "auto"
                        : 0,
                  right: isMovieHovered.horizontal === "left" ? 0 : "auto",
                }}
              ></motion.div>
            ) : (
              <motion.div
                className="flex w-full h-full transform-gpu"
                layoutId={`layout-${movie.id}-${movieIndex}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={pageIndex * 20 + movieIndex <= 40}
                viewport={{ once: true, margin: "-50px" }}
                onLayoutAnimationStart={() =>
                  setIsAnimating(movie.id + movieIndex)
                }
                onLayoutAnimationComplete={() => setIsAnimating(null)}
                onMouseEnter={(e) => handleHovered(e, movie.id + movieIndex)}
                style={{ willChange: "transform" }}
              >
                <MovieCard
                  movieItem={movie}
                  titleClassName="font-bold"
                  yearClassName="font-medium"
                  eagerLoading={pageIndex * 20 + movieIndex <= 40}
                  className="ring-0"
                />
              </motion.div>
            )}{" "}
          </div>
        )),
      )}

      {hasNextPage && <MovieCardSkeleton ref={ref} />}
      {hasNextPage &&
        [...Array(19)].map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
};
