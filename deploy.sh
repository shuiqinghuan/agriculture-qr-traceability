#!/bin/bash

# 农产品二维码溯源系统部署脚本

echo "===================================="
echo "农产品二维码溯源系统部署脚本"
echo "===================================="

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "错误: Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 停止并移除旧容器
echo "\n[1/3] 停止并移除旧容器..."
docker-compose down --remove-orphans

# 构建新镜像
echo "\n[2/3] 构建新镜像..."
docker-compose build

# 启动容器
echo "\n[3/3] 启动容器..."
docker-compose up -d

# 等待服务启动
echo "\n等待服务启动..."
sleep 10

# 检查服务状态
echo "\n检查服务状态..."
docker-compose ps

echo "\n===================================="
echo "部署完成！"
echo "===================================="
echo "访问地址: http://139.155.97.74"
echo "\n管理后台: http://139.155.97.74/admin"
echo "示例产品: http://139.155.97.74/product/4395"
echo "===================================="
