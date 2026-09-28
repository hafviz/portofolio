"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const QUICK = ["People Analytics", "Psychometrics", "Data", "Research", "Leadership"];

// Compact homepage search. Submits to /search?q= so the full
// SearchExplorer (same index, same ranking) renders results.
export function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const go = (term: string) => {
    const q = term.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div>
      <form
        className="search-row"
        role="search"
        aria-label="Site search"
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
      >
        <label className="sr-only" htmlFor="home-search">
          Search projects, skills, tools, or topics
        </label>
        <input
          id="home-search"
          type="search"
          className="search-input"
          placeholder="Search projects, skills, tools, or topics…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
      </form>
      <div className="filter-row" aria-label="Suggested searches">
        {QUICK.map((term) => (
          <button
            key={term}
            type="button"
            className="filter-btn"
            onClick={() => go(term)}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
