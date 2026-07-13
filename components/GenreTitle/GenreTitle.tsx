"use client";
import { useGenre } from "@/app/providers";

export const GenreTitle = () => {
  const { genre } = useGenre();
  return (
    <div className="relative text-6xl text-transparent font-black ">
      <h2 className="inline bg-linear-to-r from-sky-400 to-sky-500 bg-clip-text">
        {genre.charAt(0).toUpperCase() + genre.slice(1)}
      </h2>
    </div>
  );
};
