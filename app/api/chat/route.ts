import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { business, getFaqReply, getFaqText } from "@/lib/faq";

const COOKIE_NAME = "bgb-ai-usage-v1";
const MAX_AI_PER_HOUR = business.aiLimitPerHour;
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const groq = getGroqClient();

function getGroqClient() {
  if (!process.env.GROQ_API_KEY) return null;
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

type UsageCookie = {
  timestamps: number[];
};

function parseUsageCookie(raw: string | undefined): UsageCookie {
  if (!raw) return { timestamps: [] };
  try {
    const parsed = JSON.parse(raw) as UsageCookie;
    const timestamps = Array.isArray(parsed.timestamps)
      ? parsed.timestamps.filter((value) => Number.isFinite(value))
      : [];
    return { timestamps };
  } catch {
    return { timestamps: [] };
  }
}

function serializeUsageCookie(value: UsageCookie) {
  return JSON.stringify(value);
}

function freshUsage(timestamps: number[]) {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  return timestamps.filter((timestamp) => timestamp >= hourAgo);
}

function systemPrompt() {
  return [
    `Eres ${business.chatbotName}, el asistente virtual oficial de ${business.name}.`,
    "Tu objetivo es ayudar a convertir visitantes en clientes.",
    "Habla en espanol claro, profesional y facil de entender.",
    "Explica tecnologia sin tecnicismos innecesarios.",
    "No inventes precios ni tiempos exactos si no se han dado.",
    `Contactos oficiales: correo ${business.email} y WhatsApp ${business.whatsapp.display} (${business.whatsapp.link}).`,
    "Cuando el visitante quiera avanzar, comparte el correo y el WhatsApp y sugiere usar el formulario de la seccion de contacto.",
    "Si faltan datos, pide la informacion justa o invita a contactar al equipo.",
    "Servicios de BGB Tech: desarrollo de apps Android, paginas web, instalacion y desarrollo de softwares de escritorio, IA para WhatsApp e Instagram, instalacion de sistemas operativos y soporte tecnico.",
    "Cuando convenga, guia al usuario hacia la mejor solucion para su negocio."
  ].join(" ");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message?: string;
      history?: Array<{ role: "user" | "assistant"; content: string }>;
    };

    const message = String(body.message ?? "").trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: "Mensaje vacio" }, { status: 400 });
    }

    const faqReply = getFaqReply(message);
    if (faqReply) {
      return NextResponse.json({
        mode: "faq",
        reply: faqReply.text,
        remaining: MAX_AI_PER_HOUR
      });
    }

    const usage = parseUsageCookie(req.headers.get("cookie")?.match(/(?:^|;\s*)bgb-ai-usage-v1=([^;]+)/)?.[1]);
    const current = freshUsage(usage.timestamps);

    if (!groq) {
      const response = NextResponse.json({
        mode: "limit",
        reply:
          "Por ahora respondo las preguntas rapidas de la pagina. Escribenos por WhatsApp y te atendemos directo.",
        remaining: 0,
        resetAt: Date.now() + 60 * 60 * 1000
      });
      response.cookies.set(COOKIE_NAME, serializeUsageCookie({ timestamps: current }), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30
      });
      return response;
    }

    if (current.length >= MAX_AI_PER_HOUR) {
      const response = NextResponse.json(
        {
          mode: "limit",
          reply: `Ya alcanzaste el limite de ${MAX_AI_PER_HOUR} consultas con IA por hora. Puedes seguir usando las respuestas rapidas sin costo.`,
          remaining: 0,
          resetAt: Date.now() + 60 * 60 * 1000
        },
        { status: 429 }
      );
      response.cookies.set(COOKIE_NAME, serializeUsageCookie({ timestamps: current }), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30
      });
      return response;
    }

    const cleanedHistory = history
      .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
      .slice(-12)
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, 1000)
      })) as Array<{ role: "user" | "assistant"; content: string }>;

    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.55,
      max_tokens: 320,
      messages: [
        { role: "system", content: systemPrompt() },
        ...cleanedHistory,
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0]?.message?.content?.trim() || getFaqText(message);

    const updatedUsage = [...current, Date.now()];
    const response = NextResponse.json({
      mode: "ai",
      reply,
      remaining: Math.max(0, MAX_AI_PER_HOUR - updatedUsage.length)
    });

    response.cookies.set(COOKIE_NAME, serializeUsageCookie({ timestamps: updatedUsage }), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });

    return response;
  } catch (error) {
    console.error("[BGB_CHAT]", error);
    return NextResponse.json(
      {
        mode: "error",
        reply: "Hubo un problema al responder. Intenta de nuevo en unos segundos.",
        remaining: 0
      },
      { status: 500 }
    );
  }
}
