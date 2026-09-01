"use client";

import { ActorCard } from "../Cast/ActorCard/ActorCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Cast } from "@/types/movies";
import { cn } from "@/lib/utils";

type AutoCarouselProps = {
  cast: Cast[];
  className?: string;
  wrapperClassName?: string;
};

export const AutoCarousel = ({
  cast,
  className,
  wrapperClassName,
}: AutoCarouselProps) => {
  const autoScroll = AutoScroll({
    startDelay: 0,
    playOnInit: true,
    stopOnInteraction: false,
    speed: 0.5,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
  });

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
        loop: true,
      }}
      plugins={[autoScroll]}
    >
      <CarouselContent
        className={cn("-ml-6", className)}
        wrapperClassName={wrapperClassName}
      >
        {cast.map((actor) => (
          <CarouselItem key={actor.cast_id} className="pl-6 basis-auto">
            <ActorCard
              name={actor.name}
              character={actor.character}
              profilePath={actor.profile_path}
              className=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
