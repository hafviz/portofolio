import { volunteering } from "@/content/volunteering";
import type { Volunteering } from "@/content/types";
import { VolunteerCard } from "@/components/volunteer-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata = {
  title: "Community",
  description:
    "Volunteering across education, social service, field safety, and arts.",
  openGraph: {
    title: "Community — Muhammad Naufal Hafiz",
    description:
      "Volunteering across education, social service, field safety, and arts.",
  },
};

interface Theme {
  id: string;
  title: string;
  lede: string;
  matches: (v: Volunteering) => boolean;
}

// Grouping is editorial. Each matcher cites the content it relies on:
// categories as stored, plus description terms the entries contain.
const THEMES: Theme[] = [
  {
    id: "education-knowledge",
    title: "Education & Knowledge",
    lede: "Translation, history interpretation, and visual communication.",
    matches: (v) =>
      v.category === "Education" &&
      !/survey|safety|evacuation|route/i.test(v.description ?? ""),
  },
  {
    id: "community-service",
    title: "Community & Social Service",
    lede: "Food distribution, children's activities, and elder companionship.",
    matches: (v) => v.category === "Social Services",
  },
  {
    id: "safety-field",
    title: "Safety & Field Operations",
    lede: "Terrain surveys, risk identification, and evacuation planning.",
    matches: (v) =>
      /survey|safety|evacuation|route/i.test(v.description ?? ""),
  },
  {
    id: "arts-events",
    title: "Arts, Events & Communication",
    lede: "Stage, music, and visual production work.",
    matches: (v) =>
      v.category === "Arts and Culture" ||
      (v.category === undefined &&
        /visual|photograph|audiovisual|motion graphic/i.test(
          v.description ?? ""
        )),
  },
];

function byFeaturedFirst(a: Volunteering, b: Volunteering) {
  return Number(b.featured ?? false) - Number(a.featured ?? false);
}

export default function CommunityPage() {
  return (
    <>
      <SiteNav />
      <main className="container" id="main">
        <section style={{ padding: "48px 0 8px" }}>
          <p className="section-title">Community</p>
          <h1 style={{ fontSize: 36 }}>Community work</h1>
          <p className="section-lede">
            Volunteering organized by theme — not a resume dump. Entries are
            rendered from content with typography and layout; no stock
            imagery.
          </p>
        </section>

        {THEMES.map((theme) => {
          const items = volunteering
            .filter(theme.matches)
            .sort(byFeaturedFirst);
          if (items.length === 0) return null;
          return (
            <section
              className="section"
              key={theme.id}
              aria-label={theme.title}
            >
              <p className="section-title">Theme</p>
              <h2 className="section-heading">{theme.title}</h2>
              <p className="section-lede">{theme.lede}</p>
              <div className="grid-2">
                {items.map((item) => (
                  <VolunteerCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
