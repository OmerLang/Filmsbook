import { Filters } from "@/types/movies";

const normalizeFilter = <T extends Record<string, any>>(filters: T): T => {
  const normalized: Record<string, any> = {};

  Object.keys(filters)
    .sort()
    .forEach((key) => {
      const value = filters[key];
      if (Array.isArray(value)) {
        normalized[key] = [...value].sort();
      } else {
        normalized[key] = value;
      }
    });
  return normalized as T;
};

export const movieKeys = {
  all: ["movies"] as const,
  infiniteList: (filters: Filters) =>
    [...movieKeys.all, normalizeFilter(filters)] as const,
};
