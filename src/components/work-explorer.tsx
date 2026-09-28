"use client";

import { useMemo, useState } from "react";
import type { Experience } from "@/content/types";
import { ExperienceCard } from "./experience-card";

export interface WorkFilter {
  id: string;
  label: string;
  matches: (exp: Experience) => boolean;
}

function hasTag(exp: Experience, ...tags: string[]) {
  return exp.tags?.some((t) => tags.includes(t)) ?? false;
}

// Every filter maps to tags that actually exist in experiences.ts.
// No filter may reference a category with zero matches.
export const WORK_FILTERS: WorkFilter[] = [
  { id: "all", label: "All", matches: () => true },
  {
    id: "people-analytics",
    label: "People Analytics",
    matches: (e) => hasTag(e, "people-analytics"),
  },
  {
    id: "psychology",
    label: "Psychology",
    matches: (e) =>
      hasTag(e, "psychology", "clinical", "environmental-psychology"),
  },
  {
    id: "data",
    label: "Data",
    matches: (e) =>
      hasTag(
        e,
        "data-analytics",
        "data-science",
        "big-data",
        "business-intelligence"
      ),
  },
  {
    id: "research",
    label: "Research",
    matches: (e) => hasTag(e, "research", "environmental-psychology"),
  },
  {
    id: "leadership",
    label: "Leadership",
    matches: (e) => hasTag(e, "leadership", "campus-leadership"),
  },
  {
    id: "communication",
    label: "Communication",
    matches: (e) =>
      hasTag(
        e,
        "journalism",
        "editorial",
        "creative-direction",
        "campus-leadership"
      ),
  },
];

export function WorkExplorer({ items }: { items: Experience[] }) {
  const [active, setActive] = useState("all");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const f of WORK_FILTERS) {
      map.set(f.id, items.filter(f.matches).length);
    }
    return map;
  }, [items]);

  const visible = useMemo(() => {
    const f = WORK_FILTERS.find((x) => x.id === active) ?? WORK_FILTERS[0];
    return items.filter(f.matches);
  }, [items, active]);

  return (
    <div>
      <div
        className="filter-row"
        role="group"
        aria-label="Filter experiences"
      >
        {WORK_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={
              active === f.id ? "filter-btn is-active" : "filter-btn"
            }
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
            <span className="filter-count">{counts.get(f.id) ?? 0}</span>
          </button>
        ))}
      </div>
      <p className="meta" aria-live="polite">
        Showing {visible.length} of {items.length} experiences.
      </p>
      <div className="grid-2">
        {visible.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
}
