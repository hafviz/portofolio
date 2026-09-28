import Image from "next/image";
import { profile } from "@/content/profile";

// Editorial hero: headline left, intro column right.
// The photo slot renders only when profile.profileImage is set,
// so the hero matches the reference layout until a photo is added.
export function Hero() {
  const headlineParts = (profile.headline ?? "").split("×");
  return (
    <section className="hero" id="top">
      <div>
        <h1>{profile.name}</h1>
        {profile.headline ? (
          <p className="headline" aria-label={profile.headline}>
            {headlineParts.map((part, i) => (
              <span key={i}>
                {i > 0 ? <span className="cross" aria-hidden="true"> × </span> : null}
                {part.trim()}
              </span>
            ))}
          </p>
        ) : null}
        {profile.bio ? <p className="supporting">{profile.bio}</p> : null}
        <div className="actions">
          <a className="btn btn-primary" href="/work">
            Explore my work
          </a>
          {profile.email ? (
            <a className="btn btn-secondary" href={`mailto:${profile.email}`}>
              Email me
            </a>
          ) : null}
          {profile.cvUrl ? (
            <a
              className="btn btn-secondary"
              href={profile.cvUrl}
              download
              aria-label={`Download CV of ${profile.name}`}
            >
              Download CV
            </a>
          ) : null}
        </div>
      </div>
      {profile.profileImage ? (
        <div>
          <div className="photo-frame" style={{ padding: 0 }}>
            <Image
              src={profile.profileImage}
              alt={`Portrait of ${profile.name}`}
              width={480}
              height={600}
              priority
            />
          </div>
        </div>
      ) : (
        <aside className="hero-side" aria-label="Contact">
          {profile.email ? (
            <p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          ) : null}
          {profile.linkedin ? (
            <p>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
          ) : null}
          <a className="hero-more" href="/#about">
            Learn more about me →
          </a>
        </aside>
      )}
    </section>
  );
}
