import LinkWithIcon from "@/components/LinkWithIcon";
import MDXContent from "@/components/MDXContent";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  Edit3Icon,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");

export async function generateStaticParams() {
  const posts = await getPosts(blogDirectory);
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getPostBySlug(blogDirectory, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const { metadata } = post;

  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      images: metadata.image ? [{ url: metadata.image }] : [],
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(blogDirectory, slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, publishedAt, updatedAt, tags, summary } = metadata;

  const readingTime = calculateReadingTime(content);
  const shouldShowUpdated =
    updatedAt &&
    updatedAt !== publishedAt &&
    new Date(updatedAt).getTime() >
      new Date(publishedAt || updatedAt).getTime();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="mb-8">
        <LinkWithIcon
          href="/blog"
          position="left"
          icon={<ArrowLeftIcon className="size-4" />}
          text="Back to blog"
          className="text-muted-foreground transition-colors hover:text-foreground"
        />
      </nav>

      <article className="mx-auto max-w-4xl">
        {/* Featured Image */}
        {image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80 lg:h-96">
            <Image
              src={image}
              alt={title || ""}
              className="object-cover transition-transform duration-300 hover:scale-105"
              fill
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {summary && (
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {summary}
              </p>
            )}

            {/* Meta section */}
            <div className="flex flex-col gap-3">
              {/* Reading time, Published, Updated */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {/* Reading time */}
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" />
                  <span>{readingTime}</span>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden h-4 sm:block"
                />

                {/* Published date */}
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Published {formatDate(publishedAt ?? "")}</span>
                </div>

                {/* Updated date */}
                {shouldShowUpdated && updatedAt && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="hidden h-4 sm:block"
                    />
                    <div className="flex items-center gap-1.5">
                      <Edit3Icon className="h-4 w-4" />
                      <span>Updated {formatDate(updatedAt)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Tags row */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="prose prose-lg prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-code:text-sm prose-pre:border prose-pre:bg-muted prose-img:rounded-lg prose-img:shadow-md">
          <MDXContent source={content} />
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Date info */}
            <div className="text-sm text-muted-foreground">
              {shouldShowUpdated && updatedAt ? (
                <p>
                  Published {formatDate(publishedAt ?? "")} • Updated{" "}
                  {formatDate(updatedAt)}
                </p>
              ) : (
                <p>Published {formatDate(publishedAt ?? "")}</p>
              )}
            </div>

            {/* Back to blog link */}
            <LinkWithIcon
              href="/blog"
              position="right"
              icon={<ArrowLeftIcon className="size-4 rotate-180" />}
              text="More posts"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            />
          </div>
        </footer>
      </article>
    </div>
  );
}
