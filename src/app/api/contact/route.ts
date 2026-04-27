import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad JSON" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;

  // 1. Persist to Supabase (table: contact_submissions)
  try {
    const supabase = createSupabaseAdminClient();
    await supabase.from("contact_submissions").insert({
      name, email, subject, message,
      ip: req.headers.get("x-forwarded-for") ?? null,
      user_agent: req.headers.get("user-agent") ?? null,
    });
  } catch (e) {
    console.error("Supabase insert failed:", e);
    // continue — email is more important than persistence
  }

  // 2. Email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "BVRMA <noreply@bvrma.org>",
        to: process.env.RESEND_TO_EMAIL ?? "info@bvrma.org",
        replyTo: email,
        subject: `[BVRMA contact] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    } catch (e) {
      console.error("Resend failed:", e);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
