"use client";

import { MovieCard } from "@/components/common/movie-card/MovieCard";
import { MovieCardSkeleton } from "../../common/movie-card/MovieCardSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getMoviesDiscoverOptions } from "@/utils/query_options/options";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFilters } from "@/app/providers";
import { motion } from "motion/react";
import React from "react";
import { MovieCardExpanded } from "./MovieCardExpanded";

type MovieHovered = {
  movieId: number;
  // horizontal: "left" | "right" | "both";
  // vertical: "top" | "bottom" | "both";
  top: number | "auto";
  bottom: number | "auto";
  left: number | "auto";
  right: number | "auto";
};

export const MoviesList = () => {
  const [isMovieHovered, setIsMovieHovered] = useState<MovieHovered | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState<number | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const preLoadedImages = useRef(new Set<string>());
  const { ref, inView } = useInView();
  const { filters } = useFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(getMoviesDiscoverOptions(filters));
  const EXPANDED_CARD_WIDTH = 581.8;
  const EXPANDED_CARD_HEIGHT = 400;

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setIsMovieHovered(null);
    setIsAnimating(null);
  }, [filters]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching]);

  const preLoadImage = (src: string) => {
    if (preLoadedImages.current.has(src)) {
      return;
    }
    const img = new Image();
    img.src = src;
    preLoadedImages.current.add(src);
  };

  const handleHovered = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      movieId: number,
      backdrop_path: string | null,
    ) => {
      if (timer?.current !== null) {
        clearTimeout(timer.current);
      }

      if (backdrop_path) {
        preLoadImage(`https://image.tmdb.org/t/p/w780${backdrop_path}`);
      }

      const gridRect = gridRef.current?.getBoundingClientRect();
      const cardRect = e.currentTarget.getBoundingClientRect();
      if (!gridRect) return;

      const currentCardWidth = cardRect.width;
      const currentCardHeight = cardRect.height;

      const horizontalOffset = (EXPANDED_CARD_WIDTH - currentCardWidth) / 2;
      const verticalOffset = (EXPANDED_CARD_HEIGHT - currentCardHeight) / 2;

      const leftSpace = cardRect.left - gridRect.left >= horizontalOffset;
      const rightSpace = gridRect.right - cardRect.right >= horizontalOffset;
      const topSpace = cardRect.top - gridRect.top >= verticalOffset;
      const bottomSpace = gridRect.bottom - cardRect.bottom >= verticalOffset;

      const horizontal =
        leftSpace && rightSpace ? "both" : !leftSpace ? "right" : "left";
      const vertical =
        topSpace && bottomSpace ? "both" : !topSpace ? "bottom" : "top";
      const top =
        vertical === "both"
          ? -verticalOffset
          : vertical === "bottom"
            ? 0
            : "auto";
      const bottom = vertical === "top" ? 0 : "auto";
      const left =
        horizontal === "both"
          ? -horizontalOffset
          : horizontal === "left"
            ? "auto"
            : 0;
      const right = horizontal === "left" ? 0 : "auto";
      timer.current = setTimeout(() => {
        setIsMovieHovered({ movieId, top, bottom, left, right });
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

  const filterKey = JSON.stringify(filters);

  return (
    <div
      ref={gridRef}
      className="grid auto-rows-fr gap-2 grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(158px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(205px,1fr))] overflow-hidden"
    >
      {data?.pages.map((page, pageIndex) =>
        page.results.map((movie, movieIndex) => (
          <div
            ref={pageIndex === 0 && movieIndex === 0 ? cardRef : null}
            className={`relative cursor-pointer ${isAnimating === movie.id + movieIndex || isMovieHovered?.movieId === movie.id + movieIndex ? "z-50" : ""} isolate overflow-visible`}
            key={`${movie.id}-${movieIndex}`}
            onMouseLeave={handleMouseLeave}
          >
            {" "}
            {isMovieHovered?.movieId === movie.id + movieIndex ? (
              <motion.div
                className="flex absolute z-10 pointer-events-auto transform-gpu overflow-hidden"
                layoutId={`expanding-${filterKey}-${movie.id}-${pageIndex}-${movieIndex}`}
                key={`expanded-${filterKey}-${movie.id}-${pageIndex}-${movieIndex}`}
                onLayoutAnimationStart={() =>
                  setIsAnimating(movie.id + movieIndex)
                }
                onLayoutAnimationComplete={() => setIsAnimating(null)}
                transition={{
                  layout: { type: "spring", bounce: 0.6, visualDuration: 0.2 },
                }}
                style={{
                  width: EXPANDED_CARD_WIDTH,
                  height: EXPANDED_CARD_HEIGHT,
                  borderRadius: 16,
                  top: isMovieHovered.top,
                  bottom: isMovieHovered.bottom,
                  left: isMovieHovered.left,
                  right: isMovieHovered.right,
                }}
              >
                <motion.div
                  className="w-full w-full"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    opacity: { duration: 0.16, ease: "easeOut" },
                  }}
                >
                  <MovieCardExpanded
                    backdrop_path={movie.backdrop_path}
                    overview={movie.overview}
                    movieItem={movie}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="flex w-full h-full transform-gpu overflow-hidden"
                layoutId={`expanding-${filterKey}-${movie.id}-${pageIndex}-${movieIndex}`}
                transition={{
                  layout: { type: "spring", bounce: 0.4, visualDuration: 0.2 },
                }}
                key={`collapsed-${filterKey}-${movie.id}-${pageIndex}-${movieIndex}`}
                // custom={pageIndex * 20 + movieIndex <= 40}
                onLayoutAnimationStart={() =>
                  setIsAnimating(movie.id + movieIndex)
                }
                onLayoutAnimationComplete={() => setIsAnimating(null)}
                onMouseEnter={(e) =>
                  handleHovered(e, movie.id + movieIndex, movie.backdrop_path)
                }
              >
                <motion.div
                  className="w-full h-full"
                  initial={false}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    opacity: { duration: 0.14, ease: "easeOut" },
                  }}
                >
                  <MovieCard
                    movieItem={movie}
                    titleClassName="font-bold"
                    yearClassName="font-medium"
                    hoverTransition={false}
                    eagerLoading={pageIndex * 20 + movieIndex <= 40}
                    className="ring-0"
                  />
                </motion.div>
              </motion.div>
            )}
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
