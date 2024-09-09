import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <h1 className="title mb-12 underline underline-offset-8">
          notes. thoughts. opinions.
        </h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  );
}
