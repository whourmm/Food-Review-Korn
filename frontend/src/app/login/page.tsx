"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session:", session); // ✅ session here
      router.push("/");
    }
  }, [status, session, router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-gray-500 text-center">
          Sign in to continue
        </p>

        <button
          onClick={() => signIn("google")}
          disabled={status === "loading"}
          className="mt-6 w-full flex items-center justify-center gap-3
                     border border-gray-300 rounded-lg px-4 py-3
                     hover:bg-gray-50 transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {status === "loading" && (
          <p className="mt-4 text-xs text-center text-gray-400">
            Checking session…
          </p>
        )}
      </div>
    </div>
  );
}
