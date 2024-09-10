import { getPosts } from "@/lib/posts";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import LinkWithIcon from "./LinkWithIcon";
import Posts from "./Posts";
import path from "path";

const projectDirectory = path.join(process.cwd(), "content", "projects");

export default async function RecentProjects() {
  const posts = await getPosts(projectDirectory, 3);

  return (
    <section className="flex flex-col gap-8 pb-24">
      <h2 className="title">recent projects</h2>

      <Posts posts={posts} nav="projects" />

      <LinkWithIcon
        href="/projects"
        position="right"
        icon={<ArrowRightIcon className="size-5" />}
        text="view more"
      />
    </section>
  );
}
