# 前端构建阶段
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# 复制前端代码
COPY . .

# 安装依赖并构建
RUN npm install && npm run build

# 后端构建阶段
FROM python:3.11-alpine AS backend-builder

WORKDIR /app

# 复制后端代码
COPY backend/ .

# 安装依赖
RUN apk add --no-cache gcc musl-dev postgresql-dev
RUN python3 -m venv venv && . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# 生产环境阶段
FROM python:3.11-alpine

WORKDIR /app

# 安装系统依赖
RUN apk add --no-cache nginx postgresql-client

# 复制后端代码和依赖
COPY --from=backend-builder /app .

# 复制前端构建产物
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# 复制配置文件
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh /app/start.sh

# 设置权限
RUN chmod +x /app/start.sh

# 暴露端口
EXPOSE 80

# 启动服务
CMD ["/app/start.sh"]