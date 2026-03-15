import type { Metadata } from "next";
import { Lora, Roboto, Story_Script } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

const storyScript = Story_Script({
  subsets: ["latin"],
  variable: "--font-story-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Victor Le Poole",
  description: "Fullscreen portfolio with protected admin back-office.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={[
          lora.variable,
          roboto.variable,
          storyScript.variable,
          "min-h-screen overflow-x-hidden bg-white text-zinc-900 antialiased [font-family:var(--font-roboto)]",
          "[&_h1]:font-[var(--font-lora)] [&_h1]:uppercase [&_h1]:font-thin",
          "[&_h2]:font-[var(--font-lora)] [&_h2]:uppercase [&_h2]:font-thin",
          "[&_h3]:font-[var(--font-lora)] [&_h3]:uppercase [&_h3]:font-thin",
          "[&_span]:font-[var(--font-story-script)] [&_a]:font-[var(--font-story-script)]",
          "[&_p.uppercase]:font-[var(--font-story-script)]",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
