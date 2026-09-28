import { Suspense } from "react";
import { SearchExplorer } from "@/components/search/search-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata = {
  title: "Search",
  description:
    "Search experiences, projects, credentials, skills, and volunteering.",
};

export default function SearchPage() {
  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">Search</p>
          <h1 style={{ fontSize: 36 }}>Find anything</h1>
        </section>
        <section className="section" aria-label="Search">
          <h2 className="sr-only">Search the portfolio</h2>
          <Suspense>
            <SearchExplorer />
          </Suspense>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
