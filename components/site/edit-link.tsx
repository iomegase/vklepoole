import Link from "next/link";

interface EditLinkProps {
  href: string;
  label?: string;
}

export function EditLink({ href, label = "Edit" }: EditLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M12 20h9" />
        <path d="m16.5 3.5 4 4L8 20H4v-4z" />
      </svg>
      {label}
    </Link>
  );
}
