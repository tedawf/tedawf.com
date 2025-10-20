/**
 * Shared TypeScript interfaces for content extraction and pushing
 */

export interface ContentChunk {
  slug: string;
  title: string;
  content: string;
  metadata?: {
    contentType?:
      | "project"
      | "career"
      | "education"
      | "page"
      | "social"
      | "navigation";
    enrichment?: string[];
  };
}

export interface ExtractedContent {
  timestamp: string;
  content: ContentChunk[];
}
