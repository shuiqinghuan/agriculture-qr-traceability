# 农产品二维码溯源系统 - 实施计划

## 1. 项目调研总结

这是一个全新的项目，工作目录目前为空。需要从零开始构建一个农产品二维码溯源系统，使用 React + Convex 技术栈，并通过 Docker 部署到云服务器。

## 2. 文件和模块规划

### 2.1 项目结构
```
/workspace/
├── convex/                    # Convex 后端代码
│   ├── schema.ts            # 数据库 schema
│   ├── products.ts          # 产品相关函数
│   ├── interactions.ts      # 交互相关函数
│   └── _generated/          # 自动生成的类型
├── src/                      # React 前端代码
│   ├── components/          # 组件
│   │   ├── ProductInfo.tsx
│   │   ├── MediaGallery.tsx
│   │   ├── HarvestQuality.tsx
│   │   └── InteractionBar.tsx
│   ├── pages/              # 页面
│   │   ├── ProductPage.tsx
│   │   └── AdminPage.tsx
│   ├── hooks/              # 自定义 hooks
│   │   └── useAntiSpam.ts
│   ├── utils/              # 工具函数
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── Dockerfile              # Docker 配置
├── docker-compose.yml      # Docker Compose 配置
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── convex.json             # Convex 配置
```

## 3. 实施步骤

### 3.1 项目初始化
1. 初始化 React + TypeScript + Vite 项目
2. 配置 Tailwind CSS
3. 初始化 Convex 项目
4. 安装必要依赖（qrcode.react, lucide-react 等）

### 3.2 数据库设计与 Convex 配置
1. 创建 Convex Schema（products 和 interactions 表）
2. 实现产品查询函数
3. 实现交互处理函数（含防刷逻辑）
4. 插入示例数据（如枣甜5号，编码4395）

### 3.3 前端页面开发
1. 创建产品溯源页面
2. 实现产品基本信息组件
3. 实现图片视频展示组件
4. 实现采收质量信息组件
5. 实现用户交互组件（点赞、转发、收藏）

### 3.4 防刷机制实现
1. 设备指纹生成（localStorage）
2. 前端频率限制
3. 后端验证逻辑

### 3.5 Docker 部署配置
1. 创建 Dockerfile
2. 创建 docker-compose.yml
3. 配置环境变量

### 3.6 测试与验证
1. 测试各功能模块
2. 验证防刷机制
3. 测试响应式布局

## 4. 依赖项与注意事项

### 4.1 核心依赖
- `react@18` + `react-dom@18`
- `convex` (Convex SDK)
- `react-router-dom` (路由)
- `qrcode.react` (二维码生成)
- `lucide-react` (图标)
- `tailwindcss` (样式)

### 4.2 部署考虑
- 需要配置 Convex 部署 URL
- Docker 容器需要网络访问权限
- 云服务器需要开放相应端口

### 4.3 安全注意事项
- 不要在前端暴露 Convex 私钥
- 防刷机制需要前后端配合
- 图片视频资源需要可靠存储

## 5. 风险处理

| 风险 | 影响 | 应对措施 |
|-----|------|---------|
| Convex 部署配置复杂 | 高 | 提前查阅官方文档，准备备用方案 |
| 防刷机制被绕过 | 中 | 多层验证，可后续增强 |
| 响应式布局适配问题 | 中 | 优先移动端测试 |
| Docker 构建失败 | 低 | 准备本地开发环境作为备选 |
