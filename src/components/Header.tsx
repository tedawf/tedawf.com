import { navLinks } from "@/data/NavLinks";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
      <nav className="flex items-center justify-between">
        <ul className="flex gap-6">
          {navLinks.map((nav, id) => (
            <li key={id} className="link">
              <Link href={nav.href}>{nav.name}</Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
