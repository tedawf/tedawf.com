import { Icons } from "./Icons";

export interface Project {
  name: string;
  description: string;
  href?: string;
  image?: string;
  technologies: readonly string[];
  links?: readonly {
    name: string;
    href: string;
    icon: React.ReactElement;
  }[];
}

export const projects: Project[] = [
  {
    name: "Tradingview Telegram Alerts",
    description:
      "Real-time trading alerts with chart snapshots sent to Telegram, designed to keep traders informed and responsive to market changes.",
    href: "",
    image: "/tv-tele-alerts.png",
    technologies: [
      "Python",
      "FastAPI",
      "Docker",
      "Fly.io",
      "Selenium",
      "Telegram Bot API",
    ],
    links: [
      {
        name: "Source",
        href: "https://github.com/tedawf/tradingview-telegram-alerts",
        icon: <Icons.github className="size-3" />,
      },
    ],
  },
  {
    name: "tedawf.com",
    description:
      "My personal portfolio/blog site with a chatbot trained to answer any questions regarding my website.",
    href: "https://tedawf.com",
    image: "/tedawf-com.png",
    technologies: [
      "Next.js",
      "TailwindCSS",
      "LangChain",
      "OpenAI",
      "ChatGPT",
      "Typescript",
      "Vercel",
    ],
    links: [
      {
        name: "Source",
        href: "https://github.com/tedawf/tedawf.com",
        icon: <Icons.github className="size-3" />,
      },
      {
        name: "Website",
        href: "https://tedawf.com/",
        icon: <Icons.globe className="size-3" />,
      },
    ],
  },
];
