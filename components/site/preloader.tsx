"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PreloaderProps {
  visible: boolean;
}

export function Preloader({ visible }: PreloaderProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: "easeInOut" } }}
          className="fixed inset-0 z-[70] overflow-hidden bg-[linear-gradient(180deg,#fcfbf8_0%,#f5f2ee_100%)]"
        >
          <div className="absolute inset-0">
            <motion.div
              animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
              transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute left-[8%] top-[16%] h-40 w-40 rounded-full bg-white/84 shadow-[0_26px_70px_rgba(16,16,16,0.08)]"
            />
            <motion.div
              animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
              transition={{ duration: 7.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute right-[10%] top-[18%] h-24 w-24 rounded-[2rem] border border-black/6 bg-white/78"
            />
            <motion.div
              animate={{ x: [0, 8, 0], y: [0, 12, 0] }}
              transition={{ duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute bottom-[12%] left-[18%] h-28 w-28 rounded-full bg-[rgba(202,188,168,0.24)]"
            />
          </div>

          <div className="relative flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-xl rounded-[2.5rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,243,239,0.92))] p-8 shadow-[0_32px_100px_rgba(16,16,16,0.12)] sm:p-12">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Victor Le Poole</p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-zinc-500">
                  Loading
                </p>
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-[minmax(0,0.95fr)_minmax(170px,0.65fr)]">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="font-(--font-lora) text-5xl leading-[0.92] tracking-[-0.04em] text-zinc-900 sm:text-6xl"
                  >
                    Opening the portfolio.
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.65, ease: "easeOut" }}
                    className="mt-5 max-w-md text-sm leading-8 text-zinc-500 sm:text-base"
                  >
                    White surfaces, stronger directional cues, cleaner motion and a flatter project
                    structure.
                  </motion.p>
                </div>

                <div className="relative min-h-40 rounded-4xl border border-black/7 bg-white/78 p-5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.16, duration: 0.8, ease: "easeOut" }}
                    className="h-px origin-left bg-[linear-gradient(90deg,#111827,transparent)]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
                    className="mt-8 space-y-3"
                  >
                    {["Home", "Events", "Video", "Mariage", "Contact"].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-zinc-500"
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
