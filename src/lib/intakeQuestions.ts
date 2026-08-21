export type IntakeQuestion = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: string[];
};

export const GENERIC_INTAKE_QUESTIONS: IntakeQuestion[] = [
  { id: "company_name", label: "Company / organization name", type: "text" },
  {
    id: "urgency",
    label: "How urgent is this?",
    type: "select",
    options: ["Not urgent", "Within a month", "Within two weeks", "Immediate"],
  },
  { id: "budget_range", label: "Approximate budget range", type: "text" },
  { id: "referral_source", label: "How did you hear about ME Consult?", type: "text" },
];

export const SERVICE_INTAKE_QUESTIONS: Record<string, IntakeQuestion[]> = {
  "Board Evaluation": [
    { id: "board_size", label: "How many board members?", type: "text" },
  ],
  "Corporate Governance and Compliance": [
    { id: "governance_focus", label: "What's the primary governance concern?", type: "text" },
  ],
  "Employment and HR Advisory": [
    { id: "employee_count", label: "Approximate number of employees?", type: "text" },
  ],
  "Intellectual Property Protection": [
    {
      id: "ip_type",
      label: "What type of IP needs protection?",
      type: "select",
      options: ["Trademark", "Patent", "Copyright", "Trade secret", "Other"],
    },
  ],
  "Legal and Regulatory Compliance Audits": [
    { id: "audit_scope", label: "What is the scope of the audit?", type: "text" },
  ],
  "Mergers & Acquisitions": [
    { id: "deal_size", label: "What is the estimated deal size?", type: "text" },
    {
      id: "deal_stage",
      label: "Which stage is the transaction at?",
      type: "select",
      options: ["Exploratory", "Term sheet", "Due diligence", "Closing"],
    },
  ],
  "Private Equity": [
    { id: "fund_stage", label: "What stage is the fund/deal at?", type: "text" },
  ],
  "Private Wealth Advisory": [
    { id: "aum_range", label: "Approximate assets under consideration?", type: "text" },
  ],
  "Regulatory and General Corporate Advisory": [
    { id: "regulator", label: "Which regulator or authority is involved, if any?", type: "text" },
  ],
  "Startup Advisory Services": [
    {
      id: "company_stage",
      label: "What stage is your startup at?",
      type: "select",
      options: ["Idea", "Pre-seed", "Seed", "Series A+"],
    },
  ],
};
