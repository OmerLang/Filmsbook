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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(getMoviesDiscoverOptions(genres));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <>
      {data?.pages.map((page) =>
        page.results.map((movie) => <MovieItem movie={movie} key={movie.id} />),
      )}
      {hasNextPage &&
        [...Array(20)].map((_, index) => (
          <MovieItemSkeleton key={index} ref={index === 0 ? ref : null} />
        ))}
    </>
  );
};
