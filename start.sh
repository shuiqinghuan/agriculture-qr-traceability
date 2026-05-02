#!/bin/sh

echo "===================================="
echo "农产品二维码溯源系统启动脚本"
echo "===================================="

cd /app

source /app/venv/bin/activate

export DB_NAME=${DB_NAME:-agriculture_qr}
export DB_USER=${DB_USER:-admin}
export DB_PASSWORD=${DB_PASSWORD:-password}
export DB_HOST=${DB_HOST:-db}
export DB_PORT=${DB_PORT:-5432}
export SECRET_KEY=${SECRET_KEY:-django-insecure-om-s3yc-zltu-x-29ezcu-b5ws-o18-q8691-r-8}
export DEBUG=${DEBUG:-False}

echo "运行数据库迁移..."
cd /app/backend
python manage.py migrate

echo "生成示例数据..."
python generate_sample_data.py

echo "启动 Gunicorn 服务器..."
cd /app
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2 --timeout 30 &

echo "启动 Nginx 服务器..."
nginx -g "daemon off;"