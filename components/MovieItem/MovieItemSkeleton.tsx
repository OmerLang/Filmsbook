"use client";
import { useIsFetching } from "@tanstack/react-query";
import { forwardRef } from "react";

export const MovieItemSkeleton = forwardRef<HTMLDivElement, {}>(
  ({ ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="border border-gray-500 rounded-xl bg-gray-400/30 animate-pulse"
        {...props}
      ></div>
    );
  },
);
