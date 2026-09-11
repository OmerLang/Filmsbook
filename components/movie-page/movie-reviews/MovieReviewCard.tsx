import React from "react";
import type { Review } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

type ReviewContent = {
  title: string;
  body: string;
};

type TypedReview = Pick<Review, "rating" | "createdAt"> & {
  content: ReviewContent;
};

type MovieReviewCardProps = React.ComponentProps<"div"> & {
  review?: TypedReview;
};

export const MovieReviewCard = ({
  review,
  className,
  ...props
}: MovieReviewCardProps) => {
  return (
    <div
      dir="ltr"
      {...props}
      className={cn(
        "flex flex-col p-5 gap-4 min-w-80 min-h-60 rounded-2xl text-gray-300 ring ring-gray-700 bg-gray-900 cursor-pointer",
        className,
      )}
    >
      <h3 className="text-xl/7 font-semibold">{review?.content?.title}</h3>
      <p>{review?.content?.body}</p>
    </div>
  );
};
