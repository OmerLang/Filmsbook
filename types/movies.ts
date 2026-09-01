export type Genre = {
  label: string;
  value: string;
};

export type MovieBasics = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export type MovieExtended = MovieBasics & {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
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
    cast: Actor[];
    crew: CrewMember[];
  };
};

export type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type Actor = {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type ActorExtended = {
  also_known_as: string[];
  biography: string;
  birthday: string;
  gender: 1 | 2;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  movie_credits: {
    cast: {
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
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
