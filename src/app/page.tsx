import { ReadingProgress } from "@/components/reading-progress";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { SiteFooter } from "@/components/sections/footer";
import { SectionHeading } from "@/components/sections/section-heading";
import { GitHubStats } from "@/components/github-stats";
import { CodeBlock } from "@/components/code-block";
import { ArticleCard } from "@/components/article-card";
import {
  profile,
  skillGroups,
  projects,
  experiences,
  educations,
  certificates,
} from "@/lib/resume-data";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUpRight,
  GraduationCap,
  Award,
  CheckCircle2,
  CircleDashed,
  MapPin,
  Calendar,
  Terminal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ReadingProgress />
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        {/* ===== LIVE STATS ===== */}
        <section className="border-y border-border bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <SectionHeading
              index="// 01 — telemetry"
              title="Live signal"
              subtitle="Real-time counters pulled from the GitHub API — auto-refreshing every 10 minutes."
            />
            <GitHubStats />
          </div>
        </section>

        {/* ===== SKILLS (code blocks) ===== */}
        <section id="skills" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading
              index="// 02 — stack"
              title="Toolbox"
              subtitle="A peek at the source. Hit copy on any block — it flashes when it lands in your clipboard."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {skillGroups.map((s) => (
                <CodeBlock
                  key={s.title}
                  title={s.title}
                  lang={s.lang}
                  lines={s.code.lines}
                  copyText={s.copyText}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="scroll-mt-20 border-t border-border bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading
              index="// 03 — builds"
              title="Projects"
              subtitle="Things I've shipped and am actively researching. Hover a card — it lifts."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((p, i) => (
                <ArticleCard key={p.id} index={i}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-xl font-semibold">
                          {p.title}
                        </h3>
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-primary">
                        {p.category}
                      </p>
                    </div>
                    <span
                      className={
                        "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider " +
                        (p.status === "shipped"
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-muted/40 text-muted-foreground")
                      }
                    >
                      {p.status === "shipped" ? "shipped" : "research"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {p.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </ArticleCard>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section id="experience" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading
              index="// 04 — log"
              title="Experience"
              subtitle="Internships & hands-on exposure across network infrastructure and technical support."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {experiences.map((e, i) => (
                <ArticleCard key={e.id} index={i}>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {e.period}
                    </span>
                    <span className="text-border">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {e.location}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    {e.role}
                  </h3>
                  <p className="font-mono text-sm text-primary">{e.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.points.map((pt, pi) => (
                      <li
                        key={pi}
                        className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </ArticleCard>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EDUCATION + CERTS ===== */}
        <section id="education" className="scroll-mt-20 border-t border-border bg-card/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading
              index="// 05 — foundations"
              title="Education & Certifications"
              subtitle="Formal track and specialized AI training from Sharif University's TechnoSharif."
            />

            <div className="grid gap-8 lg:grid-cols-2">
              {/* education */}
              <div>
                <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  education
                </p>
                <div className="space-y-4">
                  {educations.map((ed) => (
                    <ArticleCard key={ed.id}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold leading-snug">
                          {ed.degree}
                        </h3>
                        <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {ed.period}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-sm text-primary">
                        {ed.school}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {ed.detail}
                      </p>
                    </ArticleCard>
                  ))}
                </div>
              </div>

              {/* certs */}
              <div>
                <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  certifications
                </p>
                <div className="space-y-4">
                  {certificates.map((c, i) => (
                    <ArticleCard key={i} index={i}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold leading-snug">
                          {c.title}
                        </h3>
                        {c.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                        ) : (
                          <CircleDashed className="h-5 w-5 shrink-0 text-muted-foreground" />
                        )}
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {c.issuer}
                      </p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-wider">
                        {c.status === "completed" ? (
                          <span className="text-primary">completed</span>
                        ) : (
                          <span className="text-muted-foreground">in progress</span>
                        )}
                      </p>
                    </ArticleCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading
              index="// 06 — handshake"
              title="Let's connect"
              subtitle="Open to AI internships, collaboration, and good conversations. Run a command — or write directly."
            />

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              {/* terminal-style contact panel */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-border/70 bg-muted/30 px-4 py-2.5">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
                  </span>
                  <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Terminal className="h-3.5 w-3.5" />
                    contact.sh
                  </span>
                </div>
                <div className="p-5 font-mono text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-primary">parsa@notebook</span>:
                    <span className="text-primary">~</span>${" "}
                    <span className="text-foreground">whoami --intent</span>
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    &gt; seeking AI / ML internships · open to R&D collaboration
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    <span className="text-primary">parsa@notebook</span>:
                    <span className="text-primary">~</span>${" "}
                    <span className="text-foreground">run connect</span>
                  </p>

                  {/* connect commands */}
                  <div className="mt-3 space-y-2">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-glow group flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2.5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50"
                    >
                      <span className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-primary" />
                        <span>
                          <span className="text-primary">&gt;</span> connect
                          --linkedin
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>

                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-glow group flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2.5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-primary" />
                        <span>
                          <span className="text-primary">&gt;</span> connect
                          --github
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>

                    <a
                      href={`mailto:${profile.email}`}
                      className="focus-glow group flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2.5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>
                          <span className="text-primary">&gt;</span> connect
                          --email
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  </div>

                  <p className="mt-5 text-muted-foreground">
                    <span className="text-primary">parsa@notebook</span>:
                    <span className="text-primary">~</span>${" "}
                    <span className="text-foreground">cat contact.json</span>
                  </p>
                  <pre className="mt-2 rounded-lg border border-border/60 bg-muted/20 p-3 text-xs leading-relaxed text-muted-foreground">
{`{
  "name": "Parsa Heidari",
  "location": "Tehran, Iran",
  "email": "${profile.email}",
  "phone": "${profile.phone}",
  "github": "${profile.github}",
  "linkedin": "/in/parsa-heidary"
}`}
                  </pre>
                </div>
              </div>

              {/* CTA panel */}
              <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8">
                <div>
                  <h3 className="font-serif text-3xl font-semibold leading-tight">
                    Have an idea worth building?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Whether it&rsquo;s an AI prototype, an NLP experiment, or a
                    prompt-engineering challenge — I&rsquo;m all ears. Drop a
                    line and let&rsquo;s ship something real.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${profile.email}`}
                    className="focus-glow group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-sm font-medium text-primary-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--glow)]"
                  >
                    <Mail className="h-4 w-4" />
                    contact me
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="/Parsa-Heidari-CV.pdf"
                    download
                    className="focus-glow inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 font-mono text-sm text-foreground transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50"
                  >
                    <Download className="h-4 w-4" />
                    download cv
                  </a>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-3 font-mono text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  available · responding within 24h
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
