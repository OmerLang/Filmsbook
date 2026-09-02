import { getQueryClient } from "@/utils/query_client/getQueryClient";
import { getSingleMovieOptions } from "@/utils/query_options/options";
import { MovieExtended } from "@/types/movies";
import { MovieHero } from "@/components/movie-page/MovieHero";
import { MovieOverview } from "@/components/movie-page/MovieOverview";
import { MovieCastCarousel } from "@/components/movie-page/MovieCastCarousel";
import { MovieBackdrop } from "@/components/movie-page/MovieBackdrop";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = await params;
  const queryClient = getQueryClient();
  const movie = await queryClient.fetchQuery({
    ...getSingleMovieOptions(movieId),
    queryFn: async (): Promise<MovieExtended> => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_KEY ?? ""}`,
          },
          next: { revalidate: 3600 },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch movie from TMDB");
      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen w-full">
        <div className="flex flex-col pb-4">
          <MovieBackdrop
            backdropPath={movie.backdrop_path}
            title={movie.title}
          />
          <div className="grid grid-cols-1 gap-y-10 mt-12 mb-5 px-4">
            <MovieHero movie={movie} />
            <MovieOverview movie={movie} />
          </div>
          <MovieCastCarousel movie={movie} className="py-2" />
        </div>
      </main>
    </HydrationBoundary>
  );
}
