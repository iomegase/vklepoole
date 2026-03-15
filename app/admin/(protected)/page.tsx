import Link from "next/link";

import { getAdminCount } from "@/lib/auth/admin";
import { getSiteContent, getSystemStatus } from "@/lib/site/store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [site, adminCount] = await Promise.all([getSiteContent(), getAdminCount()]);
  const status = getSystemStatus();

  const cards = [
    { label: "Pages", value: String(site.pages.length).padStart(2, "0") },
    { label: "Menu items", value: String(site.menuItems.length).padStart(2, "0") },
    { label: "Galleries", value: String(site.galleries.length).padStart(2, "0") },
    { label: "Admins", value: String(adminCount).padStart(2, "0") },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[1.75rem] p-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">{card.label}</p>
            <p className="mt-4 font-[var(--font-lora)] text-5xl">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[2rem] p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">System status</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <StatusPill label="MongoDB" ok={status.mongo} />
            <StatusPill label="Cloudinary" ok={status.cloudinary} />
            <StatusPill label="Mode" ok={status.mode === "mongodb"} text={status.mode} />
          </div>
          <p className="mt-5 text-sm leading-7 text-zinc-500">
            Sans variables MongoDB, le site retombe sur un seed local pour
            permettre le build et le développement. La persistance réelle
            démarre dès que `MONGODB_URI` et `MONGODB_DB` sont présents.
          </p>
        </article>

        <article className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[2rem] p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Shortcuts</p>
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/admin/pages" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px justify-center">
              Edit pages
            </Link>
            <Link href="/admin/menu" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px justify-center">
              Edit menu
            </Link>
            <Link href="/admin/galleries" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px justify-center">
              Manage galleries
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}

function StatusPill({
  label,
  ok,
  text,
}: {
  label: string;
  ok: boolean;
  text?: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-500">
        {text || (ok ? "Ready" : "Missing")}
      </p>
    </div>
  );
}
