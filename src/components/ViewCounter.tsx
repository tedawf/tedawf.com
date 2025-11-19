"use client";

import { formatViews } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
  initialCount: number;
}

export default function ViewCounter({ slug, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const incrementViews = async () => {
      try {
        const res = await fetch(`/api/views/${slug}`, {
          method: "POST",
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error("Failed to increment views", await res.text());
          return;
        }

        const data = await res.json();
        if (isMounted && typeof data.views === "number") {
          setCount(data.views);
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }
        console.error("Unexpected error incrementing views", error);
      }
    };

    incrementViews();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [slug]);

  return <span>{formatViews(count)} views</span>;
}
