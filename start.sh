#!/bin/bash

# 启动脚本

echo "===================================="
echo "农产品二维码溯源系统启动脚本"
echo "===================================="

# 加载环境变量
if [ -f /app/.env ]; then
    export $(cat /app/.env | grep -v '^#' | xargs)
fi

# 启动 Django 服务器
cd /app
source venv/bin/activate

# 运行数据库迁移
python manage.py migrate

# 生成示例数据
python generate_sample_data.py

# 启动 Gunicorn 服务器
echo "启动 Gunicorn 服务器..."
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 30 &

# 启动 Nginx
echo "启动 Nginx 服务器..."
nginx -g "daemon off;"