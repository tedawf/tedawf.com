import { getPosts } from "@/lib/blog";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import LinkWithIcon from "./LinkWithIcon";
import Posts from "./Posts";

export default async function RecentPosts() {
  const posts = await getPosts(3);

  return (
    <section className="flex flex-col gap-8 pb-24">
      <h2 className="title">recent notes</h2>

      <Posts posts={posts} />

      <LinkWithIcon
        href="/blog"
        align="right"
        icon={<ArrowRightIcon className="size-5" />}
        text="view more"
      />
    </section>
  );
}
