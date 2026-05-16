// Sidebar UI state persisted to localStorage.
// All getters are SSR-safe (return defaults on the server).

const KEY_COLLAPSED = "onebox:sidebar:collapsed";
const KEY_FOLDED = "onebox:sidebar:folded-groups";
const KEY_WIDTH = "onebox:sidebar:width";
const DEFAULT_WIDTH = 220;
const MIN_WIDTH = 180;
const MAX_WIDTH = 320;

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore quota / privacy errors */
  }
}

export function getCollapsed(): boolean {
  return safeGet(KEY_COLLAPSED) === "1";
}

export function setCollapsed(value: boolean): void {
  safeSet(KEY_COLLAPSED, value ? "1" : "0");
}

export function getSidebarWidth(): number {
  const raw = safeGet(KEY_WIDTH);
  const width = raw ? Number(raw) : DEFAULT_WIDTH;
  if (!Number.isFinite(width)) return DEFAULT_WIDTH;
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width));
}

export function setSidebarWidth(value: number): void {
  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(value)));
  safeSet(KEY_WIDTH, String(width));
}

export function getFoldedGroups(): string[] {
  const raw = safeGet(KEY_FOLDED);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function setFoldedGroups(groups: string[]): void {
  safeSet(KEY_FOLDED, JSON.stringify(groups));
}
