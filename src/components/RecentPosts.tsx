import { getPosts } from "@/lib/posts";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import path from "path";
import LinkWithIcon from "./LinkWithIcon";
import Posts from "./Posts";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export default async function RecentPosts() {
  const posts = await getPosts(blogDirectory, 3);

  return (
    <section className="flex flex-col gap-8">
      <h2 className="title">recent notes</h2>

      <Posts posts={posts} nav="blog" />

      <LinkWithIcon
        href="/blog"
        position="right"
        icon={<ArrowRightIcon className="size-5" />}
        text="view more"
      />
    </section>
  );
}
