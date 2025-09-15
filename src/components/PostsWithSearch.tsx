"use client";

import { PostSummary } from "@/lib/posts";
import { ArrowUpDown, Delete } from "lucide-react";
import { useState } from "react";
import Posts from "./Posts";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

interface Props {
  posts: PostSummary[];
}

type SortOption = "newest" | "oldest" | "title";

export default function PostsWithSearch({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [showDrafts, setShowDrafts] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filtered = posts
    .filter((post) => {
      // Filter out drafts if toggle is off
      if (!showDrafts && post.draft) {
        return false;
      }

      // Search filter
      const haystack = [post.title, post.summary, ...(post.tags || [])]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (b.publishedAt || "0000-01-01").localeCompare(
            a.publishedAt || "0000-01-01",
          );
        case "oldest":
          return (a.publishedAt || "0000-01-01").localeCompare(
            b.publishedAt || "0000-01-01",
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const resetFilter = () => setQuery("");

  const draftCount = posts.filter((post) => post.draft).length;

  return (
    <div className="flex flex-col gap-12">
      <div className="space-y-4">
        {/* Search row */}
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
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

        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Draft toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="show-drafts"
              checked={showDrafts}
              onCheckedChange={setShowDrafts}
              disabled={draftCount === 0}
            />
            <Label
              htmlFor="show-drafts"
              className={`whitespace-nowrap text-sm ${
                draftCount === 0 ? "text-muted-foreground" : "cursor-pointer"
              }`}
            >
              Show drafts ({draftCount})
            </Label>
          </div>

          {/* Sort control */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm text-muted-foreground">Sort:</Label>
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Posts posts={filtered} />
    </div>
  );
}
