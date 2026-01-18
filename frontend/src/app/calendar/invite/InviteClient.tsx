"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function InviteClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const code = params.get("code");

  useEffect(() => {
    if (status === "loading") return;

    // 🔐 Force login
    if (!session) {
      signIn("google");
      return;
    }

    if (!code) return;

    fetch("/api/google-calendar/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }).then(() => {
      router.replace("/calendar");
    });
  }, [session, status, code, router]);

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-xl font-bold mb-2">Joining calendar…</h1>
        <p className="text-sm text-gray-500">Connecting Google Calendar</p>
      </div>
    </div>
  );
}
