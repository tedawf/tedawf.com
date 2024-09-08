import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
      <nav className="container flex max-w-3xl items-center justify-between">
        {/* Logo / home button */}
        <div>
          <Link href="/" className="font-serif text-2xl font-bold">
            TED
          </Link>
        </div>
        {/* Nav links */}
        <ul className="flex gap-6">
          <li className="link">
            <Link href="/projects">projects</Link>
          </li>
          <li className="link">
            <Link href="/blog">blog</Link>
          </li>
          <li className="link">
            <Link href="/contact">contact</Link>
          </li>
        </ul>
        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
