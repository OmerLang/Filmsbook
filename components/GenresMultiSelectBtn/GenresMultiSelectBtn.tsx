"use client";
import MultiSelect from "../ui/multi-select/multi-select";
import { useState } from "react";
import { GENRE_MAP } from "@/utills/movies_genres/movies_genres";
import { useFilters } from "@/app/providers";

export const GenresMultiSelectBtn = () => {
  const genresOptions = Object.entries(GENRE_MAP).map(([key, value]) => ({
    label: String(key)
      .split("_")
      .map((genre) => genre[0].toUpperCase() + genre.slice(1))
      .join(" "),
    value: String(value),
  }));

  const {
    filters: { genres },
    setGenres,
  } = useFilters();
  const [isLoading, setIsLoading] = useState(false);

  const genresSet = new Set<string>();
  genres.forEach((genre) => genresSet.add(genre));

  return (
    <MultiSelect
      options={genresOptions}
      value={genresOptions.reduce<string[]>((arr, { label, value }) => {
        if (genresSet.has(label)) {
          arr.push(value);
        }
        return arr;
      }, [])}
      onChange={(selectedValues) => {
        if (selectedValues.length === 0) {
          setGenres(["all"]);
          return;
        }
        const selectedLabels = genresOptions
          .filter((opt) => selectedValues.includes(opt.value))
          .map((opt) => opt.label);
        setGenres(selectedLabels);
      }}
      placeholder="Select Genres..."
      isLoading={isLoading}
      className="[&_button]:bg-slate-700 [&_button]:text-white [&_button]:border-slate-700 [&_button:hover]:bg-slate-600 [&_button:hover]:border-slate-800 [&_button]:!h-11"
    ></MultiSelect>
  );
};
