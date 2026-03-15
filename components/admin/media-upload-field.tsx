"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

import { inferMediaTypeFromUrl } from "@/lib/utils";
import type { MediaType } from "@/lib/site/types";

interface MediaUploadFieldProps {
  accept?: string;
  description?: string;
  label: string;
  onChange: (payload: { mediaType: MediaType; url: string }) => void;
  value: string;
}

export function MediaUploadField({
  accept = "image/*,video/*",
  description,
  label,
  onChange,
  value,
}: MediaUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as
        | { error: string }
        | { mediaType: MediaType; url: string };

      if (!response.ok || "error" in payload) {
        throw new Error(
          "error" in payload ? payload.error : "Upload failed.",
        );
      }

      onChange(payload);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setIsUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-zinc-900">
          {label}
        </label>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileSelection}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <input
        type="url"
        value={value}
        onChange={(event) =>
          onChange({
            mediaType: inferMediaTypeFromUrl(event.target.value),
            url: event.target.value,
          })
        }
        className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
        placeholder="https://res.cloudinary.com/..."
      />

      {description ? (
        <p className="text-xs leading-6 text-zinc-500">{description}</p>
      ) : null}

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
