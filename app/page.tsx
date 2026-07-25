import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { getMoviesDiscoverOptions } from "@/utills/query_options/options";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { MoviesList } from "@/components/MoviesList/MoviesList";
import { MoviesDiscoverResponse } from "@/types/movies";
import { GenreTitle } from "@/components/GenreTitle/GenreTitle";
import { MultiSelectBtn } from "@/components/MultiSelectBtn/MultiSelectBtn";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    // Fetching the first 2 pages
    ...getMoviesDiscoverOptions(["all"]),
    queryFn: async ({ pageParam }): Promise<MoviesDiscoverResponse> => {
      const params = new URLSearchParams({
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: String(pageParam),
        sort_by: "popularity.desc",
      });
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?${params}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: process.env.TMDB_KEY ?? "",
          },
          cache: "no-store",
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="grid grid-cols-1 m-5 gap-5">
          <div className="flex">
            <GenreTitle />
            <MultiSelectBtn />
          </div>
          <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(162px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-4">
            <MoviesList />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
