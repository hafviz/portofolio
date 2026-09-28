import Link from "next/link";
import type { Project } from "@/content/types";

function monogram(label: string) {
  const words = label.split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

export function ProjectCard({
  project,
  selected = false,
}: {
  project: Project;
  selected?: boolean;
}) {
  const tools = project.tools?.slice(0, 4) ?? [];
  const skills = project.skills?.slice(0, 4) ?? [];

  return (
    <article className={selected ? "card card-selected" : "card"}>
      <div className="card-top">
        <div>
          <p className="card-eyebrow">{project.category}</p>
          <h3 style={{ margin: 0 }}>
            <Link href={`/projects/${project.id}`}>{project.title}</Link>
          </h3>
        </div>
        <span className="card-mark" aria-hidden="true">
          {monogram(project.title)}
        </span>
      </div>
      <p style={{ marginTop: 10 }}>{project.description}</p>
      {tools.length > 0 ? (
        <div className="tag-row" aria-label="Tools">
          {tools.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
      {skills.length > 0 ? (
        <div className="tag-row" aria-label="Skills">
          {skills.map((s) => (
            <span className="tag tag-muted" key={s}>
              {s}
            </span>
          ))}
        </div>
      ) : null}
      <p style={{ margin: "12px 0 0", fontSize: 14 }}>
        <Link
          href={`/projects/${project.id}`}
          aria-label={`View case study for ${project.title}`}
        >
          View case study →
        </Link>
      </p>
    </article>
  );
}
