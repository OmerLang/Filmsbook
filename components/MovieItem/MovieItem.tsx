"use client";

import { MovieBasics } from "@/types/movies";
type MovieItemProps = {
  movie: MovieBasics;
};

export const MovieItem = ({ movie }: MovieItemProps) => {
  const release_year = movie.release_date.slice(0, 4);

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden relative border border-gray-500">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 group-hover:bg-black/60 transition duration-300 z-10 " />
      <div className="absolute flex flex-col justify-end p-2 items-start inset-0 text-white font-bold text-2xl opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="flex flex-col translate-y-100 group-hover:-translate-y-0 transition-transform duration-150">
          <p className="text-lg/5 font-medium tracking-normal">
            {release_year}
          </p>
          <h2 className="leading-7">{movie.title}</h2>
        </div>
      </div>
      <p className="absolute top-2 left-2 text-white font-medium z-20 -translate-y-100 group-hover:translate-y-0 transition-transform duration-150">
        {movie.vote_average.toFixed(1)} ★
      </p>
    </div>
  );
};
