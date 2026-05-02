# 服务器部署指南

服务器 IP: `47.104.189.148`

## 部署架构

- `db`：PostgreSQL 15
- `app`：单容器运行 `Nginx + Gunicorn + Django + React` 静态产物
- 对外端口：`80`

## 前置准备

1. 安装 Docker 和 Docker Compose
2. 确保服务器 `80` 端口可用
3. 将项目放到 `/opt/agriculture-qr-traceability`

## 部署步骤

### 1. 上传代码

```bash
cd /opt
git clone <你的仓库地址> agriculture-qr-traceability
cd agriculture-qr-traceability
```

### 2. 配置环境变量

项目根目录需要 `.env` 文件，可直接执行：

```bash
./setup-env.sh
```

然后按生产环境修改 [`.env`](/opt/agriculture-qr-traceability/.env)：

```env
# Database settings
DB_NAME=agriculture_qr
DB_USER=admin
DB_PASSWORD=StrongPassword123!
DB_HOST=db
DB_PORT=5432

# Django settings
SECRET_KEY=replace-with-a-random-secret-key
DEBUG=False

# API settings
VITE_API_BASE_URL=
```

生成安全 `SECRET_KEY`：

```bash
python3 -c 'from secrets import token_urlsafe; print(token_urlsafe(50))'
```

### 3. 构建并启动

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f app
```

说明：

- 首次启动会自动执行数据库迁移
- 首次启动会自动收集 Django 静态文件
- 如果数据库为空，会自动生成示例产品数据

### 4. 访问验证

- 首页：`http://47.104.189.148`
- 示例产品：`http://47.104.189.148/product/4395`
- Django 后台：`http://47.104.189.148/admin`
- 产品 API：`http://47.104.189.148/api/products/4395/`

## 管理员账号

如果还没有后台账号，可创建超级管理员：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py createsuperuser"
```

修改管理员密码：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py changepassword admin"
```

## 常用运维命令

查看状态：

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f db
```

重启和停止：

```bash
docker compose restart
docker compose down
docker compose down -v
```

重新构建并启动：

```bash
docker compose up -d --build
```

进入应用容器：

```bash
docker compose exec app sh
```

执行 Django 管理命令：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py migrate"
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py check"
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python generate_sample_data.py"
```

## 故障排查

### 数据库连接失败

检查：

- `docker compose ps`
- `docker compose logs db`
- [`.env`](/opt/agriculture-qr-traceability/.env) 中的 `DB_NAME / DB_USER / DB_PASSWORD`

### 页面能打开但接口失败

检查：

- `docker compose logs app`
- `http://服务器IP/api/products/4395/` 是否有响应
- `nginx.conf` 中 `/api/` 是否正确反代到 `127.0.0.1:8000`

### 静态资源 404

检查：

- 前端构建是否成功：`docker compose logs app`
- 镜像是否已用最新代码重建：`docker compose up -d --build`

### 后台命令提示找不到 Django

原因：

- `docker compose exec` 进入容器时不会自动加载 `start.sh` 里的环境变量

正确写法：

```bash
docker compose exec -T app sh -lc "cd /app/backend && /app/venv/bin/python manage.py <命令>"
```

## 数据备份

备份：

```bash
docker compose exec -T db pg_dump -U admin agriculture_qr > backup.sql
```

恢复：

```bash
docker compose exec -T db psql -U admin agriculture_qr < backup.sql
```

## 安全建议

1. 修改默认数据库密码和 Django `SECRET_KEY`
2. 为 `admin` 超级管理员设置强密码
3. 仅开放必要端口：`80`、`443`
4. 为生产环境配置 HTTPS
5. 定期备份 PostgreSQL 数据卷
