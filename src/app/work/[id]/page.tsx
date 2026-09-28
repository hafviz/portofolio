import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { ExperienceCard } from "@/components/experience-card";
import { ContentGallery } from "@/components/content-gallery";
import { formatRange } from "@/components/experience-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function generateStaticParams() {
  return experiences
    .filter((e) => e.featured)
    .map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const exp = experiences.find((e) => e.id === params.id);
  if (!exp) return { title: "Work" };
  return {
    title: `${exp.role} · ${exp.company}`,
    description: exp.summary ?? exp.bullets?.[0] ?? exp.role,
  };
}

function relatedWork(id: string, tags: string[] = []) {
  return experiences
    .filter((e) => e.id !== id && e.tags?.some((t) => tags.includes(t)))
    .slice(0, 3);
}

export default function ExperienceDetail({
  params,
}: {
  params: { id: string };
}) {
  const exp = experiences.find((e) => e.id === params.id);
  if (!exp || !exp.featured) notFound();

  const bullets = exp.bullets ?? [];
  // Evidence = bullets that state a concrete metric. Selected, not written.
  const evidence = bullets.filter((b) => /\d/.test(b));
  const related = relatedWork(exp.id, exp.tags ?? []);
  const images = exp.images ?? [];
  const caseStudy = projects.find((p) =>
    p.relatedExperiences?.includes(exp.id)
  );

  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">
            <Link href="/work">Work</Link> / Detail
          </p>
          <h1 style={{ fontSize: 36 }}>{exp.company}</h1>
          <p className="supporting">
            {exp.role} · {formatRange(exp)}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
          {exp.summary ? <p className="intro">{exp.summary}</p> : null}
        </section>

        <section className="section" aria-label="Overview">
          <h2 className="section-title">Overview</h2>
          <div className="card">
            <dl className="meta-table">
              <div>
                <dt>Organization</dt>
                <dd>{exp.company}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{exp.role}</dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>{formatRange(exp)}</dd>
              </div>
              {exp.location ? (
                <div>
                  <dt>Location</dt>
                  <dd>{exp.location}</dd>
                </div>
              ) : null}
              {exp.link ? (
                <div>
                  <dt>Link</dt>
                  <dd>
                    <a href={exp.link} target="_blank" rel="noreferrer">
                      {exp.link}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </section>

        <section className="section" aria-label="What I did">
          <h2 className="section-title">What I did</h2>
          {bullets.length > 0 ? (
            <ul className="body-list">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : (
            <p className="section-lede">
              {exp.summary ?? "No detailed bullets recorded for this role."}
            </p>
          )}
        </section>

        <section className="section" aria-label="Evidence">
          <h2 className="section-title">Evidence</h2>
          {evidence.length > 0 ? (
            <ul className="body-list">
              {evidence.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : (
            <p className="section-lede">
              Evidence is embedded in the bullets above — no separate metrics
              recorded for this role.
            </p>
          )}
        </section>

        <section className="section" aria-label="Skills demonstrated">
          <h2 className="section-title">Skills demonstrated</h2>
          {(exp.skills?.length ?? 0) + (exp.tags?.length ?? 0) > 0 ? (
            <div className="tag-row">
              {(exp.skills ?? []).map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
              {(exp.tags ?? []).map((t) => (
                <span className="tag tag-muted" key={t}>
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <p className="section-lede">No skills recorded for this role.</p>
          )}
        </section>

        <section className="section" aria-label="Gallery">
          <h2 className="section-title">Gallery</h2>
          {images.length > 0 ? (
            <ContentGallery
              images={images}
              alt={`Images for ${exp.role} at ${exp.company}`}
            />
          ) : (
            <div className="card">
              <p className="meta" style={{ margin: 0 }}>
                No images supplied. This page is complete without them —
                images can be added to content later under
                <code> /images/experiences/</code>.
              </p>
            </div>
          )}
        </section>

        {caseStudy ? (
          <section className="section" aria-label="Related case study">
            <h2 className="section-title">Related case study</h2>
            <div className="card">
              <h3 style={{ margin: "0 0 4px", fontSize: 17 }}>
                <Link href={`/projects/${caseStudy.id}`}>
                  {caseStudy.title}
                </Link>
              </h3>
              <p style={{ margin: 0, fontSize: 14 }}>
                {caseStudy.description}
              </p>
              <p style={{ margin: "12px 0 0", fontSize: 14 }}>
                <Link href={`/projects/${caseStudy.id}`}>
                  View case study →
                </Link>
              </p>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="section" aria-label="Related work">
            <p className="section-title">Related work</p>
            <h2 className="section-heading">Connected by shared areas</h2>
            <div className="grid-2">
              {related.map((r) => (
                <ExperienceCard key={r.id} exp={r} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="section" aria-label="Back">
          <div className="actions">
            <Link className="btn btn-secondary" href="/work">
              ← All work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
