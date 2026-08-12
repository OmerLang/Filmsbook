"use client";
import { useFilters } from "@/app/providers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type sortByBtnProps = {
  className?: string;
};

export const SortByBtn = ({ className = "" }: sortByBtnProps) => {
  const {
    filters: { sortBy },
    setOrderBy,
  } = useFilters();

  const items = [
    { label: "Popularity Descending", value: "popularity.desc" },
    { label: "Popularity Ascending", value: "popularity.asc" },
    { label: "Release Date Descending", value: "primary_release_date.desc" },
    { label: "Release Date Ascending", value: "primary_release_date.asc" },
    { label: "Rating Descending", value: "vote_average.desc" },
    { label: "Rating Ascending", value: "vote_average.asc" },
    { label: "Title Descending", value: "title.desc" },
    { label: "Title Ascending", value: "title.asc" },
  ];

  return (
    <Select
      value={sortBy}
      onValueChange={(value) => setOrderBy(value ?? "popularity.desc")}
      items={items}
    >
      <SelectTrigger className="w-full data-[size=default]:h-11 text-(--text-color-buttons) border-1 border-slate-500/60">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        className="bg-(--background-color-buttons) border-1 border-slate-500/60 text-(--text-color-buttons)"
      >
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="focus:bg-(--select-button-hover-bg-color) focus:text-(--text-color-buttons-content)"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
