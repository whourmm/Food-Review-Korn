"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm text-center space-y-4">
        <h1 className="text-xl font-semibold">Sign out</h1>
        <p className="text-gray-500">
          Are you sure you want to sign out?
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
