import React from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = React.ComponentProps<"h2">;

export const SectionTitle = ({ className, ...props }: SectionTitleProps) => {
  return (
    <h2
      className={cn("font-bold text-xl sm:text-2xl text-gray-300", className)}
      {...props}
    />
  );
};
