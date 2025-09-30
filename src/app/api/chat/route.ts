import { createStreamDataTransformer, type Message } from "ai";

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

    // note to self:
    // when self-hosting behind nginx, make sure to disable buffering -> proxy_buffering off;
    // otherwise nginx will swallow streaming chunks and only flush at the end.

    // 1. Get the raw byte stream
    const rawStream = response.body;

    // 2. Pipe the raw stream through the Vercel AI SDK's data transformer.
    // This handles converting the raw text chunks into the SDK's data format.
    const stream = rawStream.pipeThrough(createStreamDataTransformer());

    // 3. Return a standard 'Response' object with the transformed stream.
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
