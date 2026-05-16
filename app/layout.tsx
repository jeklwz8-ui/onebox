import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";
import { getCategoryCounts } from "@/data/resources";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  title: "百宝箱 - 程序员一站式工具导航",
  description: "百宝箱是面向开发者和效率用户的一站式资源导航平台，汇集 AI 工具、开发工具、学习资源、云服务和实用网站。",
  keywords: ["百宝箱", "程序员导航", "开发者工具", "AI 工具", "效率工具", "资源导航"],
  openGraph: {
    title: "百宝箱 - 程序员一站式工具导航",
    description: "百宝箱是面向开发者和效率用户的一站式资源导航平台，汇集 AI 工具、开发工具、学习资源、云服务和实用网站。",
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
    <html lang="zh-CN" className={`${geistSans.variable} ${initialThemeClass} h-full`} suppressHydrationWarning>
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
