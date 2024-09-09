import MDXContent from "@/components/MDXContent";
import { getPostBySlug, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getPosts();
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, publishedAt } = metadata;

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <Link
          href="/blog"
          className="link mb-8 inline-flex items-center gap-2 font-light"
        >
          <ArrowLeftIcon className="size-5" />
          <span>back to blog</span>
        </Link>

        {image && (
          <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title || ""}
              className="object-cover"
              fill
            />
          </div>
        )}

        <header>
          <h1 className="title underline underline-offset-8">{title}</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDate(publishedAt ?? "")}
          </p>
        </header>

        <main className="prose mt-12 dark:prose-invert">
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  );
}
