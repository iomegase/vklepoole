"use client";

import { useState } from "react";

import {
  deleteGalleryAction,
  saveGalleryAction,
} from "@/app/admin/galleries/actions";
import { MediaUploadField } from "@/components/admin/media-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { inferMediaTypeFromUrl } from "@/lib/utils";
import type { Gallery, GalleryItem } from "@/lib/site/types";

interface LocalGallery extends Gallery {
  persisted: boolean;
}

interface GalleryEditorProps {
  initialGalleries: Gallery[];
}

function createDraftGallery(): LocalGallery {
  return {
    id: `draft-${crypto.randomUUID()}`,
    name: "New gallery",
    assignedPage: null,
    items: [],
    persisted: false,
  };
}

function createDraftItem(): GalleryItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    subtitle: "",
    mediaUrl: "",
    mediaType: "image",
    order: 0,
  };
}

export function GalleryEditor({ initialGalleries }: GalleryEditorProps) {
  const [galleries, setGalleries] = useState<LocalGallery[]>(
    initialGalleries.map((gallery) => ({ ...gallery, persisted: true })),
  );

  function updateGallery(galleryId: string, updates: Partial<LocalGallery>) {
    setGalleries((current) =>
      current.map((gallery) =>
        gallery.id === galleryId ? { ...gallery, ...updates } : gallery,
      ),
    );
  }

  function updateGalleryItem(
    galleryId: string,
    itemId: string,
    updates: Partial<GalleryItem>,
  ) {
    setGalleries((current) =>
      current.map((gallery) =>
        gallery.id === galleryId
          ? {
              ...gallery,
              items: gallery.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item,
              ),
            }
          : gallery,
      ),
    );
  }

  function addItem(galleryId: string) {
    setGalleries((current) =>
      current.map((gallery) =>
        gallery.id === galleryId
          ? {
              ...gallery,
              items: [
                ...gallery.items,
                { ...createDraftItem(), order: gallery.items.length },
              ],
            }
          : gallery,
      ),
    );
  }

  function removeItem(galleryId: string, itemId: string) {
    setGalleries((current) =>
      current.map((gallery) =>
        gallery.id === galleryId
          ? {
              ...gallery,
              items: gallery.items
                .filter((item) => item.id !== itemId)
                .map((item, index) => ({ ...item, order: index })),
            }
          : gallery,
      ),
    );
  }

  function removeDraftGallery(galleryId: string) {
    setGalleries((current) => current.filter((gallery) => gallery.id !== galleryId));
  }

  return (
    <div className="space-y-5">
      <div className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] flex flex-col gap-4 rounded-[2rem] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Assignable galleries</p>
          <h2 className="mt-3 font-[var(--font-lora)] text-4xl">Galleries</h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
          onClick={() => setGalleries((current) => [createDraftGallery(), ...current])}
        >
          New gallery
        </button>
      </div>

      {galleries.map((gallery) => (
        <article
          id={gallery.id}
          key={gallery.id}
          className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[2rem] p-5 sm:p-6"
        >
          <form action={saveGalleryAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(gallery)} />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">
                  {gallery.assignedPage ? `Assigned to ${gallery.assignedPage}` : "Unassigned"}
                </p>
                <h3 className="mt-3 font-[var(--font-lora)] text-4xl">{gallery.name || "Untitled gallery"}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <SubmitButton>Save gallery</SubmitButton>
                {gallery.persisted ? (
                  <button
                    type="submit"
                    formAction={deleteGalleryAction}
                    name="galleryId"
                    value={gallery.id}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
                    onClick={() => removeDraftGallery(gallery.id)}
                  >
                    Remove draft
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.2fr_220px]">
              <label className="space-y-2">
                <span className="text-sm font-semibold">Gallery name</span>
                <input
                  className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                  value={gallery.name}
                  onChange={(event) =>
                    updateGallery(gallery.id, { name: event.target.value })
                  }
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold">Assigned page</span>
                <select
                  className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                  value={gallery.assignedPage ?? ""}
                  onChange={(event) =>
                    updateGallery(gallery.id, {
                      assignedPage: event.target.value
                        ? (event.target.value as LocalGallery["assignedPage"])
                        : null,
                    })
                  }
                >
                  <option value="">None</option>
                  <option value="events">Events</option>
                  <option value="video">Video</option>
                  <option value="mariage">Mariage</option>
                </select>
              </label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Items</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Home and Contact are intentionally unavailable here.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
                  onClick={() => addItem(gallery.id)}
                >
                  Add item
                </button>
              </div>

              {gallery.items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-white/12 px-4 py-5 text-sm text-zinc-500">
                  No gallery items yet.
                </div>
              ) : null}

              {gallery.items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Item {String(index + 1).padStart(2, "0")}</p>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white/85 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
                      onClick={() => removeItem(gallery.id, item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold">Title</span>
                      <input
                        className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                        value={item.title}
                        onChange={(event) =>
                          updateGalleryItem(gallery.id, item.id, {
                            title: event.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold">Subtitle</span>
                      <input
                        className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                        value={item.subtitle}
                        onChange={(event) =>
                          updateGalleryItem(gallery.id, item.id, {
                            subtitle: event.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[1fr_120px]">
                    <MediaUploadField
                      label="Media URL"
                      value={item.mediaUrl}
                      onChange={({ mediaType, url }) =>
                        updateGalleryItem(gallery.id, item.id, { mediaType, mediaUrl: url })
                      }
                    />

                    <label className="space-y-2">
                      <span className="text-sm font-semibold">Order</span>
                      <input
                        type="number"
                        min={0}
                        className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                        value={item.order}
                        onChange={(event) =>
                          updateGalleryItem(gallery.id, item.id, {
                            order: Number(event.target.value),
                          })
                        }
                      />
                    </label>
                  </div>

                  {item.mediaUrl ? (
                    <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-black/10 p-3 text-xs text-zinc-500">
                      Media type: {item.mediaType || inferMediaTypeFromUrl(item.mediaUrl)}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </form>
        </article>
      ))}
    </div>
  );
}
