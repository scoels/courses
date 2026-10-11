# 🎓 Learning Hub

A React learning app that bundles the curated content of
[scoels/courses](https://github.com/scoels/courses) (AI courses) and
[scoels/free-programming-books](https://github.com/scoels/free-programming-books)
(free programming books) into a searchable, trackable learning companion.

## Features

- **810 free books + 32 AI courses** in one searchable catalog
- Search by title, author, topic, or subject
- Filter by kind (courses/books), course topic, or book subject
- **Progress tracking**: mark items as 🔖 Saved → 📖 Learning → ✅ Done
- "My list only" view to see everything you've saved
- Live stats dashboard (total resources, saved, learning, completed)
- Progress is stored in `localStorage` — no account or backend needed

## Getting started

```bash
cd learning-app
npm install
npm run dev
```

Then open the local URL that Vite prints.

## Refreshing the bundled data

The catalog data is bundled at build time from the two source repos. To refresh it:

```bash
node scripts/build-data.mjs <path-to>/courses/automation/data.csv <path-to>/free-programming-books/books/free-programming-books-subjects.md
```

Both arguments are optional; defaults point at sibling checkouts of the source
repos. The script regenerates `src/data/courses.json` and `src/data/books.json`.

## Moving this app to its own repository

This app lives in a `learning-app/` folder but is fully self-contained. To
extract it into a brand-new repo:

```bash
git clone https://github.com/scoels/courses
cd courses
git checkout <branch-with-learning-app>
cd learning-app
git init && git add -A && git commit -m "Learning Hub app"
git remote add origin https://github.com/scoels/learning-app.git
git push -u origin main
```

It has no dependencies on the parent repo — only the two generated JSON files
in `src/data/`, which you can regenerate anytime with the script above.

## Tech

- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- No runtime dependencies beyond `react` and `react-dom`
- `oxlint` for linting

## Data sources

- Courses: [scoels/courses](https://github.com/scoels/courses) → `automation/data.csv`
- Books: [scoels/free-programming-books](https://github.com/scoels/free-programming-books) → `books/free-programming-books-subjects.md`
