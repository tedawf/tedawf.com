#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { ContentChunk, ExtractedContent } from "./content-types";

/**
 * Convert string to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

/**
 * Extract homepage content from structured JSON
 */
function extractHomepageContent(): ContentChunk[] {
  const filePath = path.join(process.cwd(), "src/data/home.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Group all homepage content into a single coherent chunk
  const homepageContent = `${data.introduction.greeting} ${data.introduction.description}. ${data.introduction.chatPrompt}. ${data.introduction.escalation.text} ${data.introduction.escalation.linkText} (${data.escalationLink.href}) ${data.introduction.escalation.suffix}`;

  return [
    {
      slug: "/",
      title: "Homepage - Hero welcome section",
      content: homepageContent,
      metadata: {
        enrichment:
          "Ted Lead is a joke reference to my cat's Instagram account for escalations",
      },
    },
  ];
}

/**
 * Extract privacy policy content from Markdown
 */
function extractPrivacyPageContent(): ContentChunk[] {
  const filePath = path.join(process.cwd(), "src/data/privacy.md");
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract content from markdown, removing markdown syntax
  const cleanContent = content
    .replace(/#{1,6}\s/g, "") // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
    .replace(/\n+/g, " ") // Replace newlines with spaces for better flow
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Create semantic sections instead of arbitrary paragraphs
  const sections = [
    {
      title: "Portfolio site privacy policy",
      content: cleanContent,
    },
  ];

  return sections.map((section) => ({
    slug: "/privacy",
    title: section.title,
    content: section.content,
  }));
}

/**
 * Extract blog page route information
 */
function extractBlogPageContent(): ContentChunk[] {
  return [
    {
      slug: "/blog",
      title: "Blog Information",
      content:
        "Blog posts are handled separately by the backend RAG system. Posts cover technical topics, project updates, and personal insights. Chatbot can direct visitors to specific blog post URLs. All blog content is available for embedding via TACOS backend system.",
    },
  ];
}

/**
 * Extract structured data from projects JSON
 */
function extractProjectsData(): ContentChunk[] {
  const filePath = path.join(process.cwd(), "src/data/projects.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const chunks: ContentChunk[] = [];

  data.projects.forEach((project: any) => {
    // Create a coherent project description with links included
    const projectText = `Project name: ${project.name}. ${project.description}. Technologies: ${project.tags.join(", ")}.`;

    const linksText =
      project.links && project.links.length > 0
        ? ` Links: ${project.links.map((link: any) => `${link.name}: ${link.href}`).join(" | ")}`
        : "";

    chunks.push({
      slug: `projects:${toKebabCase(project.name)}`,
      title: `Project: ${project.name}`,
      content: projectText + linksText,
    });
  });

  return chunks;
}

/**
 * Extract structured data from career JSON
 */
function extractCareerData(): ContentChunk[] {
  const filePath = path.join(process.cwd(), "src/data/career.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const chunks: ContentChunk[] = [];

  data.career.forEach((job: any) => {
    // Create coherent job description with links included
    const jobText = `Company: ${job.name} - ${job.title}. Period: ${job.start}${job.end ? ` to ${job.end}` : " (Current)"}. ${job.description.join(" ")}`;

    const linksText =
      job.links && job.links.length > 0
        ? ` Related Projects: ${job.links.map((link: any) => `${link.name}: ${link.href}`).join(" | ")}`
        : "";

    chunks.push({
      slug: `career:${toKebabCase(job.name)}-${toKebabCase(job.title)}`,
      title: `Career: ${job.name} - ${job.title}`,
      content: jobText + linksText,
    });
  });

  return chunks;
}

/**
 * Extract structured data from education JSON
 */
function extractEducationData(): ContentChunk[] {
  const filePath = path.join(process.cwd(), "src/data/education.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const chunks: ContentChunk[] = [];

  data.education.forEach((edu: any) => {
    // Create coherent education description with links included
    const eduText = `School: ${edu.name}. Degree: ${edu.title}. Period: ${edu.start} to ${edu.end}. ${edu.description ? edu.description.join(" ") : ""}`;

    const linksText =
      edu.links && edu.links.length > 0
        ? ` Projects: ${edu.links.map((link: any) => `${link.name}: ${link.href}`).join(" | ")}`
        : "";

    chunks.push({
      slug: `education:${toKebabCase(edu.name)}`,
      title: `Education: ${edu.name}`,
      content: eduText + linksText,
    });
  });

  return chunks;
}

/**
 * Extract structured data from socials JSON
 */
function extractSocialsData(): ContentChunk[] {
  const filePath = path.join(process.cwd(), "src/data/socials.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Create a single coherent chunk for all social links with descriptions
  const socialsContent = data.socials
    .map((social: any) => {
      let description = "";
      switch (social.name) {
        case "LinkedIn":
          description = " - Connect professionally and view my resume";
          break;
        case "GitHub":
          description = " - Explore my code repositories and projects";
          break;
        case "Email":
          description = " - Preferred communication, send me a direct email";
          break;
      }
      return `${social.name}: ${social.href}${description}`;
    })
    .join(" | ");

  return [
    {
      slug: "socials:links",
      title: "Social Media Links",
      content: socialsContent,
    },
  ];
}

/**
 * Extract site navigation structure and available routes dynamically
 */
function extractNavigationContent(): ContentChunk[] {
  const routesFilePath = path.join(process.cwd(), "src/data/routes.json");
  const routesData = JSON.parse(fs.readFileSync(routesFilePath, "utf-8"));

  // Create navigation content from all routes
  const navigationContent = routesData.routes
    .map(
      (route: any) => `'${route.path}' - ${route.name}: ${route.description}`,
    )
    .join(" | ");

  // Add external links
  const externalLinksContent = routesData.externalLinks
    .map((link: any) => `'${link.path}' - ${link.name}: ${link.description}`)
    .join(" | ");

  return [
    {
      slug: "navigation:routes",
      title: "Site Navigation",
      content: `Available Routes: ${navigationContent} | External Links: ${externalLinksContent}`,
    },
  ];
}

/**
 * Main function to extract all content
 */
function extractAllContent(): ExtractedContent {
  const contentChunks: ContentChunk[] = [
    ...extractHomepageContent(),
    ...extractPrivacyPageContent(),
    ...extractBlogPageContent(),
    ...extractProjectsData(),
    ...extractCareerData(),
    ...extractEducationData(),
    ...extractSocialsData(),
    ...extractNavigationContent(),
  ];

  return {
    timestamp: new Date().toISOString(),
    content: contentChunks,
  };
}

/**
 * Main execution
 */
function main() {
  try {
    console.log("Starting content extraction...");

    const extractedContent = extractAllContent();

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write extracted content to JSON file
    const outputPath = path.join(outputDir, "extracted-content.json");
    fs.writeFileSync(
      outputPath,
      JSON.stringify(extractedContent, null, 2),
      "utf-8",
    );

    console.log(`Content extraction completed successfully!`);
    console.log(`Output saved to: ${outputPath}`);
    console.log(
      `Total content chunks extracted: ${extractedContent.content.length}`,
    );
  } catch (error) {
    console.error("Error during content extraction:", error);
    process.exit(1);
  }
}

// Run the script if called directly
main();
