export type Genre = {
  label: string;
  value: string;
};

export type MovieBasics = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
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
