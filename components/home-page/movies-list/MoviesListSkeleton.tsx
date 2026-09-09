import { MovieCardSkeleton } from "../../common/movie-card/MovieCardSkeleton";

export const MoviesListSkeleton = () => {
  return (
    <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(158px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(152px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-4">
      {[...Array(80)].map((_, index) => (
        <MovieCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};
