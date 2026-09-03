import type { Metadata } from "next";
import { getQueryClient } from "@/utils/query_client/getQueryClient";
import { getSingleMovieOptions } from "@/utils/query_options/options";
import { MovieExtended } from "@/types/movies";
import { MovieHero } from "@/components/movie-page/MovieHero";
import { MovieOverview } from "@/components/movie-page/MovieOverview";
import { MovieCastCarousel } from "@/components/movie-page/MovieCastCarousel";
import { MovieBackdrop } from "@/components/movie-page/MovieBackdrop";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id: movieId } = await params;
  try {
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
    if (!res.ok) return { title: "Movie Details" };
    const movie: MovieExtended = await res.json();
    const releaseYear = movie.release_date
      ? `${movie.release_date.slice(0, 4)}`
      : "";
    const imageUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.poster_path
        ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        : undefined;
    const description =
      movie.overview ||
      `View ratings, cast, and reviews for ${movie.title} on Filmsbook.`;

    return {
      title: `${movie.title} ${releaseYear}`,
      description,
      alternates: {
        canonical: `/movie/${movieId}`,
      },
      openGraph: {
        title: `${movie.title}${releaseYear}`,
        description,
        images: imageUrl ? [{ url: imageUrl, alt: movie.title }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${movie.title}${releaseYear}`,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return {
      title: "Movie Details",
    };
  }
};

export default async function MoviePage({ params }: PageProps) {
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
      <main className="min-h-screen w-full flex flex-col pb-4">
        <MovieBackdrop backdropPath={movie.backdrop_path} title={movie.title} />
        <div className="grid grid-cols-1 gap-y-10 mt-12 mb-5 px-4">
          <MovieHero movie={movie} />
          <MovieOverview movie={movie} />
        </div>
        <MovieCastCarousel movie={movie} className="py-2" />
      </main>
    </HydrationBoundary>
  );
}
