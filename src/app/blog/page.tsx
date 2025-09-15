import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my blog.</h1>

      <PostsWithSearch posts={posts} />
    </article>
  );
}
