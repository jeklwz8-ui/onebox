import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";
import { getCategoryCounts } from "@/data/resources";

const THEME_KEY = "dev-nav-theme";

const themeInitScript = `
try {
  var theme = localStorage.getItem("${THEME_KEY}");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
  }
} catch {}
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://baoboxs.top"),
  title: "百宝箱 - 工具指南与效率工作台",
  description: "百宝箱是面向开发者、站长和效率用户的工具指南平台，提供原创使用指南、精选工具详情、在线工具、安全建议和网站管理参考。",
  keywords: ["百宝箱", "工具指南", "效率工具", "开发者工具", "站长工具", "在线工具", "AI 工具"],
  openGraph: {
    title: "百宝箱 - 工具指南与效率工作台",
    description: "百宝箱是面向开发者、站长和效率用户的工具指南平台，提供原创使用指南、精选工具详情、在线工具、安全建议和网站管理参考。",
    url: "https://baoboxs.top",
    siteName: "百宝箱",
    locale: "zh_CN",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryCounts = getCategoryCounts();
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get(THEME_KEY)?.value;
  const initialThemeClass = savedTheme === "dark" ? "dark" : "";

  return (
    <html lang="zh-CN" className={`${initialThemeClass} h-full`} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8170147848957876"
          crossOrigin="anonymous"
        />
      </head>
      <body className="h-full antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <AppShell categoryCounts={categoryCounts}>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
