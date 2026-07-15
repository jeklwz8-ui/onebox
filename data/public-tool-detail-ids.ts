export const PUBLIC_TOOL_DETAIL_IDS = [
  "jsonformatter",
  "regex101",
  "postman",
  "caniuse",
  "vercel",
  "netlify",
  "cloudflare",
  "nginx",
  "tinypng",
  "chatpdf",
  "notion",
  "processon",
] as const;

export const PUBLIC_TOOL_DETAIL_ID_SET = new Set<string>(PUBLIC_TOOL_DETAIL_IDS);

export function isPublicToolDetailId(id: string) {
  return PUBLIC_TOOL_DETAIL_ID_SET.has(id);
}
