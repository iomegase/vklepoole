"use client";

import { useState } from "react";

import { saveMenuAction } from "@/app/admin/menu/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { pageKeys } from "@/lib/site/types";
import type { MenuItem } from "@/lib/site/types";

interface MenuEditorProps {
  initialItems: MenuItem[];
}

export function MenuEditor({ initialItems }: MenuEditorProps) {
  const [items, setItems] = useState(initialItems);

  function updateItem(id: string, updates: Partial<MenuItem>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  }

  return (
    <form action={saveMenuAction} className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_24px_70px_rgba(16,16,16,0.08)] rounded-[2rem] p-5 sm:p-6">
      <input type="hidden" name="payload" value={JSON.stringify(items)} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Main navigation</p>
          <h2 className="mt-3 font-[var(--font-lora)] text-4xl">Menu</h2>
        </div>
        <SubmitButton>Save menu</SubmitButton>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_120px]">
              <label className="space-y-2">
                <span className="text-sm font-semibold">Label</span>
                <input
                  className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                  value={item.label}
                  onChange={(event) => updateItem(item.id, { label: event.target.value })}
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold">Target</span>
                <select
                  className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                  value={item.target}
                  onChange={(event) =>
                    updateItem(item.id, {
                      target: event.target.value as MenuItem["target"],
                    })
                  }
                >
                  {pageKeys.map((pageKey) => (
                    <option key={pageKey} value={pageKey}>
                      {pageKey}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold">Order</span>
                <input
                  className="w-full rounded-2xl border border-zinc-900/10 bg-white/90 px-4 py-3 text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] outline-none focus:ring-2 focus:ring-zinc-900/15"
                  min={0}
                  type="number"
                  value={item.order}
                  onChange={(event) =>
                    updateItem(item.id, { order: Number(event.target.value) })
                  }
                />
              </label>
            </div>
          </article>
        ))}
      </div>
    </form>
  );
}
