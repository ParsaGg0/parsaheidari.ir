"use client";

import * as React from "react";

const THEMES = ["warm-dark", "paper-light", "phosphor-cyber"] as const;
type ThemeName = (typeof THEMES)[number];

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

let currentTheme: ThemeName = "warm-dark";
const listeners = new Set<() => void>();

function isTheme(value: string | null): value is ThemeName {
  return THEMES.includes(value as ThemeName);
}

function getPreferredTheme() {
  if (typeof window === "undefined") return "warm-dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "paper-light"
    : "warm-dark";
}

function getThemeFromDocument() {
  if (typeof document === "undefined") return currentTheme;
  const classList = document.documentElement.classList;
  return THEMES.find((theme) => classList.contains(theme)) ?? currentTheme;
}

function applyTheme(theme: ThemeName, persist: boolean) {
  currentTheme = theme;

  if (typeof document !== "undefined") {
    document.documentElement.classList.remove(...THEMES);
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme =
      theme === "paper-light" ? "light" : "dark";
  }

  if (persist && typeof window !== "undefined") {
    window.localStorage.setItem("theme", theme);
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  queueMicrotask(() => {
    const stored =
      typeof window === "undefined" ? null : window.localStorage.getItem("theme");
    applyTheme(isTheme(stored) ? stored : getThemeFromDocument() || getPreferredTheme(), false);
  });

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return currentTheme;
}

function getServerSnapshot() {
  return "warm-dark" as ThemeName;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: ThemeName) => applyTheme(nextTheme, true),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
