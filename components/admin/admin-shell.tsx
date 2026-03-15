"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  children: ReactNode;
  email: string;
}

const navigation = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/galleries", label: "Galleries" },
];

export function AdminShell({ children, email }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[2rem] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Back-office</p>
              <div>
                <h1 className="font-[var(--font-lora)] text-4xl">Victor Le Poole Admin</h1>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Connecté en tant que {email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <nav className="flex flex-wrap gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      pathname === item.href
                        ? "bg-[rgba(211,180,119,0.16)] text-zinc-900"
                        : "bg-white/[0.04] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-900",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <form action={logoutAction}>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
