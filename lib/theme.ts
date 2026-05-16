"use client";

const THEME_KEY = "dev-nav-theme";
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getCookieTheme(): "light" | "dark" | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${THEME_KEY}=`))
    ?.split("=")[1];
  return value === "dark" || value === "light" ? value : null;
}

function setThemeCookie(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_KEY}=${theme}; max-age=${THEME_COOKIE_MAX_AGE}; path=/; samesite=lax`;
}

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return getCookieTheme() || "light";
}

export function setTheme(theme: "light" | "dark") {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
  setThemeCookie(theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleTheme(): "light" | "dark" {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme() {
  const saved = getTheme();
  localStorage.setItem(THEME_KEY, saved);
  setThemeCookie(saved);
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
