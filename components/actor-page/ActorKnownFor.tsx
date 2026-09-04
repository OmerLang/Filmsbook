"use client";
import { CastCredit } from "@/types/movies";
import { ActorCreditsCarousel } from "./ActorCreditsCarousel";
import { MovieCard } from "../common/MovieCard";
import { useEffect, useMemo, useState } from "react";
import { SectionTitle } from "../typography/typography";

type CarouselRender = "static" | "single" | "double";

const pickCarousel = (arr: CastCredit[]): CarouselRender => {
  const castCreditSize = arr?.length;
  if (castCreditSize < 6) {
    return "static";
  }
  const windowWidth = window.innerWidth;
  const singleCardWidth = 173.33333;
  const singleCardPadding = 24;
  const singleCardSpace = singleCardWidth + singleCardPadding;
  const totalArrWidth = singleCardSpace * castCreditSize - singleCardPadding;
  if (totalArrWidth - singleCardWidth * 2 < windowWidth) {
    return "static";
  }
  if (totalArrWidth / 2 - singleCardPadding < windowWidth) {
    return "single";
  }
  return "double";
};

export const ActorKnownFor = ({ cast }: { cast: CastCredit[] }) => {
  const [carouselType, setCarouselType] = useState<CarouselRender | null>(null);
  const splitArray = useMemo(() => {
    const isCast = cast?.length > 0;
    if (isCast) {
      const arrays = {
        firstArray: cast.slice(0, cast.length / 2),
        secondArray: cast.slice(cast.length / 2),
      };
      return arrays;
    }
    return null;
  }, [cast]);

  useEffect(() => {
    const initialCarousel = pickCarousel(cast);
    setCarouselType(initialCarousel);
    const handleResize = () => {
      const type = pickCarousel(cast);
      setCarouselType(type);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cast]);

  return (
    <section
      className="relative flex flex-col gap-2"
      aria-labelledby="known-for-heading"
    >
      <div className="px-5">
        <SectionTitle id="known-for-heading">Known for</SectionTitle>
      </div>
      <div className="flex flex-col">
        {carouselType === "static" && (
          <div className="px-5 grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(152px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {cast.map((movie) => (
              <div key={movie.id} className="hover:scale-105 transition">
                <MovieCard movieItem={movie} />
                <span className="block text-center text-sm text-slate-300">
                  as {movie.character}
                </span>
              </div>
            ))}
          </div>
        )}
        {carouselType === "single" && <ActorCreditsCarousel credits={cast} />}
        {carouselType === "double" && splitArray && (
          <>
            <ActorCreditsCarousel credits={splitArray.firstArray} />
            <ActorCreditsCarousel
              credits={splitArray.secondArray}
              direction="rtl"
            />
          </>
        )}
      </div>
    </section>
  );
};
