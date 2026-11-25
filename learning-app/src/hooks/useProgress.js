import { useEffect, useState } from "react";

const KEY = "learning-app:progress";
const DAY = 86400000;

function todayKey(offset = 0) {
  const d = new Date(Date.now() - offset * DAY);
  return d.toISOString().slice(0, 10);
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function computeStreak(days) {
  const set = new Set(days);
  let streak = 0;
  // Streak counts if active today or yesterday.
  let offset = set.has(todayKey(0)) ? 0 : set.has(todayKey(1)) ? 1 : -1;
  if (offset === -1) return 0;
  while (set.has(todayKey(offset))) {
    streak += 1;
    offset += 1;
  }
  return streak;
}

export default function useProgress() {
  const [{ statuses, days }, setState] = useState(() => {
    const saved = load();
    return { statuses: saved.statuses || {}, days: saved.days || [] };
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ statuses, days }));
  }, [statuses, days]);

  const setStatus = (id, status) => {
    setState((prev) => {
      const statuses = { ...prev.statuses };
      const days = new Set(prev.days);
      if (status) statuses[id] = status;
      else delete statuses[id];
      // Record activity on the day a resource is marked done or in progress.
      if (status) days.add(todayKey(0));
      return { statuses, days: [...days] };
    });
  };

  const streak = computeStreak(days);
  const last14 = [...Array(14)].map((_, i) => ({ date: todayKey(13 - i), active: days.includes(todayKey(13 - i)) }));

  return { statuses, setStatus, streak, last14 };
}
