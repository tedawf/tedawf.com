export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
};

export type PostDetail = PostSummary & {
  content: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    const posts: PostSummary[] = await res.json();

    // Posts are already sorted by publishedAt desc from the API
    return limit ? posts.slice(0, limit) : posts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch post ${slug}`);
    const post: PostDetail = await res.json();

    return post;
  } catch (err) {
    console.error(`Error fetching post ${slug}:`, err);
    return null;
  }
}
