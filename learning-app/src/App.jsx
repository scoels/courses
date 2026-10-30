import { useMemo, useState } from "react";
import courses from "./data/courses.json";
import books from "./data/books.json";
import paths from "./data/paths.json";
import useProgress from "./hooks/useProgress";
import FilterBar from "./components/FilterBar";
import ItemCard from "./components/ItemCard";
import Stats from "./components/Stats";
import PathList from "./components/PathList";
import PathDetail from "./components/PathDetail";
import "./App.css";

const allItems = [
  ...courses.map((c) => ({ ...c, kind: "course", id: `course:${c.url}` })),
  ...books.map((b) => ({ ...b, kind: "book", id: `book:${b.url}` })),
];

const itemById = Object.fromEntries(allItems.map((i) => [i.id, i]));

const subjectOptions = [...new Set(books.map((b) => b.subject))].sort();
const topicOptions = [...new Set(courses.map((c) => c.topic))].sort();

function App() {
  const [view, setView] = useState("catalog");
  const [activePath, setActivePath] = useState(null);
  const [kind, setKind] = useState("all");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const { statuses, setStatus } = useProgress();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((it) => {
      if (kind !== "all" && it.kind !== kind) return false;
      if (kind === "course" && topic && it.topic !== topic) return false;
      if (kind === "book" && subject && it.subject !== subject) return false;
      if (onlySaved && !statuses[it.id]) return false;
      if (!q) return true;
      return [it.label, it.title, it.author, it.topic, it.subject, it.format]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [kind, query, topic, subject, onlySaved, statuses]);

  const savedCount = Object.keys(statuses).filter((id) => itemById[id]).length;

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 Learning Hub</h1>
        <p>
          Structured learning paths built from {courses.length} AI courses and {books.length} free
          books.
        </p>
        <nav className="view-tabs">
          <button
            className={view === "catalog" ? "tab active" : "tab"}
            onClick={() => {
              setView("catalog");
              setActivePath(null);
            }}
          >
            📚 Catalog
          </button>
          <button
            className={view === "paths" ? "tab active" : "tab"}
            onClick={() => {
              setView("paths");
              setActivePath(null);
            }}
          >
            🎯 Learning Paths
          </button>
        </nav>
      </header>

      {view === "catalog" && (
        <>
          <Stats total={allItems.length} saved={savedCount} statuses={statuses} />
          <FilterBar
            kind={kind}
            setKind={setKind}
            query={query}
            setQuery={setQuery}
            topic={topic}
            setTopic={setTopic}
            topicOptions={topicOptions}
            subject={subject}
            setSubject={setSubject}
            subjectOptions={subjectOptions}
            onlySaved={onlySaved}
            setOnlySaved={setOnlySaved}
          />
          <main className="grid">
            {items.map((it) => (
              <ItemCard
                key={it.id}
                item={it}
                status={statuses[it.id] || ""}
                setStatus={(s) => setStatus(it.id, s)}
              />
            ))}
            {items.length === 0 && <p className="empty">No results found.</p>}
          </main>
        </>
      )}

      {view === "paths" && !activePath && (
        <PathList paths={paths} statuses={statuses} itemById={itemById} onOpen={setActivePath} />
      )}

      {view === "paths" && activePath && (
        <PathDetail
          path={paths.find((p) => p.id === activePath)}
          statuses={statuses}
          itemById={itemById}
          onBack={() => setActivePath(null)}
          setStatus={setStatus}
        />
      )}

      <footer className="footer">
        <p>Learning companion · Data from scoels/courses + scoels/free-programming-books · Progress saved locally</p>
      </footer>
    </div>
  );
}

export default App;
