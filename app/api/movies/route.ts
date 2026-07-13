import { NextResponse } from "next/server";

const GENRE_MAP: Record<string, number> = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sciencefiction: 878,
  thriller: 53,
  war: 10752,
  western: 37,
};

const validGenre = (genre: string): number => {
  const normalizedGenre = genre.toLowerCase();
  return GENRE_MAP[normalizedGenre];
};

export async function GET(request: Request) {
  let api = "";
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const genreString: string = searchParams.get("genre") ?? "";
  if (genreString === "discover") {
    api = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  } else {
    const genreNumber = validGenre(genreString);
    if (!genreNumber) {
      return NextResponse.json({ error: "Invalid genre" }, { status: 401 });
    }
    api = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreNumber}`;
  }
  const res = await fetch(api, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_KEY ?? "",
    },
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
