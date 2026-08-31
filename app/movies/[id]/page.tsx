import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { getSingleMovieOptions } from "@/utills/query_options/options";
import { MovieExtended } from "@/types/movies";
import { MovieDetails } from "@/components/MoviePage/MovieDetails";

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
            Authorization: process.env.TMDB_KEY ?? "",
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(145px,1fr))]">
        <MovieDetails movie={movie} />
      </div>
    </HydrationBoundary>
  );
}
