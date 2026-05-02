# 前端构建阶段
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install

COPY . .
RUN npm run build

# 后端构建阶段
FROM python:3.11-alpine AS backend-builder

WORKDIR /app

COPY backend/ ./backend/

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache gcc musl-dev postgresql-dev

RUN python3 -m venv /app/venv
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
RUN /app/venv/bin/pip install --no-cache-dir -r backend/requirements.txt

# 生产环境阶段
FROM python:3.11-alpine

WORKDIR /app

# 安装系统依赖
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache nginx postgresql-client supervisor

# 从后端构建阶段复制虚拟环境
COPY --from=backend-builder /app/venv /app/venv

# 从后端构建阶段复制后端代码
COPY --from=backend-builder /app/backend /app/backend

# 复制启动脚本
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# 复制前端构建产物
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 设置环境变量 - 关键步骤
ENV PATH="/app/venv/bin:$PATH"
ENV PYTHONPATH="/app"
ENV DJANGO_SETTINGS_MODULE=config.settings

# 验证 Django 是否安装
RUN /app/venv/bin/python -c "import django; print(f'Django version: {django.get_version()}')"

# 暴露端口
EXPOSE 80

# 启动脚本
CMD ["/app/start.sh"]
