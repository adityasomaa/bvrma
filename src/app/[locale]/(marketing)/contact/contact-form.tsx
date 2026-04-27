"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/10 p-6">
        <h3 className="font-display text-xl font-semibold">{t("successTitle")}</h3>
        <p className="mt-2 text-muted-foreground">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" name="name" required minLength={2} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" required minLength={10} rows={6} />
      </div>
      {status === "error" && (
        <div role="alert" className="rounded-md border border-danger/30 bg-danger/10 p-3 text-sm">
          {t("errorTitle")}. {t("errorBody")}
        </div>
      )}
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
