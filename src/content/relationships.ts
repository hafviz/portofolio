import type { Relationship } from "./types";

// Powers the future Evidence Graph. Do not render the graph yet.
// Node refs use "<collection>:<id>", e.g. "skill:python".
// Every link is traceable to content. No speculative links.
//
// Semantics:
// - demonstrated-by: skill -> role/activity record that directly evidences it
// - applied-in: skill -> project case study applying it
// - developed-through: skill -> formal learning covering it (title-definitional only)
// - contributed-to: experience -> project case study it underpins
// - related-to: factual record-to-record connection (same employer)

const demonstratedBy = (
  skill: string,
  targets: string[],
  explanation?: string
): Relationship[] =>
  targets.map((target) => ({
    source: `skill:${skill}`,
    target,
    type: "demonstrated-by",
    explanation,
  }));

const appliedIn = (skill: string, projects: string[]): Relationship[] =>
  projects.map((id) => ({
    source: `skill:${skill}`,
    target: `project:${id}`,
    type: "applied-in",
  }));

export const relationships: Relationship[] = [
  // --- Python / people-analytics cluster (Amazon) ---
  ...demonstratedBy("python", ["experience:amazon-people-analytics-trainee"]),
  ...demonstratedBy("text-mining", [
    "experience:amazon-people-analytics-trainee",
  ]),
  ...demonstratedBy("sentiment-analysis", [
    "experience:amazon-people-analytics-trainee",
  ]),
  ...demonstratedBy("people-analytics", [
    "experience:amazon-people-analytics-trainee",
  ]),
  ...demonstratedBy("workforce-segmentation", [
    "experience:amazon-people-analytics-trainee",
  ]),
  ...appliedIn("python", ["amazon-people-analytics"]),
  ...appliedIn("text-mining", ["amazon-people-analytics"]),
  ...appliedIn("sentiment-analysis", ["amazon-people-analytics"]),
  ...appliedIn("people-analytics", ["amazon-people-analytics"]),
  ...appliedIn("workforce-segmentation", ["amazon-people-analytics"]),

  // --- Clinical cluster (RSPAD) ---
  ...demonstratedBy("psychometrics", [
    "experience:rspad-assistant-psychologist",
  ]),
  ...demonstratedBy("mmpi-2", ["experience:rspad-assistant-psychologist"]),
  ...demonstratedBy("clinical-observation", [
    "experience:rspad-assistant-psychologist",
  ]),
  ...appliedIn("psychometrics", ["rspad-psychometric-assessment"]),
  ...appliedIn("mmpi-2", ["rspad-psychometric-assessment"]),
  ...appliedIn("clinical-observation", ["rspad-psychometric-assessment"]),

  // --- SQL / BI cluster (Muamalat BI + Kimia Farma) ---
  ...demonstratedBy("sql", [
    "experience:muamalat-business-intelligence-analyst",
    "experience:kimia-farma-big-data-analyst",
  ]),
  ...demonstratedBy("google-bigquery", [
    "experience:muamalat-business-intelligence-analyst",
    "experience:kimia-farma-big-data-analyst",
  ]),
  ...demonstratedBy("looker-studio", [
    "experience:muamalat-business-intelligence-analyst",
    "experience:kimia-farma-big-data-analyst",
  ]),
  ...appliedIn("sql", [
    "muamalat-business-intelligence",
    "kimia-farma-big-data-analytics",
  ]),
  ...appliedIn("google-bigquery", [
    "muamalat-business-intelligence",
    "kimia-farma-big-data-analytics",
  ]),
  ...appliedIn("looker-studio", [
    "muamalat-business-intelligence",
    "kimia-farma-big-data-analytics",
  ]),

  // --- Tableau / SPSS / research cluster ---
  ...demonstratedBy("tableau", [
    "experience:muamalat-business-development-officer",
    "experience:next-generation-researchers-researcher",
  ]),
  ...demonstratedBy("spss", [
    "experience:next-generation-researchers-researcher",
  ]),
  ...demonstratedBy("research", [
    "experience:next-generation-researchers-researcher",
    "experience:borgen-project-journalist",
  ]),
  ...appliedIn("tableau", ["environmental-psychology-research"]),
  ...appliedIn("spss", ["environmental-psychology-research"]),
  ...appliedIn("research", ["environmental-psychology-research"]),

  // --- Leadership / operations cluster ---
  ...demonstratedBy("leadership", [
    "experience:psikologi-pencinta-alam-president",
    "experience:next-generation-researchers-researcher",
    "experience:kawruhe-creative-director",
  ]),
  ...demonstratedBy("risk-assessment", [
    "volunteering:bem-kema-surveyor",
  ]),
  ...demonstratedBy("field-operations", [
    "volunteering:bem-kema-surveyor",
    "experience:psikologi-pencinta-alam-president",
    "experience:next-generation-researchers-researcher",
  ]),

  // --- Language / media cluster ---
  ...demonstratedBy("translation", [
    "volunteering:ted-translators-linguist",
    "volunteering:neohistoria-contributor",
  ]),
  ...demonstratedBy("localization", [
    "volunteering:ted-translators-linguist",
  ]),
  ...demonstratedBy("public-speaking", [
    "experience:apa-campus-ambassador",
    "volunteering:bem-kema-performer",
  ]),
  ...demonstratedBy("documentation", [
    "volunteering:bso-kkm-ambipsy-documentation",
    "volunteering:nonngade-psynoia-documentation",
    "volunteering:afterglow-publication-documentation",
  ]),
  ...demonstratedBy("communication", [
    "experience:apa-campus-ambassador",
    "experience:borgen-project-journalist",
    "experience:kawruhe-creative-director",
  ]),

  // --- Formal learning (title-definitional only) ---
  {
    source: "skill:leadership",
    target:
      "credential:leadership-communication-professional-certificate",
    type: "developed-through",
    explanation: "Credential title covers leadership.",
  },
  {
    source: "skill:communication",
    target:
      "credential:leadership-communication-professional-certificate",
    type: "developed-through",
    explanation: "Credential title covers communication.",
  },

  // --- Experience underpins project ---
  {
    source: "experience:amazon-people-analytics-trainee",
    target: "project:amazon-people-analytics",
    type: "contributed-to",
  },
  {
    source: "experience:rspad-assistant-psychologist",
    target: "project:rspad-psychometric-assessment",
    type: "contributed-to",
  },
  {
    source: "experience:kimia-farma-big-data-analyst",
    target: "project:kimia-farma-big-data-analytics",
    type: "contributed-to",
  },
  {
    source: "experience:muamalat-business-intelligence-analyst",
    target: "project:muamalat-business-intelligence",
    type: "contributed-to",
  },
  {
    source: "experience:next-generation-researchers-researcher",
    target: "project:environmental-psychology-research",
    type: "contributed-to",
  },

  // --- Same employer (factual) ---
  {
    source: "experience:muamalat-business-development-officer",
    target: "experience:muamalat-business-intelligence-analyst",
    type: "related-to",
    explanation: "Both roles at PT Bank Muamalat Indonesia Tbk.",
  },
];
