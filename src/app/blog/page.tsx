import Posts from "@/components/Posts";
import { getPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <h1 className="title mb-12 underline underline-offset-8">Blog</h1>

        <Posts posts={posts} />
      </div>
    </section>
  );
}
