import pathStats from "../lib/pathStats";

export default function PathList({ paths, statuses, itemById, onOpen }) {
  return (
    <main className="path-list">
      <p className="path-intro">
        Guided, week-by-week programs assembled from the best free courses. Mark each resource
        ✅ Done as you finish it to track your progress — complete a path to earn a certificate.
      </p>
      {paths.map((p) => {
        const { total, done, pct } = pathStats(p, statuses, itemById);
        return (
          <button
            key={p.id}
            className="path-card"
            style={{ "--path-color": p.color }}
            onClick={() => onOpen(p.id)}
          >
            <div className="path-head">
              <h2>{p.title}</h2>
              <span className="path-weeks">
                {p.weeks} {p.weeks === 1 ? "week" : "weeks"} · {p.modules.length} modules · {total}{" "}
                resources
              </span>
            </div>
            <p className="path-subtitle">{p.subtitle}</p>
            <p className="path-audience">👥 {p.audience}</p>
            <div className="path-progress">
              <div className="bar">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="pct">
                {done}/{total} · {pct}%
              </span>
            </div>
          </button>
        );
      })}
    </main>
  );
}
