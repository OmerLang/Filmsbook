"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { MovieReviewCard } from "./MovieReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

type MovieReviewsCarouselProps = React.ComponentProps<"section"> & {
  reviews: {
    rating: number;
    content: { title: string; body: string };
    createdAt: Date;
  }[];
  speed?: number;
  direction?: "ltr" | "rtl";
};

export const MovieReviewsCarousel = ({
  speed = 0.3,
  direction = "rtl",
  className,
  reviews,
  ...props
}: MovieReviewsCarouselProps) => {
  const autoScroll = AutoScroll({
    startDelay: 0,
    playOnInit: true,
    stopOnInteraction: false,
    speed,
    stopOnMouseEnter: true,
    stopOnFocusIn: false,
  });
  return (
    <section {...props}>
      <Carousel
        opts={{
          loop: true,
          direction,
          dragFree: true,
        }}
        plugins={[autoScroll]}
      >
        {" "}
        <CarouselContent dir={direction} className={cn("-ml-6", className)}>
          {reviews.map((review, i) => (
            <CarouselItem
              key={`${review.content.title}-${i}`}
              className="pl-6 basis-auto"
            >
              <MovieReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
