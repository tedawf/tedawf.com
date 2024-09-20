import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from "@/components/Posts";
import Projects from "@/components/Projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/Projects";
import { socials } from "@/data/Socials";
import { getPosts } from "@/lib/posts";
import { ArrowRightIcon, FileDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");

export default async function Home() {
  const posts = await getPosts(blogDirectory, 3); // max 3

  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg"
          src="/ted.jpg"
          alt="Photo of Ted"
          width={175}
          height={175}
          priority
        />
        <div className="flex flex-col">
          <h1 className="title text-5xl">hi ted here 👋</h1>
          <p className="mt-4 font-light">
            {/* Calculate my age */}
            <span>{new Date().getFullYear() - 1997}</span>-year-old software
            developer from Singapore 🇸🇬
          </p>
          <div className="mt-2 font-light">
            I have an interest in full-stack development and these are my
            recently used tech stack: <Badge variant="secondary">NextJS</Badge>
            {", "}
            <Badge variant="secondary">Golang</Badge>
            {", "}
            <Badge variant="secondary">Python</Badge>
            {". "}
          </div>
          <section className="mt-8 flex items-center gap-8">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <div className="flex gap-4">
              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-5" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects projects={projects} />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-3xl">recent posts</h2>
          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Posts posts={posts} nav="blog" />
      </section>
    </article>
  );
}
