import BlogImage from "@/components/BlogImage";
import LinkWithIcon from "@/components/LinkWithIcon";
import MDXContent from "@/components/MDXContent";
import ViewCounter from "@/components/ViewCounter";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  Edit3Icon,
  EyeIcon,
  UsersIcon,
} from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 600;

export async function generateStaticParams() {
  const posts = await getPosts(10);
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const {
    title,
    image,
    publishedAt,
    updatedAt,
    tags,
    summary,
    readingTime,
    draft,
    coAuthors,
    views,
  } = post;

  const initialViewCount = typeof views === "number" ? views : 0;

  const shouldShowUpdated =
    updatedAt &&
    updatedAt !== publishedAt &&
    new Date(updatedAt).getTime() >
      new Date(publishedAt || updatedAt).getTime();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="mb-12">
        <LinkWithIcon
          href="/blog"
          position="left"
          icon={<ArrowLeftIcon className="size-4" />}
          text="Back to blog"
          className="text-muted-foreground transition-colors hover:text-foreground"
        />
      </nav>

      <article className="mx-auto max-w-4xl px-4">
        {/* Draft Banner */}
        {draft && (
          <div className="mb-12">
            <div className="overflow-hidden rounded-lg border border-orange-200 bg-orange-50 shadow-sm dark:border-orange-800 dark:bg-orange-950">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <p className="text-sm leading-relaxed text-orange-700 dark:text-orange-300">
                    This content is in progress and may contain incomplete or
                    unpolished sections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Image */}
        {image && <BlogImage src={image} alt={title || ""} />}

        {/* Header */}
        <header className="mb-16">
          <div className="space-y-6">
            <h1 className="bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {summary && (
              <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground/90">
                {summary}
              </p>
            )}

            {/* Metadata section */}
            <div className="flex flex-col gap-4 pt-2">
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

                {/* Views */}
                <div className="flex items-center gap-1.5">
                  <EyeIcon className="h-4 w-4" />
                  <ViewCounter slug={slug} initialCount={initialViewCount} />
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

              {/* Co-authors */}
              {coAuthors && coAuthors.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <UsersIcon className="h-4 w-4" />
                  <span>
                    Co-authored with{" "}
                    <span className="font-semibold text-foreground">
                      {coAuthors.join(", ")}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="prose prose-lg max-w-none dark:prose-invert">
          <MDXContent source={post.content} />
        </main>

        {/* Footer */}
        <footer className="mt-24">
          <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                {/* Date info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {/* Draft status indicator */}
                  {draft && (
                    <p className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <Edit3Icon className="h-3.5 w-3.5" />
                      <span className="font-semibold">Draft</span>
                    </p>
                  )}

                  {/* Publication dates */}
                  <div className="flex flex-col gap-1">
                    {shouldShowUpdated && updatedAt ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          <span className="font-medium">
                            Published {formatDate(publishedAt ?? "")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Edit3Icon className="h-3.5 w-3.5" />
                          <span className="font-medium">
                            Updated {formatDate(updatedAt)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <span className="font-medium">
                          Published {formatDate(publishedAt ?? "")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Back to blog link */}
                <LinkWithIcon
                  href="/blog"
                  position="right"
                  icon={<ArrowLeftIcon className="size-4 rotate-180" />}
                  text="More posts"
                  className="text-muted-foreground transition-colors hover:text-primary"
                />
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
