"use client";

import { MovieCard } from "@/components/common/movie-card/MovieCard";
import { MovieCardSkeleton } from "../../common/movie-card/MovieCardSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getMoviesDiscoverOptions } from "@/utils/query_options/options";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useFilters } from "@/app/providers";
import { motion, Transition } from "motion/react";
import { MovieCardExpanded } from "./MovieCardExpanded";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MovieHovered = {
  cardKey: string;
  top: number | "auto";
  bottom: number | "auto";
  left: number | "auto";
  right: number | "auto";
};

const ExpandedCardSizes = {
  base: { height: 340, width: 340 },
  sm: { height: 260, width: 378.2 },
  md: { height: 320, width: 465.5 },
  "2xl": { height: 340, width: 494.5 },
} as const;

const SHARED_LAYOUT_TRANSITION: Transition = {
  layout: {
    type: "spring",
    stiffness: 320,
    damping: 26,
    bounce: 0.25,
  },
};

export const MoviesList = () => {
  const [isMovieHovered, setIsMovieHovered] = useState<MovieHovered | null>(
    null,
  );
  const canHover = useMediaQuery("(hover: hover)");
  const [isAnimatingKey, setIsAnimatingKey] = useState<string | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const preLoadedImages = useRef(new Set<string>());
  const { ref: loadMoreRef, inView } = useInView();
  const { filters } = useFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(getMoviesDiscoverOptions(filters));

  const is2Xl = useMediaQuery("(width>= 96rem)");
  const isMd = useMediaQuery("(width>= 48rem)");
  const isSm = useMediaQuery("(width>= 40rem)");
  const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

  const expandedCardSize = useMemo(() => {
    if (is2Xl) return ExpandedCardSizes["2xl"];
    if (isMd) return ExpandedCardSizes.md;
    if (isSm) return ExpandedCardSizes.sm;
    return ExpandedCardSizes.base;
  }, [is2Xl, isMd, isSm]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setIsMovieHovered(null);
    setIsAnimatingKey(null);
  }, [filterKey]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching]);

  const preLoadImage = useCallback((src: string) => {
    if (preLoadedImages.current.has(src)) {
      return;
    }
    if (preLoadedImages.current.size > 80) {
      preLoadedImages.current.clear();
    }
    const img = new Image();
    img.src = src;
    preLoadedImages.current.add(src);
  }, []);

  const handleHovered = useCallback(
    (
      targetEl: HTMLDivElement,
      cardKey: string,
      backdrop_path: string | null,
    ) => {
      if (timer?.current !== null) {
        clearTimeout(timer.current);
      }

      if (backdrop_path) {
        preLoadImage(`https://image.tmdb.org/t/p/w780${backdrop_path}`);
      }

      timer.current = setTimeout(() => {
        const gridRect = gridRef.current?.getBoundingClientRect();
        const cardRect = targetEl.getBoundingClientRect();
        if (!gridRect) return;

        const currentCardWidth = cardRect.width;
        const currentCardHeight = cardRect.height;

        const horizontalOffset =
          (expandedCardSize.width - currentCardWidth) / 2;
        const verticalOffset =
          (expandedCardSize.height - currentCardHeight) / 2;

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
        setIsMovieHovered({ cardKey, top, bottom, left, right });
        timer.current = null;
      }, 300);
    },
    [expandedCardSize, preLoadImage],
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
      className="grid auto-rows-fr gap-2 grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(158px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(162px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
    >
      {data?.pages.map((page, pageIndex) =>
        page.results.map((movie, movieIndex) => {
          const cardKey = `${movie.id}-${pageIndex}-${movieIndex}`;
          const isTargeted =
            isAnimatingKey === cardKey || isMovieHovered?.cardKey === cardKey;
          return canHover ? (
            <motion.div
              ref={pageIndex === 0 && movieIndex === 0 ? cardRef : null}
              className={`relative cursor-pointer overflow-visible ${isTargeted ? "z-50" : "z-0"}`}
              key={`cell-${cardKey}`}
              onMouseLeave={handleMouseLeave}
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                delay: (movieIndex % 20) * 0.02,
                duration: 0.25,
              }}
            >
              {isMovieHovered?.cardKey === cardKey ? (
                <motion.div
                  className="flex absolute z-10 pointer-events-auto transform-gpu overflow-hidden"
                  layoutId={`expanding-${filterKey}-${cardKey}`}
                  key={`expanded-${filterKey}-${cardKey}`}
                  onLayoutAnimationStart={() => setIsAnimatingKey(cardKey)}
                  onLayoutAnimationComplete={() => setIsAnimatingKey(null)}
                  transition={SHARED_LAYOUT_TRANSITION}
                  style={{
                    borderRadius: 16,
                    width: expandedCardSize.width,
                    height: expandedCardSize.height,
                    top: isMovieHovered.top,
                    bottom: isMovieHovered.bottom,
                    left: isMovieHovered.left,
                    right: isMovieHovered.right,
                  }}
                >
                  <MovieCardExpanded
                    backdrop_path={movie.backdrop_path}
                    overview={movie.overview}
                    movieItem={movie}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="flex w-full h-full transform-gpu overflow-hidden"
                  layoutId={`expanding-${filterKey}-${cardKey}`}
                  transition={SHARED_LAYOUT_TRANSITION}
                  key={`collapsed-${filterKey}-${cardKey}`}
                  onLayoutAnimationStart={() => setIsAnimatingKey(cardKey)}
                  onLayoutAnimationComplete={() => setIsAnimatingKey(null)}
                  onMouseEnter={(e) =>
                    handleHovered(e.currentTarget, cardKey, movie.backdrop_path)
                  }
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
              )}
            </motion.div>
          ) : (
            <MovieCard
              key={`static-${cardKey}`}
              movieItem={movie}
              titleClassName="font-bold"
              yearClassName="font-medium"
              hoverTransition={false}
              eagerLoading={pageIndex * 20 + movieIndex <= 40}
              className="ring-0"
            />
          );
        }),
      )}

      {hasNextPage && <MovieCardSkeleton ref={loadMoreRef} />}
      {hasNextPage &&
        [...Array(19)].map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
};
