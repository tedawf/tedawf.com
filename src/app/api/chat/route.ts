import { createStreamDataTransformer, type Message } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const {
      messages,
      chat_id: chatIdFromBody,
    }: { messages: Message[]; chat_id?: string } = await req.json();

    const chatIdFromHeader = req.headers.get("x-chat-id") || undefined;
    const chatId = chatIdFromHeader || chatIdFromBody;

    const fastApiUrl = process.env.TACOS_API_URL || "http://localhost:8000";
    const apiKey = process.env.TACOS_API_KEY || "";

    if (!fastApiUrl || !apiKey) {
      throw new Error("Backend URL or API Key is not configured.");
    }

    const backendHeaders: HeadersInit = {
      "Content-Type": "application/json",
      "X-TACOS-Key": apiKey,
    };

    if (chatId) {
      backendHeaders["X-Chat-Id"] = chatId;
    }

    const backendBody = JSON.stringify({
      messages,
      ...(chatId ? { chat_id: chatId } : {}),
    });

    const response = await fetch(`${fastApiUrl}/prompt`, {
      method: "POST",
      headers: backendHeaders,
      body: backendBody,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return new Response(errorBody, {
        status: response.status,
        headers: {
          "Content-Type":
            response.headers.get("content-type") || "text/plain; charset=utf-8",
        },
      });
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

    const responseChatId = response.headers.get("X-Chat-Id");

    // 3. Return a standard 'Response' object with the transformed stream.
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        ...(responseChatId ? { "X-Chat-Id": responseChatId } : {}),
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
