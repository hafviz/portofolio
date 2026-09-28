import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata = {
  title: "Projects",
  description:
    "Case studies in people analytics, psychometrics, business intelligence, and research.",
  openGraph: {
    title: "Projects — Muhammad Naufal Hafiz",
    description:
      "Case studies in people analytics, psychometrics, business intelligence, and research.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">Projects</p>
          <h1 style={{ fontSize: 36 }}>Case studies</h1>
          <p className="section-lede">
            Each case study is built from experience data. New projects are
            added by editing content — never by creating new UI.
          </p>
        </section>
        <section className="section" aria-label="All projects">
          <h2 className="sr-only">All projects</h2>
          <div className="grid-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
