type MovieBasics = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

type MovieCreditBase = MovieBasics & {
  genre_ids: number[];
  original_language: string;
  overview: string;
  credit_id: string;
};

export type CastCredit = MovieCreditBase & {
  character: string;
  order: number;
  profile_path: string | null;
  name: string;
};

type CrewCredit = MovieCreditBase & {
  department: string;
  job: string;
  profile_path: string | null;
  name: string;
};

export type MovieExtended = MovieBasics & {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  original_language: string;
  original_title: string;
  overview: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
};

export type ActorExtended = {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  gender: 0 | 1 | 2 | 3;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  movie_credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
};

export type MoviesDiscoverResponse = {
  page: number;
  total_pages: number;
  results: MovieBasics[];
};

export type MoviesListData = {
  latest_page: number;
  movies_quantity: number;
  movies: MovieBasics[];
};

export type Filters = {
  genres: string[];
  search: string;
  sortBy: string;
};
