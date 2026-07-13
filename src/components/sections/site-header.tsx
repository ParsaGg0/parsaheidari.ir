"use client";

import * as React from "react";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-500",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="focus-glow flex items-center gap-2 rounded-md"
          aria-label="Top of page"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card font-serif text-sm font-semibold text-primary">
            ph
          </span>
          <span className="hidden font-mono text-sm text-muted-foreground sm:inline">
            <span className="text-primary">~/</span>
            {profile.name.toLowerCase().replace(/\s+/g, "-")}
            <span className="text-primary"> $</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="focus-glow rounded-md px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              ./{n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="focus-glow hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="focus-glow inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              ./{n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
