"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { createContext, useContext } from "react";
import { useState } from "react";
import * as React from "react";

export type GenreContextType = {
  genres: string[];
  changeGenre: (genres: string[]) => void;
};

const GenreContext = createContext<GenreContextType>({
  genres: ["all"],
  changeGenre: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState(["all"]);
  const changeGenre = (genres: string[]): void => setGenres(genres);
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GenreContext.Provider value={{ genres, changeGenre }}>
        {children}
      </GenreContext.Provider>
    </QueryClientProvider>
  );
}

export function useGenre() {
  return useContext(GenreContext);
}
