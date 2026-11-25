import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set to the repo sub-path when deployed to GitHub Pages.
export default defineConfig({
  base: process.env.PAGES_BASE || "/courses/",
  plugins: [react()],
});
