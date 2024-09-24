import { Github, Linkedin, Mail } from "lucide-react";
import { IconProps } from "./Icons";

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
