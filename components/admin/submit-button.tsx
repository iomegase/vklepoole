"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={cn("inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-zinc-900 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60", className)}
    >
      {pending ? "Saving..." : children}
    </button>
  );
}
