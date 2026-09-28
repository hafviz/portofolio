import { credentials } from "@/content/credentials";
import { education } from "@/content/education";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { relationships } from "@/content/relationships";
import { skills } from "@/content/skills";
import { volunteering } from "@/content/volunteering";

export type NodeKind =
  | "skill"
  | "experience"
  | "project"
  | "credential"
  | "education"
  | "volunteering";

export interface GraphNode {
  ref: string;
  label: string;
  kind: NodeKind;
  blurb?: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

export const KIND_LABEL: Record<NodeKind, string> = {
  skill: "Skill",
  experience: "Experience",
  project: "Project",
  credential: "Credential",
  education: "Education",
  volunteering: "Volunteering",
};

const W = 1040;
const H = 780;
const TOP = 70;
const BOTTOM = 750;

function column<T>(items: T[], x: number): { item: T; x: number; y: number }[] {
  if (items.length === 1) return [{ item: items[0], x, y: (TOP + BOTTOM) / 2 }];
  return items.map((item, i) => ({
    item,
    x,
    y: TOP + (i * (BOTTOM - TOP)) / (items.length - 1),
  }));
}

// Education rows sit on half-steps so they never share a y with the
// volunteering rows — their labels would otherwise collide.
function staggered<T>(items: T[], x: number): { item: T; x: number; y: number }[] {
  return items.map((item, i) => ({
    item,
    x,
    y: TOP + (((i + 0.5) * (BOTTOM - TOP)) / items.length),
  }));
}

export function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    ...column(skills, 70).map(({ item, x, y }) => ({
      ref: `skill:${item.id}`,
      label: item.name,
      kind: "skill" as NodeKind,
      blurb: item.description,
      x,
      y,
    })),
    ...column(experiences, 230).map(({ item, x, y }) => ({
      ref: `experience:${item.id}`,
      label: item.company,
      kind: "experience" as NodeKind,
      blurb: `${item.role} · ${item.startDate}${
        item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""
      }`,
      x,
      y,
    })),
    ...column(projects, 390).map(({ item, x, y }) => ({
      ref: `project:${item.id}`,
      label: item.title,
      kind: "project" as NodeKind,
      blurb: item.description,
      x,
      y,
    })),
    ...column(credentials, 550).map(({ item, x, y }) => ({
      ref: `credential:${item.id}`,
      label: item.title,
      kind: "credential" as NodeKind,
      blurb: item.issuer,
      x,
      y,
    })),
    ...staggered(education, 710).map(({ item, x, y }) => ({
      ref: `education:${item.id}`,
      label: item.institution,
      kind: "education" as NodeKind,
      blurb: [item.degree, item.field].filter(Boolean).join(" · "),
      x,
      y,
    })),
    ...column(volunteering, 870).map(({ item, x, y }) => ({
      ref: `volunteering:${item.id}`,
      label: item.organization,
      kind: "volunteering" as NodeKind,
      blurb: `${item.role} · ${item.startDate}${
        item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""
      }`,
      x,
      y,
    })),
  ];

  return {
    nodes,
    edges: relationships.map((r) => ({
      source: r.source,
      target: r.target,
      type: r.type,
    })),
  };
}

export type Domain =
  | "all"
  | "people"
  | "data"
  | "research"
  | "leadership"
  | "community";

export const DOMAINS: { id: Domain; label: string }[] = [
  { id: "all", label: "All" },
  { id: "people", label: "People" },
  { id: "data", label: "Data" },
  { id: "research", label: "Research" },
  { id: "leadership", label: "Leadership" },
  { id: "community", label: "Community" },
];

const skillById = new Map(skills.map((s) => [s.id, s]));
const expById = new Map(experiences.map((e) => [e.id, e]));
const projById = new Map(projects.map((p) => [p.id, p]));
const credById = new Map(credentials.map((c) => [c.id, c]));
const eduById = new Map(education.map((e) => [e.id, e]));

const hasAny = (tags: string[] | undefined, ...want: string[]) =>
  tags?.some((t) => want.includes(t)) ?? false;

// Domain matchers use only stored categories, tags, fields, and titles.
export function nodeInDomain(domain: Domain, ref: string): boolean {
  if (domain === "all") return true;
  const [kind, id] = ref.split(/:(.+)/);
  switch (domain) {
    case "people": {
      if (kind === "skill") {
        const s = skillById.get(id);
        return (
          s?.category === "Psychology & Assessment" || id === "people-analytics"
        );
      }
      if (kind === "experience")
        return hasAny(expById.get(id)?.tags, ...[
          "psychology",
          "clinical",
          "environmental-psychology",
          "people-analytics",
        ]);
      if (kind === "project")
        return ["People Analytics", "Psychology"].includes(
          projById.get(id)?.category ?? ""
        );
      if (kind === "education")
        return ["Clinical Psychology", "Neuroscience"].includes(
          eduById.get(id)?.field ?? ""
        );
      if (kind === "credential")
        return /anxiety|psycholog/i.test(credById.get(id)?.title ?? "");
      return false;
    }
    case "data": {
      if (kind === "skill") return skillById.get(id)?.category === "Data & Analytics";
      if (kind === "experience")
        return hasAny(expById.get(id)?.tags, ...[
          "data-analytics",
          "data-science",
          "big-data",
          "business-intelligence",
          "people-analytics",
        ]);
      if (kind === "project")
        return ["People Analytics", "Data Analytics", "Business Intelligence"].includes(
          projById.get(id)?.category ?? ""
        );
      if (kind === "education") return eduById.get(id)?.field === "Data Science";
      return false;
    }
    case "research": {
      if (kind === "skill") return skillById.get(id)?.category === "Research";
      if (kind === "experience")
        return hasAny(expById.get(id)?.tags, "research", "environmental-psychology");
      if (kind === "project") return projById.get(id)?.category === "Research";
      return false;
    }
    case "leadership": {
      if (kind === "skill")
        return skillById.get(id)?.category === "Leadership & Operations";
      if (kind === "experience")
        return hasAny(expById.get(id)?.tags, "leadership", "campus-leadership");
      if (kind === "credential")
        return /leadership/i.test(credById.get(id)?.title ?? "");
      return false;
    }
    case "community": {
      if (kind === "volunteering") return true;
      if (kind === "skill")
        return [
          "translation",
          "localization",
          "documentation",
          "communication",
          "public-speaking",
        ].includes(id);
      return false;
    }
    default:
      return true;
  }
}

export interface Trail {
  project: GraphNode;
  experiences: GraphNode[];
  skills: GraphNode[];
}

// One readable trail per project, derived only from relationships:
// contributing experience(s) -> applied skills -> project.
export function buildTrails(nodes: GraphNode[], edges: GraphEdge[]): Trail[] {
  const byRef = new Map(nodes.map((n) => [n.ref, n]));
  return nodes
    .filter((n) => n.kind === "project")
    .map((project) => ({
      project,
      experiences: edges
        .filter((e) => e.target === project.ref && e.type === "contributed-to")
        .map((e) => byRef.get(e.source))
        .filter((n): n is GraphNode => Boolean(n)),
      skills: edges
        .filter((e) => e.target === project.ref && e.type === "applied-in")
        .map((e) => byRef.get(e.source))
        .filter((n): n is GraphNode => Boolean(n)),
    }));
}
