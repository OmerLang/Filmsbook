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
    cast: {
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
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
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
