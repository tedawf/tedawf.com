import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/skeleton";

type PostsSkeletonProps = {
  rows?: number;
  showControls?: boolean;
};

export default function PostsSkeleton({
  rows = 3,
  showControls = false,
}: PostsSkeletonProps) {
  return (
    <div className={showControls ? "flex flex-col gap-12" : undefined}>
      {showControls && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-8 w-20" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-9 rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-9 w-[140px]" />
            </div>
          </div>
        </div>
      )}

      <Card className="overflow-hidden">
        <ul className="divide-y divide-border">
          {Array.from({ length: rows }).map((_, index) => (
            <li key={index} className="group">
              <article className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex-1 text-lg leading-tight">
                        <Skeleton className="h-[2.5em] w-full" />
                      </div>
                    </div>

                    <div className="mb-3 text-sm leading-relaxed">
                      <Skeleton className="h-[3.25em] w-full" />
                    </div>

                    <div className="flex min-h-6 flex-wrap gap-1.5">
                      <Skeleton className="h-6 w-14" />
                      <Skeleton className="h-6 w-14" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 flex-col items-start gap-2 text-sm text-muted-foreground sm:items-end">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
