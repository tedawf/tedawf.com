/**
 * Shared TypeScript interfaces for content extraction and pushing
 */

export interface ContentChunk {
  slug: string;
  title: string;
  content: string;
  metadata?: {
    enrichment?: string;
  };
}

export interface ExtractedContent {
  timestamp: string;
  content: ContentChunk[];
}
