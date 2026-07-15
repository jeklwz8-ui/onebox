import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "联系方式 - 百宝箱",
  description: "查看百宝箱的公开反馈渠道、适合提交的问题类型和处理说明。",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="反馈与维护"
      title="联系方式"
      description="如果您需要反馈链接失效、内容错误、风险入口、收录建议或权利相关问题，可以通过公开渠道联系百宝箱维护者。"
      updatedAt="2026-07-08"
      asideTitle="适合反馈的问题"
      asideItems={[
        "链接失效、跳转错误或页面无法访问。",
        "指南内容有误、命令过期或描述不准确。",
        "第三方工具存在风险、争议或不适合继续展示。",
        "权利人要求更正、补充说明或移除入口。",
      ]}
      sections={[
        {
          title: "公开反馈渠道",
          content: (
            <>
              <p>
                当前站点使用 GitHub Issues 作为主要公开反馈渠道，便于记录问题、补充截图和跟踪处理状态。暂不公开邮箱，避免垃圾邮件和无法持续维护的私信渠道。
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  GitHub 仓库：
                  <a
                    href="https://github.com/jeklwz8-ui/onebox"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
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
                    rel="noopener noreferrer nofollow"
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
          title: "提交反馈时建议包含",
          content: (
            <>
              <p>为了更快定位问题，建议在反馈中写清楚页面地址、问题现象、复现步骤和期望处理方式。</p>
              <p>
                如果是链接失效，请提供目标页面和截图；如果是内容纠错，请指出具体段落和建议修正内容；如果是权利或风险问题，请说明相关权利关系、风险类型或希望移除的入口。
              </p>
            </>
          ),
        },
        {
          title: "处理优先级",
          content: (
            <>
              <p>
                明显错误、失效链接、安全风险、权利人反馈和影响用户访问的问题会优先处理。一般收录建议、功能建议和样式建议会结合站点定位、审核期策略和维护成本安排。
              </p>
              <p>
                您也可以先查看 <Link href="/about" className="underline decoration-[1.5px] underline-offset-4" style={{ color: "var(--accent)" }}>关于我们</Link>、
                <Link href="/privacy" className="mx-1 underline decoration-[1.5px] underline-offset-4" style={{ color: "var(--accent)" }}>隐私政策</Link>
                和 <Link href="/terms" className="underline decoration-[1.5px] underline-offset-4" style={{ color: "var(--accent)" }}>服务条款</Link>，了解站点维护边界。
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
