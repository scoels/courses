const STATUS_CLASS = { saved: "saved", learning: "learning", done: "done" };
const STATUS_LABEL = { saved: "🔖 Saved", learning: "📖 Learning", done: "✅ Done" };

const NEXT_STATUS = { "": "saved", saved: "learning", learning: "done", done: "" };

export default function ItemCard({ item, status, setStatus }) {
  const title = item.label || item.title;
  const tag = item.kind === "course" ? item.topic : item.subject;
  const next = NEXT_STATUS[status || ""];

  return (
    <article className={`card ${STATUS_CLASS[status || ""] || ""}`}>
      <div className="card-top">
        <span className="tag">{tag}</span>
        <span className="kind">{item.kind === "course" ? "🎓" : "📕"}</span>
      </div>
      <h3 className="title">
        <a href={item.url} target="_blank" rel="noreferrer">
          {title}
        </a>
      </h3>
      {item.author && <p className="author">{item.author}</p>}
      <div className="card-meta">
        <span className="meta">{item.format}</span>
        {item.kind === "course" && (
          <>
            <span className="meta">{item.year}</span>
            <span className="meta">{"🟩".repeat(item.difficulty)}</span>
          </>
        )}
      </div>
      <div className="card-actions">
        {status && (
          <button
            className="clear-btn"
            onClick={() => setStatus("")}
            title="Remove from my list"
          >
            ✕
          </button>
        )}
        <button
          className={`status-btn ${next || "clear"}`}
          onClick={() => setStatus(next)}
          title="Cycle: Save → Learning → Done"
        >
          {status ? STATUS_LABEL[status] : "+ Add to my list"}
        </button>
      </div>
    </article>
  );
}
