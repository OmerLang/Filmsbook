export const SortByBtnSkeleton = () => {
  return (
    <div className="h-11 w-full rounded-md border border-slate-500/60 bg-(--background-color-buttons) px-3 flex items-center justify-between animate-pulse">
      <span className="rounded bg-slate-700/50 text-sm select-none text-transparent">
        Popularity Descending
      </span>
      <div className="h-4 w-4 rounded-sm bg-slate-700/40" />
    </div>
  );
};
