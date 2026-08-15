import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://parsaheidari.ir"),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Parsa Heidari — /dev/log",
    description:
      "Software Engineering student & AI enthusiast. A programmer's notebook.",
    url: "/",
    siteName: "Parsa Heidari",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Parsa Heidari logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parsa Heidari — /dev/log",
    description:
      "Software Engineering student & AI enthusiast. A programmer's notebook.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
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
            __html: THEME_BOOTSTRAP_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased theme-color-trans">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
