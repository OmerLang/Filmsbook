import { MoviesDiscoverResponse } from "@/types/movies";

export async function getMoviesDiscover(
  page: number,
): Promise<MoviesDiscoverResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.NEXT_PUBLIC_TMDB_KEY ?? "",
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return res.json();
}
