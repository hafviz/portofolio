import type { Volunteering } from "@/content/types";
import { ContentGallery } from "./content-gallery";

export function formatVolunteeringRange(v: Volunteering) {
  if (v.current) return `${v.startDate} – Present`;
  if (v.endDate) return `${v.startDate} – ${v.endDate}`;
  return v.startDate;
}

export function VolunteerCard({ item }: { item: Volunteering }) {
  const skills = item.skills ?? [];
  const images = item.images ?? [];

  return (
    <article className="card">
      {item.featured ? (
        <p className="meta" style={{ margin: "0 0 6px", color: "var(--accent)" }}>
          Featured
        </p>
      ) : null}
      <h3>{item.organization}</h3>
      <p className="role">
        {item.role} · {formatVolunteeringRange(item)}
      </p>
      {item.category ? (
        <p className="meta" style={{ margin: "0 0 8px" }}>
          {item.category}
        </p>
      ) : null}
      {item.description ? <p>{item.description}</p> : null}
      {skills.length > 0 ? (
        <div className="tag-row" aria-label="Related skills">
          {skills.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
      ) : null}
      {images.length > 0 ? (
        <div style={{ marginTop: 12 }}>
          <ContentGallery
            images={images}
            alt={`Photos from ${item.organization}`}
            columns={2}
          />
        </div>
      ) : null}
    </article>
  );
}
