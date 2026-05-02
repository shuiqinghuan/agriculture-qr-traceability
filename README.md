# 农产品二维码溯源系统

一个基于 `Django + React + PostgreSQL` 的农产品二维码溯源系统，支持扫码查看产品详情、点赞、转发和收藏功能。

## 功能特性

### 产品溯源页面

- 产品基本信息：品种名称、定植地点、定植时间、产品编码
- 图片视频展示：轮播展示产品图片和视频
- 采收质量信息：采收时间、糖度、重量、口感、适应人群和品质小结
- 用户交互：无需登录即可点赞、转发和收藏，包含防刷限制

### 管理后台

- 产品管理
- 二维码生成
- 数据统计

## 技术栈

- 前端：React 18 + TypeScript + Vite + Tailwind CSS
- 后端：Django 5.2 + Django REST Framework
- 数据库：PostgreSQL 15
- 部署：Docker Compose + Nginx + Gunicorn

## 项目结构

```text
agriculture-qr-traceability/
├── backend/                  # Django 后端
├── src/                      # React 前端
├── Dockerfile                # 单镜像构建前后端
├── docker-compose.yml        # db + app 编排
├── nginx.conf                # Nginx 反代和静态资源配置
├── start.sh                  # 容器启动脚本
├── setup-env.sh              # .env 初始化脚本
├── deploy.sh                 # 一键部署脚本
└── .env                      # 环境变量
```

## 快速开始

### Docker 部署

1. 拉取代码

```bash
git clone https://github.com/shuiqinghuan/agriculture-qr-traceability.git
cd agriculture-qr-traceability
```

2. 生成环境文件

```bash
./setup-env.sh
```

3. 修改 [`.env`](/opt/agriculture-qr-traceability/.env) 中的生产配置

```env
DB_NAME=agriculture_qr
DB_USER=admin
DB_PASSWORD=password
DB_HOST=db
DB_PORT=5432
SECRET_KEY=change-me
DEBUG=False
VITE_API_BASE_URL=
```

4. 启动服务

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f app
```

说明：

- 首次启动会自动执行数据库迁移
- 首次启动会自动初始化示例数据
- 前端会在镜像构建时打包到 Nginx 静态目录

5. 访问应用

- 首页：`http://localhost/`
- 示例产品：`http://localhost/product/4395`
- 后台：`http://localhost/admin`
- API：`http://localhost/api/products/4395/`

### Django 后台账号

创建超级管理员：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py createsuperuser"
```

修改管理员密码：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py changepassword admin"
```

## 手动部署

支持手动部署，但推荐优先使用 Docker。手动部署时需自行准备：

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+
- Nginx

后端启动：

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python generate_sample_data.py
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

前端构建：

```bash
npm install
npm run build
```

## 常用命令

查看状态和日志：

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f db
```

执行 Django 管理命令：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py migrate"
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py check"
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python generate_sample_data.py"
```

重新部署：

```bash
docker compose down --remove-orphans
docker compose up -d --build
```

## 简版运维手册

### 后台登录

- 后台地址：`http://服务器IP/admin/`
- 如果你已经创建过管理员，直接使用已有账号登录
- 如果没有管理员账号，执行：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py createsuperuser"
```

### 修改管理员密码

修改指定账号密码：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py changepassword admin"
```

### 备份数据库

导出 PostgreSQL 数据：

```bash
docker compose exec -T db pg_dump -U admin agriculture_qr > backup.sql
```

建议：

- 备份前先确认 [`.env`](/opt/agriculture-qr-traceability/.env) 里的库名和用户名
- 将 `backup.sql` 定期拷走到其他磁盘或对象存储

### 恢复数据库

使用备份文件恢复：

```bash
docker compose exec -T db psql -U admin agriculture_qr < backup.sql
```

如果是全新恢复，建议先停应用：

```bash
docker compose stop app
docker compose exec -T db psql -U admin agriculture_qr < backup.sql
docker compose start app
```

### 升级和重部署

代码更新后重新部署：

```bash
git pull
docker compose up -d --build
```

如果要彻底重建：

```bash
docker compose down --remove-orphans
docker compose up -d --build
```

注意：

- `docker compose down -v` 会删除数据库卷
- 除非你明确要清空数据，否则不要执行 `down -v`

### 检查服务是否正常

查看容器状态：

```bash
docker compose ps
```

查看应用日志：

```bash
docker compose logs -f app
docker compose logs -f db
```

检查接口是否在线：

```bash
curl http://服务器IP/api/products/4395/
```

## 示例数据

系统默认包含两个示例产品：

- `4395`：枣甜5号
- `4396`：有机蔬菜包

## API

- `GET /api/products/`：获取产品列表
- `GET /api/products/{code}/`：获取产品详情
- `POST /api/interactions/`：点赞、分享、收藏

请求示例：

```json
{
  "product_code": "4395",
  "action": "like",
  "device_id": "example-device-id"
}
```

## 已知说明

- 容器内执行 Django 命令时，请使用 `/app/venv/bin/python`，不要直接依赖裸 `python`
- 当前路由由 Nginx 统一回退到前端 `index.html`，`/product/:code` 可直接访问
- 示例数据仅在数据库为空时自动初始化一次
