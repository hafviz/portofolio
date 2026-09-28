import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="footer" id="about">
      <div className="container footer-inner">
        <div>
          <p style={{ margin: 0, fontWeight: 700 }}>{profile.name}</p>
          {profile.bio ? <p className="small">{profile.bio}</p> : null}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {profile.email ? (
            <a className="btn btn-accent" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          ) : null}
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {profile.cvUrl ? (
            <a href={profile.cvUrl} download aria-label={`Download CV of ${profile.name}`}>
              Download CV
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
