import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
        页面不存在
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        您访问的页面不存在，请检查链接是否正确
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
