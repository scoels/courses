import { useMemo, useState } from "react";
import courses from "./data/courses.json";
import books from "./data/books.json";
import useProgress from "./hooks/useProgress";
import FilterBar from "./components/FilterBar";
import ItemCard from "./components/ItemCard";
import Stats from "./components/Stats";
import "./App.css";

const allItems = [
  ...courses.map((c) => ({ ...c, kind: "course", id: `course:${c.url}` })),
  ...books.map((b) => ({ ...b, kind: "book", id: `book:${b.url}` })),
];

const subjectOptions = [...new Set(books.map((b) => b.subject))].sort();
const topicOptions = [...new Set(courses.map((c) => c.topic))].sort();

function App() {
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

  const savedCount = Object.keys(statuses).filter((id) => allItems.some((i) => i.id === id)).length;

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 Learning Hub</h1>
        <p>
          {courses.length} AI courses & {books.length} free programming books, curated from
          <a href="https://github.com/scoels/courses">scoels/courses</a> and
          <a href="https://github.com/scoels/free-programming-books">scoels/free-programming-books</a>.
        </p>
      </header>

      <Stats total={allItems.length} saved={savedCount} statuses={statuses} items={allItems} />

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

      <footer className="footer">
        <p>
          A learning companion app · Data bundled at build time · Progress stored locally in your
          browser
        </p>
      </footer>
    </div>
  );
}

export default App;
