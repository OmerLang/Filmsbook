"use client";
import { MovieItem } from "../MovieItem/MovieItem";
import { MovieItemSkeleton } from "../MovieItem/MovieItemSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getMoviesDiscoverOptions } from "@/utills/query_options/options";
import { useEffect, useState } from "react";

export const MoviesList = () => {
  const { ref, inView } = useInView();
  const [genre, setGenre] = useState("all");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(getMoviesDiscoverOptions(genre));

  const skeletonsArray = [...Array(20)];

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
      {skeletonsArray.map((_, index) => (
        <MovieItemSkeleton key={index} ref={index === 0 ? ref : null} />
      ))}
    </>
  );
};
