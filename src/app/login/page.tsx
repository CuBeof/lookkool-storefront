"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/layout/logo";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();

  const [mode, setMode] = React.useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "register") {
      register(name || email.split("@")[0], email);
      toast.success("Welcome to the cute club!");
    } else {
      login(email);
      toast.success("You're logged in!");
    }
    router.push("/account");
  }

  return (
    <div className="container-page flex justify-center py-12 lg:py-20">
      <div className="bg-card w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="font-display text-2xl font-bold">
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "login"
              ? "Log in to track orders and save your faves."
              : "Join lookkool for 10% off and members-only drops."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your cute name"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            {mode === "login" ? "Log in" : "Create account"}
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          {mode === "login" ? (
            <>
              New here?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-primary font-semibold hover:underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-primary font-semibold hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          Demo auth — no password is stored. Wire up Medusa customers for real
          accounts.{" "}
          <Link href="/" className="underline">
            Back home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginInner />
    </React.Suspense>
  );
}
