import type { Credential } from "./types";

// Only credentials explicitly present in verified profile data.
// Issuer/date left undefined where the source does not provide them.
// The Leadership certificate image file exists at
// Credentials/Leadership and Communication Professional Certificate/
// but is not yet copied under /public/images/credentials/,
// so `image` stays undefined until then — no broken references.

export const credentials: Credential[] = [
  {
    id: "data-analytics-job-simulation",
    title: "Data Analytics Job Simulation",
  },
  {
    id: "anxiety-disorders-treatment",
    title: "Anxiety Disorders Treatment: Current State and Future Promise",
  },
  {
    id: "management-consulting-job-simulation",
    title: "Management Consulting Job Simulation",
  },
  {
    id: "leadership-communication-professional-certificate",
    title: "Leadership and Communication Professional Certificate",
  },
  {
    id: "toefl-itp",
    title: "TOEFL ITP",
    issuer: "ETS",
  },
];
