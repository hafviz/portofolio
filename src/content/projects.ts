import type { Project } from "./types";

// Initial case studies. Every field below is traceable to bullets in
// experiences.ts. Where the source states no evidence or outcome,
// the field is omitted — never invented.
// Future projects: add one object here. No UI changes required.

export const projects: Project[] = [
  {
    id: "amazon-people-analytics",
    title: "Amazon People Analytics",
    category: "People Analytics",
    description:
      "Text-mining and sentiment-analysis workflows on multi-platform employee voice data to identify operational friction across Amazon Fulfillment Centers.",
    problem:
      "Operational friction across Amazon Fulfillment Centers — including burnout, mandatory overtime strain, and turnover during peak periods — surfaced through employee voice data.",
    approach:
      "Segmented workforce datasets and built persona-specific friction models, then formulated forecast-based staffing buffers and workload-normalization frameworks.",
    outcome:
      "Executive-ready recommendations and intervention designs, including a low-cost operational strategy.",
    skills: ["python", "text-mining", "sentiment-analysis"],
    tools: ["Python"],
    relatedExperiences: ["amazon-people-analytics-trainee"],
  },
  {
    id: "rspad-psychometric-assessment",
    title: "RSPAD Psychometric Assessment",
    category: "Psychology",
    description:
      "Large-scale psychological assessment at Poliklinik Kesehatan Jiwa RSPAD Gatot Soebroto: MMPI-2 administration, battery assessments, and Medical Check-Up reporting.",
    problem:
      "High-volume assessment demand: 1,230+ MMPI-2 administrations, 400+ comprehensive battery assessments, and 200+ Medical Check-Up reports.",
    approach:
      "Administered, scored, and evaluated assessments across 15+ standardized cognitive, projective, and personality instruments, with clinical observation and diagnostic scoring under professional supervision.",
    evidence:
      "1,230+ individuals assessed with the MMPI-2; 200+ evaluation reports processed; 400+ patients assessed; 15+ instruments used.",
    skills: ["mmpi-2", "psychological-assessment", "clinical-observation"],
    tools: ["MMPI-2"],
    relatedExperiences: ["rspad-assistant-psychologist"],
  },
  {
    id: "kimia-farma-big-data-analytics",
    title: "Kimia Farma Big Data Analytics",
    category: "Data Analytics",
    description:
      "SQL analysis over 1M+ rows in Google BigQuery with a Looker Studio dashboard visualizing 600,000+ transactions.",
    problem:
      "Four separate datasets requiring integration before analysis of 1M+ rows could proceed.",
    approach:
      "Managed and optimized SQL analysis in Google BigQuery, integrated four datasets into a unified master table, and built a Looker Studio dashboard.",
    evidence:
      "Analysis efficiency improved by 30%; dashboard visualizing 600,000+ transactions.",
    outcome: "4+ data-driven business recommendations.",
    skills: ["sql", "google-bigquery", "looker-studio"],
    tools: ["Google BigQuery", "Looker Studio", "SQL"],
    relatedExperiences: ["kimia-farma-big-data-analyst"],
  },
  {
    id: "muamalat-business-intelligence",
    title: "Bank Muamalat Business Intelligence",
    category: "Business Intelligence",
    description:
      "Sales analysis in Google BigQuery across 11,654 units and $1.75M in revenue, with interactive Looker Studio dashboards.",
    problem:
      "Sales, customer, and order trends spread across four separate datasets.",
    approach:
      "Engineered SQL queries in Google BigQuery, joined four datasets on primary and foreign keys, and developed interactive Looker Studio dashboards.",
    evidence: "11,654 units and $1.75M in revenue analyzed.",
    outcome:
      "Strategic recommendations based on sales, customer, and order trends.",
    skills: ["sql", "google-bigquery", "looker-studio"],
    tools: ["Google BigQuery", "Looker Studio", "SQL"],
    relatedExperiences: ["muamalat-business-intelligence-analyst"],
  },
  {
    id: "environmental-psychology-research",
    title: "Environmental Psychology Research",
    category: "Research",
    description:
      "Two environmental psychology studies with a five-person team: employee data analysis, field observation, and a 30-page academic manuscript.",
    problem:
      "Two environmental psychology studies requiring coordinated team research across survey data and field observation.",
    approach:
      "Analyzed data from 76 employees in SPSS, conducted field analysis with 300+ runners over 42 observation hours, and communicated findings with Tableau visualizations.",
    evidence:
      "76 employees analyzed; 300+ runners observed across 42 hours; 30-page manuscript produced.",
    outcome:
      "30-page academic manuscript with Tableau visualizations communicating the findings.",
    skills: ["spss", "tableau"],
    tools: ["SPSS", "Tableau"],
    relatedExperiences: ["next-generation-researchers-researcher"],
  },
];
