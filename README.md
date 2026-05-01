# 农产品二维码溯源系统

一个基于 Django + React 的农产品溯源系统，支持扫码查看产品详情、点赞、转发和收藏功能。

## 功能特性

### 产品溯源页面
- **产品基本信息**：显示品种名称、定植地点、定植时间和产品编码
- **图片视频展示**：轮播展示产品图片和视频
- **采收质量信息**：显示采收时间、糖度、重量、口感、适应人群和品质小结
- **用户交互**：无需登录即可点赞、转发和收藏（带防刷机制）

### 管理后台
- **产品管理**：查看所有产品信息
- **二维码生成**：为产品生成可扫描的二维码
- **数据统计**：查看产品的点赞、分享、收藏数据

### 防刷机制
- 设备指纹识别（Device ID）
- 频率限制（同一设备不能重复操作）
- 用户行为追踪

## 技术栈

- **前端**：React 18 + TypeScript + Vite + Tailwind CSS
- **后端**：Django 6.0.4 + Django REST Framework
- **数据库**：PostgreSQL 15
- **路由**：React Router 7
- **二维码**：qrcode.react
- **图标**：lucide-react
- **部署**：Docker + Nginx + Gunicorn

## 项目结构

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

## 快速开始

### 环境要求

- Docker 和 Docker Compose（用于容器化部署）
- 或 Python 3.11+、Node.js 20+、PostgreSQL 15+（用于手动部署）

---

## 部署方式一：Docker 部署（推荐）

### 1. 拉取代码

```bash
git clone https://github.com/shuiqinghuan/agriculture-qr-traceability.git
cd agriculture-qr-traceability
```

### 2. 配置环境变量

编辑 `.env` 文件（如果不存在，将使用默认值）：

```env
DB_NAME=agriculture_qr
DB_USER=admin
DB_PASSWORD=password
DB_HOST=db
DB_PORT=5432
SECRET_KEY=your-secret-key-here
DEBUG=False
```

### 3. 构建并启动容器

```bash
# 构建镜像并启动服务
docker-compose up -d --build

# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 4. 初始化数据库

容器启动后，需要执行数据库迁移和生成示例数据：

```bash
# 进入容器执行迁移
docker-compose exec app python manage.py migrate

# 生成示例数据
docker-compose exec app python generate_sample_data.py
```

### 5. 访问应用

- **前端页面**：http://localhost 或 http://服务器IP
- **管理后台**：http://localhost/admin 或 http://服务器IP/admin
- **示例产品**：http://localhost/product/4395

---

## 部署方式二：手动部署

### 1. 环境准备

#### Ubuntu/Debian 系统

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip

# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# 安装 Nginx
sudo apt install -y nginx

# 安装 Docker（可选）
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

#### macOS 系统

```bash
# 使用 Homebrew 安装
brew install python@3.11 node postgresql nginx
```

### 2. 数据库配置

```bash
# 启动 PostgreSQL 服务
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 创建数据库和用户
sudo -u postgres psql << EOF
CREATE USER admin WITH PASSWORD 'password';
CREATE DATABASE agriculture_qr OWNER admin;
GRANT ALL PRIVILEGES ON DATABASE agriculture_qr TO admin;
\q
EOF
```

### 3. 后端部署

```bash
# 进入后端目录
cd agriculture-qr-traceability/backend

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# 或 venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
export DB_NAME=agriculture_qr
export DB_USER=admin
export DB_PASSWORD=password
export DB_HOST=localhost
export DB_PORT=5432
export SECRET_KEY=your-secret-key-here
export DEBUG=False

# 执行数据库迁移
python manage.py migrate

# 生成示例数据
python generate_sample_data.py

# 创建超级管理员（可选）
python manage.py createsuperuser
```

### 4. 前端部署

```bash
# 进入前端目录
cd agriculture-qr-traceability

# 安装依赖
npm install

# 构建生产版本
npm run build
```

### 5. 启动服务

#### 开发模式

**终端1 - 启动后端：**
```bash
cd agriculture-qr-traceability/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

**终端2 - 启动前端：**
```bash
cd agriculture-qr-traceability
npm run dev
```

访问 `http://localhost:5173`

#### 生产模式

**启动后端服务：**
```bash
cd agriculture-qr-traceability/backend
source venv/bin/activate
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 30
```

**配置 Nginx：**
```bash
sudo cp agriculture-qr-traceability/nginx.conf /etc/nginx/sites-available/agriculture-qr
sudo ln -s /etc/nginx/sites-available/agriculture-qr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

访问 `http://localhost`

---

## 使用说明

### 查看产品溯源信息

1. 访问首页或扫描产品二维码
2. 查看产品的4个信息模块：
   - **产品信息**：品种名称、定植地点、定植时间、产品编码
   - **媒体展示**：产品图片和视频
   - **采收品质**：采收时间、糖度、重量、口感、适应人群、品质小结
3. 在底部进行点赞、分享或收藏操作

### 管理后台

1. 访问 `/admin`
2. 使用超级管理员账号登录
3. 查看和管理产品信息

### 示例数据

系统包含两个示例产品：

| 产品编码 | 品种名称 | 产地 |
|---------|---------|------|
| 4395 | 枣甜5号 | 山东省寿光市蔬菜基地A区 |
| 4396 | 有机蔬菜包 | 河北省张家口市有机农场 |

访问示例产品：`http://localhost/product/4395`

---

## API 接口

### 产品相关

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/products/` | GET | 获取产品列表 |
| `/api/products/{code}/` | GET | 获取产品详情 |

### 用户交互

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/interactions/` | POST | 提交用户交互（点赞/分享/收藏） |

---

## 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `DB_NAME` | agriculture_qr | 数据库名称 |
| `DB_USER` | admin | 数据库用户名 |
| `DB_PASSWORD` | password | 数据库密码 |
| `DB_HOST` | db | 数据库主机 |
| `DB_PORT` | 5432 | 数据库端口 |
| `SECRET_KEY` | - | Django 密钥 |
| `DEBUG` | False | 调试模式 |

### Docker 环境变量

在 `docker-compose.yml` 中配置：

```yaml
environment:
  DB_NAME: ${DB_NAME:-agriculture_qr}
  DB_USER: ${DB_USER:-admin}
  DB_PASSWORD: ${DB_PASSWORD:-password}
  DB_HOST: db
  DB_PORT: 5432
  SECRET_KEY: ${SECRET_KEY:-your-secret-key}
  DEBUG: ${DEBUG:-False}
```

---

## 注意事项

1. **数据库连接**：确保 PostgreSQL 服务正常运行，并创建对应的数据库和用户
2. **图片存储**：生产环境建议使用对象存储服务（如 AWS S3、阿里云 OSS）
3. **HTTPS**：生产部署建议配置 HTTPS
4. **防刷增强**：可根据需要增加 IP 黑名单、验证码等措施
5. **安全建议**：
   - 修改默认的 `SECRET_KEY`
   - 使用强密码作为数据库密码
   - 生产环境关闭 `DEBUG` 模式

---

## 故障排查

### Docker 部署问题

```bash
# 查看容器日志
docker-compose logs -f app

# 重启容器
docker-compose restart

# 重新构建
docker-compose down
docker-compose up -d --build
```

### 数据库连接问题

```bash
# 检查 PostgreSQL 服务
sudo systemctl status postgresql

# 检查数据库连接
psql -h localhost -U admin -d agriculture_qr
```

### 迁移失败问题

```bash
# 删除迁移文件重新生成
cd backend
rm -rf products/migrations/0*
python manage.py makemigrations
python manage.py migrate
```

---

## 许可证

MIT
