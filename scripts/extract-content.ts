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
        contentType: "page",
        enrichment: [
          "This is my portfolio homepage with introduction and welcome message",
          "I'm a backend developer with full-stack experience",
          "You can chat with Ted Support for questions and answers",
          "For escalations, contact Ted Lead on Instagram (this is a joke reference to my cat)",
          "This site showcases my projects, career, and education",
        ],
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
    metadata: {
      contentType: "page",
      enrichment: [
        "This page contains the privacy policy for my portfolio website",
        "I explain how user data is handled and protected on this site",
        "The privacy policy covers data protection and user rights",
        "This document outlines the terms and conditions for using my website",
        "I describe my approach to data privacy and security",
      ],
    },
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
      metadata: {
        contentType: "page",
        enrichment: [
          "This is my blog page with technical articles and project updates",
          "I write blog posts about technical topics and personal insights",
          "My blog content is integrated with the TACOS backend system",
          "You can find my technical writing and tutorials here",
          "The blog showcases my project updates and development experiences",
        ],
      },
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
      metadata: {
        contentType: "project",
        enrichment: [
          `I built ${project.name} using ${project.tags.join(", ")}`,
          `This project uses technologies like ${project.tags.join(", ")}`,
          `${project.name} is a ${project.name.includes("(Final Year)") || project.name.includes("(2nd Year)") ? "school" : "personal"} project`,
          `I developed ${project.name} as a ${project.tags.length > 5 ? "complex" : "moderate"} project`,
          `The ${project.name} project focuses on ${project.tags.includes("Web3") || project.tags.includes("NFT") ? "blockchain technology" : project.tags.includes("Game") ? "game development" : "web development"}`,
          `My technical skills include ${project.tags.join(", ")} from building ${project.name}`,
          `I created ${project.name} which demonstrates my ${project.tags.join(", ")} expertise`,
        ],
      },
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
      metadata: {
        contentType: "career",
        enrichment: [
          `I worked at ${job.name} as a ${job.title}`,
          `My role at ${job.name} was ${job.title}`,
          `I was employed at ${job.name} from ${job.start}${job.end ? ` to ${job.end}` : " to present"}`,
          `During my time at ${job.name}, I worked as a ${job.title}`,
          `My employment history includes working at ${job.name}`,
          `I gained experience at ${job.name} in the ${job.name.includes("Bank") ? "finance" : job.name.includes("Institute") ? "education" : "technology"} industry`,
          `This was a ${job.title.includes("Intern") ? "internship position" : job.title.includes("Graduate") ? "entry-level graduate role" : "professional position"}`,
        ],
      },
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
      metadata: {
        contentType: "education",
        enrichment: [
          `I studied at ${edu.name} and earned a ${edu.title}`,
          `My education includes ${edu.title} from ${edu.name}`,
          `I attended ${edu.name} from ${edu.start} to ${edu.end}`,
          `I completed my ${edu.title.includes("BS") ? "bachelor's degree" : "diploma"} at ${edu.name}`,
          `My field of study was ${edu.title.includes("Computer Science") ? "computer science" : "game development"}`,
          `I graduated from ${edu.name} with a degree in ${edu.title}`,
          `My academic background includes ${edu.title} from ${edu.name}`,
        ],
      },
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
      metadata: {
        contentType: "social",
        enrichment: [
          "You can connect with me professionally on LinkedIn",
          "My GitHub contains all my code repositories and projects",
          "You can email me directly for communication",
          "These are my social media profiles and contact links",
          "I'm available on LinkedIn for professional networking",
          "My GitHub showcases my programming projects and skills",
          "Email is my preferred method for direct communication",
        ],
      },
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
      metadata: {
        contentType: "navigation",
        enrichment: [
          "This website has navigation to different sections like projects, blog, and contact",
          "You can navigate to my projects page to see my work",
          "The blog section contains my technical articles and updates",
          "There's a contact page for getting in touch with me",
          "The site structure includes homepage, projects, blog, and contact sections",
          "You can find my resume and privacy policy through the navigation",
        ],
      },
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

    // Output extracted content summary for build logs
    console.log("\n--- Extracted Content Summary ---");
    extractedContent.content.forEach((chunk, index) => {
      console.log(`[${index + 1}] ${chunk.slug}: ${chunk.title}`);
      console.log(
        `     Content preview: ${chunk.content.substring(0, 100)}...`,
      );
    });
    console.log("--- End of Content Summary ---\n");
  } catch (error) {
    console.error("Error during content extraction:", error);
    process.exit(1);
  }
}

// Run the script if called directly
main();
