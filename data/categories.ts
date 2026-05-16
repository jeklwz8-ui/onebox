export interface Category {
  id: string;
  label: string;
  icon?: string;
  description: string;
}

export const categories: Category[] = [
  { id: "home", label: "首页", icon: "🏠", description: "全部精选资源与效率工具" },
  { id: "recommend", label: "常用推荐", description: "高频使用的在线工具、开发入口与效率资源" },
  { id: "hot", label: "热门推荐", description: "近期热度较高的工具与站点" },
  { id: "ai", label: "AI 助手", description: "对话、编程、智能体、模型社区与提示词工具" },
  { id: "ai-launch", label: "AI 创作", description: "AI 图片、视频、音频、音乐与创作工具" },
  { id: "frontend", label: "前端开发", description: "前端框架、构建、样式与组件资源" },
  { id: "backend", label: "后端开发", description: "后端框架、运行时、中间件与服务端资源" },
  { id: "devtools", label: "开发工具", description: "IDE、调试、代码托管、终端与工程化工具" },
  { id: "editor", label: "编辑工具", description: "编辑器、文档排版、在线绘图与代码美化" },
  { id: "plugins", label: "插件助手", description: "浏览器、IDE、VS Code 等常用插件" },
  { id: "efficiency", label: "效率工具", description: "提效、笔记、项目管理、文档处理与实用工具" },
  { id: "software", label: "协同软件", description: "协作办公、邮箱、远程控制、网络穿透与团队工具" },
  { id: "storage", label: "存储资源", description: "网盘、传输、资源搜索、软件下载与 NAS" },
  { id: "cloud", label: "云服务商", description: "国内外云计算、部署、BaaS 与边缘平台" },
  { id: "api", label: "API 接口", description: "API 调试、开放平台、数据接口与 Mock 工具" },
  { id: "security", label: "信息安全", description: "安全标准、漏洞情报、安全检测与渗透工具" },
  { id: "python", label: "Python", description: "Python 生态、框架、数据科学与自动化工具" },
  { id: "java", label: "Java", description: "Java 生态、框架、构建和中间件资源" },
  { id: "database", label: "数据库", description: "关系型、NoSQL、搜索引擎和数据库管理工具" },
  { id: "mobile", label: "移动开发", description: "跨平台、原生移动端和云开发资源" },
  { id: "bigdata", label: "大数据 & 云", description: "大数据、容器、编排与云原生资源" },
  { id: "algorithm", label: "算法 & 面试", description: "刷题、竞赛、面试和练习平台" },
  { id: "community", label: "技术社区", description: "开发者社区、开放平台、资讯与交流站点" },
  { id: "docs", label: "学习书籍", description: "教程、电子书、学习路线、课程与文档资料" },
  { id: "design", label: "图片设计", description: "图片资源、在线设计、图床、截图录屏、配色与字体" },
  { id: "media", label: "音乐影视", description: "音乐音频、影视资源、视频素材与磁力搜索" },
  { id: "jobs", label: "求职副业", description: "招聘、远程工作、简历模板与副业平台" },
  { id: "gov", label: "政务门户", description: "政府、备案、企业信息、税务和知识产权查询" },
  { id: "moyu", label: "摸鱼专区", description: "资讯、小游戏、休闲娱乐和健康工具" },
  { id: "more", label: "更多工具", description: "站长助手、数据查询和其他长尾工具" },
];
