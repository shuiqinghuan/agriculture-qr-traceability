# 前端构建阶段
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

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

RUN apk add --no-cache nginx postgresql-client

COPY --from=backend-builder /app/venv /app/venv
COPY --from=backend-builder /app/backend /app/backend

COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["/app/start.sh"]