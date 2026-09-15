type Subscriber = () => void;

interface QueryEntry {
  mql: MediaQueryList;
  listener: (e: MediaQueryListEvent) => void;
  subscribers: Set<Subscriber>;
}

const queryStore = new Map<string, QueryEntry>();

export const getSnapshot = (query: string) => {
  if (typeof window === "undefined") return false;
  // If the store already has it, read it; otherwise, read directly from window without saving
  return (queryStore.get(query)?.mql ?? window.matchMedia(query)).matches;
};

export const subscribe = (query: string, callback: Subscriber) => {
  let entry = queryStore.get(query);

  if (!entry) {
    const mql = window.matchMedia(query);
    const subscribers = new Set<Subscriber>();

    const listener = () => {
      subscribers.forEach((cb) => cb());
    };

    mql.addEventListener("change", listener);

    entry = { mql, listener, subscribers };
    queryStore.set(query, entry);
  }

  entry.subscribers.add(callback);

  return () => {
    const currentEntry = queryStore.get(query);
    if (!currentEntry) return;

    currentEntry.subscribers.delete(callback);

    if (currentEntry.subscribers.size === 0) {
      currentEntry.mql.removeEventListener("change", currentEntry.listener);
      queryStore.delete(query);
    }
  };
};
