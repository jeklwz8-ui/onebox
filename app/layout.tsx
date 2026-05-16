import type { Metadata } from "next";
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

const themeInitScript = `
try {
  if (localStorage.getItem("dev-nav-theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch {}
`;

export const metadata: Metadata = {
  title: "开发者导航 - 程序员一站式工具导航",
  description: "程序员一站式导航平台，汇集AI工具、前端、后端、Python、Java等优质开发工具和学习资源",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryCounts = getCategoryCounts();

  return (
    <html lang="zh-CN" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
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
