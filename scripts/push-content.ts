#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { ExtractedContent } from "./content-types";

// Load environment variables following Next.js conventions
import { config } from "dotenv";

// Load environment variables from appropriate .env file
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
config({ path: envFile });

/**
 * Push extracted content to TACOS API
 */
async function pushContent(): Promise<void> {
  try {
    // Read the extracted content
    const contentPath = path.join(
      process.cwd(),
      "output/extracted-content.json",
    );
    if (!fs.existsSync(contentPath)) {
      console.error(
        "Error: extracted-content.json not found. Run extract-content.ts first.",
      );
      process.exit(1);
    }

    const extractedContent: ExtractedContent = JSON.parse(
      fs.readFileSync(contentPath, "utf-8"),
    );

    // Get API key from environment
    const apiKey = process.env.TACOS_API_KEY;
    if (!apiKey) {
      console.error("Error: TACOS_API_KEY environment variable not set");
      process.exit(1);
    }

    // Get backend URL from environment or use default
    const backendUrl = process.env.TACOS_API_URL || "http://localhost:8000";

    console.log(
      `Pushing ${extractedContent.content.length} content chunks to backend...`,
    );

    // Push content to backend
    const response = await fetch(`${backendUrl}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TACOS-Key": apiKey,
      },
      body: JSON.stringify(extractedContent),
    });

    if (!response.ok) {
      throw new Error(
        `TACOS responded with ${response.status}: ${response.statusText}`,
      );
    }

    const result = await response.json();
    console.log("Content successfully pushed to backend");
    console.log(
      `TACOS processed: ${result.processed || extractedContent.content.length} chunks`,
    );

    if (result.updated) {
      console.log(`Updated embeddings: ${result.updated} chunks`);
    }
    if (result.skipped) {
      console.log(`Skipped unchanged: ${result.skipped} chunks`);
    }
  } catch (error) {
    console.error("Failed to push content to backend:", error);
    process.exit(1);
  }
}

/**
 * Check if we should run content push
 */
function shouldRunPush(): boolean {
  // Only run in production environment
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    console.log("Preview/Development build detected, skipping content push");
    console.log("Set VERCEL_ENV=production to enable content push");
    return false;
  }

  return true;
}

/**
 * Main execution
 */
async function main() {
  try {
    // Check if we should run push
    if (!shouldRunPush()) {
      process.exit(0);
    }

    await pushContent();
  } catch (error) {
    console.error("Error during content push:", error);
    process.exit(1);
  }
}

// Run the script if called directly
main();
