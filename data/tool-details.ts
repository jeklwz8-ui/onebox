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

interface ToolProfile {
  purpose: string;
  scenarios: string[];
  steps: string[];
  checks: string[];
  mistakes: string[];
  alternatives: string[];
}

const UPDATED_AT = "2026-07-08";

const TOOL_PROFILES: Record<string, ToolProfile> = {
  jsonformatter: {
    purpose: "用于整理、校验和阅读 JSON 数据结构，适合接口联调、日志排查和配置片段检查。",
    scenarios: ["接口返回字段很多，需要快速折叠层级", "日志里复制出一段 JSON，需要确认是否缺少逗号或引号", "产品、测试和开发之间需要对齐字段含义"],
    steps: ["先使用脱敏样例，确认格式化和错误提示是否符合预期", "再粘贴低敏数据，检查字段层级、数组长度和空值位置", "最后把关键字段记录到接口文档或排查记录里"],
    checks: ["能否明确指出语法错误位置", "是否支持折叠层级和复制结果", "页面是否要求不必要的登录或上传文件"],
    mistakes: ["把真实 token、用户资料或生产日志直接粘贴进去", "只看格式化成功，不检查字段语义", "把 Base64 或 URL 编码误认为 JSON 本身的问题"],
    alternatives: ["浏览器开发者工具", "编辑器内置格式化", "本地命令行 jq"],
  },
  regex101: {
    purpose: "用于编写、解释和验证正则表达式，适合文本提取、字段校验和批量清洗前的规则验证。",
    scenarios: ["需要从日志中提取订单号、路径或状态码", "需要校验邮箱、URL、版本号等格式", "批量替换前要确认匹配范围不会过大"],
    steps: ["先准备不含隐私的样例文本", "选择对应语言或正则风格，逐步增加匹配条件", "用反例测试规则，确认不会误匹配"],
    checks: ["是否解释每个表达式片段", "是否能展示捕获组结果", "是否区分全局匹配、多行模式和大小写模式"],
    mistakes: ["直接拿线上日志全文测试", "只用一个正例判断规则正确", "在替换任务中忽略捕获组顺序"],
    alternatives: ["编辑器搜索替换", "本地脚本测试", "语言运行时自带正则工具"],
  },
  postman: {
    purpose: "用于组织 API 请求、环境变量和接口调试记录，适合前后端联调、测试验证和接口说明沉淀。",
    scenarios: ["新接口需要验证参数、状态码和响应结构", "多个环境之间要切换域名和 token", "团队需要共享接口样例和排查结论"],
    steps: ["先建立测试环境集合，避免误打生产接口", "把域名、认证信息和公共参数放到环境变量", "保存成功和失败样例，补充预期状态码"],
    checks: ["请求是否指向正确环境", "敏感变量是否只保存在安全位置", "响应结果是否和后端文档一致"],
    mistakes: ["把生产 token 写死在共享集合里", "只保存成功请求，不记录错误分支", "把接口工具当成正式监控系统"],
    alternatives: ["curl", "HTTPie", "浏览器 Network 面板", "后端测试脚本"],
  },
  caniuse: {
    purpose: "用于查询 Web API、CSS 特性和浏览器兼容情况，适合上线前判断方案是否适合目标用户。",
    scenarios: ["准备使用新的 CSS 属性", "移动端页面出现兼容差异", "需要向团队解释为什么不能直接使用某个新特性"],
    steps: ["先确认目标浏览器和最低版本", "查询特性支持范围和已知限制", "再决定使用原生方案、降级方案或构建工具转换"],
    checks: ["是否覆盖移动端浏览器", "是否存在部分支持或前缀要求", "是否需要结合真实设备测试"],
    mistakes: ["只看桌面端 Chrome 支持就上线", "忽略国内浏览器内核版本差异", "把兼容数据当成实际业务覆盖率"],
    alternatives: ["MDN 兼容表", "真实设备测试", "构建工具兼容配置"],
  },
  vercel: {
    purpose: "用于托管前端和全栈应用，适合预览环境、静态站点、Next.js 项目和轻量接口部署。",
    scenarios: ["需要给团队快速提供预览地址", "希望每次提交自动生成部署结果", "站点以静态内容和前端页面为主"],
    steps: ["先确认项目构建命令和输出目录", "再绑定仓库并检查环境变量", "部署后验证首页、sitemap、robots 和关键路由"],
    checks: ["构建日志是否有警告", "环境变量是否区分预览和生产", "自定义域名和 HTTPS 是否正常"],
    mistakes: ["没有检查预览环境和生产环境差异", "把密钥写入前端变量", "上线后不验证 sitemap 和 ads.txt"],
    alternatives: ["Netlify", "Cloudflare Pages", "自建服务器加 Nginx"],
  },
  netlify: {
    purpose: "用于部署静态站点和前端应用，适合文档站、营销页、工具页和轻量函数服务。",
    scenarios: ["需要把静态站点快速发布到 HTTPS", "需要分支预览和表单处理", "需要通过配置文件管理重定向规则"],
    steps: ["先明确构建命令和发布目录", "配置重定向、headers 和缓存策略", "发布后检查 404、robots、sitemap 和核心页面"],
    checks: ["重定向是否影响 ads.txt", "构建产物是否包含期望页面", "自定义域名是否完成 DNS 验证"],
    mistakes: ["把所有路径重写到首页导致静态文件不可访问", "忽略大小写路径差异", "没有检查部署后的响应头"],
    alternatives: ["Vercel", "Cloudflare Pages", "对象存储静态托管"],
  },
  cloudflare: {
    purpose: "用于 DNS、CDN、安全规则和边缘服务管理，适合站点加速、域名解析和基础安全防护。",
    scenarios: ["需要托管 DNS 并配置 www 跳转", "需要给静态资源加缓存", "需要查看访问、证书和安全事件"],
    steps: ["先迁移并核对 DNS 记录", "确认 SSL 模式和源站证书", "再逐步开启缓存、规则和安全功能"],
    checks: ["A 记录和 CNAME 是否指向正确源站", "SSL 模式是否导致循环跳转", "缓存规则是否误缓存动态页面"],
    mistakes: ["DNS 未生效就修改 Nginx", "开启错误 SSL 模式导致访问异常", "缓存 ads.txt 或 sitemap 后忘记刷新"],
    alternatives: ["DNSPod", "阿里云 DNS", "服务器本地 Nginx 缓存"],
  },
  nginx: {
    purpose: "用于反向代理、HTTPS、静态文件直出和站点跳转控制，适合自建服务器部署 Web 应用。",
    scenarios: ["Next.js 服务运行在 3000 端口，需要通过 80/443 对外访问", "需要把 www 统一跳转到裸域", "需要让 ads.txt 直接由 Nginx 返回"],
    steps: ["先确认后端服务端口可访问", "再配置 server_name、证书和 proxy_pass", "最后用 nginx -t、curl 和日志验证"],
    checks: ["location 顺序是否让 ads.txt 直出", "X-Forwarded-Proto 是否传递", "证书是否覆盖裸域和 www"],
    mistakes: ["后端没启动就排查域名问题", "修改配置后没有 reload", "把所有请求错误地重定向到同一个路径"],
    alternatives: ["Caddy", "Apache", "云平台反向代理"],
  },
  tinypng: {
    purpose: "用于压缩 PNG、JPG、WebP 等图片，适合网站封面、截图、图标和文章配图的体积优化。",
    scenarios: ["首页图片加载过慢", "文章配图体积偏大", "需要在不明显损失清晰度的前提下降低带宽"],
    steps: ["先保留原图备份", "压缩后对比文字、边缘和透明区域", "再替换到站点并检查移动端显示"],
    checks: ["压缩后图片是否仍清晰", "透明背景是否被保留", "文件名和尺寸是否符合页面需要"],
    mistakes: ["把重要证件或未公开设计稿上传处理", "只看体积不看清晰度", "重复压缩导致画质逐步下降"],
    alternatives: ["Squoosh", "本地图片处理软件", "构建时图片压缩插件"],
  },
  chatpdf: {
    purpose: "用于阅读和提问 PDF 内容，适合公开资料、说明文档、白皮书和课程资料的快速梳理。",
    scenarios: ["长 PDF 需要快速提取目录和重点", "需要把公开文档整理成问答笔记", "需要对比多个章节的结论"],
    steps: ["先确认文档是否适合上传", "再用具体问题提问，避免只问笼统总结", "最后回到原文页码核对结论"],
    checks: ["是否能定位到原文依据", "回答是否区分事实和推断", "是否支持删除或管理上传文件"],
    mistakes: ["上传合同、证件或内部资料", "把 AI 摘要当作原文结论", "不核对页码和引用位置"],
    alternatives: ["本地 PDF 阅读器", "浏览器 PDF 搜索", "企业内部知识库"],
  },
  notion: {
    purpose: "用于组织文档、知识库、任务和团队协作信息，适合把零散资料沉淀成结构化页面。",
    scenarios: ["团队需要统一项目说明和会议记录", "个人需要整理学习路径和工具清单", "需要把表格、文档和任务放在同一空间"],
    steps: ["先设计页面层级和命名规则", "把高频模板固定下来", "定期清理过期页面和重复资料"],
    checks: ["权限是否只开放给需要的人", "公开分享页面是否含敏感信息", "模板是否容易被团队复用"],
    mistakes: ["页面越建越多但没有索引", "公开链接长期不关闭", "把任务管理和正式归档混在一起"],
    alternatives: ["语雀", "飞书文档", "本地 Markdown 知识库"],
  },
  processon: {
    purpose: "用于绘制流程图、架构图、思维导图和协作白板，适合把流程和系统关系可视化。",
    scenarios: ["需要说明业务流程或上线步骤", "需要画部署架构和接口调用关系", "团队评审前需要快速统一理解"],
    steps: ["先确定图的目的和读者", "使用统一符号表达角色、系统和数据流", "评审后把最终图和文字说明一起归档"],
    checks: ["图中节点是否能被非作者理解", "箭头方向是否表达真实流程", "共享权限是否正确"],
    mistakes: ["图过于复杂没有重点", "只画图不写关键说明", "把内部架构图公开分享"],
    alternatives: ["Excalidraw", "draw.io", "Figma 白板", "本地绘图工具"],
  },
};

export function getPublicToolDetailResources(): Resource[] {
  const byId = new Map(resources.map((resource) => [resource.id, resource]));
  return PUBLIC_TOOL_DETAIL_IDS.map((id) => byId.get(id)).filter(Boolean) as Resource[];
}

export function getToolDetailBySlug(slug: string): ToolDetail | undefined {
  if (!PUBLIC_TOOL_DETAIL_ID_SET.has(slug)) return undefined;
  const resource = resources.find((item) => item.id === slug);
  const profile = TOOL_PROFILES[slug];
  if (!resource || !profile) return undefined;

  return {
    slug,
    resource,
    title: `${resource.name} 使用指南`,
    description: `${resource.name} 是百宝箱审核期保留的精选工具之一。本文说明它适合解决的问题、推荐使用步骤、安全边界、常见误区和替代方案。`,
    updatedAt: UPDATED_AT,
    asideItems: [
      profile.purpose,
      `适合场景：${profile.scenarios.slice(0, 2).join("；")}。`,
      `使用前检查：${profile.checks.slice(0, 2).join("；")}。`,
      "外部网站规则可能变化，访问前请自行核对官方说明。",
    ],
    sections: createToolSections(resource, profile),
  };
}

function createToolSections(resource: Resource, profile: ToolProfile): ToolDetailSection[] {
  return [
    {
      title: "工具用途和适合场景",
      paragraphs: [
        `${resource.name} ${profile.purpose}百宝箱把它作为精选工具展示，不是为了让用户直接跳转，而是先帮助用户判断它是否适合当前任务。工具本身只解决流程中的一个环节，真正的价值来自明确输入、输出、复核和保存方式。`,
        `比较适合使用 ${resource.name} 的场景包括：${profile.scenarios.join("；")}。如果任务涉及账号、密钥、客户资料、内部日志、未公开文件或财务信息，应优先选择本地工具或组织批准的内部系统。`,
      ],
    },
    {
      title: "推荐使用步骤",
      paragraphs: [
        `建议按这个顺序使用：${profile.steps.join("；")}。这样的顺序可以避免一开始就提交完整内容，也能在工具不适合时及时停止，减少返工和隐私风险。`,
        `如果需要把结果用于正式页面、团队文档或上线流程，处理后还要人工复核。重点检查结果是否完整、格式是否符合预期、关键字段是否被误删，以及后续使用者是否能理解处理过程。`,
      ],
    },
    {
      title: "上线或工作流检查点",
      paragraphs: [
        `使用前可以重点检查：${profile.checks.join("；")}。这些检查点不是形式要求，而是为了确认工具页面和当前任务匹配，避免把一个临时工具错误地放进长期工作流。`,
        `对站长和开发者来说，工具结果还应和真实环境交叉验证。例如部署、接口、DNS、压缩或文档处理任务，都要结合浏览器、命令行、日志或最终页面再次确认，不能只依赖单个页面给出的结果。`,
      ],
    },
    {
      title: "常见误区和替代方案",
      paragraphs: [
        `常见误区包括：${profile.mistakes.join("；")}。这些问题会让简单工具变成风险来源，尤其是在审核、上线、客户项目和多人协作场景中更容易造成误判。`,
        `如果 ${resource.name} 暂时不可访问，或当前任务不适合在线处理，可以考虑：${profile.alternatives.join("、")}。百宝箱建议为高频任务保留至少一个备用方案，并定期清理失效或体验明显下降的入口。`,
      ],
    },
  ];
}
