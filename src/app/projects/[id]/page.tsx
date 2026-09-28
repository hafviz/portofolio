import Link from "next/link";
import { notFound } from "next/navigation";
import { credentials } from "@/content/credentials";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { ExperienceCard } from "@/components/experience-card";
import { ContentGallery } from "@/components/content-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Projects" };
  return {
    title: project.title,
    description: project.description,
  };
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <section className="section" aria-label={label}>
      <h2 className="section-title">{label}</h2>
      <p className="body-text">{value}</p>
    </section>
  );
}

export default function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const linkedExperiences = (project.relatedExperiences ?? [])
    .map((id) => experiences.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const linkedCredentials = (project.relatedCredentials ?? [])
    .map((id) => credentials.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const images = project.images ?? [];

  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">
            <Link href="/projects">Projects</Link> / Case study
          </p>
          <h1 style={{ fontSize: 36 }}>{project.title}</h1>
          <p className="supporting">{project.category}</p>
          <p className="intro">{project.description}</p>
        </section>

        {linkedExperiences.length > 0 ? (
          <section className="section" aria-label="Related experience">
            <h2 className="section-title">Related experience</h2>
            <div className="grid-2">
              {linkedExperiences.map((e) => (
                <ExperienceCard key={e.id} exp={e} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="section" aria-label="My role">
          <h2 className="section-title">My role</h2>
          {linkedExperiences.length > 0 ? (
            <ul className="body-list">
              {linkedExperiences.map((e) => (
                <li key={e.id}>
                  {e.role} — {e.company}
                </li>
              ))}
            </ul>
          ) : (
            <p className="section-lede">
              No related experience recorded for this project.
            </p>
          )}
        </section>

        <Field label="Context / Problem" value={project.problem} />
        <Field label="Approach" value={project.approach} />
        <Field label="Evidence" value={project.evidence} />
        <Field label="Outcomes" value={project.outcome} />

        <section className="section" aria-label="Tools and skills">
          <h2 className="section-title">Tools &amp; demonstrated skills</h2>
          {(project.tools?.length ?? 0) + (project.skills?.length ?? 0) >
          0 ? (
            <>
              {(project.tools?.length ?? 0) > 0 ? (
                <div className="tag-row" aria-label="Tools">
                  {(project.tools ?? []).map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              {(project.skills?.length ?? 0) > 0 ? (
                <div className="tag-row" aria-label="Skills">
                  {(project.skills ?? []).map((s) => (
                    <span className="tag tag-muted" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="section-lede">
              No tools or skills recorded for this project.
            </p>
          )}
        </section>

        <section className="section" aria-label="Images">
          <h2 className="section-title">Images</h2>
          {images.length > 0 ? (
            <ContentGallery images={images} alt={`Images for ${project.title}`} />
          ) : (
            <div className="card">
              <p className="meta" style={{ margin: 0 }}>
                No images supplied. This case study is complete without
                them — images can be added to content later under
                <code> /images/projects/</code>.
              </p>
            </div>
          )}
        </section>

        <section className="section" aria-label="Related credentials">
          <h2 className="section-title">Related credentials</h2>
          {linkedCredentials.length > 0 ? (
            <div className="grid-2">
              {linkedCredentials.map((c) => (
                <article className="card" key={c.id}>
                  <h3>{c.title}</h3>
                  <p className="role">{c.issuer}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="section-lede">
              No related credentials recorded yet.
            </p>
          )}
        </section>

        <section className="section" aria-label="Back">
          <div className="actions">
            <Link className="btn btn-secondary" href="/projects">
              ← All projects
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
