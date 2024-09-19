import { socials } from "@/data/Socials";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-6 sm:flex-row-reverse sm:justify-between">
      <section className="flex justify-center gap-6">
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
      </section>
      <section className="mt-8 sm:mt-0">
        <p className="text-center text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()}</span>{" "}
          <Link href="/">tedawf.com</Link>
        </p>
      </section>
    </footer>
  );
}
