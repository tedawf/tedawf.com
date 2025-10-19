#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";

interface ContentChunk {
  slug: string;
  title: string;
  content: string;
  metadata?: {
    enrichment?: string;
  };
}

interface ExtractedContent {
  timestamp: string;
  content: ContentChunk[];
}

/**
 * Helper function to create enrichment context easily
 */
function createEnrichment(context: string): { enrichment: string } {
  return { enrichment: context };
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
      title: "Homepage - Complete Introduction",
      content: homepageContent,
      metadata: createEnrichment(
        "Ted Lead is a joke reference to my cat's Instagram account for escalations",
      ),
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
      title: "Privacy Policy Overview",
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
        "Blog posts are handled separately by the backend RAG system. Posts cover technical topics, project updates, and personal insights. Chatbot can direct visitors to specific blog post URLs. All blog content is available for embedding via separate system.",
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
    const projectText = `PROJECT: ${project.name}. ${project.description}. Technologies: ${project.tags.join(", ")}.`;

    const linksText =
      project.links && project.links.length > 0
        ? ` Links: ${project.links.map((link: any) => `${link.name}: ${link.href}`).join(" | ")}`
        : "";

    chunks.push({
      slug: "/data/projects",
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
    const jobText = `COMPANY: ${job.name} - ${job.title}. Period: ${job.start}${job.end ? ` to ${job.end}` : " (Current)"}. ${job.description.join(" ")}`;

    const linksText =
      job.links && job.links.length > 0
        ? ` Related Projects: ${job.links.map((link: any) => `${link.name}: ${link.href}`).join(" | ")}`
        : "";

    chunks.push({
      slug: "/data/career",
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
    const eduText = `EDUCATION: ${edu.name}. Degree: ${edu.title}. Period: ${edu.start} to ${edu.end}. ${edu.description ? edu.description.join(" ") : ""}`;

    const linksText =
      edu.links && edu.links.length > 0
        ? ` Projects: ${edu.links.map((link: any) => `${link.name}: ${link.href}`).join(" | ")}`
        : "";

    chunks.push({
      slug: "/data/education",
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
          description = " - Professional network and career updates";
          break;
        case "GitHub":
          description = " - Open source projects and code repositories";
          break;
        case "Email":
          description = " - Direct professional communication";
          break;
      }
      return `${social.name}: ${social.href}${description}`;
    })
    .join(" | ");

  return [
    {
      slug: "/data/socials",
      title: "Social Media Links",
      content: socialsContent,
    },
  ];
}

/**
 * Extract site navigation structure and available routes
 */
function extractNavigationContent(): ContentChunk[] {
  const routes = [
    {
      path: "/",
      title: "Home",
      description: "Personal introduction and portfolio overview",
    },
    {
      path: "/projects",
      title: "Projects",
      description: "Portfolio projects showcase",
    },
    {
      path: "/blog",
      title: "Blog",
      description: "Technical articles and project updates",
    },
    {
      path: "/contact",
      title: "Contact",
      description: "Contact form and communication",
    },
    {
      path: "/privacy",
      title: "Privacy",
      description: "Privacy policy and data handling",
    },
  ];

  // Create a single coherent navigation chunk
  const navigationContent = routes
    .map((route) => `${route.path} - ${route.title}: ${route.description}`)
    .join(" | ");

  return [
    {
      slug: "/navigation",
      title: "Site Navigation",
      content: `Available Routes: ${navigationContent} | External: Resume: /resume.pdf - Professional resume document | Instagram: https://www.instagram.com/gomugomu.cat - Ted Lead for escalations (joke reference to cat's account)`,
      metadata: createEnrichment(
        "Ted Lead is a joke reference to my cat's Instagram account for escalations",
      ),
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
    console.log("Starting simplified content extraction...");

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

    console.log(`Simplified content extraction completed successfully!`);
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
