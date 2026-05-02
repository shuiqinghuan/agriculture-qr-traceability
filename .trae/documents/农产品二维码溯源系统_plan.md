# 农产品二维码溯源系统 - 实施计划

## 1. 项目调研总结

这是一个农产品二维码溯源系统，使用 Django + React 技术栈，并通过 Docker 部署到云服务器。项目已基本完成实现。

## 2. 文件和模块规划

### 2.1 项目结构
```
agriculture-qr-traceability/
├── backend/                    # Django 后端项目
│   ├── config/                # Django 项目配置
│   │   ├── __init__.py
│   │   ├── settings.py       # Django 设置
│   │   ├── urls.py           # URL 路由配置
│   │   └── wsgi.py           # WSGI 入口
│   ├── products/              # 产品应用
│   │   ├── __init__.py
│   │   ├── apps.py           # 应用配置
│   │   ├── models.py         # 数据模型
│   │   ├── serializers.py     # REST Framework 序列化器
│   │   └── views.py          # API 视图
│   ├── manage.py              # Django 管理脚本
│   ├── generate_sample_data.py  # 示例数据生成脚本
│   └── requirements.txt      # Python 依赖
├── src/                       # React 前端项目
│   ├── components/            # React 组件
│   │   ├── ProductInfo.tsx    # 产品信息组件
│   │   ├── MediaGallery.tsx   # 媒体展示组件
│   │   ├── HarvestQuality.tsx  # 采收品质组件
│   │   └── InteractionBar.tsx  # 交互栏组件
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── ProductPage.tsx   # 产品详情页
│   │   └── AdminPage.tsx    # 管理后台
│   ├── hooks/               # 自定义 Hooks
│   │   └── useAntiSpam.ts   # 防刷 Hook
│   ├── services/            # API 服务
│   │   └── api.ts           # API 接口定义
│   ├── App.tsx              # 根组件
│   └── main.tsx             # 入口文件
├── Dockerfile                # Docker 镜像构建文件
├── docker-compose.yml        # Docker Compose 配置
├── nginx.conf               # Nginx 配置文件
├── deploy.sh                # 部署脚本
├── start.sh                 # 启动脚本
├── setup-env.sh             # 环境变量设置脚本
└── .env                     # 环境变量文件
```

## 3. 实施步骤

### 3.1 项目初始化
1. 初始化 React + TypeScript + Vite 项目
2. 配置 Tailwind CSS
3. 初始化 Django 项目
4. 安装必要依赖（qrcode.react, lucide-react, djangorestframework 等）

### 3.2 数据库设计与 Django 配置
1. 创建 Django 数据模型（Product、ProductImage、ProductVideo、UserInteraction）
2. 实现产品查询 API
3. 实现交互处理 API（含防刷逻辑）
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
3. 后端验证逻辑（数据库唯一约束）

### 3.5 Docker 部署配置
1. 创建 Dockerfile
2. 创建 docker-compose.yml
3. 配置 Nginx 反向代理
4. 配置环境变量

### 3.6 测试与验证
1. 测试各功能模块
2. 验证防刷机制
3. 测试响应式布局

## 4. 依赖项与注意事项

### 4.1 核心依赖
- 前端：`react@18` + `react-dom@18` + `react-router-dom` + `qrcode.react` + `lucide-react` + `tailwindcss`
- 后端：`Django@6.0.4` + `djangorestframework` + `psycopg2-binary` + `django-cors-headers` + `gunicorn`
- 数据库：PostgreSQL 15

### 4.2 部署考虑
- 需要配置 PostgreSQL 数据库
- Docker 容器需要网络访问权限
- 云服务器需要开放相应端口（80/443）

### 4.3 安全注意事项
- 不要在前端暴露敏感信息
- 防刷机制需要前后端配合
- 图片视频资源需要可靠存储
- 生产环境使用强密码和 HTTPS

## 5. 风险处理

| 风险 | 影响 | 应对措施 |
|-----|------|---------|
| PostgreSQL 部署配置复杂 | 高 | 使用 Docker 容器化部署，提前准备配置文件 |
| 防刷机制被绕过 | 中 | 多层验证，可后续增强 |
| 响应式布局适配问题 | 中 | 优先移动端测试 |
| Docker 构建失败 | 低 | 准备本地开发环境作为备选 |
