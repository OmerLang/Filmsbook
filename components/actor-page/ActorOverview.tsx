"use client";
import { useState } from "react";
import { ExpandableParagraph } from "../common/ExpandableParagraph";
import { cn } from "@/lib/utils";
import React from "react";

type ActorOverviewProps = React.ComponentProps<"section"> & {
  biography: string;
};

export const ActorOverview = ({
  biography,
  className,
  ...props
}: ActorOverviewProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      {...props}
      className={cn("flex flex-col lg:flex-row w-full", className)}
    >
      <ExpandableParagraph
        paragraph={biography}
        expanded={expanded}
        charsThreshold={350}
        onClick={() => setExpanded(!expanded)}
      />
    </section>
  );
};
