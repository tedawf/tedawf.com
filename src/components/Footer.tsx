import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Link from "next/link";

const socials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tedawf",
    icon: (props: IconProps) => <LinkedInLogoIcon {...props} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/tedawf",
    icon: (props: IconProps) => <GitHubLogoIcon {...props} />,
  },
];

export default function Footer() {
  return (
    <footer className="py-6">
      <div className="container max-w-3xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center gap-6 md:order-2">
            {socials.map((item) => (
              <a
                href={item.href}
                key={item.name}
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-5" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs text-muted-foreground">
              <span>&copy; {new Date().getFullYear()}</span>{" "}
              <Link href="/">tedawf.com</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
