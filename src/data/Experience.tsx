import { Icons } from "./Icons";

export interface Experience {
  name: string;
  href: string;
  title: string;
  logo: string;
  start: string;
  end?: string;
  description?: string[];
  links?: readonly {
    name: string;
    href: string;
    icon: React.ReactElement;
  }[];
}

export const work: Experience[] = [
  {
    name: "DBS Bank",
    href: "https://www.dbs.com.sg",
    title: "Graduate Associate (SEED Programme)",
    logo: "/dbs.png",
    start: "Jul 2023",
    description: [
      "Developed the Java backend for a bank account servicing process with multiple channel integrations using Activiti workflow",
      "Built a custom database migration tool using Python and MariaDB and facilitated the migration of 1000+ processes from a vendor platform",
    ],
  },
  {
    name: "Singapore Institute of Technology",
    href: "https://www.singaporetech.edu.sg",
    title: "Software Developer (Contract)",
    logo: "/sit.png",
    start: "Apr 2023",
    end: "Jun 2023",
    description: [
      "Built NFTVue, a NFT gallery website that allows students to connect their crypto wallets to view and verify their school event-issued NFTs",
      "Worked on DemoConstruct, a full-stack web application (React + Python) that uses Meshroom to reconstruct 3D models from captured images",
    ],
    links: [
      {
        name: "NFTVue",
        href: "https://nftvue.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
    ],
  },
  {
    name: "DBS Bank",
    href: "https://www.dbs.com.sg",
    title: "Software Developer (Intern)",
    logo: "/dbs.png",
    start: "May 2022",
    end: "Dec 2022",
    description: [
      "Worked on the backend for the digital exchange and asset custody application using Spring Boot and Java",
      "Built an admin dashboard web application for a DBS Metaverse event using Spring Security and Angular",
    ],
  },
  {
    name: "Activate Interactive Pte Ltd",
    href: "https://www.activate.sg",
    title: "Software Developer (Intern)",
    logo: "/activate.png",
    start: "May 2019",
    end: "Aug 2019",
    description: [
      "Developed RP Connect, the iOS and Android mobile app for Republic Polytechnic (RP) using React Native",
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
      "President of Digipen Student Management Committee AY20/21",
      "3-time recipient of the Dean's Honor List",
    ],
    links: [
      {
        name: "Final Year Project",
        href: "https://games.digipen.edu/games/rapid-ride-fight",
        icon: <Icons.globe className="size-3" />,
      },
      {
        name: "2nd Year Project",
        href: "https://games.digipen.edu/games/glowing-under",
        icon: <Icons.globe className="size-3" />,
      },
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
