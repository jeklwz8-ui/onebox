"use client";

import { useMemo, useState } from "react";
import { Copy, RotateCcw, Braces, Clock, Type, Palette, Lock, Link2, Hash } from "lucide-react";

function ToolCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--accent-light)", color: "var(--accent)" }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-[14px] leading-tight" style={{ color: "var(--foreground)" }}>
            {title}
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

const inputStyle = {
  background: "var(--search-bg)",
  borderColor: "var(--card-border)",
  color: "var(--foreground)",
};

const secondaryBtn = "px-3 py-1.5 rounded-lg text-[12px] font-medium transition-opacity hover:opacity-70";
const primaryBtn = "px-3 py-1.5 rounded-lg text-[12px] font-medium text-white transition-opacity hover:opacity-90";
const defaultTimestamp = "1704067200";
const defaultUuids = [
  "018cc251-f0c0-4e9b-8b72-1d2ce6a1a001",
  "018cc251-f0c0-4e9b-8b72-1d2ce6a1a002",
  "018cc251-f0c0-4e9b-8b72-1d2ce6a1a003",
];

function formatTimestamp(value: string) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "时间戳格式错误";
  const ms = value.length === 10 ? num * 1000 : num;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return "时间戳格式错误";

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export default function ToolsPage() {
  const [jsonInput, setJsonInput] = useState('{"name":"百宝箱","type":"tool"}');
  const [timestamp, setTimestamp] = useState(defaultTimestamp);
  const [text, setText] = useState("Hello Developer");

  const formattedJson = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(jsonInput), null, 2);
    } catch {
      return "JSON 格式错误";
    }
  }, [jsonInput]);

  const dateText = useMemo(() => formatTimestamp(timestamp), [timestamp]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ToolCard icon={<Braces size={16} />} title="JSON 格式化" description="粘贴 JSON 字符串，自动格式化输出">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-32 rounded-lg p-3 text-[13px] font-mono outline-none border"
            style={inputStyle}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={() => setJsonInput("")} className={secondaryBtn} style={{ background: "var(--search-bg)", color: "var(--muted)" }}>
              <RotateCcw size={12} className="inline mr-1" />清空
            </button>
            <button onClick={() => copy(formattedJson)} className={primaryBtn} style={{ background: "var(--accent)" }}>
              <Copy size={12} className="inline mr-1" />复制结果
            </button>
          </div>
          <pre className="mt-3 p-3 rounded-lg text-[12px] font-mono overflow-auto max-h-40" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
            {formattedJson}
          </pre>
        </ToolCard>

        <ToolCard icon={<Clock size={16} />} title="时间戳转换" description="支持秒级/毫秒级时间戳转本地时间">
          <input
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full rounded-lg p-3 text-[13px] font-mono outline-none border"
            style={inputStyle}
          />
          <div className="mt-3 p-3 rounded-lg text-[13px]" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
            {dateText}
          </div>
          <button onClick={() => setTimestamp(String(Math.floor(Date.now() / 1000)))} className={`mt-2 ${primaryBtn}`} style={{ background: "var(--accent)" }}>
            使用当前时间
          </button>
        </ToolCard>

        <ToolCard icon={<Type size={16} />} title="文本大小写转换" description="快速转换大小写、统计字符数">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-24 rounded-lg p-3 text-[13px] outline-none border"
            style={inputStyle}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={() => setText(text.toUpperCase())} className={secondaryBtn} style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>转大写</button>
            <button onClick={() => setText(text.toLowerCase())} className={secondaryBtn} style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>转小写</button>
            <button onClick={() => copy(text)} className={primaryBtn} style={{ background: "var(--accent)" }}>复制</button>
          </div>
          <p className="mt-3 text-[12px]" style={{ color: "var(--muted)" }}>
            字符数：{text.length}，单词数：{text.trim() ? text.trim().split(/\s+/).length : 0}
          </p>
        </ToolCard>

        <ToolCard icon={<Palette size={16} />} title="颜色选择器" description="选择颜色并复制 HEX 值">
          <ColorPicker />
        </ToolCard>

        <ToolCard icon={<Lock size={16} />} title="Base64 编解码" description="Base64 加解密常用于编码传输">
          <Base64Tool />
        </ToolCard>

        <ToolCard icon={<Link2 size={16} />} title="URL 编解码" description="对 URL 进行 encodeURIComponent / decode">
          <UrlTool />
        </ToolCard>

        <ToolCard icon={<Hash size={16} />} title="UUID 生成器" description="生成 UUID v4 / 随机 ID">
          <UuidTool />
        </ToolCard>
      </div>
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("百宝箱");
  const encoded = useMemo(() => {
    try { return btoa(unescape(encodeURIComponent(input))); } catch { return "编码失败"; }
  }, [input]);
  const decoded = useMemo(() => {
    try { return decodeURIComponent(escape(atob(input))); } catch { return "解码失败"; }
  }, [input]);
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-20 rounded-lg p-3 text-[13px] font-mono outline-none border"
        style={inputStyle}
        placeholder="输入文本或 Base64…"
      />
      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-lg break-all font-mono" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
          <div className="text-[10px] uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Encode</div>
          {encoded}
        </div>
        <div className="p-2 rounded-lg break-all font-mono" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
          <div className="text-[10px] uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Decode</div>
          {decoded}
        </div>
      </div>
    </div>
  );
}

function UrlTool() {
  const [input, setInput] = useState("https://example.com/?q=中文 边路");
  const encoded = useMemo(() => encodeURIComponent(input), [input]);
  const decoded = useMemo(() => {
    try { return decodeURIComponent(input); } catch { return "解码失败"; }
  }, [input]);
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-20 rounded-lg p-3 text-[13px] font-mono outline-none border"
        style={inputStyle}
      />
      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-lg break-all font-mono" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
          <div className="text-[10px] uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Encode</div>
          {encoded}
        </div>
        <div className="p-2 rounded-lg break-all font-mono" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
          <div className="text-[10px] uppercase font-semibold mb-1" style={{ color: "var(--muted)" }}>Decode</div>
          {decoded}
        </div>
      </div>
    </div>
  );
}

function UuidTool() {
  function gen() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const [list, setList] = useState<string[]>(defaultUuids);
  return (
    <div>
      <div className="flex flex-col gap-1.5 mb-2">
        {list.map((u, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg text-[12px] font-mono" style={{ background: "var(--search-bg)", color: "var(--foreground)" }}>
            <span className="flex-1 break-all">{u}</span>
            <button
              onClick={() => navigator.clipboard.writeText(u)}
              className="shrink-0 p-1 rounded transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
              title="复制"
            >
              <Copy size={12} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setList(Array.from({ length: 3 }, gen))}
        className={primaryBtn}
        style={{ background: "var(--accent)" }}
      >
        <RotateCcw size={12} className="inline mr-1" />重新生成
      </button>
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState("#2563eb");

  async function copyColor() {
    await navigator.clipboard.writeText(color);
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-14 h-12 rounded-lg border cursor-pointer"
        />
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="flex-1 rounded-lg p-3 text-sm outline-none border font-mono"
          style={{ background: "var(--search-bg)", borderColor: "var(--card-border)", color: "var(--foreground)" }}
        />
        <button onClick={copyColor} className={primaryBtn} style={{ background: "var(--accent)" }}>
          <Copy size={12} className="inline mr-1" />复制
        </button>
      </div>
      <div className="mt-3 h-16 rounded-lg" style={{ background: color }} />
    </div>
  );
}
