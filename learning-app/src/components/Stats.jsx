export default function Stats({ total, saved, statuses }) {
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
    </section>
  );
}
