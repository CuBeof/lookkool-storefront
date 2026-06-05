"use client";

import * as React from "react";
import { Clock, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [sent, setSent] = React.useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll reply within 24 hours");
    e.currentTarget.reset();
  }

  return (
    <div className="container-page max-w-5xl py-10 lg:py-16">
      <header className="mb-10 text-center">
        <span className="text-4xl">💌</span>
        <h1 className="font-display mt-2 text-4xl font-bold">Get in touch</h1>
        <p className="text-muted-foreground mt-2">
          Questions, feedback, or just want to say hi? We&apos;d love to hear
          from you.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* form */}
        <form
          onSubmit={submit}
          className="bg-card space-y-4 rounded-3xl border p-6 lg:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Your cute name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" required placeholder="What's up?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              required
              rows={6}
              placeholder="Tell us everything…"
              className="border-input focus-visible:border-ring focus-visible:ring-ring/40 w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-[3px]"
            />
          </div>
          <Button type="submit" size="lg" disabled={sent}>
            {sent ? "Sent! 🎉" : "Send message"}
          </Button>
        </form>

        {/* info */}
        <aside className="space-y-4">
          {[
            {
              icon: Mail,
              title: "Email us",
              line: "hello@lookkool.com",
              sub: "We reply within 24 hours.",
            },
            {
              icon: MessageCircle,
              title: "Live chat",
              line: "Mon–Fri, 9am–6pm CT",
              sub: "Look for the chat bubble.",
            },
            {
              icon: Clock,
              title: "Order help",
              line: "Track in My orders",
              sub: "Updates & returns in one place.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-card flex items-start gap-3 rounded-2xl border p-5"
            >
              <span className="bg-secondary text-secondary-foreground grid size-10 shrink-0 place-items-center rounded-xl">
                <c.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm font-medium">{c.line}</p>
                <p className="text-muted-foreground text-xs">{c.sub}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
