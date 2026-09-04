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
  loop?: boolean | undefined;
  className?: string;
};

export const ActorCreditsCarousel = ({
  credits,
  speed = 0.2,
  direction = "ltr",
  loop = true,
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
        loop,
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
            <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition">
              <MovieCard movieItem={credit} className="h-65" />
              <span className="text-sm text-slate-300">
                as {credit.character}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
