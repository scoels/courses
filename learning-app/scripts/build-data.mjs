import fs from "node:fs";
import path from "node:path";

const DEFAULT_COURSES_CSV = path.resolve("../automation/data.csv");
const DEFAULT_BOOKS_MD = path.resolve(
  "../../github__scoels__free-programming-books/books/free-programming-books-subjects.md"
);
const OUT_DIR = path.resolve("src/data");

const coursesCsv = process.argv[2] || DEFAULT_COURSES_CSV;
const booksMd = process.argv[3] || DEFAULT_BOOKS_MD;

function parseCourses(csvText) {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim());
  const courses = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(/,(?=\s*\S)/).map((c) => c.trim());
    if (cols.length < 8) continue;
    const [topic, difficulty, price, release_year, format, url, label, author] = cols;
    courses.push({
      topic,
      difficulty: Number(difficulty) || 1,
      price,
      year: release_year,
      format,
      url,
      label,
      author,
    });
  }
  return courses;
}

function parseBooks(mdText) {
  const lines = mdText.split(/\r?\n/);
  const books = [];
  let subject = "";
  const entry = /^\s*\*\s+\[(.+?)\]\((\S+?)\)(?:\s+-\s+(.+?))?\s*(?:\((.+?)\))?$/;
  for (const line of lines) {
    const heading = line.match(/^###+\s+(.+)$/);
    if (heading) {
      subject = heading[1].trim();
      continue;
    }
    const m = line.match(entry);
    if (!m) continue;
    const [, title, url, authorRaw, meta] = m;
    if (title === "All" || url.startsWith("#")) continue;
    let author = authorRaw || "";
    let format = "book";
    if (meta) {
      const parts = meta.split(",").map((p) => p.trim()).filter(Boolean);
      for (const p of parts) {
        if (/^(PDF|HTML|Online|Videos?|Ebook|Markdown|Github|Slides?|audiobook|editorial repo)$/i.test(p)) {
          format = p.toLowerCase();
        } else if (!author) {
          author = p;
        } else if (author !== p) {
          author += `, ${p}`;
        }
      }
    }
    books.push({ subject, title, url, author, format });
  }
  return books;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

if (fs.existsSync(coursesCsv)) {
  const courses = parseCourses(fs.readFileSync(coursesCsv, "utf8"));
  fs.writeFileSync(path.join(OUT_DIR, "courses.json"), JSON.stringify(courses, null, 2));
  console.log(`courses.json: ${courses.length} courses`);
} else {
  console.warn(`Courses CSV not found at ${coursesCsv}; skipping courses.json`);
}

if (fs.existsSync(booksMd)) {
  const books = parseBooks(fs.readFileSync(booksMd, "utf8"));
  fs.writeFileSync(path.join(OUT_DIR, "books.json"), JSON.stringify(books, null, 2));
  console.log(`books.json: ${books.length} books`);
} else {
  console.warn(`Books markdown not found at ${booksMd}; skipping books.json`);
}
