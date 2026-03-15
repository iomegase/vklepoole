import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Protected route</p>
          <h1 className="font-[var(--font-lora)] text-6xl leading-none">Mobile-first admin.</h1>
          <p className="max-w-xl text-base leading-8 text-zinc-500">
            Un seul administrateur. Les contenus publics, le menu, les galeries,
            les assignations MongoDB et les uploads Cloudinary passent tous ici.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
