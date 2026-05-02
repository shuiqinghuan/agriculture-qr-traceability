#!/bin/sh

echo "===================================="
echo "农产品二维码溯源系统启动脚本"
echo "===================================="

# 直接设置 PATH，不依赖 activate 脚本
export PATH="/app/venv/bin:$PATH"
export PYTHONPATH="/app"
export DJANGO_SETTINGS_MODULE=config.settings

# 设置数据库环境变量
export DB_NAME=${DB_NAME:-agriculture_qr}
export DB_USER=${DB_USER:-admin}
export DB_PASSWORD=${DB_PASSWORD:-password}
export DB_HOST=${DB_HOST:-db}
export DB_PORT=${DB_PORT:-5432}
export SECRET_KEY=${SECRET_KEY:-django-insecure-om-s3yc-zltu-x-29ezcu-b5ws-o18-q8691-r-8}
export DEBUG=${DEBUG:-False}

echo "当前 Python: $(which python)"
echo "Django 版本: $(python -c 'import django; print(django.get_version())' 2>/dev/null || echo '检查中...')"

# 等待数据库
echo "等待数据库连接..."
sleep 5

# 数据库迁移
echo "运行数据库迁移..."
cd /app/backend
python manage.py migrate --noinput

# 收集静态文件
echo "收集静态文件..."
python manage.py collectstatic --noinput --clear

# 生成示例数据
echo "生成示例数据..."
python manage.py shell << EOF
import sys
import os
os.chdir('/app/backend')
try:
    exec(open('generate_sample_data.py').read())
    print("示例数据生成完成")
except Exception as e:
    print(f"生成示例数据出错: {e}", file=sys.stderr)
EOF

# 启动 Nginx（后台）
echo "启动 Nginx..."
nginx -t && nginx

# 启动 Gunicorn（前台）
echo "启动 Gunicorn 服务器..."
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --threads 2 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -