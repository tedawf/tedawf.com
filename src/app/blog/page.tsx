import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <h1 className="title mb-12">notes. thoughts. opinions.</h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  );
}
