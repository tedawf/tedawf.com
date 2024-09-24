export interface Experience {
  name: string;
  href: string;
  title: string;
  logo: string;
  start: string;
  end?: string;
  description?: string[];
}

export const work: Experience[] = [
  {
    name: "DBS Bank",
    href: "https://www.dbs.com.sg",
    title: "Graduate Associate (SEED)",
    logo: "/dbs.png",
    start: "Jul 2023",
    description: [
      "Developed the Java backend for an account servicing process with multiple channel integrations using Activiti workflow",
      "Built a custom database migration tool using Python and MariaDB and lead the migration of 1000+ custom BPMN workflows in-house",
    ],
  },
  {
    name: "Centre for Immersification (SIT)",
    href: "https://www.immersification.org/",
    title: "Software Engineer (Intern)",
    logo: "/sit.png",
    start: "Apr 2023",
    end: "Jun 2023",
    description: [
      "Worked on a full-stack web application (React + Python) that uses Meshroom to reconstruct 3D models from captured images",
    ],
  },
  {
    name: "Centre for Digital Enablement (SIT)",
    href: "https://www.singaporetech.edu.sg/about/centre-digital-enablement-code",
    title: "Software Engineer (Contract)",
    logo: "/sit.png",
    start: "Apr 2023",
    end: "Jun 2023",
    description: [
      "Built NFTVue, a NFT gallery website that allows students to connect their crypto wallets to view and verify their event-issued NFTs",
    ],
  },
  {
    name: "DBS Bank",
    href: "https://www.dbs.com.sg",
    title: "Software Engineer (Intern)",
    logo: "/dbs.png",
    start: "Apr 2023",
    end: "Jun 2023",
    description: [
      "Built NFTVue, a NFT gallery website that allows students to connect their crypto wallets to view and verify their event-issued NFTs",
    ],
  },
];

export const education: Experience[] = [
  {
    name: "Digipen Institute of Technology Singapore",
    href: "https://www.digipen.edu.sg",
    title: "BS in Computer Science in Real-Time Interactive Simulation",
    logo: "/digipen.png",
    start: "Sep 2019",
    end: "Apr 2023",
    description: [
      "President of Digipen Student Management Committee 2019",
      "3-time recipient of the Dean's Honor List",
    ],
  },
  {
    name: "Singapore Polytechnic",
    href: "https://www.sp.edu.sg",
    title: "Diploma in Games Design and Development",
    logo: "/sp.png",
    start: "Apr 2014",
    end: "May 2017",
  },
];
