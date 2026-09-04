"use client";
import { useState } from "react";
import { ExpandableParagraph } from "../common/ExpandableParagraph";
import { ActorExtended } from "@/types/movies";
import { cn } from "@/lib/utils";
import React from "react";

type ActorOverviewProps = React.ComponentProps<"div"> & {
  actor: Pick<
    ActorExtended,
    | "biography"
    | "name"
    | "birthday"
    | "place_of_birth"
    | "id"
    | "also_known_as"
  >;
};

export const ActorOverview = ({
  actor,
  className,
  ...props
}: ActorOverviewProps) => {
  const [expanded, setExpanded] = useState(false);
  const { biography, name, birthday, place_of_birth, id, also_known_as } =
    actor;
  return (
    <div {...props} className={cn("flex flex-col w-full", className)}>
      <div className="flex flex-col gap-1">
        <h1
          id={`actor-${id}`}
          className="text-gray-200 text-center text-2xl sm:text-3xl z-10 font-medium lg:text-left lg:text-4xl text-shadow-md/20"
        >
          {name}
        </h1>
        {birthday && place_of_birth && (
          <div className="text-gray-200 text-xs sm:text-sm text-center lg:text-left md:text-shadow-md space-y-1">
            <div>
              Born {birthday} | {place_of_birth}
            </div>
            {also_known_as && (
              <div>{`Also Known as: ${also_known_as.join(", ")}`}</div>
            )}
          </div>
        )}
      </div>
      {biography && (
        <ExpandableParagraph
          paragraph={biography}
          expanded={expanded}
          charsThreshold={350}
          onClick={() => setExpanded(!expanded)}
          className="text-sm lg:text-base font-light"
        />
      )}
    </div>
  );
};
