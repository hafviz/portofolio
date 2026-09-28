// Single source of truth for site-wide SEO values.
// TODO: set NEXT_PUBLIC_SITE_URL in the deployment environment
// (e.g. https://your-domain.com). The fallback is a reserved
// documentation domain and must be replaced before launch.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";

export const SITE_NAME = "Muhammad Naufal Hafiz";
export const SITE_TAGLINE = "Psychology × Data Science";
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "Portfolio exploring behavioral science, people analytics, psychometrics, data analytics, research, and evidence-based decision making.";
