"use client";
import { MovieItem } from "./MovieItem";
import { MovieItemSkeleton } from "./MovieItemSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getMoviesDiscoverOptions } from "@/utils/query_options/options";
import { useEffect } from "react";
import { useFilters } from "@/app/providers";

export const MoviesList = () => {
  const { ref, inView } = useInView();
  const { filters } = useFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(getMoviesDiscoverOptions(filters));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching]);

  return (
    <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(162px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-4">
      {data?.pages.map((page, pageIndex) =>
        page.results.map((movie) => (
          <MovieItem movie={movie} key={`${pageIndex}-${movie.id}`} />
        )),
      )}
      {hasNextPage && <MovieItemSkeleton ref={ref} />}
      {hasNextPage &&
        [...Array(19)].map((_, index) => (
          <MovieItemSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
};
