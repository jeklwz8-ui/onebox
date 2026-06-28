export interface GuideSection {
  title: string;
  paragraphs: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  group: string;
  focus: string;
  audience: string;
  tasks: string[];
  cautions: string[];
  asideItems: string[];
  sections: GuideSection[];
}

interface GuideSeed {
  slug: string;
  title: string;
  description: string;
  group: string;
  focus: string;
  audience: string;
  tasks: string[];
  cautions: string[];
}

export const GUIDE_GROUPS = [
  "文件处理",
  "图片处理",
  "开发辅助",
  "站长工具",
  "效率办公",
  "安全使用",
] as const;

const UPDATED_AT = "2026-06-20";

const guideSeeds: GuideSeed[] = [
  {
    slug: "how-to-choose-reliable-online-tools",
    title: "如何选择可靠的在线工具",
    description: "从安全性、稳定性、输出质量和使用成本出发，判断一个在线工具是否值得长期使用。",
    group: "安全使用",
    focus: "在线工具筛选",
    audience: "经常使用网页工具处理资料、图片、文档和开发调试任务的用户",
    tasks: ["判断工具是否可信", "识别页面风险", "建立常用工具清单"],
    cautions: ["不要只看功能数量", "优先查看隐私说明", "避免处理敏感资料"],
  },
  {
    slug: "online-text-processing-tools",
    title: "在线文本处理工具使用指南",
    description: "整理大小写转换、去重排序、字符统计、格式清洗和批量替换等常用文本处理场景。",
    group: "效率办公",
    focus: "文本处理",
    audience: "需要整理文案、列表、表单内容、日志片段和临时资料的用户",
    tasks: ["清理空行和空格", "批量替换内容", "统计字符和行数"],
    cautions: ["先保留原文备份", "批量替换前先小样本验证", "不要粘贴隐私文本"],
  },
  {
    slug: "json-timestamp-encoding-tools",
    title: "JSON、时间戳和编码转换工具怎么用",
    description: "说明开发调试中常见的 JSON 格式化、时间戳转换、URL 编码和 Base64 编解码用法。",
    group: "开发辅助",
    focus: "格式转换和调试",
    audience: "接口联调、日志排查、数据格式校验和前后端协作人员",
    tasks: ["格式化 JSON", "转换时间戳", "检查编码结果"],
    cautions: ["不要粘贴真实密钥", "区分编码和加密", "结合业务字段复核结果"],
  },
  {
    slug: "image-compression-cropping-format-tools",
    title: "图片压缩、裁剪和格式转换工具指南",
    description: "了解图片压缩、尺寸裁剪、格式转换和批量处理的常用方法，兼顾清晰度与加载速度。",
    group: "图片处理",
    focus: "图片优化",
    audience: "维护网站图片、社交封面、产品截图和演示素材的用户",
    tasks: ["压缩图片体积", "裁剪固定比例", "转换 WebP、PNG 或 JPG"],
    cautions: ["压缩前保留原图", "检查文字是否清晰", "确认图片版权和授权"],
  },
  {
    slug: "pdf-document-processing-tools",
    title: "PDF 与文档处理工具选择建议",
    description: "从合并拆分、压缩、格式转换、签名和隐私风险角度，选择合适的 PDF 与文档处理工具。",
    group: "文件处理",
    focus: "文档处理",
    audience: "需要处理课程资料、说明文档、简历、报告和公开 PDF 的用户",
    tasks: ["合并或拆分页码", "压缩文档大小", "检查转换排版"],
    cautions: ["合同和证件优先本地处理", "转换后人工检查", "不要上传内部资料"],
  },
  {
    slug: "temporary-file-privacy-safety",
    title: "临时文件处理和隐私安全注意事项",
    description: "说明临时上传、文件转换、在线解压和分享链接时应注意的隐私、安全与删除问题。",
    group: "安全使用",
    focus: "文件隐私",
    audience: "需要频繁上传、转换、分享临时文件的个人用户和小团队",
    tasks: ["判断文件敏感程度", "确认删除机制", "控制分享范围"],
    cautions: ["临时文件也可能含隐私", "公开链接不要长期保留", "重要资料优先本地处理"],
  },
  {
    slug: "browser-bookmarks-efficiency-workbench",
    title: "浏览器收藏夹如何整理成效率工作台",
    description: "把零散收藏变成按任务组织的工具工作台，减少重复搜索和低效跳转。",
    group: "效率办公",
    focus: "收藏整理",
    audience: "收藏夹混乱、经常重复搜索工具入口的用户",
    tasks: ["按任务分类收藏", "给入口添加用途说明", "定期清理失效链接"],
    cautions: ["不要按网站名称堆叠", "低频入口定期归档", "收藏应服务实际任务"],
  },
  {
    slug: "ai-tools-for-office-work",
    title: "AI 工具如何辅助日常办公",
    description: "介绍 AI 工具在写作、总结、翻译、表格整理和方案草拟中的合理用法与注意事项。",
    group: "效率办公",
    focus: "AI 办公辅助",
    audience: "希望用 AI 提升写作、整理、归纳和沟通效率的办公用户",
    tasks: ["生成初稿", "总结长文本", "整理待办和结构"],
    cautions: ["输出内容需要复核", "不要提交敏感资料", "重要结论要核对来源"],
  },
  {
    slug: "developer-online-debugging-tools",
    title: "开发者常用在线调试工具清单",
    description: "整理开发者在接口、格式、编码、样式和兼容性排查中常用的在线辅助工具。",
    group: "开发辅助",
    focus: "开发调试",
    audience: "前端、后端、测试和技术支持人员",
    tasks: ["验证接口返回", "检查样式兼容", "格式化片段内容"],
    cautions: ["生产数据不要外传", "复杂问题回到本地复现", "工具结果不是最终判断"],
  },
  {
    slug: "webmaster-check-tools",
    title: "网站管理员常用检测工具说明",
    description: "说明站长在上线、排障和日常维护中常用的 DNS、SSL、性能、收录和可访问性检测方式。",
    group: "站长工具",
    focus: "网站检测",
    audience: "维护个人网站、工具站、内容站和小型业务网站的站长",
    tasks: ["检查 DNS 解析", "确认 HTTPS 状态", "验证 sitemap 和 robots"],
    cautions: ["变更后等待解析生效", "不要忽视 www 变体", "上线后持续观察日志"],
  },
  {
    slug: "archive-and-extract-file-safety",
    title: "文件压缩与解压工具安全指南",
    description: "介绍压缩包处理、格式识别、解压目录、文件大小和安全检查的实用方法。",
    group: "文件处理",
    focus: "压缩文件处理",
    audience: "经常接收资料包、上传附件或整理项目文件的用户",
    tasks: ["识别压缩格式", "压缩公开资料", "整理交付文件"],
    cautions: ["陌生文件先扫描", "不要执行未知程序", "解压前确认来源"],
  },
  {
    slug: "color-icon-design-helper-tools",
    title: "颜色、图标和设计辅助工具怎么选",
    description: "从配色、图标、截图、样式预览和设计协作角度，选择适合日常工作的设计辅助工具。",
    group: "图片处理",
    focus: "设计辅助",
    audience: "需要快速处理视觉素材、图标和页面样式的产品、运营和开发人员",
    tasks: ["选择配色", "整理图标", "生成展示截图"],
    cautions: ["确认素材授权", "保持品牌风格一致", "不要上传未公开设计稿"],
  },
  {
    slug: "cloud-service-deployment-basics",
    title: "云服务和部署工具入门说明",
    description: "面向新手说明服务器、域名、HTTPS、进程守护、反向代理和基础监控的部署概念。",
    group: "站长工具",
    focus: "云部署入门",
    audience: "准备把网站部署到服务器或云平台的个人站长",
    tasks: ["理解域名解析", "配置 HTTPS", "检查进程和端口"],
    cautions: ["部署前备份代码", "不要随意开放端口", "证书续期要验证"],
  },
  {
    slug: "online-learning-resource-filtering",
    title: "在线学习资源如何筛选",
    description: "说明如何根据内容更新、作者背景、示例质量和学习路径选择可靠的在线学习资源。",
    group: "效率办公",
    focus: "学习资源筛选",
    audience: "需要系统学习开发、设计、效率和站长知识的用户",
    tasks: ["判断资源质量", "整理学习路径", "记录实践笔记"],
    cautions: ["不要只看标题吸引力", "优先选择可复现示例", "避免同时收藏过多课程"],
  },
  {
    slug: "how-to-evaluate-tool-websites",
    title: "如何判断一个工具网站是否可靠",
    description: "从页面体验、功能边界、隐私说明、维护状态和用户反馈几个维度评估工具网站。",
    group: "安全使用",
    focus: "工具网站评估",
    audience: "希望减少误点、降低数据风险并建立稳定工具清单的用户",
    tasks: ["检查页面可信度", "评估功能边界", "记录替代方案"],
    cautions: ["不要被夸张描述影响", "谨慎处理上传型任务", "定期复查收藏入口"],
  },
  {
    slug: "text-dedup-sort-workflow",
    title: "文本去重、排序和清洗工作流",
    description: "用低风险方式整理列表、关键词、表单结果和临时文本，减少人工复制粘贴错误。",
    group: "效率办公",
    focus: "文本清洗",
    audience: "运营、产品、客服、开发和数据整理人员",
    tasks: ["去除重复行", "按字母或数字排序", "统一标点和空格"],
    cautions: ["处理前保留原始版本", "注意中文和英文空格差异", "批量操作后抽样检查"],
  },
  {
    slug: "markdown-writing-format-guide",
    title: "Markdown 写作和格式整理指南",
    description: "说明 Markdown 在说明文档、发布稿、项目记录和知识库中的使用方式。",
    group: "效率办公",
    focus: "结构化写作",
    audience: "需要写说明文档、项目日志、教程和知识库内容的用户",
    tasks: ["整理标题层级", "插入代码块", "输出清晰列表"],
    cautions: ["发布前预览格式", "不要过度嵌套层级", "图片链接要可访问"],
  },
  {
    slug: "spreadsheet-csv-cleaning-guide",
    title: "表格和 CSV 清洗工具使用建议",
    description: "介绍表格导入、字段拆分、编码检查、去重和导出前检查的常见做法。",
    group: "文件处理",
    focus: "表格清洗",
    audience: "需要整理导出表格、名单、库存或统计数据的用户",
    tasks: ["检查字段分隔符", "清理重复行", "统一编码和日期格式"],
    cautions: ["个人信息要脱敏", "导入前复制备份", "注意逗号和换行导致的错列"],
  },
  {
    slug: "pdf-merge-split-compress-guide",
    title: "PDF 合并、拆分和压缩实用指南",
    description: "围绕公开 PDF 的轻量处理，说明合并、拆分、压缩和结果检查的步骤。",
    group: "文件处理",
    focus: "PDF 轻量处理",
    audience: "处理公开报告、课程资料、产品说明和投递附件的用户",
    tasks: ["合并多个文件", "拆分指定页码", "压缩附件大小"],
    cautions: ["敏感文档不要上传", "压缩后检查清晰度", "正式文件保留原版"],
  },
  {
    slug: "image-background-size-guide",
    title: "图片背景、尺寸和格式处理指南",
    description: "说明封面图、头像、截图和网站素材在尺寸、背景、比例和格式上的处理思路。",
    group: "图片处理",
    focus: "图片尺寸整理",
    audience: "需要处理头像、封面、文章插图和网站素材的用户",
    tasks: ["调整尺寸比例", "压缩体积", "选择合适格式"],
    cautions: ["不要拉伸重要图像", "透明背景保留 PNG", "发布前检查移动端效果"],
  },
  {
    slug: "webmaster-robots-sitemap-check-guide",
    title: "robots.txt 与 sitemap 检查指南",
    description: "说明站点上线前如何检查 robots、sitemap、重要页面收录路径和薄页面暴露风险。",
    group: "站长工具",
    focus: "收录基础检查",
    audience: "准备提交搜索引擎或广告平台审核的网站管理员",
    tasks: ["验证 robots 允许抓取", "更新 sitemap", "排除不适合索引的薄页面"],
    cautions: ["不要屏蔽重要页面", "审核期减少低价值页面", "变更后重新请求抓取"],
  },
  {
    slug: "domain-dns-ssl-check-guide",
    title: "域名、DNS 和 SSL 检查指南",
    description: "说明域名解析、www 跳转、HTTPS 证书和常见访问异常的检查顺序。",
    group: "站长工具",
    focus: "域名和证书",
    audience: "使用独立服务器和自有域名部署网站的站长",
    tasks: ["确认 A 记录", "检查 www 跳转", "验证证书覆盖域名"],
    cautions: ["DNS 生效需要时间", "证书要覆盖裸域和 www", "配置后使用 curl 验证"],
  },
  {
    slug: "api-testing-request-notes",
    title: "接口测试和请求记录工具指南",
    description: "说明如何使用接口测试工具记录请求参数、响应结构、状态码和排障结论。",
    group: "开发辅助",
    focus: "接口测试",
    audience: "需要联调 API、定位错误和记录请求样例的开发测试人员",
    tasks: ["整理请求参数", "保存响应样例", "检查状态码和耗时"],
    cautions: ["脱敏 token 和账号", "区分测试环境和生产环境", "不要公开内部接口地址"],
  },
  {
    slug: "frontend-debugging-workflow",
    title: "前端调试工具工作流",
    description: "围绕浏览器开发者工具、兼容性查询、样式检查和在线示例复现建立调试流程。",
    group: "开发辅助",
    focus: "前端调试",
    audience: "处理页面样式、脚本错误、兼容性和组件交互的前端开发者",
    tasks: ["定位控制台错误", "检查响应式布局", "验证浏览器兼容性"],
    cautions: ["不要只看本机效果", "移动端要单独验证", "线上问题保留复现记录"],
  },
  {
    slug: "cloud-deployment-checklist",
    title: "云部署上线前检查清单",
    description: "整理网站上线前需要确认的依赖安装、构建、进程、端口、反向代理和访问验证步骤。",
    group: "站长工具",
    focus: "上线检查",
    audience: "使用云服务器、PM2、Nginx 和域名部署网站的用户",
    tasks: ["运行生产构建", "检查端口占用", "验证 Nginx 和 HTTPS"],
    cautions: ["不要覆盖其他服务端口", "更新前备份目录", "上线后检查关键路径"],
  },
  {
    slug: "password-and-link-safety-guide",
    title: "密码、链接和账号安全使用指南",
    description: "说明在线工具使用过程中如何保护密码、登录状态、分享链接和账号权限。",
    group: "安全使用",
    focus: "账号安全",
    audience: "经常登录多种网页服务并分享链接协作的用户",
    tasks: ["识别可疑链接", "管理登录状态", "控制分享权限"],
    cautions: ["不要复用重要密码", "陌生页面不授权登录", "分享链接定期关闭"],
  },
  {
    slug: "file-format-conversion-safety",
    title: "文件格式转换的安全和质量检查",
    description: "说明文档、图片、表格和压缩文件转换时如何兼顾结果质量和数据安全。",
    group: "文件处理",
    focus: "格式转换",
    audience: "需要在不同平台之间转换文件格式的用户",
    tasks: ["确认目标格式", "检查转换结果", "保留原始文件"],
    cautions: ["敏感文件本地处理", "注意格式丢失", "正式发布前人工校对"],
  },
  {
    slug: "online-collaboration-tools-guide",
    title: "在线协作工具选择指南",
    description: "从文档、白板、项目管理和团队沟通角度，选择适合团队规模的协作工具。",
    group: "效率办公",
    focus: "团队协作",
    audience: "需要多人同步文档、流程、任务和会议结论的小团队",
    tasks: ["整理协作文档", "分配任务状态", "沉淀会议结论"],
    cautions: ["权限要按角色设置", "重要资料避免公开链接", "离职成员及时移除"],
  },
  {
    slug: "design-asset-organization-guide",
    title: "设计素材整理和复用指南",
    description: "介绍图标、截图、配色、组件截图和视觉素材的命名、归档与复用方式。",
    group: "图片处理",
    focus: "素材管理",
    audience: "产品、设计、运营和开发协作时需要复用视觉资料的用户",
    tasks: ["规范素材命名", "按项目归档", "维护常用组件截图"],
    cautions: ["确认素材授权", "避免混用旧版本", "对外发布前复核品牌规范"],
  },
  {
    slug: "ai-prompt-workflow-guide",
    title: "AI 提示词工作流整理指南",
    description: "说明如何把常用 AI 提示词整理成可复用模板，并控制输出质量和隐私边界。",
    group: "效率办公",
    focus: "AI 工作流",
    audience: "希望稳定复用 AI 写作、总结、翻译和分析流程的用户",
    tasks: ["沉淀提示词模板", "规定输出结构", "复核事实和语气"],
    cautions: ["不要输入敏感资料", "不要把结果直接发布", "模板要随任务调整"],
  },
];

function createSections(seed: GuideSeed): GuideSection[] {
  const tasks = seed.tasks.join("、");
  const cautions = seed.cautions.join("；");

  return [
    {
      title: `先理解${seed.focus}要解决的问题`,
      paragraphs: [
        `${seed.title}的重点不是收集更多链接，而是把任务、输入内容、处理步骤和输出结果整理清楚。对于${seed.audience}来说，工具只是流程中的一个环节。先确定自己要完成的是${tasks}，再选择合适的页面和功能，可以减少误点、重复尝试和结果不可控的问题。`,
        `百宝箱把这类内容写成指南，是为了让用户先获得判断标准，再决定是否打开某个工具。一个可靠的工具页面通常会说明适用场景、输入限制、输出格式、隐私规则和使用成本。如果页面只强调速度、免费和全能，却不解释处理方式，就不适合承担重要任务。`,
      ],
    },
    {
      title: "建立低风险的操作步骤",
      paragraphs: [
        `处理${seed.focus}任务时，建议先准备一份低敏样例，用样例确认功能和结果，再处理完整资料。这样做可以避免一次性提交大量内容后才发现格式错误、输出不符合预期或页面存在额外限制。对于需要长期保存的结果，还应保留原始版本，方便回退和对比。`,
        `如果任务涉及多人协作，可以把处理步骤写成固定说明：输入内容来自哪里，使用哪个工具，输出结果如何命名，谁负责复核，最终保存到什么位置。工具越简单，流程越需要清晰；流程越清晰，后续更换工具时成本也越低。`,
      ],
    },
    {
      title: "安全边界和质量复核",
      paragraphs: [
        `使用在线工具时需要始终关注边界：${cautions}。公开资料、测试样例、学习练习和临时低敏内容通常可以在线处理；账号、密钥、合同、客户资料、内部日志、未公开代码和财务信息应优先使用本地软件或组织批准的系统。`,
        `工具输出不等于最终结果。无论是格式转换、文本整理、图片处理、接口调试还是 AI 辅助，都要进行人工复核。复核时重点查看关键字段、文字清晰度、日期和数字、链接是否有效、权限是否正确，以及结果是否符合实际业务语境。`,
      ],
    },
    {
      title: "把工具沉淀成可复用工作台",
      paragraphs: [
        `当某个工具长期稳定、说明清楚、输出可靠并且没有明显干扰时，可以把它加入收藏或固定到工作流中。相反，如果工具经常失效、跳转异常、弹窗过多或结果不稳定，就应及时移出。工具工作台的价值不是数量多，而是每个入口都能解释清楚用途。`,
        `建议定期检查收藏和指南：删除失效入口，更新替代工具，补充使用说明，并把高频任务放在更容易找到的位置。这样百宝箱就不只是外链列表，而是围绕真实任务组织的效率工作台，用户可以从指南开始理解场景，再进入合适的工具详情页。`,
      ],
    },
  ];
}

export const guideArticles: GuideArticle[] = guideSeeds.map((seed) => ({
  ...seed,
  updatedAt: UPDATED_AT,
  asideItems: [
    `适合：${seed.audience}`,
    `常见任务：${seed.tasks.join("、")}`,
    `注意事项：${seed.cautions.join("；")}`,
  ],
  sections: createSections(seed),
}));

export function getGuideBySlug(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}

export function getGuideSections(article: GuideArticle) {
  return article.sections;
}

export function getGuidesByGroup() {
  return GUIDE_GROUPS.map((group) => ({
    group,
    articles: guideArticles.filter((article) => article.group === group),
  })).filter((section) => section.articles.length > 0);
}
