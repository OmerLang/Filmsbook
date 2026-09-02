import { getQueryClient } from "@/utils/query_client/getQueryClient";
import { getMoviesDiscoverOptions } from "@/utils/query_options/options";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { MoviesList } from "@/components/home-page/MoviesList";
import { MoviesDiscoverResponse } from "@/types/movies";
import { GenreTitle } from "@/components/home-page/GenreTitle";
import { GenresMultiSelectBtn } from "@/components/home-page/GenresMultiSelectBtn";
import { SortByBtn } from "@/components/home-page/SortByBtn";

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
        <div className="grid grid-cols-1 m-5 gap-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <GenreTitle />
            <div className="flex flex-col gap-3 sm:min-w-100 sm:flex-row lg:min-w-150 ">
              <SortByBtn className="h-11" />
              <GenresMultiSelectBtn />
            </div>
          </div>
          <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(162px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-4">
            <MoviesList />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
