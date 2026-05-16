# 百宝箱

百宝箱是面向开发者和效率用户的一站式资源导航平台，基于 Next.js + React + TailwindCSS 构建。

## 功能

- 分类导航：首页、AI、AI出海、前端、后端、Python、Java、数据库、开发工具、算法面试、技术社区等
- 资源卡片：图标、名称、简介、访问链接、书签、收藏
- 搜索：顶部实时搜索所有资源
- 书签/收藏：基于 localStorage 本地保存
- 摸鱼专区：休闲娱乐网站集合
- 在线工具：JSON格式化、时间戳转换、文本大小写转换、颜色选择器
- 深色模式与响应式布局

## 数据维护

所有导航链接集中在：

```txt
data/resources.ts
```

后续提供真实链接后，只需要替换或追加这里的数据即可：

```ts
{
  id: "unique-id",
  name: "网站名称",
  url: "https://example.com",
  description: "网站简介",
  category: "frontend",
  subcategory: "前端开发",
}
```

分类定义在：

```txt
data/categories.ts
```

## 本地开发

```bash
npm install
npm run dev
```

访问：

```txt
http://localhost:3000
```

## 构建

```bash
npm run build
npm run start
```

## 部署到服务器

### 方式一：Node.js 服务器

```bash
npm install
npm run build
npm run start
```

默认端口是 `3000`，可以使用 Nginx 反向代理到域名。

### 方式二：PM2 常驻运行

```bash
npm install -g pm2
npm install
npm run build
pm2 start npm --name dev-nav -- start
pm2 save
```

### 方式三：Vercel / Netlify

将代码推送到 GitHub 后，在 Vercel 或 Netlify 导入仓库即可自动部署。
