import { PostMetadata } from "@/lib/posts";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { Calendar, Clock, Edit3 } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";

const MAX_TAGS_DISPLAYED = 3;

interface Props {
  posts: PostMetadata[];
}

export default function Posts({ posts }: Props) {

  return (
    posts.length > 0 && (
      <Card className="overflow-hidden">
        <ul className="divide-y divide-border">
          {posts.map((post) => {
            const readingTime = calculateReadingTime(post.content || "");

            return (
              <li key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <article className="p-6 transition-colors hover:bg-muted/30">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      {/* Content Section */}
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>

                        {post.summary && (
                          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {post.summary}
                          </p>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags
                              .slice(0, MAX_TAGS_DISPLAYED)
                              .map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="px-2 py-1 text-xs font-medium"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            {post.tags.length > MAX_TAGS_DISPLAYED && (
                              <Badge
                                variant="outline"
                                className="px-2 py-1 text-xs"
                              >
                                +{post.tags.length - MAX_TAGS_DISPLAYED}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Metadata Section */}
                      <div className="flex flex-shrink-0 flex-col items-start gap-2 text-sm text-muted-foreground sm:items-end">
                        {/* Date Information */}
                        {post.publishedAt && (
                          <div className="flex items-center gap-1.5">
                            {post.updatedAt ? (
                              <>
                                <Edit3 className="h-3.5 w-3.5" />
                                <span className="font-medium">Updated</span>
                                <span>{formatDate(post.updatedAt)}</span>
                              </>
                            ) : (
                              <>
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formatDate(post.publishedAt)}</span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Reading Time */}
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    )
  );
}
