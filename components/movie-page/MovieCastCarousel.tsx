"use client";
import { SectionTitle } from "../typography/typography";
import { MovieExtended } from "@/types/movies";
import { ActorCard } from "./ActorCard";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type MovieCastCarouselProps = {
  movie: MovieExtended;
  className?: string;
  wrapperClassName?: string;
};

export const MovieCastCarousel = ({
  movie,
  className,
  wrapperClassName,
}: MovieCastCarouselProps) => {
  const {
    credits: { cast },
  } = movie;
  const autoScroll = AutoScroll({
    startDelay: 0,
    playOnInit: true,
    stopOnInteraction: false,
    speed: 0.5,
    stopOnMouseEnter: true,
    stopOnFocusIn: false,
  });

  return (
    <section className="flex flex-col gap-2">
      <div className="px-4">
        <SectionTitle>Cast</SectionTitle>
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
        }}
        plugins={[autoScroll]}
      >
        <CarouselContent className={cn("-ml-6", className)}>
          {cast.map((actor) => (
            <CarouselItem key={actor.credit_id} className="pl-6 basis-auto">
              <ActorCard actor={actor} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
