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
  checks: string[];
  commands: string[];
  mistakes: string[];
  cautions: string[];
}

export const GUIDE_GROUPS = [
  "站长工具",
  "上线部署",
  "文件处理",
  "图片处理",
  "开发辅助",
  "安全使用",
  "效率办公",
] as const;

const UPDATED_AT = "2026-07-08";

const guideSeeds: GuideSeed[] = [
  {
    slug: "domain-dns-ssl-check-guide",
    title: "域名、DNS 和 SSL 上线检查指南",
    description: "从 A 记录、www 变体、HTTPS 证书和跳转规则出发，检查网站是否能被用户和审核爬虫稳定访问。",
    group: "站长工具",
    focus: "域名和证书检查",
    audience: "使用独立服务器、Nginx 和自有域名部署网站的站长",
    tasks: ["确认裸域和 www 指向正确服务器", "检查 HTTPS 证书覆盖范围", "验证 301 跳转和关键路径"],
    checks: ["DNS 记录是否同时包含 @ 和 www", "证书是否覆盖 baoboxs.top 与 www.baoboxs.top", "HTTP 是否统一跳到 HTTPS"],
    commands: ["dig baoboxs.top", "curl -I https://baoboxs.top", "curl -I https://www.baoboxs.top/ads.txt"],
    mistakes: ["只配置裸域而忽略 www", "证书签发成功后没有重载 Nginx", "DNS 刚修改就立刻判断失败"],
    cautions: ["DNS 生效需要时间", "证书续期后仍要抽查", "www 异常会影响爬虫完整抓取"],
  },
  {
    slug: "robots-sitemap-indexing-check-guide",
    title: "robots.txt 与 sitemap 收录检查指南",
    description: "说明如何让重要页面可抓取，同时避免把薄页面、个人页和审核期隐藏页面提交给搜索引擎。",
    group: "站长工具",
    focus: "抓取与索引管理",
    audience: "准备提交搜索引擎或广告平台审核的网站管理员",
    tasks: ["确认 robots 允许抓取", "只在 sitemap 输出高质量页面", "给薄页面设置 noindex"],
    checks: ["robots.txt 是否返回 200", "sitemap 是否包含信任页和长文", "收藏页和分类薄页是否不在 sitemap"],
    commands: ["curl https://baoboxs.top/robots.txt", "curl https://baoboxs.top/sitemap.xml", "curl -I https://baoboxs.top/guides"],
    mistakes: ["把所有分类页都提交给 sitemap", "误把重要页面 noindex", "robots 写法正确但线上路径返回 404"],
    cautions: ["审核期宁可少提交薄页面", "sitemap 不是越多越好", "修改后要重新检查线上返回"],
  },
  {
    slug: "ads-txt-adsense-check-guide",
    title: "ads.txt 与 AdSense 抓取检查指南",
    description: "围绕 AdSense 所有权验证和广告授权，说明 ads.txt、head 脚本和服务器直出规则的检查方法。",
    group: "站长工具",
    focus: "AdSense 技术验证",
    audience: "正在申请 AdSense 或排查 ads.txt 未找到问题的网站维护者",
    tasks: ["确认 ads.txt 内容正确", "确认 AdSense 脚本在页面 head 中", "避免后端异常影响 ads.txt 抓取"],
    checks: ["ads.txt 是否纯文本返回", "发布商 ID 是否一致", "Nginx 是否可直接返回 ads.txt"],
    commands: ["curl https://baoboxs.top/ads.txt", "curl -I https://baoboxs.top/ads.txt", "curl -s https://baoboxs.top | grep ca-pub"],
    mistakes: ["把 ads.txt 放到错误目录", "只验证 localhost 不验证线上", "Next 服务异常导致 Nginx 返回 502"],
    cautions: ["ads.txt 内容不要多写空格和注释", "证书和 www 跳转也会影响抓取", "修改后等待 AdSense 重新抓取"],
  },
  {
    slug: "nginx-nextjs-proxy-guide",
    title: "Nginx 反向代理 Next.js 网站配置指南",
    description: "说明 Nginx 如何代理本地 3000 端口、配置 HTTPS、处理 www 跳转和静态文件直出。",
    group: "上线部署",
    focus: "Nginx 反向代理",
    audience: "使用云服务器部署 Next.js 应用的个人站长",
    tasks: ["把 80/443 请求转发到 Next 服务", "配置证书和安全跳转", "让 ads.txt 等关键文件稳定返回"],
    checks: ["proxy_pass 是否指向 127.0.0.1:3000", "location 顺序是否正确", "nginx -t 是否通过"],
    commands: ["sudo nginx -t", "sudo systemctl reload nginx", "sudo tail -n 80 /var/log/nginx/error.log"],
    mistakes: ["PM2 未启动却只排查 Nginx", "location / 写在 ads.txt 规则前导致覆盖", "修改配置后忘记 reload"],
    cautions: ["生产配置修改前备份", "证书路径必须和 certbot 输出一致", "502 优先检查本地端口"],
  },
  {
    slug: "pm2-nextjs-deployment-guide",
    title: "PM2 部署 Next.js 服务检查指南",
    description: "介绍用 PM2 管理 Next.js 生产服务的启动、重启、保存、日志和端口验证流程。",
    group: "上线部署",
    focus: "PM2 进程守护",
    audience: "希望让 Next.js 服务在服务器后台稳定运行的站长",
    tasks: ["构建项目", "启动 onebox 进程", "检查 3000 端口和 PM2 日志"],
    checks: ["pm2 list 是否 online", "ss 是否看到 3000 LISTEN", "curl 本地端口是否返回 200"],
    commands: ["npm run build", "pm2 start npm --name onebox -- start", "pm2 logs onebox --lines 80"],
    mistakes: ["进程不存在时执行 pm2 restart", "构建失败后仍启动旧产物", "没有执行 pm2 save"],
    cautions: ["重启前先看构建结果", "不要误杀其他端口服务", "PM2 online 不等于页面一定正常"],
  },
  {
    slug: "website-launch-checklist",
    title: "网站上线前最后检查清单",
    description: "把构建、端口、HTTPS、关键页面、sitemap、robots、ads.txt 和内容质量放到同一张上线检查表里。",
    group: "上线部署",
    focus: "上线验收流程",
    audience: "准备把个人网站提交审核或对外发布的网站维护者",
    tasks: ["确认构建通过", "验证关键页面", "检查内容和技术路径"],
    checks: ["首页和信任页是否 200", "sitemap 是否只含高质量页面", "搜索是否过滤风险词"],
    commands: ["npm run lint", "npm run build", "curl -s \"https://baoboxs.top/api/search?q=policy-test\""],
    mistakes: ["只看浏览器能打开，不看 curl 返回", "忽略 sitemap 中的薄页面", "上线后不查看日志"],
    cautions: ["审核前减少实验功能", "变更后重新完整跑一遍", "保留部署命令记录"],
  },
  {
    slug: "low-value-content-adsense-fix-guide",
    title: "AdSense 低价值内容问题修复指南",
    description: "结合工具站常见问题，说明如何减少纯外链、模板页和薄页面，并用原创内容提升站点价值。",
    group: "站长工具",
    focus: "低价值内容修复",
    audience: "收到 AdSense 需要注意或低价值内容提示的网站所有者",
    tasks: ["识别纯外链页面", "减少模板化详情页", "增强原创指南和信任页面"],
    checks: ["首页是否解释站点价值", "详情页是否有差异化内容", "薄页面是否隐藏入口"],
    commands: ["curl https://baoboxs.top/sitemap.xml", "rg \"risk-keyword\" app data public", "npm run build"],
    mistakes: ["只增加页面数量不提升质量", "把外链卡片包装成详情页", "保留大量相似模板内容"],
    cautions: ["通过率优先时要牺牲部分导航数量", "内容要解决具体问题", "审核期不要展示争议资源"],
  },
  {
    slug: "privacy-cookie-adsense-policy-guide",
    title: "隐私政策、Cookie 与 AdSense 说明写法",
    description: "说明工具站如何在隐私政策中披露本地存储、基础日志、第三方链接和 Google 广告 Cookie。",
    group: "安全使用",
    focus: "隐私与合规说明",
    audience: "需要补齐 AdSense 信任页面的网站维护者",
    tasks: ["说明本地存储用途", "披露 Google AdSense 和 Cookie", "解释第三方链接责任边界"],
    checks: ["隐私页是否全站可访问", "是否提到个性化广告和 Cookie", "是否说明不提供账号系统"],
    commands: ["curl -I https://baoboxs.top/privacy", "curl -s https://baoboxs.top/privacy | grep AdSense"],
    mistakes: ["复制泛用隐私政策但不匹配实际功能", "没有说明第三方链接", "只在 footer 放链接但页面内容很薄"],
    cautions: ["隐私政策要和真实功能一致", "广告上线后仍要保持可访问", "不要承诺无法保证的删除能力"],
  },
  {
    slug: "pdf-processing-safe-workflow",
    title: "PDF 合并、压缩和阅读的安全工作流",
    description: "从公开资料处理出发，说明 PDF 在线处理时如何兼顾效率、隐私和结果质量。",
    group: "文件处理",
    focus: "PDF 处理",
    audience: "需要处理公开报告、课程资料、产品说明和附件的用户",
    tasks: ["合并公开 PDF", "压缩附件体积", "用 AI 或阅读工具提取重点"],
    checks: ["文档是否含隐私信息", "压缩后文字是否清晰", "转换后页码和目录是否正确"],
    commands: ["检查文件大小", "抽查关键页", "保留原始文件"],
    mistakes: ["上传合同或证件", "只看体积不看清晰度", "把 AI 摘要当作原文结论"],
    cautions: ["敏感文档本地处理", "正式文件保留原版", "处理后人工复核"],
  },
  {
    slug: "image-compression-web-performance-guide",
    title: "图片压缩与网页加载性能优化指南",
    description: "说明网站图片体积、格式、尺寸和清晰度之间的取舍，以及上线前如何验证移动端显示。",
    group: "图片处理",
    focus: "图片优化",
    audience: "维护文章配图、工具站封面、截图和产品图片的站长",
    tasks: ["压缩图片体积", "选择 WebP、PNG 或 JPG", "检查移动端显示效果"],
    checks: ["文字截图是否清晰", "透明背景是否保留", "图片尺寸是否匹配容器"],
    commands: ["对比原图和压缩图", "检查移动端页面", "记录替换前后的文件大小"],
    mistakes: ["重复压缩导致失真", "上传未授权图片", "用过大原图直接放进页面"],
    cautions: ["保留原图备份", "公开发布前确认版权", "首屏图片要重点优化"],
  },
  {
    slug: "text-cleaning-dedup-guide",
    title: "文本清洗、去重和批量整理指南",
    description: "介绍如何处理公开文本、关键词列表、表单结果和临时数据，避免批量替换造成误删。",
    group: "效率办公",
    focus: "文本清洗",
    audience: "运营、产品、客服、开发和内容整理人员",
    tasks: ["去重和排序", "清理空行和空格", "批量替换固定字段"],
    checks: ["是否保留原文", "替换规则是否经过样例测试", "输出是否仍能被人工理解"],
    commands: ["复制原始版本", "用小样本验证", "抽查处理后的前后十行"],
    mistakes: ["直接对完整文本批量替换", "忽略中文标点和英文空格差异", "把隐私文本放进在线页面"],
    cautions: ["先备份再处理", "低敏内容适合在线工具", "复杂规则建议本地脚本"],
  },
  {
    slug: "json-api-debugging-guide",
    title: "JSON 与 API 调试工具使用指南",
    description: "面向接口联调和日志排查，说明 JSON 格式化、请求记录、状态码和响应结构的检查方式。",
    group: "开发辅助",
    focus: "接口调试",
    audience: "前端、后端、测试和技术支持人员",
    tasks: ["格式化接口返回", "保存请求样例", "检查状态码和字段结构"],
    checks: ["是否脱敏 token", "是否区分测试和生产环境", "是否记录失败分支"],
    commands: ["curl -I 接口地址", "使用 Postman 保存集合", "用 JSON 工具检查结构"],
    mistakes: ["把生产密钥写进共享集合", "只保存成功请求", "忽略空值和数组长度"],
    cautions: ["生产数据不要外传", "接口结果要结合业务理解", "排查记录要可复现"],
  },
  {
    slug: "regular-expression-testing-guide",
    title: "正则表达式测试与批量替换安全指南",
    description: "说明如何用样例、反例和捕获组检查正则，避免在批量处理时误匹配或误删内容。",
    group: "开发辅助",
    focus: "正则测试",
    audience: "需要从文本、日志、表格或代码片段中提取内容的用户",
    tasks: ["构造正例和反例", "检查捕获组", "验证替换结果"],
    checks: ["是否开启多行模式", "是否匹配过宽", "是否处理了边界字符"],
    commands: ["准备三条正例", "准备三条反例", "替换前先预览结果"],
    mistakes: ["只用一个样例测试", "忽略贪婪匹配", "把真实日志全文粘贴到第三方页面"],
    cautions: ["复杂规则先本地验证", "批量替换前备份", "敏感文本要脱敏"],
  },
  {
    slug: "browser-compatibility-check-guide",
    title: "浏览器兼容性检查指南",
    description: "说明 CSS、Web API 和移动端页面上线前如何结合兼容表、真实设备和降级方案验证。",
    group: "开发辅助",
    focus: "兼容性检查",
    audience: "负责前端页面、移动端 H5 和响应式布局的开发者",
    tasks: ["查询特性兼容", "验证移动端显示", "准备降级方案"],
    checks: ["目标用户浏览器版本", "是否存在部分支持", "是否需要 polyfill 或 CSS 降级"],
    commands: ["查询 Can I use", "用真实手机打开页面", "检查控制台错误"],
    mistakes: ["只在桌面 Chrome 测试", "忽略微信内置浏览器", "新特性没有降级方案"],
    cautions: ["移动端单独验收", "兼容数据要结合用户来源", "上线后继续观察错误日志"],
  },
  {
    slug: "cloudflare-dns-cache-guide",
    title: "Cloudflare、DNS 与缓存规则使用指南",
    description: "介绍 DNS 迁移、缓存规则、SSL 模式和关键文件刷新时的注意事项。",
    group: "站长工具",
    focus: "DNS 与 CDN",
    audience: "使用 Cloudflare 或类似 CDN 服务管理网站的站长",
    tasks: ["核对 DNS 记录", "配置缓存规则", "检查 SSL 模式"],
    checks: ["A 记录是否正确", "ads.txt 是否被误缓存", "SSL 是否导致循环跳转"],
    commands: ["curl -I https://baoboxs.top/ads.txt", "检查 DNS 面板", "刷新 CDN 缓存"],
    mistakes: ["迁移 DNS 后未等待生效", "缓存动态页面", "错误 SSL 模式导致 525 或循环跳转"],
    cautions: ["关键文件修改后刷新缓存", "DNS 变更要留记录", "先小范围开启规则"],
  },
  {
    slug: "vercel-netlify-static-hosting-guide",
    title: "Vercel 与 Netlify 静态托管选择指南",
    description: "对比预览部署、环境变量、重定向规则和自定义域名，帮助判断项目是否适合平台托管。",
    group: "上线部署",
    focus: "平台托管",
    audience: "准备部署前端项目、文档站或轻量工具站的开发者",
    tasks: ["选择托管平台", "配置构建和发布目录", "验证自定义域名"],
    checks: ["项目是否依赖服务器进程", "环境变量是否安全", "重定向是否影响静态文件"],
    commands: ["npm run build", "检查平台构建日志", "curl -I 自定义域名"],
    mistakes: ["把服务端项目当静态站部署", "公开敏感环境变量", "没有验证 sitemap 和 robots"],
    cautions: ["平台规则要和框架匹配", "预览和生产环境分开", "上线后检查实际响应"],
  },
  {
    slug: "notion-knowledge-base-guide",
    title: "Notion 知识库和团队文档整理指南",
    description: "说明如何把工具清单、项目资料、会议记录和学习笔记整理成可维护的知识库。",
    group: "效率办公",
    focus: "知识库整理",
    audience: "需要管理个人资料或小团队协作文档的用户",
    tasks: ["设计页面层级", "沉淀常用模板", "整理项目和会议记录"],
    checks: ["权限是否正确", "页面是否有索引", "过期内容是否归档"],
    commands: ["建立首页目录", "固定模板", "每月清理一次过期页面"],
    mistakes: ["页面越建越多但没有入口", "公开链接长期不关闭", "任务和归档混在一起"],
    cautions: ["敏感资料不要公开分享", "知识库需要维护节奏", "模板要服务真实流程"],
  },
  {
    slug: "process-diagram-workflow-guide",
    title: "流程图和架构图绘制指南",
    description: "从读者、节点、箭头和说明文字出发，帮助把复杂流程画成可评审、可归档的图。",
    group: "效率办公",
    focus: "流程可视化",
    audience: "需要说明业务流程、部署架构或接口关系的产品和开发人员",
    tasks: ["明确图的读者", "统一符号和方向", "把图和文字说明一起归档"],
    checks: ["箭头是否表达真实流向", "节点是否命名清晰", "共享权限是否正确"],
    commands: ["先列节点", "再画主流程", "最后补充异常分支"],
    mistakes: ["图过于复杂没有重点", "只有图没有说明", "内部架构图被公开分享"],
    cautions: ["评审后及时更新", "复杂图拆成多张", "对外图要删去内部细节"],
  },
  {
    slug: "online-tool-reliability-guide",
    title: "如何判断一个在线工具是否可靠",
    description: "从页面说明、隐私边界、输出质量、维护状态和替代方案几个角度评估工具网站。",
    group: "安全使用",
    focus: "工具可靠性判断",
    audience: "希望减少误点、降低隐私风险并建立稳定工具清单的用户",
    tasks: ["判断工具用途", "检查隐私说明", "记录备用方案"],
    checks: ["页面是否说明输入和输出", "是否有异常跳转", "是否要求不必要权限"],
    commands: ["先用样例测试", "查看隐私政策", "记录工具优缺点"],
    mistakes: ["只看免费和速度", "忽略上传文件去向", "长期保留失效入口"],
    cautions: ["重要资料本地处理", "工具清单要定期复查", "不要迷信单一入口"],
  },
  {
    slug: "safe-file-upload-guide",
    title: "在线文件上传和隐私安全指南",
    description: "说明什么时候可以上传文件到在线工具，什么时候应改用本地软件或企业内部系统。",
    group: "安全使用",
    focus: "文件上传安全",
    audience: "经常使用 PDF、图片、表格和压缩工具的普通用户",
    tasks: ["判断文件敏感程度", "确认删除机制", "控制分享链接范围"],
    checks: ["文件是否含个人信息", "页面是否说明保存时间", "分享链接是否可关闭"],
    commands: ["先脱敏", "再小样本测试", "处理后删除临时文件"],
    mistakes: ["把临时文件当成不重要文件", "长期公开分享链接", "忽略截图中的隐私内容"],
    cautions: ["公开资料适合在线处理", "合同证件本地处理", "上传前先检查内容"],
  },
  {
    slug: "ai-office-workflow-guide",
    title: "AI 工具辅助办公的安全工作流",
    description: "说明如何用 AI 做总结、改写、翻译和结构整理，同时避免泄露敏感资料或直接发布错误内容。",
    group: "效率办公",
    focus: "AI 办公辅助",
    audience: "希望用 AI 提高写作、总结和沟通效率的办公用户",
    tasks: ["生成初稿", "总结长文", "整理会议要点"],
    checks: ["输入是否脱敏", "输出是否需要事实核对", "语气是否符合发布场景"],
    commands: ["先写清目标读者", "限制输出结构", "逐条核对事实"],
    mistakes: ["把内部资料直接粘贴到公共工具", "不复核就发布", "把 AI 结论当作证据"],
    cautions: ["AI 适合辅助不适合替代判断", "重要内容人工复核", "保留原始资料"],
  },
  {
    slug: "bookmark-efficiency-workbench-guide",
    title: "把浏览器收藏整理成效率工作台",
    description: "帮助用户把零散收藏按任务重组，形成更容易维护和复用的工具入口。",
    group: "效率办公",
    focus: "收藏整理",
    audience: "收藏夹混乱、经常重复搜索工具入口的用户",
    tasks: ["按任务分类", "给入口写用途说明", "清理长期不用的链接"],
    checks: ["高频入口是否靠前", "低频资料是否归档", "名称是否能解释用途"],
    commands: ["导出旧收藏", "按任务重命名", "每月删除失效入口"],
    mistakes: ["按网站名称堆叠", "收藏后从不复查", "把临时页面长期保留"],
    cautions: ["收藏数量不是价值", "入口要能服务任务", "工具说明比名称更重要"],
  },
  {
    slug: "contact-about-trust-page-guide",
    title: "关于我们、联系方式和服务条款页面完善指南",
    description: "说明工具指南站如何通过信任页面解释站点定位、维护方式、反馈渠道和第三方链接责任。",
    group: "站长工具",
    focus: "信任页面建设",
    audience: "需要提升网站可信度并准备广告审核的网站所有者",
    tasks: ["说明站点定位", "提供公开反馈渠道", "补充服务条款和免责声明"],
    checks: ["信任页是否全站可访问", "联系方式是否真实可用", "第三方链接责任是否说明"],
    commands: ["curl -I https://baoboxs.top/about", "curl -I https://baoboxs.top/contact", "检查 footer 链接"],
    mistakes: ["页面只有一句话", "联系方式不可用", "没有解释外部链接和版权归属"],
    cautions: ["信任页要和站点真实功能一致", "不要承诺无法做到的响应时间", "反馈渠道要长期维护"],
  },
  {
    slug: "search-filter-review-mode-guide",
    title: "审核期搜索过滤和公开资源控制指南",
    description: "说明工具站在审核期如何限制搜索结果、公开资源和 sitemap，避免高风险内容残留。",
    group: "站长工具",
    focus: "审核期资源控制",
    audience: "需要把泛导航站临时收缩成高质量内容站的维护者",
    tasks: ["限制公开资源集合", "过滤搜索结果", "移除 sitemap 中的薄页面"],
    checks: ["敏感词搜索是否为空", "公开工具是否可解释", "构建产物是否不含风险词"],
    commands: ["rg \"risk-keyword\" .next/static app data public", "curl -s \"https://baoboxs.top/api/search?q=policy-test\"", "curl https://baoboxs.top/sitemap.xml"],
    mistakes: ["只隐藏 UI 不过滤 API", "sitemap 仍输出旧页面", "构建产物残留历史资源"],
    cautions: ["审核期以少而精为主", "恢复资源前重新评估政策风险", "搜索接口要服务端过滤"],
  },
];

function createSections(seed: GuideSeed): GuideSection[] {
  return [
    {
      title: `${seed.focus}为什么重要`,
      paragraphs: [
        `${seed.title}面向${seed.audience}。这类任务看起来只是一个小配置或一个小工具选择，但如果处理不当，可能直接影响网站可访问性、审核结果、用户信任或资料安全。百宝箱把它写成指南，是为了让用户先理解判断逻辑，再选择合适工具和操作路径。`,
        `本指南重点覆盖：${seed.tasks.join("；")}。执行时不要只看单个页面是否能打开，而要同时确认输入、输出、复核、记录和回退方式。对站长工具、文件处理、图片处理和开发调试来说，稳定流程比临时搜索一个入口更可靠。`,
      ],
    },
    {
      title: "推荐检查步骤",
      paragraphs: [
        `建议先从低风险样例或只读检查开始，确认方向正确后再处理完整任务。核心检查点包括：${seed.checks.join("；")}。这些检查点可以帮助你判断问题是内容质量、配置错误、缓存延迟、工具选择不当，还是线上环境没有同步。`,
        `如果需要在服务器或线上页面验证，可以使用这些命令或动作作为参考：${seed.commands.join("；")}。命令结果要结合实际页面一起看，例如状态码、响应内容、跳转地址、日志和最终用户看到的页面都要互相印证。`,
      ],
    },
    {
      title: "常见错误",
      paragraphs: [
        `常见错误包括：${seed.mistakes.join("；")}。这些错误往往不是语法问题，而是流程问题：只改本地不部署、只看浏览器不看状态码、只隐藏入口不处理 sitemap、只增加页面数量却没有增加真实说明。`,
        `遇到异常时不要急着重复提交审核或反复切换工具。更稳妥的做法是先记录当前状态，再逐项排查输入、配置、构建、部署、缓存和外部服务。每次只改一个变量，才能判断问题是否真正被修复。`,
      ],
    },
    {
      title: "安全和质量边界",
      paragraphs: [
        `需要特别注意：${seed.cautions.join("；")}。在线工具适合公开资料、测试样例和低敏内容；账号、密钥、合同、客户资料、未公开代码、内部日志和财务信息应优先使用本地工具或组织批准的系统处理。`,
        `质量复核也不能省略。无论是部署配置、PDF 处理、图片压缩、文本清洗还是 API 调试，工具输出都只是中间结果。最终发布前还要检查页面是否可访问、内容是否完整、格式是否正确、隐私边界是否清楚。`,
      ],
    },
    {
      title: "如何沉淀成长期流程",
      paragraphs: [
        `当某个流程被验证有效后，建议把命令、检查点、常见错误和处理结果记录下来。下次遇到同类问题时，可以直接复用这套流程，而不是重新搜索一批入口。百宝箱更强调这种可复用的方法，而不是简单罗列大量外部链接。`,
        `如果后续工具、平台或政策发生变化，应回到本指南的判断标准重新检查。对审核、上线和安全相关任务来说，保持少量高质量入口、清晰说明和定期复查，比追求资源数量更有价值。`,
      ],
    },
    {
      title: "发布前复查清单",
      paragraphs: [
        `正式发布或提交审核前，建议把本指南里的任务整理成一张简短清单：先确认目标和适用人群，再完成${seed.tasks.join("、")}，最后把${seed.checks.join("、")}逐项记录下来。记录不需要复杂，但要能说明何时检查、检查了什么、结果是否符合预期，以及如果失败应该回到哪一步处理。`,
        `复查时还要从用户角度重新打开页面或工具入口，确认标题、说明、按钮、外部链接、移动端显示和错误提示都能被普通用户理解。对涉及网站上线、广告审核、文件处理和隐私安全的场景，建议间隔一段时间后再次验证线上结果，避免缓存、DNS、生效延迟或第三方服务变更造成误判。`,
        `如果这项工作会长期重复，建议固定一个维护节奏，例如每月复查链接、每次上线后复查关键页面、每次工具更换后更新说明。这样既能减少用户遇到失效入口的概率，也能让站点内容持续保持可验证、可解释和可维护。`,
      ],
    },
  ];
}

export const guideArticles: GuideArticle[] = guideSeeds.map((seed) => ({
  slug: seed.slug,
  title: seed.title,
  description: seed.description,
  updatedAt: UPDATED_AT,
  group: seed.group,
  focus: seed.focus,
  audience: seed.audience,
  tasks: seed.tasks,
  cautions: seed.cautions,
  asideItems: [
    `适合：${seed.audience}`,
    `重点：${seed.tasks.join("、")}`,
    `检查：${seed.checks.join("、")}`,
    `注意：${seed.cautions.join("；")}`,
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
