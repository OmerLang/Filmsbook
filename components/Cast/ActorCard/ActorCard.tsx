"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type ActorCardProps = {
  name: string;
  character: string;
  profilePath: string;
  className?: string;
};

export const ActorCard = ({
  name,
  character,
  profilePath,
  className,
}: ActorCardProps) => {
  const imgSrc = profilePath
    ? `https://image.tmdb.org/t/p/w500${profilePath}`
    : "/images/actor_placeholder/placeholder.jpg";
  return (
    <div
      className={cn(
        "relative aspect-2/3 h-55 overflow-hidden rounded-3xl ring-1 ring-gray-700 hover:scale-105 hover:cursor-pointer transition-all",
        className,
      )}
    >
      <Image
        src={imgSrc}
        alt={name}
        fill
        sizes="(max-width: 768px) 150px, 200px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black mask-[linear-gradient(to_top,rgba(0,0,0,0.70)_15%,rgba(0,0,0,0.50)_35%,rgba(0,0,0,0.15)_80%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col h-28 justify-start px-3 pt-11 items-center w-full pointer-events-none">
        <span className="text-gray-300 font-semibold text-center line-clamp-1 text-shadow-md/40">
          {name}
        </span>
        <span className="text-gray-200 text-sm text-center line-clamp-2 text-shadow-md/40">
          {character || "\u00A0"}
        </span>
      </div>
    </div>
  );
};
