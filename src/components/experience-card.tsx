import Link from "next/link";
import { projects } from "@/content/projects";
import type { Experience } from "@/content/types";

export function formatRange(exp: Experience) {
  if (exp.current) return `${exp.startDate} – Present`;
  if (exp.endDate) return `${exp.startDate} – ${exp.endDate}`;
  return exp.startDate;
}

function excerpt(text: string, max = 140) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

export function ExperienceCard({ exp }: { exp: Experience }) {
  const concise =
    exp.summary ?? (exp.bullets && exp.bullets[0]
      ? excerpt(exp.bullets[0])
      : undefined);
  const skills = exp.skills?.slice(0, 4) ?? [];
  const tags = exp.tags?.slice(0, 4) ?? [];
  const caseStudy = projects.find((p) =>
    p.relatedExperiences?.includes(exp.id)
  );
  const eyebrow = exp.tags?.[0];

  return (
    <article className="card">
      <div className="card-top">
        <div>
          {eyebrow ? <p className="card-eyebrow">{eyebrow}</p> : null}
          <h3 style={{ margin: 0 }}>{exp.company}</h3>
        </div>
      </div>
      <p className="role">
        {exp.role} · {formatRange(exp)}
        {exp.location ? ` · ${exp.location}` : ""}
      </p>
      {concise ? <p>{concise}</p> : null}
      {skills.length > 0 ? (
        <div className="tag-row" aria-label="Skills">
          {skills.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
      ) : null}
      {tags.length > 0 ? (
        <div className="tag-row" aria-label="Tags">
          {tags.map((t) => (
            <span className="tag tag-muted" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
      {caseStudy ? (
        <p style={{ margin: "12px 0 0", fontSize: 14 }}>
          <Link
            href={`/projects/${caseStudy.id}`}
            aria-label={`View case study for ${caseStudy.title}`}
          >
            View case study →
          </Link>
        </p>
      ) : null}
      {exp.featured ? (
        <p style={{ margin: "12px 0 0", fontSize: 14 }}>
          <Link
            href={`/work/${exp.id}`}
            aria-label={`View detail for ${exp.role} at ${exp.company}`}
          >
            View detail →
          </Link>
        </p>
      ) : null}
    </article>
  );
}
