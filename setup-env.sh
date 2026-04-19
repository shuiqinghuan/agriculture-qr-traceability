#!/bin/bash

# 环境变量设置脚本

echo "===================================="
echo "环境变量设置脚本"
echo "===================================="

# 检查 .env 文件是否存在
if [ -f .env ]; then
    echo "检测到已存在 .env 文件，将覆盖配置"
else
    echo "创建新的 .env 文件"
fi

# 提示用户输入 Convex URL
echo "\n请输入您的 Convex 项目 URL:"
echo "格式示例: https://your-project-name.convex.cloud"
echo "按 Enter 键使用默认值"
read -p "Convex URL: " convex_url

# 使用默认值或用户输入
if [ -z "$convex_url" ]; then
    convex_url="https://your-project-name.convex.cloud"
    echo "使用默认值: $convex_url"
else
    echo "使用输入值: $convex_url"
fi

# 写入 .env 文件
echo "VITE_CONVEX_URL=$convex_url" > .env

echo "\n===================================="
echo ".env 文件已创建/更新"
echo "===================================="
echo "配置内容:"
cat .env
echo "\n请确保在 Convex 控制台中部署了相关函数"
echo "然后运行 ./deploy.sh 启动服务"
echo "===================================="
