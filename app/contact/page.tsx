import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "联系方式 - 百宝箱",
  description: "查看百宝箱的公开反馈渠道与收录、纠错、合作联系说明。",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="反馈与合作"
      title="联系方式"
      description="如果您需要提交链接失效、内容纠错、资源收录建议或合作咨询，可以通过以下公开渠道联系站点维护方。"
      updatedAt="2026-05-16"
      asideTitle="适合反馈的问题"
      asideItems={[
        "链接失效、跳转错误或页面无法访问。",
        "资源分类不准确、站点名称错误或描述需要修正。",
        "提交新的工具、学习资源、产品站点或合作建议。",
      ]}
      sections={[
        {
          title: "公开联系渠道",
          content: (
            <>
              <p>
                当前站点以公开在线反馈渠道为主，便于统一处理问题记录和后续跟进。
              </p>
              <ul className="space-y-2">
                <li>
                  GitHub 仓库：
                  <a
                    href="https://github.com/jeklwz8-ui/onebox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 underline decoration-[1.5px] underline-offset-4"
                    style={{ color: "var(--accent)" }}
                  >
                    github.com/jeklwz8-ui/onebox
                  </a>
                </li>
                <li>
                  问题反馈：
                  <a
                    href="https://github.com/jeklwz8-ui/onebox/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 underline decoration-[1.5px] underline-offset-4"
                    style={{ color: "var(--accent)" }}
                  >
                    GitHub Issues
                  </a>
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "提交建议时请尽量包含",
          content: (
            <>
              <p>为了提高处理效率，建议在反馈中提供以下信息：</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>问题页面地址或资源名称。</li>
                <li>错误现象、复现步骤或期望修改内容。</li>
                <li>如为资源推荐，请附上官网地址、分类建议和简要说明。</li>
              </ul>
            </>
          ),
        },
        {
          title: "处理说明",
          content: (
            <>
              <p>
                我们会根据站点维护节奏处理反馈内容。涉及死链、明显错误和安全风险的问题会优先修复；收录建议和合作事项会结合站点定位进行评估。
              </p>
              <p>
                返回首页可继续浏览资源分类，或前往 <Link href="/about" className="underline decoration-[1.5px] underline-offset-4" style={{ color: "var(--accent)" }}>关于我们</Link> 与{" "}
                <Link href="/privacy" className="underline decoration-[1.5px] underline-offset-4" style={{ color: "var(--accent)" }}>
                  隐私政策
                </Link>{" "}
                页面了解更多信息。
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
