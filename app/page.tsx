import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { getMoviesDiscoverOptions } from "@/utills/query_options/options";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { MoviesList } from "@/components/MoviesList/MoviesList";
import { MoviesDiscoverResponse } from "@/types/movies";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    // Fetching the first 2 pages
    ...getMoviesDiscoverOptions(),
    queryFn: async ({ pageParam }): Promise<MoviesDiscoverResponse> => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=popularity.desc`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: process.env.TMDB_KEY ?? "",
          },
        },
      );
      if (!res.ok) {
        throw new Error("Server prefetch: Failed to fetch from TMDB");
      }
      return res.json();
    },
    pages: 2,
  });

  return (
    <>
      <div className="grid auto-rows-fr m-5 grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(162px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MoviesList />
        </HydrationBoundary>
      </div>
    </>
  );
}
