"use client";
// h-85 aspect-square sm:h-65 sm:aspect-16/11 md:h-80 md:aspect-16/11 2xl:h-85 2xl:aspect-16/11
import type { MovieCardProps } from "@/components/common/movie-card/MovieCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
type MovieCardExpandedProps = Omit<MovieCardProps, "hoverTransition"> & {
  backdrop_path: string | null;
  overview: string;
};
export const MovieCardExpanded = ({
  movieItem,
  backdrop_path,
  overview,
  className,
  titleClassName,
  yearClassName,
  vote,
  eagerLoading = false,
  ...props
}: MovieCardExpandedProps) => {
  const { id, title, release_date, vote_average } = movieItem;
  const release_year = release_date?.slice(0, 4) ?? null;
  return (
    <Link
      prefetch={false}
      href={`/movie/${id}`}
      className={cn(
        "relative flex p-3 flex-col justify-end rounded-xl overflow-hidden w-full h-full",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-1 w-full">
        <Image
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
              : "/images/brand-images/filmsbook_backdrop_dark.jpg"
          }
          alt={title ?? "Movie title"}
          fill
          priority={eagerLoading}
          sizes="(max-width: 640px) 100vw, 500px"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-25% via-gray-900/75 via-60% to-gray-950 z-5" />

      <div className="flex flex-col gap-1 z-10 z-10">
        <div className="flex flex-col gap-1">
          <p
            className={cn(
              "text-md/6 text-gray-300 font-semibold tracking-normal",
              yearClassName,
            )}
          >
            {release_year}
          </p>
          <h2
            className={cn("text-3xl text-gray-300 font-bold", titleClassName)}
          >
            {title}
          </h2>
        </div>
        <p className="text-sm text-gray-300 line-clamp-3">{overview}</p>
      </div>
      <p
        className={cn(
          "absolute top-2 left-2 text-white font-medium z-10",
          vote,
        )}
      >
        {vote_average ? `${vote_average.toFixed(1)}★` : ""}
      </p>
    </Link>
  );
};
