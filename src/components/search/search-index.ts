import { credentials } from "@/content/credentials";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { volunteering } from "@/content/volunteering";

export type SearchKind =
  | "experience"
  | "project"
  | "credential"
  | "skill"
  | "volunteering";

export interface SearchEntry {
  kind: SearchKind;
  id: string;
  title: string;
  subtitle: string;
  snippet: string;
  tags: string[];
  href: string;
  haystack: string;
}

const KIND_LABEL: Record<SearchKind, string> = {
  experience: "Experience",
  project: "Project",
  credential: "Credential",
  skill: "Skill",
  volunteering: "Volunteering",
};

export function kindLabel(kind: SearchKind) {
  return KIND_LABEL[kind];
}

function lower(parts: (string | string[] | undefined)[]) {
  return parts
    .flatMap((p) => (Array.isArray(p) ? p : p ? [p] : []))
    .join(" ")
    .toLowerCase();
}

export function buildIndex(): SearchEntry[] {
  return [
    ...experiences.map((e): SearchEntry => {
      const featured = e.featured ? `/work/${e.id}` : "/work";
      return {
        kind: "experience",
        id: e.id,
        title: e.company,
        subtitle: `${e.role} · ${e.startDate}${
          e.current ? " – Present" : e.endDate ? ` – ${e.endDate}` : ""
        }`,
        snippet: e.summary ?? e.bullets?.[0] ?? "",
        tags: [...(e.skills ?? []), ...(e.tags ?? [])],
        href: featured,
        haystack: lower([
          e.company,
          e.role,
          e.location,
          e.summary,
          e.bullets,
          e.skills,
          e.tags,
        ]),
      };
    }),
    ...projects.map((p): SearchEntry => ({
      kind: "project",
      id: p.id,
      title: p.title,
      subtitle: p.category,
      snippet: p.description,
      tags: [...(p.tools ?? []), ...(p.skills ?? [])],
      href: `/projects/${p.id}`,
      haystack: lower([
        p.title,
        p.category,
        p.description,
        p.problem,
        p.approach,
        p.evidence,
        p.outcome,
        p.skills,
        p.tools,
      ]),
    })),
    ...credentials.map((c): SearchEntry => ({
      kind: "credential",
      id: c.id,
      title: c.title,
      subtitle: c.issuer ?? "Issuer unavailable",
      snippet: (c.skills ?? []).join(", "),
      tags: c.skills ?? [],
      href: "/evidence",
      haystack: lower([c.title, c.issuer, c.skills]),
    })),
    ...skills.map((s): SearchEntry => ({
      kind: "skill",
      id: s.id,
      title: s.name,
      subtitle: s.category,
      snippet: s.description ?? "",
      tags: [s.category],
      href: "/evidence",
      haystack: lower([s.name, s.category, s.description]),
    })),
    ...volunteering.map((v): SearchEntry => ({
      kind: "volunteering",
      id: v.id,
      title: v.organization,
      subtitle: `${v.role} · ${v.startDate}${
        v.current ? " – Present" : v.endDate ? ` – ${v.endDate}` : ""
      }`,
      snippet: v.description ?? "",
      tags: [...(v.skills ?? []), ...(v.category ? [v.category] : [])],
      href: "/community",
      haystack: lower([
        v.organization,
        v.role,
        v.category,
        v.description,
        v.skills,
      ]),
    })),
  ];
}

export function search(
  index: SearchEntry[],
  query: string,
  kinds: Set<SearchKind>
): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of index) {
    if (!kinds.has(entry.kind)) continue;
    let score = 0;
    let allMatch = true;
    for (const t of terms) {
      const inTitle = entry.title.toLowerCase().includes(t);
      const inTags = entry.tags.some((tag) => tag.toLowerCase().includes(t));
      const inBody = entry.haystack.includes(t);
      if (!inTitle && !inTags && !inBody) {
        allMatch = false;
        break;
      }
      if (inTitle) score += 3;
      else if (inTags) score += 2;
      else score += 1;
    }
    if (allMatch) scored.push({ entry, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}
