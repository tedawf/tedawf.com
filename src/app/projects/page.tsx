import Posts from "@/components/Posts";
import { getPosts } from "@/lib/posts";
import path from "path";

const projectDirectory = path.join(process.cwd(), "content", "projects");

export default async function ProjectPage() {
  const posts = await getPosts(projectDirectory);

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <h1 className="title mb-12">my projects.</h1>

        <Posts posts={posts} nav="projects" />
      </div>
    </section>
  );
}
