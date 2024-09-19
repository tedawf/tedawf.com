import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from "@/components/Posts";
import Projects from "@/components/Projects";
import { projects } from "@/data/Projects";
import { getPosts } from "@/lib/posts";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");

export default async function Home() {
  const posts = await getPosts(blogDirectory, 3);

  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center">
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
            At work, I&#39;m dedicated to building large-scale enterprise
            applications that drive real impact. I&#39;m just as passionate
            about experimenting with cutting-edge frameworks and tech stacks at
            home—with a little coding support from my cat.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
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

      <section className="flex flex-col gap-8">
        <div className="flex gap-8">
          <h2 className="title text-3xl">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects projects={projects} />
      </section>
    </article>
  );
}
