"use client";
import { forwardRef } from "react";
import React from "react";
import { cn } from "@/lib/utils";

export const MovieCardSkeleton = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-2/3 w-full rounded-xl overflow-hidden ring-1 ring-gray-600/50 bg-slate-800 animate-pulse",
        className,
      )}
      {...props}
    ></div>
  );
});
