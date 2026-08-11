"use client";
import MultiSelect from "../ui/multi-select/multi-select";
import { useState } from "react";
import { GENRE_MAP } from "@/utills/movies_genres/movies_genres";
import { useGenre } from "@/app/providers";

export const MultiSelectBtn = () => {
  const genresOptions = Object.entries(GENRE_MAP).map(([key, value]) => ({
    label: String(key)
      .split("_")
      .map((genre) => genre[0].toUpperCase() + genre.slice(1))
      .join(" "),
    value: String(value),
  }));

  const { genres, changeGenre } = useGenre();
  const [isLoading, setIsLoading] = useState(false);

  const genresSet = new Set<string>();
  genres.forEach((genre) => genresSet.add(genre));

  return (
    <MultiSelect
      options={genresOptions}
      value={
        genres.join(",") === "all"
          ? []
          : genresOptions.reduce<string[]>((arr, { label, value }) => {
              if (genresSet.has(label)) {
                arr.push(value);
              }
              return arr;
            }, [])
      }
      onChange={(selectedValues) => {
        if (selectedValues.length === 0) {
          changeGenre(["all"]);
          return;
        }
        const selectedLabels = genresOptions
          .filter((opt) => selectedValues.includes(opt.value))
          .map((opt) => opt.label);
        changeGenre(selectedLabels);
      }}
      placeholder="Select Genres..."
      isLoading={isLoading}
      className="[&_button]:bg-slate-700 [&_button]:text-white [&_button]:border-slate-700 [&_button:hover]:bg-slate-600 [&_button:hover]:border-slate-800 [&_button]:!h-11"
    ></MultiSelect>
  );
};
