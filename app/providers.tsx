"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { createContext, useContext } from "react";
import { useState } from "react";
import * as React from "react";

export type GenreContextType = {
  genre: string;
  changeGenre: (genre: string) => void;
};

const GenreContext = createContext<GenreContextType>({
  genre: "discover",
  changeGenre: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [genre, setGenre] = useState("discover");
  const changeGenre = (genre: string): void => setGenre(genre);
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GenreContext.Provider value={{ genre, changeGenre }}>
        {children}
      </GenreContext.Provider>
    </QueryClientProvider>
  );
}

export function useGenre() {
  return useContext(GenreContext);
}
