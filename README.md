# 农产品二维码溯源系统

一个基于 React + Convex 的农产品溯源系统，支持扫码查看产品详情、点赞、转发和收藏功能。

## 功能特性

### 产品溯源页面
- **产品基本信息**：显示品种名称、定植地点、定植时间和产品编码
- **图片视频展示**：轮播展示产品图片和视频
- **采收质量信息**：显示采收时间、糖度、重量、口感、适应人群和品质小结
- **用户交互**：无需登录即可点赞、转发和收藏

### 管理后台
- **二维码生成器**：为产品生成可扫描的二维码
- **自定义编码**：支持输入自定义产品编码
- **链接复制**：一键复制产品链接

### 防刷机制
- 设备指纹识别
- 频率限制（5分钟内最多3次操作）
- 操作记录追踪

## 技术栈

- **前端**：React 18 + TypeScript + Vite + Tailwind CSS
- **后端**：Convex (Serverless)
- **路由**：React Router
- **二维码**：qrcode.react
- **图标**：lucide-react
- **部署**：Docker + Nginx

## 快速开始

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问应用：打开浏览器访问 `http://localhost:5173`

### 配置 Convex (可选)

当前版本使用示例数据进行演示。要使用真实的 Convex 后端：

1. 注册 Convex 账号：https://convex.dev
2. 创建新项目
3. 更新 `.env` 文件：
```
VITE_CONVEX_URL=https://your-convex-url.convex.cloud
```
4. 运行 `npx convex dev` 部署 Convex 函数

### Docker 部署

1. 构建 Docker 镜像：
```bash
docker-compose build
```

2. 启动容器：
```bash
docker-compose up -d
```

3. 访问应用：打开浏览器访问 `http://localhost`

## 项目结构

```
/workspace
├── convex/              # Convex 后端代码
│   ├── schema.ts       # 数据库 Schema
│   ├── products.ts     # 产品相关函数
│   ├── interactions.ts # 交互相关函数
│   └── _generated/     # 自动生成的类型
├── src/
│   ├── components/     # React 组件
│   │   ├── ProductInfo.tsx
│   │   ├── MediaGallery.tsx
│   │   ├── HarvestQuality.tsx
│   │   └── InteractionBar.tsx
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx
│   │   ├── ProductPage.tsx
│   │   └── AdminPage.tsx
│   ├── hooks/          # 自定义 Hooks
│   │   └── useAntiSpam.ts
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── package.json
```

## 使用说明

### 查看产品溯源信息
1. 访问首页或扫描产品二维码
2. 查看产品的4个信息模块
3. 在底部进行点赞、转发或收藏操作

### 生成二维码
1. 访问管理后台 (`/admin`)
2. 选择产品编码或输入自定义编码
3. 下载或扫描生成的二维码

## 示例数据

当前包含示例产品：
- **产品编码**：4395
- **品种名称**：枣甜5号
- **产地**：山东省泰安市岱岳区

## 注意事项

1. **Convex 配置**：当前版本使用模拟数据，实际部署需要配置 Convex
2. **图片存储**：生产环境建议使用对象存储服务（如 AWS S3、阿里云 OSS）
3. **HTTPS**：生产部署建议配置 HTTPS
4. **防刷增强**：可根据需要增加 IP 黑名单、验证码等措施

## 许可证

MIT
