"use client";
import MultiSelect from "../ui/multi-select/multi-select";
import { useState } from "react";
import { GENRE_MAP } from "@/utills/movies_genres/movies_genres";

export const MultiSelectBtn = () => {
  const genres = Object.entries(GENRE_MAP).map(([key, value]) => ({
    label: String(key).charAt(0).toUpperCase() + String(key).substring(1),
    value: String(value),
  }));

  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MultiSelect
      options={genres}
      value={selected}
      onChange={setSelected}
      placeholder="Select Genres..."
      isLoading={isLoading}
    ></MultiSelect>
  );
};
