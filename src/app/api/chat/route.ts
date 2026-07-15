import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const systemPrompt = `You are an AI assistant for Mukhammadali Kodirov.
You help people learn about him and answer questions.

About Mukhammadali:
- Full-Stack Developer at QuinQue (The Edge) in Kobe, Japan
- Skills: React/Next.js, Node.js, Python, AI Agents, Google Apps Script, Automation, AWS, Chatbot Dev
- Upwork: Top Rated 100% JSS, $7K+ earned
- Goal: $100K+/year remote job
- Learning English with Kevin (USA teacher)
- Philosophy: "Knowledge from work" — do something once = experience, do many times = professional
- Daily habits: English (20 words), Math (5 problems), replaces YouTube with learning content
- HackerOne: server23 (bug bounty)

Be helpful, friendly, and use simple English. Keep answers short and clear.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // If no API key set, return a mock response for demo
    if (!process.env.OPENAI_API_KEY && !process.env.DEEPSEEK_API_KEY) {
      const lastMsg = messages[messages.length - 1]?.content || "";
      return Response.json({
        response: `Thanks for asking about "${lastMsg.slice(0, 50)}..."! I am ready to help once an AI API key is configured. Contact Mukhammadali to enable full AI chat.`,
      });
    }

    let model: any;

    if (process.env.DEEPSEEK_API_KEY) {
      const { deepseek } = await import("@ai-sdk/deepseek");
      model = deepseek("deepseek-chat");
    } else {
      model = openai("gpt-4o-mini");
    }

    const result = await generateText({
      model,
      system: systemPrompt,
      messages,
      maxTokens: 500,
    });

    return Response.json({ response: result.text });
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { response: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
