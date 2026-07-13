import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parsa Heidari — /dev/log · Software Engineering & AI",
  description:
    "Parsa Heidari — Software Engineering student & AI enthusiast. Python, NLP, prompt engineering, and LLMs. A programmer's notebook of projects, experience, and ideas.",
  keywords: [
    "Parsa Heidari",
    "Software Engineering",
    "Artificial Intelligence",
    "Python",
    "NLP",
    "Prompt Engineering",
    "LLM",
    "Portfolio",
  ],
  authors: [{ name: "Parsa Heidari" }],
  openGraph: {
    title: "Parsa Heidari — /dev/log",
    description:
      "Software Engineering student & AI enthusiast. A programmer's notebook.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parsa Heidari — /dev/log",
    description:
      "Software Engineering student & AI enthusiast. A programmer's notebook.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash: set theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;var th=t||'warm-dark';document.documentElement.classList.add(th);document.documentElement.setAttribute('data-theme',th);}catch(e){document.documentElement.classList.add('warm-dark');}})();`,
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${jetbrains.variable} antialiased theme-color-trans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="warm-dark"
          themes={["warm-dark", "paper-light", "phosphor-cyber"]}
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
