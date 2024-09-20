import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IconProps } from "./Icons";
import { Github, Linkedin, Mail } from "lucide-react";

export const socials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tedawf",
    icon: (props: IconProps) => <Linkedin {...props} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/tedawf",
    icon: (props: IconProps) => <Github {...props} />,
  },
  {
    name: "Email",
    href: "mailto:hello@tedawf.com",
    icon: (props: IconProps) => <Mail {...props} />,
  },
];
