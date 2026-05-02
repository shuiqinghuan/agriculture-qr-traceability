# 服务器部署指南

服务器 IP: 47.104.189.148

## 前置准备

1. 确保服务器已安装 Docker 和 Docker Compose
2. 确保服务器端口 80 已开放（未被其他服务占用）

## 部署步骤

### 1. 上传代码到服务器

```bash
# 使用 scp 或 git clone 将项目代码上传到服务器
cd /opt
git clone <你的仓库地址> agriculture-qr-traceability
cd agriculture-qr-traceability
```

### 2. 配置环境变量

创建或修改 `.env` 文件：

```bash
# 复制环境变量模板（如果有）
cp .env.example .env  # 如果没有这个文件，直接编辑 .env

# 编辑环境变量
nano .env
```

**重要：生产环境请修改以下配置！**

```env
# Database settings
DB_NAME=agriculture_qr
DB_USER=admin
DB_PASSWORD=StrongPassword123!  # 修改为强密码
DB_HOST=db
DB_PORT=5432

# Django settings
SECRET_KEY=your-production-secret-key-here-change-this  # 修改为安全的密钥
DEBUG=False

# API settings
VITE_API_BASE_URL=
```

如何生成安全的 SECRET_KEY：
```python
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### 3. 构建并启动服务

```bash
# 构建 Docker 镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 4. 验证部署

访问以下地址验证部署是否成功：

- 首页: http://47.104.189.148
- 示例产品: http://47.104.189.148/product/4395
- 管理后台: http://47.104.189.148/admin

### 5. 常用管理命令

```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f app
docker-compose logs -f db

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 停止服务并删除数据卷（谨慎操作！）
docker-compose down -v

# 重新构建并启动
docker-compose up -d --build

# 进入应用容器
docker-compose exec app sh

# 手动运行数据库迁移
docker-compose exec app python manage.py migrate

# 手动生成示例数据
docker-compose exec app python generate_sample_data.py

# 创建 Django 超级用户
docker-compose exec app python manage.py createsuperuser
```

## 故障排查

### 问题1: 构建前端时找不到 tsconfig.json

已解决：项目中已添加 `tsconfig.json` 和 `tsconfig.node.json` 文件

### 问题2: 数据库连接失败

检查：
- 数据库容器是否正常启动: `docker-compose ps`
- 数据库日志: `docker-compose logs db`
- 环境变量配置是否正确

### 问题3: API 请求失败

检查：
- Nginx 配置中的 proxy_pass 是否正确
- 后端服务是否正常运行
- 浏览器开发者工具查看网络请求

### 问题4: 静态资源 404

检查：
- 前端构建是否成功: `docker-compose logs app` 查看构建阶段
- Nginx 配置中的 root 路径是否正确

## 安全建议

1. **修改默认密码**：立即修改数据库密码和 Django SECRET_KEY
2. **配置 HTTPS**：使用 Let's Encrypt 配置 SSL 证书
3. **防火墙设置**：只开放必要的端口（80, 443）
4. **定期备份**：定期备份数据库数据
5. **更新系统**：定期更新服务器系统和 Docker 镜像

## 数据备份

```bash
# 备份数据库
docker-compose exec db pg_dump -U admin agriculture_qr > backup.sql

# 恢复数据库
docker-compose exec -T db psql -U admin agriculture_qr < backup.sql
```
