import { useCallback, useSyncExternalStore } from "react";
import { getSnapshot, subscribe } from "@/lib/media-query-store";

export const useMediaQuery = (query: string, defaultValue = false): boolean => {
  const subscribeToQuery = useCallback(
    (callback: () => void) => subscribe(query, callback),
    [query],
  );

  const readSnapshot = useCallback(() => getSnapshot(query), [query]);

  return useSyncExternalStore(
    subscribeToQuery,
    readSnapshot,
    () => defaultValue,
  );
};
