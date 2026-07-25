import { NextResponse } from "next/server";
import { GENRE_MAP } from "@/utills/movies_genres/movies_genres";

const convertGenres = (genres: string): string => {
  const normalizedGenres: string[] = genres
    .split(",")
    .map((genre) => genre.trim().toLowerCase())
    .filter(Boolean);
  const genresNumbers: string[] = normalizedGenres
    .filter((genre) => genre !== "all" && genre in GENRE_MAP)
    .map((genre) => String(GENRE_MAP[genre]));
  return genresNumbers.join(",");
};

export async function GET(request: Request) {
  let api = "";
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const rawGenres: string = searchParams.get("genres") ?? "all";
  const genresList: string = convertGenres(rawGenres);
  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: page,
    sort_by: "popularity.desc",
  });
  if (genresList.length > 0) {
    params.append("with_genres", genresList);
  }
  api = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;

  const res = await fetch(api, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_KEY ?? "",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies from TMDB" },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
