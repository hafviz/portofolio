import { experiences } from "@/content/experiences";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WorkExplorer } from "@/components/work-explorer";

export const metadata = {
  title: "Work",
  description:
    "Professional experience across people analytics, clinical psychology, and data analytics.",
  openGraph: {
    title: "Work — Muhammad Naufal Hafiz",
    description:
      "Professional experience across people analytics, clinical psychology, and data analytics.",
  },
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">Work</p>
          <h1 style={{ fontSize: 36 }}>
            Professional experience
          </h1>
          <p className="section-lede">
            Every entry below is rendered from content. Filter by area to
            browse — no entries are duplicated or hardcoded in this page.
          </p>
        </section>
        <section className="section" aria-label="All experiences">
          <h2 className="sr-only">All experiences</h2>
          <WorkExplorer items={experiences} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
