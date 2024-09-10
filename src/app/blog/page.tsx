import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/posts";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export default async function BlogPage() {
  const posts = await getPosts(blogDirectory);

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <h1 className="title mb-12">my notes.</h1>

        <PostsWithSearch posts={posts} nav="blog" />
      </div>
    </section>
  );
}
