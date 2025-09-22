import { type Message } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const fastApiUrl = process.env.TACOS_API_URL || "http://localhost:8000";
    const apiKey = process.env.TACOS_API_KEY || "";

    if (!fastApiUrl || !apiKey) {
      throw new Error("Backend URL or API Key is not configured.");
    }

    const response = await fetch(`${fastApiUrl}/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TACOS-Key": apiKey,
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorBody}`);
    }

    if (!response.body) {
      throw new Error("The response from the backend is empty.");
    }

    // 1. Get the raw byte stream
    const rawStream = response.body;

    // 2. Create a TransformStream to convert the raw stream into the Vercel AI SDK format.
    const vercelAiStream = new TransformStream({
      async transform(chunk, controller) {
        // The chunk is a Uint8Array of raw text from your backend.
        // We decode it to a string.
        const text = new TextDecoder().decode(chunk);

        // This is the crucial step:
        // We manually wrap the text in the AI SDK's required format.
        // The '0:' prefix is the "separator" the error message is looking for.
        // The JSON.stringify ensures characters like quotes are escaped correctly.
        const formattedChunk = `0:${JSON.stringify(text)}\n`;

        // We re-encode the formatted string back to bytes and send it downstream.
        controller.enqueue(new TextEncoder().encode(formattedChunk));
      },
    });

    // 3. Pipe the raw stream through our new transform stream.
    // The output of this pipe is a new ReadableStream in the correct format.
    const stream = rawStream.pipeThrough(vercelAiStream);

    // 4. Return a standard 'Response' object with the correctly formatted stream.
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("[API Chat Route Error]", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(
      JSON.stringify({ error: "Internal Server Error", detail: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
