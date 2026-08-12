"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { createContext, useContext } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Filters } from "@/types/movies";
import * as React from "react";

type FiltersContextType = {
  filters: Filters;
  setGenres: (genres: string[]) => void;
  handleSearch: (search: string) => void;
  setOrderBy: (orderBy: string) => void;
};

const FiltersContext = createContext<FiltersContextType>({
  filters: { genres: [], search: "", sortBy: "" },
  setGenres: () => [],
  handleSearch: () => "",
  setOrderBy: () => "",
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    search: "",
    sortBy: "popularity.desc",
  });

  const setGenres = (genres: string[]): void =>
    setFilters((prev) => ({
      ...prev,
      genres,
    }));

  const handleSearch = (search: string): void =>
    setFilters((prev) => ({
      ...prev,
      search,
    }));

  const setOrderBy = (orderBy: string): void =>
    setFilters((prev) => ({
      ...prev,
      sortBy: orderBy,
    }));

  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <FiltersContext.Provider
        value={{ filters, setGenres, handleSearch, setOrderBy }}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </FiltersContext.Provider>
    </QueryClientProvider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}
