import type { Credential } from "@/content/types";
import { ContentGallery } from "./content-gallery";

export function CredentialCard({ credential }: { credential: Credential }) {
  const skills = credential.skills ?? [];
  const images = credential.image ? [credential.image] : [];

  return (
    <article className="card">
      {images.length > 0 ? (
        <div style={{ marginBottom: 12 }}>
          <ContentGallery
            images={images}
            alt={`Certificate for ${credential.title}`}
          />
        </div>
      ) : null}
      <h3>{credential.title}</h3>
      {credential.issuer ? (
        <p className="role">{credential.issuer}</p>
      ) : null}
      <p className="meta">
        {[credential.date, credential.status]
          .filter(Boolean)
          .join(" · ") || "Details unavailable"}
      </p>
      {skills.length > 0 ? (
        <div className="tag-row" aria-label="Skills learned">
          {skills.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
      ) : null}
      {credential.credentialUrl ? (
        <p style={{ margin: "12px 0 0", fontSize: 14 }}>
          <a
            href={credential.credentialUrl}
            target="_blank"
            rel="noreferrer"
          >
            View credential →
          </a>
        </p>
      ) : null}
    </article>
  );
}
