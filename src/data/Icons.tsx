import { Github, Globe, Youtube } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  github: (props: IconProps) => <Github {...props} />,
  globe: (props: IconProps) => <Globe {...props} />,
  youtube: (props: IconProps) => <Youtube {...props} />,
};
