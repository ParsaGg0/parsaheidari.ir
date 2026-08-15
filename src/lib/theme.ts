export const THEME_STORAGE_KEY = "theme";
export const THEME_NAMES = ["warm-dark", "paper-light", "phosphor-cyber"] as const;
export const DEFAULT_THEME = "warm-dark" satisfies ThemeName;

export type ThemeName = (typeof THEME_NAMES)[number];

export function isThemeName(value: string | null): value is ThemeName {
  return THEME_NAMES.includes(value as ThemeName);
}

export function themeColorScheme(theme: ThemeName) {
  return theme === "paper-light" ? "light" : "dark";
}

export const THEME_BOOTSTRAP_SCRIPT = `(() => {
  try {
    const themes = ${JSON.stringify(THEME_NAMES)};
    const storedTheme = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "paper-light"
      : "warm-dark";
    const theme = themes.includes(storedTheme) ? storedTheme : preferredTheme;
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme === "paper-light" ? "light" : "dark";
  } catch {
    document.documentElement.classList.add(${JSON.stringify(DEFAULT_THEME)});
    document.documentElement.style.colorScheme = "dark";
  }
})();`;
