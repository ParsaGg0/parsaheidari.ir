"use client";

import * as React from "react";
import {
  DEFAULT_THEME,
  THEME_NAMES,
  THEME_STORAGE_KEY,
  isThemeName,
  themeColorScheme,
  type ThemeName,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);
let currentTheme: ThemeName = DEFAULT_THEME;
const themeListeners = new Set<() => void>();

function readDocumentTheme(): ThemeName | null {
  if (typeof document === "undefined") return null;
  return (
    THEME_NAMES.find((theme) =>
      document.documentElement.classList.contains(theme)
    ) ?? null
  );
}

function readStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") return null;
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeName(storedTheme) ? storedTheme : null;
}

function applyTheme(theme: ThemeName, options: { persist: boolean }) {
  currentTheme = theme;

  if (typeof document !== "undefined") {
    document.documentElement.classList.remove(...THEME_NAMES);
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = themeColorScheme(theme);
  }

  if (options.persist && typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  themeListeners.forEach((listener) => listener());
}

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener);

  queueMicrotask(() => {
    applyTheme(readStoredTheme() ?? readDocumentTheme() ?? DEFAULT_THEME, {
      persist: false,
    });
  });

  return () => {
    themeListeners.delete(listener);
  };
}

function getThemeSnapshot(): ThemeName {
  return currentTheme;
}

function getServerThemeSnapshot(): ThemeName {
  return DEFAULT_THEME;
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
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme) => applyTheme(nextTheme, { persist: true }),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
}
