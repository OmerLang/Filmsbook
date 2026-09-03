"use client";
import { CastCredit } from "@/types/movies";
import { ActorCreditsCarousel } from "./ActorCreditsCarousel";

export const ActorKnownFor = ({ cast }: { cast: CastCredit[] }) => {
  const firstCarouselArr = cast.slice(0, cast.length / 2);
  const secondCarouselArr = cast.slice(cast.length / 2);

  return (
    <section
      className="relative flex flex-col gap-2"
      aria-labelledby="known-for-heading"
    >
      <div className="px-5">
        <h2
          id="known-for-heading"
          className="text-gray-300 text-xl sm:text-2xl font-bold"
        >
          Known for
        </h2>
      </div>
      <div className="flex flex-col">
        <ActorCreditsCarousel credits={firstCarouselArr} speed={0.2} />
        <ActorCreditsCarousel
          credits={secondCarouselArr}
          direction="rtl"
          speed={0.2}
        />
      </div>
    </section>
  );
};
