import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
  MoviesDiscoverResponse,
  MovieExtended,
  ActorExtended,
} from "@/types/movies";
import { Filters } from "@/types/movies";
import { movieKeys, actorKeys } from "@/lib/query-keys";

export const getMoviesDiscoverOptions = (
  filters: Filters = { genres: [], search: "", sortBy: "popularity.desc" },
) => {
  const key = movieKeys.infiniteList(filters);
  const [, filtersFromKey] = key;

  const genreString = [...filtersFromKey.genres].join(",");

  return infiniteQueryOptions({
    queryKey: key,
    queryFn: async ({ pageParam }): Promise<MoviesDiscoverResponse> => {
      const params = new URLSearchParams({
        page: String(pageParam),
        genres: genreString,
        search: filters.search,
        sortBy: filters.sortBy,
      });
      const res = await fetch(`/api/movie?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch movies from local api");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page >= lastPage.total_pages ? undefined : lastPage.page + 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};

export const getSingleMovieOptions = (movieId: string) => {
  const key = movieKeys.single(movieId);
  return queryOptions({
    queryKey: key,
    queryFn: async (): Promise<MovieExtended> => {
      const res = await fetch(`/movie/${movieId}`);
      if (!res.ok) throw new Error("Failed to fetch movie from local api");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};

export const getSingleActorOptions = (actorId: number) => {
  const key = actorKeys.single(actorId);
  return queryOptions({
    queryKey: key,
    queryFn: async (): Promise<ActorExtended> => {
      const res = await fetch(`{/actor/${actorId}`);
      if (!res.ok) throw new Error("Failed to fetch actor from local api");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
