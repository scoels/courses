export default function pathStats(path, statuses, itemById) {
  const ids = path.modules.flatMap((m) => m.items);
  const total = ids.length;
  const done = ids.filter((id) => statuses[id] === "done" && itemById[id]).length;
  const inProgress = ids.filter(
    (id) => statuses[id] && statuses[id] !== "done" && itemById[id]
  ).length;
  return { total, done, inProgress, pct: total ? Math.round((done / total) * 100) : 0 };
}
