"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type Line = { indent?: number; tokens: { t: string; c?: string }[] };

type Props = {
  title: string;
  lang: string;
  lines: Line[];
  copyText: string;
  className?: string;
};

const TOKEN_CLASS: Record<string, string> = {
  kw: "tok-kw",
  str: "tok-str",
  fn: "tok-fn",
  num: "tok-num",
  com: "tok-com",
  var: "tok-var",
  op: "tok-op",
  punct: "tok-punct",
  plain: "tok-plain",
};

export function CodeBlock({ title, lang, lines, copyText, className }: Props) {
  const [copied, setCopied] = React.useState(false);
  const [flash, setFlash] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      // fallback for restrictive environments
      const ta = document.createElement("textarea");
      ta.value = copyText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setFlash(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setFlash(false);
    }, 1400);
  }, [copyText]);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card/70 backdrop-blur-sm",
        "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_30px_-12px_var(--glow)]",
        className
      )}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-border/70 bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
          </span>
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${title}`}
          className="focus-glow relative inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "copied" : "copy"}
        </button>
      </div>

      {/* code body */}
      <div className="relative">
        <pre className="no-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 w-6 shrink-0 select-none text-right text-[11px] text-muted-foreground/50">
                  {i + 1}
                </span>
                <span
                  className="whitespace-pre"
                  style={{ paddingLeft: `${(line.indent ?? 0) * 0.5}rem` }}
                >
                  {line.tokens.length === 0 ? (
                    "\u00A0"
                  ) : (
                    line.tokens.map((tok, j) => (
                      <span
                        key={j}
                        className={TOKEN_CLASS[tok.c ?? "plain"] ?? "tok-plain"}
                      >
                        {tok.t}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>

        {/* copy flash overlay */}
        {flash && (
          <div className="copy-flash pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg border border-primary/40 bg-background/80 px-4 py-2 font-mono text-sm text-primary shadow-[0_0_24px_var(--glow)] backdrop-blur-sm">
              ✓ copied to clipboard
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
