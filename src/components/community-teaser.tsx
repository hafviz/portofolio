import { experiences } from "@/content/experiences";
import { volunteering } from "@/content/volunteering";

export function CommunityTeaser() {
  const ted = volunteering.find((v) => v.id === "ted-translators-linguist");
  const neo = volunteering.find((v) => v.id === "neohistoria-contributor");
  // PSIPALA = Psikologi Pencinta Alam, stored as a leadership experience.
  const psipala = experiences.find(
    (e) => e.id === "psikologi-pencinta-alam-president"
  );

  const items = [
    ted
      ? {
          title: ted.organization,
          role: ted.role,
          text: ted.description ?? "",
        }
      : null,
    neo
      ? {
          title: neo.organization,
          role: neo.role,
          text: neo.description ?? "",
        }
      : null,
    psipala
      ? {
          title: "PSIPALA — Psikologi Pencinta Alam",
          role: psipala.role,
          text:
            "Led organizational restructuring for an 80-member specialist club in Bandung.",
        }
      : null,
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section className="section" id="community" aria-label="Community">
      <p className="section-title">Community</p>
      <h2 className="section-heading">Community work</h2>
      <p className="section-lede">
        Translation, history education, and student community leadership.
      </p>
      <div className="grid-3">
        {items.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="role">{item.role}</p>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="actions">
        <a className="btn btn-secondary" href="/community">
          Explore community work
        </a>
      </div>
    </section>
  );
}
