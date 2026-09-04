import { MovieExtended } from "@/types/movies";
import Image from "next/image";

export const MovieHero = ({ movie }: { movie: MovieExtended }) => {
  const genres = movie.genres
    .flat(1)
    .map((genre) => genre.name)
    .join(" ● ");

  return (
    <section className="relative flex flex-col justify-center w-full">
      <div className="z-1 flex pt-10 flex-col gap-4 items-center lg:items-start lg:flex-row lg:items-end">
        <div className="aspect-[2/3] w-40 sm:w-50 relative z-1 rounded-3xl overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title ?? "Movie title"}
            fill
            loading="eager"
            sizes="(max-width: 640px) 145px, (max-width: 768px) 162px, 182px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="flex justify-center sm:justify-start text-gray-200 text-2xl sm:text-3xl z-10 font-semibold tracking-tight lg:text-4xl">
            {movie.title}
          </h1>
          <div className="flex justify-center text-xs sm:text-sm lg:justify-start text-gray-300 gap-2">
            {movie.runtime} Minutes | {genres}
          </div>
        </div>
      </div>
    </section>
  );
};
