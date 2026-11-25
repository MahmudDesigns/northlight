import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, DM_Mono, Sora } from "next/font/google";
import "./globals.css";

/* Exactly three typefaces: Sora (headings), Inter (body), DM Mono (labels). */
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northlight.studio"),
  title: {
    default: "Northlight Studio — Brand, product & motion design",
    template: "%s — Northlight Studio",
  },
  description:
    "Northlight Studio is a Copenhagen design practice building brand systems, digital products, illustration and motion for ambitious teams. 148 projects shipped since 2016.",
  keywords: [
    "design studio",
    "branding",
    "web design",
    "mobile apps",
    "illustration",
    "motion design",
    "Copenhagen",
  ],
  openGraph: {
    title: "Northlight Studio — Brand, product & motion design",
    description:
      "A Copenhagen design practice building brand systems, digital products, illustration and motion since 2016.",
    type: "website",
    locale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* Applies the stored theme before first paint so there is no flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("northlight:theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-body antialiased">
        <a
          href="#work"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-nl-indigo focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to projects
        </a>
        {children}
      </body>
    </html>
  );
}
