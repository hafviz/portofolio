"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  buildIndex,
  kindLabel,
  search,
  type SearchKind,
} from "./search-index";

const KINDS: { id: SearchKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "experience", label: "Experiences" },
  { id: "project", label: "Projects" },
  { id: "credential", label: "Credentials" },
  { id: "skill", label: "Skills" },
  { id: "volunteering", label: "Volunteering" },
];

const SUGGESTIONS = [
  "Python",
  "Psychometrics",
  "People Analytics",
  "Research",
  "Leadership",
];

export function SearchExplorer() {
  const index = useMemo(() => buildIndex(), []);
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [kind, setKind] = useState<SearchKind | "all">("all");

  const kinds = useMemo(() => {
    if (kind === "all")
      return new Set<SearchKind>([
        "experience",
        "project",
        "credential",
        "skill",
        "volunteering",
      ]);
    return new Set<SearchKind>([kind]);
  }, [kind]);

  const results = useMemo(
    () => search(index, query, kinds),
    [index, query, kinds]
  );
  const counts = useMemo(() => {
    const map = new Map<SearchKind, number>();
    for (const r of search(index, query, new Set<SearchKind>([
      "experience",
      "project",
      "credential",
      "skill",
      "volunteering",
    ]))) {
      map.set(r.kind, (map.get(r.kind) ?? 0) + 1);
    }
    return map;
  }, [index, query]);

  return (
    <div>
      <label className="sr-only" htmlFor="site-search">
        Search the portfolio
      </label>
      <input
        id="site-search"
        type="search"
        className="search-input"
        placeholder="Try “Python”, “Psychometrics”, “Leadership”…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />

      <div className="filter-row" role="group" aria-label="Result types" style={{ marginTop: 12 }}>
        {KINDS.map((k) => {
          const count =
            k.id === "all"
              ? Array.from(counts.values()).reduce((a, b) => a + b, 0)
              : counts.get(k.id) ?? 0;
          return (
            <button
              key={k.id}
              type="button"
              className={kind === k.id ? "filter-btn is-active" : "filter-btn"}
              aria-pressed={kind === k.id}
              onClick={() => setKind(k.id)}
            >
              {k.label}
              {query.trim() ? (
                <span className="filter-count">{count}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {query.trim() === "" ? (
        <div style={{ marginTop: 16 }}>
          <p className="section-lede">
            Search across experiences, projects, credentials, skills, and
            volunteering — everything runs locally in your browser.
          </p>
          <div className="tag-row" aria-label="Suggested searches">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="tag tag-btn"
                onClick={() => setQuery(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 16 }}>
          <p className="meta" aria-live="polite">
            {results.length === 0
              ? `No results for “${query.trim()}”.`
              : `${results.length} result${results.length === 1 ? "" : "s"} for “${query.trim()}”.`}
          </p>
          <div className="grid-2" style={{ marginTop: 12 }}>
            {results.map((r) => (
              <article className="card" key={`${r.kind}:${r.id}`}>
                <p className="meta" style={{ margin: "0 0 4px" }}>
                  {kindLabel(r.kind)}
                </p>
                <h3 style={{ margin: "0 0 4px" }}>
                  <Link href={r.href}>{r.title}</Link>
                </h3>
                <p className="role">{r.subtitle}</p>
                {r.snippet ? <p>{r.snippet}</p> : null}
                {r.tags.length > 0 ? (
                  <div className="tag-row" aria-label="Matched topics">
                    {r.tags.slice(0, 5).map((t) => (
                      <span className="tag tag-muted" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
