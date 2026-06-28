import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "在线工具 - 百宝箱",
  description: "百宝箱在线工具集合，提供 JSON 格式化、时间戳转换、文本处理、颜色选择、Base64 编解码、URL 编解码和 UUID 生成等轻量工具。",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
