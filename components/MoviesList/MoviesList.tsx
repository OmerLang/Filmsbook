"use client";
import { MovieItem } from "../MovieItem/MovieItem";
import { MovieItemSkeleton } from "../MovieItem/MovieItemSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getMoviesDiscoverOptions } from "@/utills/query_options/options";
import { useEffect } from "react";
import { useGenre } from "@/app/providers";

export const MoviesList = () => {
  const { ref, inView } = useInView();
  const { genres } = useGenre();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(getMoviesDiscoverOptions(genres));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching]);

  return (
    <>
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
    </>
  );
};
