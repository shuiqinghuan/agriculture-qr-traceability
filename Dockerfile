# 使用 nginx:alpine 作为基础镜像
FROM nginx:alpine

# 设置维护者信息
LABEL maintainer="Agriculture QR Traceability System"

# 安装必要的工具
RUN apk add --no-cache wget

# 复制静态文件到 nginx 目录
COPY index.html /usr/share/nginx/html/
COPY product.html /usr/share/nginx/html/
COPY admin.html /usr/share/nginx/html/

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 设置正确的权限
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]