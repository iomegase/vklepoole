"use client";

import { useActionState } from "react";

import { loginAction, type LoginActionState } from "@/app/admin/login/actions";
import { SubmitButton } from "@/components/admin/submit-button";

const initialState: LoginActionState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] space-y-5 rounded-[2rem] p-6 sm:p-8">
      <div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Admin access</p>
        <h1 className="mt-3 font-[var(--font-lora)] text-5xl">Login</h1>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
          required
        />
      </label>

      {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}

      <SubmitButton className="w-full justify-center">Sign in</SubmitButton>
    </form>
  );
}
