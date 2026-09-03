"use client";
import React from "react";
import { cn } from "@/lib/utils";

type ExpandableParagraphProps = React.ComponentProps<"p"> & {
  paragraph: string;
  expanded: boolean;
  charsThreshold: number;
};

export const ExpandableParagraph = ({
  paragraph,
  expanded,
  charsThreshold,
  className = "",
  ...props
}: ExpandableParagraphProps) => {
  const isLong = paragraph.length > charsThreshold;
  const slicedParagraph = isLong
    ? paragraph.slice(0, charsThreshold + 1) + "..."
    : paragraph;
  return (
    <p
      className={cn("group", isLong && "cursor-pointer", className)}
      {...props}
    >
      {expanded ? paragraph : slicedParagraph}
      {!expanded && isLong && (
        <svg
          width="22"
          height="10"
          fill="none"
          className="inline-block opacity-70 ml-1 group-hover:opacity-100 transition"
        >
          <rect
            width="22"
            height="10"
            fill="oklch(44.6% 0.043 257.281)"
            rx="2"
          ></rect>
          <circle
            cx="5"
            cy="5"
            r="2"
            fill="oklch(86.9% 0.022 252.894)"
          ></circle>
          <circle
            cx="11"
            cy="5"
            r="2"
            fill="oklch(86.9% 0.022 252.894)"
          ></circle>
          <circle
            cx="17"
            cy="5"
            r="2"
            fill="oklch(86.9% 0.022 252.894)"
          ></circle>
        </svg>
      )}
    </p>
  );
};
