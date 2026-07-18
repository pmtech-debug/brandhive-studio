import { NextResponse } from "next/server";
import { Resend } from "resend";

type ChatPayload = {
  message: string;
  history?: Array<{ role: "assistant" | "user"; content: string }>;
  lead?: {
    name: string;
    email: string;
    company?: string;
  };
};

type ChatResponse = {
  reply: string;
  needsLeadCapture: boolean;
  suggestedAction?: string;
};

const companyProfile = {
  name: "BrandHive Studio",
  tagline: "Premium branding and digital experiences",
  services: [
    "Brand strategy",
    "Visual identity",
    "Website design and development",
    "Digital marketing",
    "UI/UX design",
    "Packaging and motion graphics",
  ],
  process: ["Discovery", "Strategy", "Design", "Development", "Launch"],
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function getFallbackReply(message: string): ChatResponse {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("project planner") ||
    normalized.includes("planner") ||
    normalized.includes("start a project") ||
    normalized.includes("book a call") ||
    normalized.includes("discovery") ||
    normalized.includes("quote") ||
    normalized.includes("budget") ||
    normalized.includes("price") ||
    normalized.includes("estimate")
  ) {
    return {
      reply:
        "That sounds like the right next step. I can connect you with the team for a discovery call and help map out the scope, timeline, and budget for your project.",
      needsLeadCapture: true,
      suggestedAction: "Share your name and email so we can reach out with the next step.",
    };
  }

  if (
    normalized.includes("service") ||
    normalized.includes("offer") ||
    normalized.includes("website") ||
    normalized.includes("branding") ||
    normalized.includes("logo") ||
    normalized.includes("marketing")
  ) {
    return {
      reply: `We specialize in ${companyProfile.services.join(", ")}. If you want the strongest fit, I can recommend a path based on whether you need a brand refresh, a launch-ready website, or a full digital experience.`,
      needsLeadCapture: false,
      suggestedAction: "Ask for a service recommendation",
    };
  }

  if (normalized.includes("process") || normalized.includes("how") || normalized.includes("steps")) {
    return {
      reply: `Our process is simple and premium: ${companyProfile.process.join(" → ")}. We move from discovery to strategy, design, development, and launch with clarity at every step.`,
      needsLeadCapture: false,
      suggestedAction: "Learn more about the process",
    };
  }

  if (normalized.includes("contact") || normalized.includes("team") || normalized.includes("hello") || normalized.includes("hi")) {
    return {
      reply: `Hello, I’m Hive from ${companyProfile.name}. I can answer questions about our services, explain our process, or guide you to the Project Planner.`,
      needsLeadCapture: false,
      suggestedAction: "Start a conversation",
    };
  }

  return {
    reply: `I’m here to help with ${companyProfile.name}. I can recommend the right service, explain our branding process, and help you take the next step toward your project.`,
    needsLeadCapture: false,
    suggestedAction: "Ask about services or the project planner",
  };
}

async function callOpenAI(payload: ChatPayload): Promise<ChatResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return getFallbackReply(payload.message);
  }

  const history = (payload.history ?? []).map((entry) => ({
    role: entry.role === "assistant" ? "assistant" : "user",
    content: entry.content,
  }));

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are Hive, the premium AI concierge for BrandHive Studio. You help visitors understand the agency, recommend services, explain the branding process, guide them to the Project Planner, and collect leads professionally. Keep responses short, polished, and warm. Return valid JSON with keys: reply, needsLeadCapture, suggestedAction.",
          },
          ...history,
          {
            role: "user",
            content: payload.message,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI request failed");
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content) as Partial<ChatResponse>;

    return {
      reply: parsed.reply || getFallbackReply(payload.message).reply,
      needsLeadCapture: parsed.needsLeadCapture ?? false,
      suggestedAction: parsed.suggestedAction,
    };
  } catch {
    return getFallbackReply(payload.message);
  }
}

async function sendLeadEmail(lead: NonNullable<ChatPayload["lead"]>) {
  if (!resend) {
    return { success: true };
  }

  const { error } = await resend.emails.send({
    from: "BrandHive Studio <onboarding@resend.dev>",
    to: ["brandhive.studio.lk@gmail.com"],
    subject: `🤖 New qualified lead from Hive Assistant - ${lead.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: auto;">
        <h2 style="color:#16C7FF;">New Chat Lead</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Company:</strong> ${lead.company || "Not provided"}</p>
        <p>This lead was captured from the website chatbot and should be followed up promptly.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatPayload;

    if (body.lead) {
      await sendLeadEmail(body.lead);
      return NextResponse.json({
        reply: "Thanks for sharing that. Our team will follow up shortly with the right next step.",
        needsLeadCapture: false,
        suggestedAction: "We’ll reach out soon",
      });
    }

    const response = await callOpenAI(body);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        reply: "I’m here to help you with BrandHive Studio. Tell me what you need and I’ll guide you forward.",
        needsLeadCapture: false,
        suggestedAction: "Ask about services or the project planner",
      },
      { status: 500 }
    );
  }
}
