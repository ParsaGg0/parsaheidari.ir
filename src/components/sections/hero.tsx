"use client";

import { motion } from "framer-motion";
import { Download, Mail, Terminal, ArrowRight } from "lucide-react";
import { Typewriter } from "@/components/typewriter";
import { GitHubStatBadge } from "@/components/github-stats";
import { profile, terminalCommands } from "@/lib/resume-data";

export function Hero() {
  return (
    <section id="top" className="bg-notebook-grid relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow), transparent 70%)",
          animation: "glow-pulse 8s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        {/* /dev/log terminal line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <Typewriter
            phrases={[
              "/dev/log — booting notebook...",
              "/dev/log — Parsa.exe online",
              "/dev/log — ready_to_build()",
            ]}
            className="text-foreground"
          />
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* left: identity */}
          <div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">$</span> whoami
            </p>
            <h1 className="mt-2 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-3 font-serif text-xl text-muted-foreground sm:text-2xl">
              {profile.role}
            </p>
            <p className="mt-1 font-mono text-sm text-primary">
              {profile.tagline}
            </p>

            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/Parsa-Heidari-CV.pdf"
                download
                className="focus-glow group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--glow)]"
              >
                <Download className="h-4 w-4" />
                download_cv.pdf
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="focus-glow inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 font-mono text-sm text-foreground transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50"
              >
                <Mail className="h-4 w-4" />
                contact me
              </a>
            </div>

            {/* terminal-style social commands */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                <Terminal className="mr-1 inline h-3.5 w-3.5" />
                quick connect:
              </span>
              {terminalCommands.map((c) => (
                <a
                  key={c.cmd}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="focus-glow inline-flex items-center gap-1 rounded-full border border-border bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground transition-[transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <span className="text-primary">&gt;</span> {c.cmd}
                </a>
              ))}
            </div>
          </div>

          {/* right: status card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <span className="font-mono text-xs text-muted-foreground">
                status.log
              </span>
              <GitHubStatBadge />
            </div>
            <dl className="mt-4 space-y-3 font-mono text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">location</dt>
                <dd className="text-right">{profile.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">focus</dt>
                <dd className="text-right text-primary">AI · NLP · LLMs</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">track</dt>
                <dd className="text-right">Software Engineering</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">status</dt>
                <dd className="flex items-center justify-end gap-1.5 text-right">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  open to internships
                </dd>
              </div>
            </dl>
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
              <span className="text-primary">&gt;</span> starting a specialized AI
              learning path within the next 3 months.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
