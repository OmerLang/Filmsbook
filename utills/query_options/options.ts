import { infiniteQueryOptions } from "@tanstack/react-query";
import { MoviesDiscoverResponse } from "@/types/movies";

export const getMoviesDiscoverOptions = (genre: string = "all") => {
  return infiniteQueryOptions({
    queryKey: ["movies_discover", genre],
    queryFn: async ({ pageParam }): Promise<MoviesDiscoverResponse> => {
      const res = await fetch(`/api/movies?page=${pageParam}&genre=${genre}`);
      if (!res.ok) throw new Error("Failed to fetch movies from local api");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page >= lastPage.total_pages ? undefined : lastPage.page + 1,
  });
};
