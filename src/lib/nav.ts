export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Advisory Services",
    href: "/advisory-services",
    children: [
      { label: "Board Evaluation", href: "/advisory-services#board-evaluation" },
      { label: "Corporate Governance and Compliance", href: "/advisory-services#corporate-governance-and-compliance" },
      { label: "Employment and HR Advisory", href: "/advisory-services#employment-and-hr-advisory" },
      { label: "Intellectual Property Protection", href: "/advisory-services#intellectual-property-protection" },
      { label: "Legal and Regulatory Compliance Audits", href: "/advisory-services#legal-and-regulatory-compliance-audits" },
      { label: "Mergers & Acquisitions", href: "/advisory-services#mergers-and-acquisitions" },
      { label: "Private Equity", href: "/advisory-services#private-equity" },
      { label: "Regulatory and General Corporate Advisory", href: "/advisory-services#regulatory-and-general-corporate-advisory" },
      { label: "Startup Advisory Services", href: "/advisory-services#startup-advisory-services" },
      { label: "Private Wealth Advisory", href: "/advisory-services#private-wealth-advisory" },
    ],
  },
  { label: "Sectors", href: "/sectors" },
  {
    label: "Careers",
    href: "/careers",
    children: [
      { label: "The ME Consult Mission", href: "/careers#mission" },
      { label: "Who We Seek", href: "/careers#who-we-seek" },
      { label: "The ME Consult Experience", href: "/careers#experience" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "Publications", href: "/insights#publications" },
      { label: "News and Events", href: "/insights#news-and-events" },
      { label: "Newsletter", href: "/insights#newsletter" },
      { label: "Downloadable Resources", href: "/insights#downloadable-resources" },
    ],
  },
  { label: "Affiliated Platform", href: "/affiliated-platform" },
  { label: "Contact Us", href: "/contact" },
];
