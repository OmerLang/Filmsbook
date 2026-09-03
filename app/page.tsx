import { Metadata } from "next";
import { getQueryClient } from "@/utils/query_client/getQueryClient";
import { getMoviesDiscoverOptions } from "@/utils/query_options/options";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { MoviesList } from "@/components/home-page/MoviesList";
import { MoviesDiscoverResponse } from "@/types/movies";
import { MainTitle } from "@/components/home-page/MainTitle";
import { GenresMultiSelectBtn } from "@/components/home-page/GenresMultiSelectBtn";
import { SortByBtn } from "@/components/home-page/SortByBtn";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    // Fetching the first 2 pages
    ...getMoviesDiscoverOptions(),
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
            Authorization: `Bearer ${process.env.TMDB_KEY ?? ""}`,
          },
          next: { revalidate: 3600 },
        },
      );
      if (!res.ok) {
        throw new Error("Server prefetch: Failed to fetch from TMDB");
      }
      return res.json();
    },
    pages: 4,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="grid grid-cols-1 m-5 mt-15 gap-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <MainTitle />
            <div className="flex flex-col gap-3 sm:min-w-100 sm:flex-row lg:min-w-150 ">
              <SortByBtn className="h-11" />
              <GenresMultiSelectBtn />
            </div>
          </div>
          <MoviesList />
        </div>
      </HydrationBoundary>
    </>
  );
}
