import { credentials } from "@/content/credentials";
import { education } from "@/content/education";
import { CredentialCard } from "@/components/credential-card";
import { EvidenceGraph } from "@/components/evidence-graph/evidence-graph";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata = {
  title: "Evidence",
  description:
    "Interactive graph connecting skills, experience, projects, credentials, and education.",
  openGraph: {
    title: "Evidence — Muhammad Naufal Hafiz",
    description:
      "Interactive graph connecting skills, experience, projects, credentials, and education.",
  },
};

export default function EvidencePage() {
  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">Evidence</p>
          <h1 style={{ fontSize: 36 }}>How capabilities connect</h1>
          <p className="section-lede">
            Every node and link below comes from content — skills,
            experiences, projects, credentials, education, and volunteering.
            Unknown issuer and date fields are omitted rather than guessed.
          </p>
        </section>

        <section className="section" aria-label="Evidence graph">
          <h2 className="sr-only">Evidence graph</h2>
          <EvidenceGraph />
        </section>

        <section className="section" aria-label="Credentials">
          <h2 className="section-title">Credentials</h2>
          <div className="grid-2">
            {credentials.map((c) => (
              <CredentialCard key={c.id} credential={c} />
            ))}
          </div>
        </section>

        <section className="section" aria-label="Education">
          <h2 className="section-title">Education</h2>
          <div className="grid-2">
            {education.map((e) => (
              <article className="card" key={e.id}>
                <h3>{e.institution}</h3>
                <p className="role">
                  {[e.degree, e.field].filter(Boolean).join(" · ")}
                </p>
                <p className="meta">
                  {[e.startDate, e.endDate].filter(Boolean).join(" – ") ||
                    "Dates unavailable"}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
