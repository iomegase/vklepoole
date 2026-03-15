"use client";

import { useState } from "react";

import { savePageAction } from "@/app/admin/pages/actions";
import { MediaUploadField } from "@/components/admin/media-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { PageContent } from "@/lib/site/types";

interface PageEditorCardProps {
  page: PageContent;
}

export function PageEditorCard({ page }: PageEditorCardProps) {
  const [label, setLabel] = useState(page.label);
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [imageUrl, setImageUrl] = useState(page.imageUrl ?? "");

  return (
    <article id={page.key} className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[2rem] p-5 sm:p-6">
      <form action={savePageAction} className="space-y-5">
        <input type="hidden" name="key" value={page.key} />
        <input type="hidden" name="label" value={label} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="imageUrl" value={imageUrl} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">{page.key}</p>
            <h2 className="mt-3 font-[var(--font-lora)] text-4xl">{page.title}</h2>
          </div>
          <SubmitButton>Save page</SubmitButton>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold">Label</span>
            <input
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold">Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold">Content</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-40 w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
          />
        </label>

        <MediaUploadField
          accept="image/*"
          description="Cloudinary URL only. The image is optional and used as slide atmosphere."
          label="Page image"
          value={imageUrl}
          onChange={({ url }) => setImageUrl(url)}
        />
      </form>
    </article>
  );
}
