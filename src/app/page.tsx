import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from "@/components/Posts";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { education, work } from "@/data/Experience";
import { projects } from "@/data/Projects";
import { socials } from "@/data/Socials";
import { getPosts } from "@/lib/posts";
import { TabsContent } from "@radix-ui/react-tabs";
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
          <p className="mt-2 font-light">
            <span>
              I have an interest in full-stack development, instant coffee, and
              occasionally ask my cat{" "}
            </span>
            <Link
              href="https://www.instagram.com/gomugomu.cat"
              className="link font-semibold"
            >
              Luffy
            </Link>
            <span> for coding advice. </span>
          </p>
          <p className="mt-2 font-light">Ask the chatbot anything about me!</p>
          <section className="mt-8 flex items-center gap-8">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <div className="flex gap-6">
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

      <section>
        <Tabs defaultValue="work">
          <TabsList className="mb-2 grid w-full grid-cols-2">
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="work">
            <Timeline experience={work}></Timeline>
          </TabsContent>
          <TabsContent value="education">
            <Timeline experience={education}></Timeline>
          </TabsContent>
        </Tabs>
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
