"use client";

import { PostMetadata } from "@/lib/posts";
import { Delete } from "lucide-react";
import { useState } from "react";
import Posts from "./Posts";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface Props {
  posts: PostMetadata[];
}

export default function PostsWithSearch({ posts }: Props) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase()),
  );

  const resetFilter = () => setQuery("");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          size="sm"
          variant="secondary"
          onClick={resetFilter}
          disabled={query.length === 0}
        >
          Clear
          <Delete className="ml-2 size-4" />
        </Button>
      </div>

      <Posts posts={filtered} />
    </div>
  );
}
