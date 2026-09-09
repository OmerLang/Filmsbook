export const GenresMultiSelectBtnSkeleton = () => {
  return (
    <div className="!h-11 w-full flex items-center justify-between rounded-md border items-center animate-pulse border-slate-700 bg-slate-700 px-3">
      <span className="rounded bg-slate-500/50 text-sm select-none text-transparent">
        Select Genres...
      </span>
      <div className="h-4 w-4 rounded-sm bg-slate-500/40" />
    </div>
  );
};
