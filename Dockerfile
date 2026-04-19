# 使用 Nginx 作为基础镜像
FROM nginx:alpine

# 设置维护者信息
LABEL maintainer="Agriculture QR Traceability System"

# 复制静态文件到 Nginx 目录
COPY . /usr/share/nginx/html

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]