import KINDS from "./Kinds";

const STATUS_BUTTONS = [
  { value: "saved", label: "🔖 Save" },
  { value: "learning", label: "📖 Learning" },
  { value: "done", label: "✅ Done" },
];

export default function FilterBar({
  kind,
  setKind,
  query,
  setQuery,
  topic,
  setTopic,
  topicOptions,
  subject,
  setSubject,
  subjectOptions,
  onlySaved,
  setOnlySaved,
}) {
  const showTopic = kind === "course" || kind === "all";
  const showSubject = kind === "book" || kind === "all";

  return (
    <section className="filters">
      <div className="kind-tabs">
        {Object.entries(KINDS).map(([value, label]) => (
          <button
            key={value}
            className={kind === value ? "tab active" : "tab"}
            onClick={() => setKind(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        className="search"
        type="search"
        placeholder="Search title, author, topic…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showTopic && (
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="">All topics</option>
          {topicOptions.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      )}

      {showSubject && (
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">All subjects</option>
          {subjectOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      )}

      <label className="only-saved">
        <input
          type="checkbox"
          checked={onlySaved}
          onChange={(e) => setOnlySaved(e.target.checked)}
        />
        My list only
      </label>
    </section>
  );
}

export { STATUS_BUTTONS };
