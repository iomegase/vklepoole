"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { startTransition, useCallback, useEffect, useState } from "react";

import { BurgerMenu } from "@/components/site/burger-menu";
import { EditLink } from "@/components/site/edit-link";
import { GalleryModal } from "@/components/site/gallery-modal";
import { PageBackdrop } from "@/components/site/portfolio/page-backdrop";
import { PageHero } from "@/components/site/portfolio/page-hero";
import {
  getGalleryHint,
  pageVisualMap,
  slideVariants,
  type VisualMotion,
} from "@/components/site/portfolio/shared";
import { Preloader } from "@/components/site/preloader";
import { pagePathMap } from "@/lib/site/constants";
import { type PageKey, type SiteContent } from "@/lib/site/types";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __vkPreloaderSeen?: boolean;
  }
}

interface PortfolioExperienceProps {
  currentPageKey: PageKey;
  isAdmin: boolean;
  site: SiteContent;
}

export function PortfolioExperience({
  currentPageKey,
  isAdmin,
  site,
}: PortfolioExperienceProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const currentPage = site.pages.find((page) => page.key === currentPageKey) ?? site.pages[0];
  const contentPage = currentPage;
  const currentGallery =
    currentPageKey === "events" || currentPageKey === "video" || currentPageKey === "mariage"
      ? site.galleries.find((gallery) => gallery.assignedPage === currentPageKey) ?? null
      : null;
  const orderedMenuItems = [...site.menuItems].sort((left, right) => left.order - right.order);
  const pageVisual = pageVisualMap[currentPageKey];
  const galleryHint = getGalleryHint(currentPageKey, currentGallery);
  const surfaceStyle = {
    "--page-accent": pageVisual.accent,
    "--page-accent-soft": pageVisual.accentSoft,
  } as CSSProperties;

  useEffect(() => {
    if (window.__vkPreloaderSeen) {
      const frame = window.requestAnimationFrame(() => {
        setShowPreloader(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.__vkPreloaderSeen = true;

    const timeout = window.setTimeout(() => {
      setShowPreloader(false);
    }, 1350);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Object.values(pagePathMap).forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setGalleryOpen(false);
      setMenuOpen(false);
      setIsNavigating(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPageKey]);

  const navigateTo = useCallback(
    (pageKey: PageKey) => {
      if (pageKey === currentPageKey || isNavigating) {
        return;
      }

      setIsNavigating(true);
      setMenuOpen(false);

      startTransition(() => {
        router.push(pagePathMap[pageKey]);
      });
    },
    [currentPageKey, isNavigating, router],
  );

  const visualMotion: VisualMotion = {
    panel: { x: 0, y: 0 },
    hero: { x: 0, y: 0 },
    accent: { x: 0, y: 0 },
    background: { x: 0, y: 0 },
  };

  const pageFrameClassName =
    "relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(248,248,248,0.96),rgba(243,243,243,0.92))] outline-none";

  return (
    <>
      <Preloader visible={showPreloader} />
      <BurgerMenu
        currentPageKey={currentPageKey}
        isOpen={menuOpen}
        menuItems={orderedMenuItems}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigateTo}
      />
      <GalleryModal
        gallery={currentGallery}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <div className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 min-h-screen">
          <div className="relative min-h-screen">
            <AnimatePresence mode="wait" initial={false}>
              <motion.main
                key={currentPageKey}
                initial="enter"
                animate="center"
                exit="exit"
                variants={slideVariants}
                className={pageFrameClassName}
                style={surfaceStyle}
              >
                <PageBackdrop
                  currentPageKey={currentPageKey}
                  pageLabel={currentPage.label}
                  visualMotion={visualMotion}
                />

                <div className="relative z-10 mx-4 my-4 min-h-[calc(100vh-2rem)] rounded-3xl px-4 pb-6 pt-4 sm:mx-8 sm:my-8 sm:min-h-[calc(100vh-4rem)] sm:px-8 sm:pb-8 sm:pt-6 lg:mx-12 lg:my-12 lg:min-h-[calc(100vh-6rem)] lg:px-12 lg:pb-10 lg:pt-6">
                  <div className="flex min-h-full flex-col">
                    <header className="z-30 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        {isAdmin ? <EditLink href={`/admin/pages#${currentPage.key}`} label="Edit page" /> : null}
                        <div className="min-w-0">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Victor Le Poole</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <nav className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1 shadow-[0_14px_30px_rgba(12,12,12,0.06)] md:flex">
                          {orderedMenuItems.map((item) => {
                            const active = item.target === currentPageKey;

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => navigateTo(item.target)}
                                className={cn(
                                  "rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.26em] transition",
                                  active
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-600 hover:bg-white hover:text-zinc-900",
                                )}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </nav>
                        <button
                          type="button"
                          onClick={() => setMenuOpen(true)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-900/10 bg-white/78 text-zinc-700 shadow-[0_12px_28px_rgba(16,16,16,0.05)] transition hover:-translate-y-px hover:text-zinc-900 sm:h-12 sm:w-12 md:hidden"
                          aria-label="Open navigation"
                        >
                          <span className="flex flex-col gap-1.5">
                            <span className="h-px w-5 bg-current" />
                            <span className="h-px w-5 bg-current" />
                            <span className="h-px w-5 bg-current" />
                          </span>
                        </button>
                      </div>
                    </header>

                    <div className="mt-6 grid h-full flex-1 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.95fr)] lg:gap-12">
                  <div className="flex min-h-0 min-w-0 flex-col justify-center gap-8">
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 shadow-[0_14px_28px_rgba(16,16,16,0.05)]">{pageVisual.accentLabel}</span>
                        {currentGallery ? (
                          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 shadow-[0_14px_28px_rgba(16,16,16,0.05)]">
                            {galleryHint}
                          </span>
                        ) : null}
                      </div>

                      <div className="space-y-4">
                        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-zinc-500">{pageVisual.eyebrow}</p>
                        <h1 className="max-w-[11ch] wrap-break-word text-7xl leading-[0.92] tracking-[-0.04em] text-zinc-900 ">
                          {contentPage.title}
                        </h1>
                        
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {pageVisual.detailItems.map((item) => (
                          <span key={item} className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 shadow-[0_14px_28px_rgba(16,16,16,0.05)]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-3">
                        {currentGallery && currentGallery.items.length > 0 ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-zinc-900 px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_20px_40px_rgba(16,16,16,0.15)] transition hover:-translate-y-px"
                            onClick={() => setGalleryOpen(true)}
                            data-no-swipe="true"
                          >
                            Open gallery
                          </button>
                        ) : null}

                        {currentPageKey !== "home" ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px"
                            onClick={() => navigateTo("home")}
                            data-no-swipe="true"
                          >
                            Back home
                          </button>
                        ) : null}

                        <div className="hidden md:block mt-12 bg-slate-800/10 p-6 rounded-3xl ml-0 max-w-2xl space-y-6 text-lg uppercase leading-8 text-white shadow-md backdrop-blur-md">
                          {contentPage.content.split("\n").map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      <div className=" hidden lg:block rounded-[1.85rem] border border-zinc-900/10 bg-white/75 p-[1.1rem] shadow-[0_20px_40px_rgba(16,16,16,0.05)]" data-no-swipe="true">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                         contenu secondaire, comme une légende ou un contexte additionnel, qui peut être mis en avant pour certaines pages selon la volonté de l&apos;auteur du site.
                        </p>
                       
                      </div>
                    </div>
                  </div>

                  <div className="flex min-h-[320px] min-w-0 items-center justify-center lg:min-h-[640px]">
                    <PageHero
                      currentPage={contentPage}
                      visualMotion={visualMotion}
                    />
                  </div>
                </div>
                  </div>
                </div>
              </motion.main>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
