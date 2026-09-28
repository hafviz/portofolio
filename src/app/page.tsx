import { CommunityTeaser } from "@/components/community-teaser";
import { EvidenceGraph } from "@/components/evidence-graph/evidence-graph";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SearchBar } from "@/components/search/search-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { projects } from "@/content/projects";

export default function Home() {
  const selectedWork = projects.slice(0, 4);
  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <Hero />
        <section className="section" aria-label="Search and explore">
          <SearchBar />
        </section>
        <section className="section" aria-label="Map of Evidence">
          <p className="section-title">Map of Evidence</p>
          <h2 className="section-heading">
            Explore how the work connects
          </h2>
          <p className="section-lede">
            Projects, experiences, skills, and credentials connect to create
            real-world impact. Select any node to inspect it.
          </p>
          <EvidenceGraph />
        </section>
        <section className="section" aria-label="Selected work">
          <p className="section-title">Featured projects</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <h2 className="section-heading">Selected Work</h2>
            <a href="/projects" style={{ fontSize: 14 }}>
              View all projects →
            </a>
          </div>
          <div className="grid-2" style={{ marginTop: 16 }}>
            {selectedWork.map((p, i) => (
              <ProjectCard key={p.id} project={p} selected={i === 0} />
            ))}
          </div>
        </section>
        <CommunityTeaser />
      </main>
      <SiteFooter />
    </>
  );
}
