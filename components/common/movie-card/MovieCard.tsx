"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
type MovieItemProps = React.ComponentProps<"div"> & {
  movieItem: {
    id: number;
    title: string | null;
    poster_path: string | null;
    release_date: string | null;
    vote_average: number | null;
  };
  titleClassName?: string;
  yearClassName?: string;
  vote?: string;
};
export const MovieCard = ({
  movieItem,
  className,
  titleClassName,
  yearClassName,
  vote,
}: MovieItemProps) => {
  const { id, title, poster_path, release_date, vote_average } = movieItem;
  const release_year = release_date?.slice(0, 4) ?? null;
  return (
    <Link href={`/movie/${id}`}>
      <div
        className={cn(
          "relative group flex flex-col aspect-2/3 rounded-xl overflow-hidden ring-1 ring-gray-600 hover:ring-gray-500 transition",
          className,
        )}
      >
        <Image
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w185${poster_path}`
              : "/images/brand-images/filmsbook_poster.png"
          }
          alt={title ?? "Movie title"}
          fill
          loading="eager"
          sizes="(max-width: 640px) 145px, (max-width: 768px) 162px, 182px"
          className="object-cover"
        />

        <div className="absolute inset-0 group-hover:bg-black/60 transition duration-300 z-10 " />
        <div className="absolute flex flex-col justify-end p-2 items-start inset-0 text-white opacity-100 group-hover:opacity-100 transition-opacity duration-150 z-20">
          <div className="flex flex-col translate-y-100 group-hover:-translate-y-0 transition duration-150">
            <p
              className={cn(
                "text-sm/6 font-medium tracking-normal",
                yearClassName,
              )}
            >
              {release_year}
            </p>
            <h2 className={cn("text-xl/6 font-bold", titleClassName)}>
              {title}
            </h2>
          </div>
        </div>
        <p
          className={cn(
            "absolute top-2 left-2 text-white font-medium z-20 -translate-y-100 transition group-hover:translate-y-0 duration-150",
            vote,
          )}
        >
          {vote_average ? vote_average.toFixed(1) : ""} ★
        </p>
      </div>
    </Link>
  );
};
