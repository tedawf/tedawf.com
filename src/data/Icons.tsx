import { Github, Globe } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  github: (props: IconProps) => <Github {...props} />,
  globe: (props: IconProps) => <Globe {...props} />,
};
