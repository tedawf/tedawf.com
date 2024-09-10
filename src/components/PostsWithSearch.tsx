"use client";

import { PostMetadata } from "@/lib/posts";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import Posts from "./Posts";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function PostsWithSearch({
  posts,
  nav,
}: {
  posts: PostMetadata[];
  nav: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase()),
  );

  const isFiltered = query.length > 0;
  const resetFilter = () => setQuery("");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-3">
        <Input
          type="text"
          className="h-9 w-full sm:w-3/4"
          placeholder="Search something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isFiltered && (
          <Button
            size="sm"
            variant="secondary"
            onClick={resetFilter}
            className="h-8 px-2 lg:px-3"
          >
            Clear
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>

      <Posts posts={filtered} nav={nav} />
    </div>
  );
}
