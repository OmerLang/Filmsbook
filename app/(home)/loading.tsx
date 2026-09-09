import { MoviesListSkeleton } from "@/components/home-page/movies-list/MoviesListSkeleton";
import { MainTitleSkeleton } from "@/components/home-page/main-title/MainTitleSkeleton";
import { SortByBtnSkeleton } from "@/components/home-page/sort-by-btn/SortByBtnSkeleton";
import { GenresMultiSelectBtnSkeleton } from "@/components/home-page/genres-multi-select-btn/GenresMultiSelectBtnSkeleton";

export default function HomeLoading() {
  return (
    <div className="grid grid-cols-1 m-5 mt-15 gap-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <MainTitleSkeleton />
        <div className="flex flex-col gap-3 sm:min-w-100 sm:flex-row lg:min-w-150 ">
          <SortByBtnSkeleton />
          <GenresMultiSelectBtnSkeleton />
        </div>
      </div>
      <MoviesListSkeleton />
    </div>
  );
}
