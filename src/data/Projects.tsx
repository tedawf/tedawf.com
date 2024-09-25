import { Icons } from "./Icons";

export interface Project {
  name: string;
  description: string;
  href?: string;
  image?: string;
  tags: readonly string[];
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
    image: "/tv-tele-alerts.png",
    tags: [
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
    name: "NFTVue",
    description:
      "Non-Fungible Tokens (NFTs) Gallery Viewer website that allows users to connect their crypto wallets to view and verify their tokens",
    href: "https://nftvue.vercel.app",
    image: "/nftvue.png",
    tags: [
      "NextJS",
      "TailwindCSS",
      "MetaMask",
      "WalletConnect",
      "Web3",
      "NFTScan",
      "HashKey DID",
    ],
    links: [
      {
        name: "Website",
        href: "https://nftvue.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
    ],
  },
  {
    name: "Rapid Ride Fight (Final Year)",
    description:
      "3D capture-the-flag, multiplayer boat fighting, with smart AI and water graphics",
    href: "https://games.digipen.edu/games/rapid-ride-fight",
    image: "/rrf.png",
    tags: ["C/C++", "OpenGL", "Custom Game Engine", "3D"],
    links: [
      {
        name: "Gameplay",
        href: "https://www.youtube.com/watch?v=bge3fiypg5U",
        icon: <Icons.youtube className="size-3" />,
      },
      {
        name: "Trailer",
        href: "https://www.youtube.com/watch?v=PNAO-aI1Daw",
        icon: <Icons.youtube className="size-3" />,
      },
    ],
  },
  {
    name: "Glowing Under (2nd Year)",
    description:
      "2D platformer with a focus on puzzle-solving, no-death exploration and storytelling",
    href: "https://games.digipen.edu/games/glowing-under",
    image: "/gu.png",
    tags: ["C/C++", "OpenGL", "Custom Game Engine", "2D"],
    links: [
      {
        name: "Trailer",
        href: "https://www.youtube.com/watch?v=u6RYwBZlSfg",
        icon: <Icons.youtube className="size-3" />,
      },
    ],
  },
];
