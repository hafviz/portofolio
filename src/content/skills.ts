import type { Skill } from "./types";

// Normalized skills. Every entry is directly evidenced by the records
// listed in `evidence`. No proficiency ratings. No unevidenced skills.

export const skills: Skill[] = [
  {
    id: "python",
    name: "Python",
    category: "Data & Analytics",
    description:
      "Built text-mining and sentiment-analysis workflows on employee voice data.",
    evidence: [
      { type: "experience", id: "amazon-people-analytics-trainee" },
      { type: "project", id: "amazon-people-analytics" },
    ],
  },
  {
    id: "text-mining",
    name: "Text Mining",
    category: "Data & Analytics",
    description:
      "Engineered text-mining workflows to identify operational friction in workforce data.",
    evidence: [
      { type: "experience", id: "amazon-people-analytics-trainee" },
      { type: "project", id: "amazon-people-analytics" },
    ],
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis",
    category: "Data & Analytics",
    description:
      "Applied sentiment analysis to multi-platform employee voice data.",
    evidence: [
      { type: "experience", id: "amazon-people-analytics-trainee" },
      { type: "project", id: "amazon-people-analytics" },
    ],
  },
  {
    id: "people-analytics",
    name: "People Analytics",
    category: "Data & Analytics",
    description:
      "Workforce analytics spanning segmentation, friction modeling, and intervention design.",
    evidence: [
      { type: "experience", id: "amazon-people-analytics-trainee" },
      { type: "project", id: "amazon-people-analytics" },
    ],
  },
  {
    id: "workforce-segmentation",
    name: "Workforce Segmentation",
    category: "Data & Analytics",
    description:
      "Segmented workforce datasets into persona-specific friction models.",
    evidence: [
      { type: "experience", id: "amazon-people-analytics-trainee" },
      { type: "project", id: "amazon-people-analytics" },
    ],
  },
  {
    id: "psychometrics",
    name: "Psychometrics",
    category: "Psychology & Assessment",
    description:
      "Standardized psychological assessment across cognitive, projective, and personality instruments.",
    evidence: [
      { type: "experience", id: "rspad-assistant-psychologist" },
      { type: "project", id: "rspad-psychometric-assessment" },
    ],
  },
  {
    id: "mmpi-2",
    name: "MMPI-2",
    category: "Psychology & Assessment",
    description:
      "Administered, scored, and evaluated MMPI-2 assessments for 1,230+ individuals.",
    evidence: [
      { type: "experience", id: "rspad-assistant-psychologist" },
      { type: "project", id: "rspad-psychometric-assessment" },
    ],
  },
  {
    id: "clinical-observation",
    name: "Clinical Observation",
    category: "Psychology & Assessment",
    description:
      "Clinical observation and diagnostic scoring under professional supervision.",
    evidence: [
      { type: "experience", id: "rspad-assistant-psychologist" },
      { type: "project", id: "rspad-psychometric-assessment" },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    category: "Data & Analytics",
    description:
      "Engineered SQL queries over sales and transaction datasets of 1M+ rows.",
    evidence: [
      { type: "experience", id: "muamalat-business-intelligence-analyst" },
      { type: "experience", id: "kimia-farma-big-data-analyst" },
      { type: "project", id: "muamalat-business-intelligence" },
      { type: "project", id: "kimia-farma-big-data-analytics" },
    ],
  },
  {
    id: "google-bigquery",
    name: "Google BigQuery",
    category: "Data & Analytics",
    description:
      "Managed and optimized large-scale analysis in Google BigQuery.",
    evidence: [
      { type: "experience", id: "muamalat-business-intelligence-analyst" },
      { type: "experience", id: "kimia-farma-big-data-analyst" },
      { type: "project", id: "muamalat-business-intelligence" },
      { type: "project", id: "kimia-farma-big-data-analytics" },
    ],
  },
  {
    id: "looker-studio",
    name: "Looker Studio",
    category: "Data & Analytics",
    description:
      "Developed interactive dashboards visualizing up to 600,000+ transactions.",
    evidence: [
      { type: "experience", id: "muamalat-business-intelligence-analyst" },
      { type: "experience", id: "kimia-farma-big-data-analyst" },
      { type: "project", id: "muamalat-business-intelligence" },
      { type: "project", id: "kimia-farma-big-data-analytics" },
    ],
  },
  {
    id: "tableau",
    name: "Tableau",
    category: "Data & Analytics",
    description:
      "Used Tableau for customer segmentation and research communication.",
    evidence: [
      { type: "experience", id: "muamalat-business-development-officer" },
      { type: "experience", id: "next-generation-researchers-researcher" },
      { type: "project", id: "environmental-psychology-research" },
    ],
  },
  {
    id: "spss",
    name: "SPSS",
    category: "Data & Analytics",
    description: "Analyzed employee data from 76 respondents using SPSS.",
    evidence: [
      { type: "experience", id: "next-generation-researchers-researcher" },
      { type: "project", id: "environmental-psychology-research" },
    ],
  },
  {
    id: "research",
    name: "Research",
    category: "Research",
    description:
      "Directed team studies, wrote on policy and development, and produced an academic manuscript.",
    evidence: [
      { type: "experience", id: "next-generation-researchers-researcher" },
      { type: "experience", id: "borgen-project-journalist" },
      { type: "project", id: "environmental-psychology-research" },
    ],
  },
  {
    id: "leadership",
    name: "Leadership",
    category: "Leadership & Operations",
    description:
      "Restructured an 80-member club, directed a research team, and set editorial strategy.",
    evidence: [
      { type: "experience", id: "psikologi-pencinta-alam-president" },
      { type: "experience", id: "next-generation-researchers-researcher" },
      { type: "experience", id: "kawruhe-creative-director" },
      {
        type: "credential",
        id: "leadership-communication-professional-certificate",
      },
    ],
  },
  {
    id: "translation",
    name: "Translation",
    category: "Language & Communication",
    description:
      "Translation and subtitling across English, Indonesian, and Dutch, including historical materials.",
    evidence: [
      { type: "volunteering", id: "ted-translators-linguist" },
      { type: "volunteering", id: "neohistoria-contributor" },
    ],
  },
  {
    id: "localization",
    name: "Localization",
    category: "Language & Communication",
    description:
      "Localization of TED and TEDx talks across three languages.",
    evidence: [{ type: "volunteering", id: "ted-translators-linguist" }],
  },
  {
    id: "public-speaking",
    name: "Public Speaking",
    category: "Language & Communication",
    description:
      "Facilitated peer learning sessions and performed in an educational stage production.",
    evidence: [
      { type: "experience", id: "apa-campus-ambassador" },
      { type: "volunteering", id: "bem-kema-performer" },
    ],
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    category: "Leadership & Operations",
    description:
      "Identified safety risks during terrain and environmental surveys.",
    evidence: [{ type: "volunteering", id: "bem-kema-surveyor" }],
  },
  {
    id: "field-operations",
    name: "Field Operations",
    category: "Leadership & Operations",
    description:
      "Expedition logistics, site assessments, route planning, and field analysis.",
    evidence: [
      { type: "volunteering", id: "bem-kema-surveyor" },
      { type: "experience", id: "psikologi-pencinta-alam-president" },
      { type: "experience", id: "next-generation-researchers-researcher" },
    ],
  },
  {
    id: "documentation",
    name: "Documentation",
    category: "Media & Documentation",
    description:
      "Photo, video, and motion-graphic documentation of events and performances.",
    evidence: [
      { type: "volunteering", id: "bso-kkm-ambipsy-documentation" },
      { type: "volunteering", id: "nonngade-psynoia-documentation" },
      { type: "volunteering", id: "afterglow-publication-documentation" },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    category: "Language & Communication",
    description:
      "Campus outreach, editorial collaboration, and platform communication strategy.",
    evidence: [
      { type: "experience", id: "apa-campus-ambassador" },
      { type: "experience", id: "borgen-project-journalist" },
      { type: "experience", id: "kawruhe-creative-director" },
      {
        type: "credential",
        id: "leadership-communication-professional-certificate",
      },
    ],
  },
];
