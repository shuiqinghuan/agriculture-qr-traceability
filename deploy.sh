#!/bin/bash

# 农产品二维码溯源系统部署脚本 - 简化版

echo "===================================="
echo "农产品二维码溯源系统部署脚本"
echo "===================================="

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装（兼容新版本和旧版本命令）
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    echo "错误: Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

echo "使用 Docker Compose 命令: $COMPOSE_CMD"

# 停止并移除旧容器
echo -e "\n[1/5] 停止并移除旧容器..."
$COMPOSE_CMD down --remove-orphans

# 构建新镜像
echo -e "\n[2/5] 构建新镜像..."
$COMPOSE_CMD build --no-cache

# 启动容器
echo -e "\n[3/5] 启动容器..."
$COMPOSE_CMD up -d

# 等待服务启动
echo -e "\n[4/5] 等待服务启动..."
sleep 5

# 检查服务状态
echo -e "\n[5/5] 检查服务状态..."
$COMPOSE_CMD ps

echo -e "\n===================================="
echo "部署完成！"
echo "===================================="
echo "访问地址: http://139.155.97.74"
echo -e "\n管理后台: http://139.155.97.74/admin"
echo "示例产品: http://139.155.97.74/product/4395"
echo "===================================="