import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-[0_32px_90px_rgba(0,0,0,0.45)] backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Page not found
        </p>
        <h1 className="mt-4 font-[var(--font-lora)] text-4xl text-zinc-900">
          This slide does not exist.
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-500">
          Retour vers l’expérience principale.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900 transition hover:border-white/40"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
