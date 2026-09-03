"use client";
import { CastCredit } from "@/types/movies";
import { MovieCard } from "@/components/common/MovieCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";

type ActorCreditsCarouselProps = {
  credits: CastCredit[];
  speed?: number;
  direction?: "ltr" | "rtl";
  className?: string;
};

export const ActorCreditsCarousel = ({
  credits,
  speed = 0.5,
  direction = "ltr",
  className,
}: ActorCreditsCarouselProps) => {
  const autoScroll = AutoScroll({
    playOnInit: true,
    speed,
    startDelay: 0,
    stopOnMouseEnter: true,
    stopOnFocusIn: false,
    stopOnInteraction: false,
  });
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
        direction: direction,
      }}
      plugins={[autoScroll]}
    >
      <CarouselContent dir={direction} className={cn("-ml-6 py-2", className)}>
        {credits.map((credit) => (
          <CarouselItem
            key={credit.credit_id}
            className="pl-6 basis-auto group"
            dir="ltr"
          >
            <MovieCard
              movieItem={credit}
              className="h-65 group-hover:scale-105 transition"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
