export default function Stats({ total, saved, statuses, streak, last14 }) {
  const learning = Object.values(statuses).filter((s) => s === "learning").length;
  const done = Object.values(statuses).filter((s) => s === "done").length;

  return (
    <section className="stats">
      <div className="stat">
        <strong>{total}</strong>
        <span>resources</span>
      </div>
      <div className="stat">
        <strong>{saved}</strong>
        <span>my list</span>
      </div>
      <div className="stat">
        <strong>{learning}</strong>
        <span>learning</span>
      </div>
      <div className="stat">
        <strong>{done}</strong>
        <span>completed</span>
      </div>
      <div className="stat streak">
        <strong>
          🔥 {streak}
          {streak > 0 ? "d" : ""}
        </strong>
        <span>day streak</span>
      </div>
      {last14 && (
        <div className="stat activity">
          <div className="strip">
            {last14.map((d) => (
              <span key={d.date} className={d.active ? "dot on" : "dot"} title={d.date} />
            ))}
          </div>
          <span>last 14 days</span>
        </div>
      )}
    </section>
  );
}
