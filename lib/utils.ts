export function getFaviconUrl(url: string, icon?: string): string {
  if (icon) return icon;
  try {
    const domain = new URL(url).origin;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}
