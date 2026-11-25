import pathStats from "../lib/pathStats";

export default function PathDetail({ path, statuses, itemById, onBack, setStatus }) {
  if (!path) return null;
  const { total, done, pct } = pathStats(path, statuses, itemById);
  const complete = total > 0 && done === total;

  return (
    <main className="path-detail" style={{ "--path-color": path.color }}>
      <button className="back-btn" onClick={onBack}>
        ← All paths
      </button>

      <section className="path-hero">
        <h2>{path.title}</h2>
        <p className="path-subtitle">{path.subtitle}</p>
        <div className="path-progress">
          <div className="bar">
            <div className="bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="pct">
            {done}/{total} resources · {pct}%
          </span>
        </div>
      </section>

      {complete && (
        <section className="certificate">
          <div className="cert-inner">
            <p className="cert-eyebrow">Certificate of Completion</p>
            <h3>🎓 {path.title}</h3>
            <p className="cert-body">
              All {total} resources completed across {path.modules.length} modules. Impressive work!
            </p>
          </div>
        </section>
      )}

      <ol className="modules">
        {path.modules.map((m) => {
          const mDone = m.items.filter((id) => statuses[id] === "done").length;
          const mPct = m.items.length ? Math.round((mDone / m.items.length) * 100) : 0;
          const mComplete = mDone === m.items.length;
          return (
            <li key={m.week} className={`module ${mComplete ? "done" : ""}`}>
              <div className="module-head">
                <span className="module-week">Week {m.week}</span>
                <h3>{m.title}</h3>
                <span className="module-pct">
                  {mComplete ? "✅" : `${mDone}/${m.items.length}`}
                </span>
              </div>
              <p className="module-goal">🎯 {m.goal}</p>
              <div className="module-items">
                {m.items.map((id) => {
                  const item = itemById[id];
                  if (!item) return null;
                  const st = statuses[id] || "";
                  return (
                    <div key={id} className="module-item">
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.label || item.title}
                      </a>
                      <span className="module-author">{item.author}</span>
                      <button
                        className={`status-btn ${st ? st : ""}`}
                        onClick={() => setStatus(id, st === "done" ? "" : "done")}
                        title={st === "done" ? "Mark as not done" : "Mark as done"}
                      >
                        {st === "done" ? "✅ Done" : "Mark done"}
                      </button>
                    </div>
                  );
                })}
              </div>
              {m.items.length > 1 && (
                <div className="module-bar bar">
                  <div className="bar-fill" style={{ width: `${mPct}%` }} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
