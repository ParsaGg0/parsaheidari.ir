"use client";

import * as React from "react";
import { Moon, Sun, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const ORDER = ["warm-dark", "paper-light", "phosphor-cyber"] as const;
type ThemeName = (typeof ORDER)[number];

const META: Record<ThemeName, { label: string; icon: React.ReactNode }> = {
  "warm-dark": { label: "Warm Dark", icon: <Moon className="h-4 w-4" /> },
  "paper-light": { label: "Paper Light", icon: <Sun className="h-4 w-4" /> },
  "phosphor-cyber": {
    label: "Phosphor Cyber",
    icon: <TerminalSquare className="h-4 w-4" />,
  },
};

function subscribeMounted(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot
  );

  const current = theme;

  const next = React.useCallback(() => {
    const idx = ORDER.indexOf(current);
    setTheme(ORDER[(idx + 1) % ORDER.length]);
  }, [current, setTheme]);

  return (
    <button
      type="button"
      onClick={next}
      aria-label={`Switch theme — current: ${META[current].label}`}
      title={`Theme: ${META[current].label} (click to cycle)`}
      className={cn(
        "focus-glow group relative inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-mono",
        "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_18px_var(--glow)]",
        "backdrop-blur-sm"
      )}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {/* render all icons, fade active */}
        {mounted ? (
          META[current].icon
        ) : (
          <Moon className="h-4 w-4 opacity-50" />
        )}
      </span>
      <span className="hidden sm:inline text-muted-foreground group-hover:text-foreground transition-colors">
        {mounted ? META[current].label : "Warm Dark"}
      </span>
      <span className="flex gap-0.5 pl-1">
        {ORDER.map((t) => (
          <span
            key={t}
            className={cn(
              "h-1 w-1 rounded-full transition-all duration-300",
              mounted && t === current
                ? "bg-primary scale-125"
                : "bg-muted-foreground/40"
            )}
          />
        ))}
      </span>
    </button>
  );
}
