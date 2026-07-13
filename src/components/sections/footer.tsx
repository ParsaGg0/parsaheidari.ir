"use client";

import { Linkedin, Github, Mail, Terminal } from "lucide-react";
import { profile, terminalCommands } from "@/lib/resume-data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* identity */}
          <div>
            <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <span className="text-primary">~/</span>
              {profile.name.toLowerCase().replace(/\s+/g, "-")}
              <span className="text-primary"> $</span> exit 0
            </p>
            <p className="mt-3 max-w-sm font-serif text-lg leading-snug">
              Building at the intersection of{" "}
              <span className="text-primary">software</span> &{" "}
              <span className="text-primary">intelligence</span>.
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {profile.location} · {profile.email}
            </p>
          </div>

          {/* nav */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              navigate
            </p>
            <ul className="mt-3 space-y-2 font-mono text-sm">
              {[
                { href: "#skills", label: "skills" },
                { href: "#projects", label: "projects" },
                { href: "#experience", label: "experience" },
                { href: "#contact", label: "contact" },
              ].map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="text-primary">.</span>/{n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* social terminal */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Terminal className="mr-1 inline h-3.5 w-3.5" />
              connect
            </p>
            <ul className="mt-3 space-y-2 font-mono text-sm">
              {terminalCommands.map((c) => (
                <li key={c.cmd}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="text-primary">&gt;</span> {c.cmd}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="focus-glow inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="focus-glow inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="focus-glow inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 font-mono text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · crafted like a
            developer&rsquo;s notebook
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            built with Next.js · Tailwind · framer-motion
          </p>
        </div>
      </div>
    </footer>
  );
}
