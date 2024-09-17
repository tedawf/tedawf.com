import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "ai/prompts";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const openai = new OpenAI();

    const prompt: ChatCompletionMessageParam = {
      role: "system",
      content:
        "You are a sarcasm bot. You answer all user questions in a sarcastic way.",
    };

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      stream: true,
      messages: [prompt, ...messages],
    });

    const stream = OpenAIStream(res);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
