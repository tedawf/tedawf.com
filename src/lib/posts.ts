import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Post = {
  metadata: PostMetadata;
  content: string;
};

export type PostMetadata = {
  title?: string;
  summary?: string;
  image?: string;
  publishedAt?: string;
  slug: string;
  content?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  readingTime?: string;
};

export async function getPostBySlug(
  rootDirectory: string,
  slug: string,
): Promise<Post | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFileSync(filePath, { encoding: "utf-8" });
    const { data, content } = matter(fileContents);

    const metadata: PostMetadata = {
      ...data,
      slug,
      content,
    };

    return { metadata, content };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getPosts(
  rootDirectory: string,
  limit?: number,
): Promise<PostMetadata[]> {
  try {
    const files = fs.readdirSync(rootDirectory);

    const posts = files
      .filter((file) => file.endsWith(".mdx")) // Filter out .DS_Store and other files
      .map((file) => getPostMetaData(rootDirectory, file))
      .filter((post): post is PostMetadata => post !== null) // Filter out failed reads
      .sort((a, b) => {
        const dateA =
          new Date(a.updatedAt ?? a.publishedAt ?? "").getTime() || 0;
        const dateB =
          new Date(b.updatedAt ?? b.publishedAt ?? "").getTime() || 0;
        return dateB - dateA; // Most recent first
      });

    if (limit) {
      return posts.slice(0, limit);
    }

    return posts;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export function getPostMetaData(
  rootDirectory: string,
  filePath: string,
): PostMetadata | null {
  try {
    const slug = filePath.replace(/\.mdx$/, "");
    const fullFilePath = path.join(rootDirectory, filePath);
    const fileContent = fs.readFileSync(fullFilePath, { encoding: "utf8" });
    const { data, content } = matter(fileContent);

    // Include raw content for reading time calculation
    return {
      ...data,
      slug,
      content, // Add raw content to metadata
    };
  } catch (error) {
    console.error(`Error reading post metadata for ${filePath}:`, error);
    return null;
  }
}
