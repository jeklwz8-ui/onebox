import type { Resource } from "./resource-types";
import { resources } from "./resources";
import { PUBLIC_TOOL_DETAIL_IDS, PUBLIC_TOOL_DETAIL_ID_SET } from "./public-tool-detail-ids";

export interface ToolDetailSection {
  title: string;
  paragraphs: string[];
}

export interface ToolDetail {
  slug: string;
  resource: Resource;
  title: string;
  description: string;
  updatedAt: string;
  asideItems: string[];
  sections: ToolDetailSection[];
}

const UPDATED_AT = "2026-06-20";

export function getPublicToolDetailResources(): Resource[] {
  const byId = new Map(resources.map((resource) => [resource.id, resource]));
  return PUBLIC_TOOL_DETAIL_IDS.map((id) => byId.get(id)).filter(Boolean) as Resource[];
}

export function getToolDetailBySlug(slug: string): ToolDetail | undefined {
  if (!PUBLIC_TOOL_DETAIL_ID_SET.has(slug)) return undefined;
  const resource = resources.find((item) => item.id === slug);
  if (!resource) return undefined;

  return {
    slug,
    resource,
    title: `${resource.name} 使用指南`,
    description: `${resource.name} 是百宝箱收录的精选工具，适合用于${resource.subcategory}相关任务。本文从适用场景、使用流程、安全边界和替代方案几个角度说明如何更稳妥地使用。`,
    updatedAt: UPDATED_AT,
    asideItems: [
      "先确认工具解决的问题，再决定是否打开外部网站。",
      "不要把账号、密钥、合同、客户资料等敏感内容粘贴到未知页面。",
      "把高频工具加入收藏，低频工具优先通过指南页查找。",
      "遇到异常跳转、强制安装或过多弹窗时停止使用。",
    ],
    sections: createToolSections(resource),
  };
}

function createToolSections(resource: Resource): ToolDetailSection[] {
  const categoryName = resource.subcategory || resource.category;

  return [
    {
      title: "工具用途和适合场景",
      paragraphs: [
        `${resource.name} 的核心价值在于帮助用户处理${categoryName}相关问题。百宝箱把它放入精选工具详情页，是为了让用户先了解工具用途、适合人群和使用边界，再决定是否访问外部网站。相比直接堆叠链接，详情页能降低误点成本，也能让首次访问的用户知道该工具是否适合当前任务。`,
        `从日常使用看，${resource.name} 更适合公开资料、测试样例、学习研究、开发调试和低敏内容处理。它可以作为工作流中的辅助入口，但不应替代用户对结果的复核。无论是代码、文档、图片、接口还是协作资料，使用前都应先判断内容是否可以交给第三方页面处理。`,
      ],
    },
    {
      title: "推荐使用流程",
      paragraphs: [
        `使用 ${resource.name} 前，建议先明确任务目标：是查询资料、验证格式、整理文档、处理图片，还是辅助开发调试。目标越具体，工具选择越稳定。进入外部页面后，优先查看官方说明、输入要求、输出格式、登录要求和价格限制，再决定是否继续操作。`,
        `如果任务包含多步处理，可以先用一小段样例内容验证结果，再处理完整内容。对于需要保存或发布的结果，建议保留原始文件和处理后的版本，方便回退和对比。百宝箱的收藏功能适合保存长期稳定的工具入口，但不建议把未经验证的临时工具长期固定在工作流中。`,
      ],
    },
    {
      title: "安全和隐私提醒",
      paragraphs: [
        `在线工具最大的风险通常不是功能本身，而是输入内容和页面行为。请避免上传或粘贴身份证件、账号密码、API 密钥、合同、未公开代码、内部日志、客户资料和财务信息。即使工具本身很常见，只要页面没有清楚说明数据处理方式，也不适合处理重要内容。`,
        `访问 ${resource.name} 或同类工具时，如果出现异常跳转、要求安装未知客户端、多个相似下载按钮、浏览器安全警告或与工具用途无关的权限请求，应立即停止操作。对于企业工作、客户项目和生产系统数据，优先使用公司批准的工具或本地软件。`,
      ],
    },
    {
      title: "替代方案和组合使用",
      paragraphs: [
        `${resource.name} 可以和同类工具组合使用。例如先用文档或调试工具整理输入，再用检查工具验证输出，最后把稳定流程记录到收藏或指南中。这样能把一次性的查找行为变成可复用的效率流程，减少反复搜索、反复试错和误点外链。`,
        `如果 ${resource.name} 暂时不可访问，可以回到百宝箱的指南页查看同类任务说明，再选择功能相近、说明清楚、页面干净的替代工具。对于重要工作，建议至少准备一个备用入口，并定期清理长期失效或体验明显变差的工具。`,
      ],
    },
  ];
}
