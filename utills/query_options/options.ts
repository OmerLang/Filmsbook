import { infiniteQueryOptions } from "@tanstack/react-query";
import { MoviesDiscoverResponse } from "@/types/movies";

export const getMoviesDiscoverOptions = (genres: string[] = ["all"]) => {
  const genreString = [...genres].sort().join(",");
  return infiniteQueryOptions({
    queryKey: ["movies_discover", genreString],
    queryFn: async ({ pageParam }): Promise<MoviesDiscoverResponse> => {
      const params = new URLSearchParams({
        page: String(pageParam),
        genres: genreString,
      });
      const res = await fetch(`/api/movies?${params.toString()}`);
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
