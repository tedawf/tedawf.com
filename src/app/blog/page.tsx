import PostsSkeleton from "@/components/PostsSkeleton";
import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/posts";
import { Suspense } from "react";

export const revalidate = 600;

async function BlogPosts() {
  const posts = await getPosts();
  return <PostsWithSearch posts={posts} />;
}

export default function BlogPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my blog.</h1>

      <Suspense fallback={<PostsSkeleton rows={6} showControls />}>
        <BlogPosts />
      </Suspense>
    </article>
  );
}
