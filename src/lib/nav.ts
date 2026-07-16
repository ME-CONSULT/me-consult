export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
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
  { label: "Contact Us", href: "/contact" },
];

export type MegaMenuCategory = {
  label: string;
  href: string;
  description: string;
  items: { label: string; href: string }[];
  featured: {
    title: string;
    description: string;
    href: string;
    external?: boolean;
  };
};

export const megaMenu: MegaMenuCategory[] = [
  {
    label: "Advisory Services",
    href: "/advisory-services",
    description: "Comprehensive legal counsel across 9 practice areas",
    items: [
      { label: "Board Evaluation", href: "/advisory-services#board-evaluation" },
      { label: "Corporate Governance and Compliance", href: "/advisory-services#corporate-governance-and-compliance" },
      { label: "Employment and HR Advisory", href: "/advisory-services#employment-and-hr-advisory" },
      { label: "Intellectual Property Protection", href: "/advisory-services#intellectual-property-protection" },
      { label: "Legal and Regulatory Compliance Audits", href: "/advisory-services#legal-and-regulatory-compliance-audits" },
      { label: "Mergers & Acquisitions", href: "/advisory-services#mergers-and-acquisitions" },
      { label: "Private Equity", href: "/advisory-services#private-equity" },
      { label: "Regulatory and General Corporate Advisory", href: "/advisory-services#regulatory-and-general-corporate-advisory" },
      { label: "Startup Advisory Services", href: "/advisory-services#startup-advisory-services" },
    ],
    featured: {
      title: "Startup Advisory Services",
      description:
        "From ideation to scale, we equip founders with the legal architecture required for sustainable growth.",
      href: "/advisory-services#startup-advisory-services",
    },
  },
  {
    label: "Sectors",
    href: "/sectors",
    description: "Industry expertise across Nigeria's growth sectors",
    items: [
      { label: "Agriculture", href: "/sectors" },
      { label: "Agro-Allied Industry", href: "/sectors" },
      { label: "Fast-Moving Consumer Goods (FMCG)", href: "/sectors" },
      { label: "Fintech & Financial Services", href: "/sectors" },
      { label: "Food and Beverage Technology", href: "/sectors" },
      { label: "Food Delivery & Logistics", href: "/sectors" },
      { label: "Logistics & Logistics Technology", href: "/sectors" },
      { label: "Manufacturing", href: "/sectors" },
      { label: "Professional Services", href: "/sectors" },
      { label: "Regulatory Technology", href: "/sectors" },
      { label: "Technology & Startups", href: "/sectors" },
    ],
    featured: {
      title: "Sector-Led Advisory",
      description:
        "Our team's cross-sector experience gives clients a practical, well-rounded understanding of the regulatory environments they operate in.",
      href: "/sectors",
    },
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Build your career at the intersection of law and strategy",
    items: [
      { label: "The ME Consult Mission", href: "/careers#mission" },
      { label: "Who We Seek", href: "/careers#who-we-seek" },
      { label: "The ME Consult Experience", href: "/careers#experience" },
    ],
    featured: {
      title: "Join Our Team",
      description:
        "We're developing the next generation of corporate-commercial legal professionals. See how to apply.",
      href: "/careers",
    },
  },
  {
    label: "Affiliated Platform",
    href: "/affiliated-platform",
    description: "Independent legal education and SME resources",
    items: [
      { label: "About ME Academy", href: "/affiliated-platform" },
      { label: "Professional Development Courses", href: "/affiliated-platform" },
      { label: "SME Hub", href: "/affiliated-platform" },
    ],
    featured: {
      title: "ME Academy",
      description:
        "An independent knowledge-sharing and professional development platform for legal practitioners and growth-stage businesses.",
      href: "https://www.me-academy.org",
      external: true,
    },
  },
];
