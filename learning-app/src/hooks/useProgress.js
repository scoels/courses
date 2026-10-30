import { useEffect, useState } from "react";

const KEY = "learning-app:progress";

export default function useProgress() {
  const [statuses, setStatuses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(statuses));
  }, [statuses]);

  const setStatus = (id, status) => {
    setStatuses((prev) => {
      const next = { ...prev };
      if (status) next[id] = status;
      else delete next[id];
      return next;
    });
  };

  return { statuses, setStatus };
}
