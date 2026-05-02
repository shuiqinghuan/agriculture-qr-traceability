#!/bin/bash

set -e

echo "===================================="
echo "环境变量设置脚本"
echo "===================================="

cat > .env <<'EOF'
# Database settings
DB_NAME=agriculture_qr
DB_USER=admin
DB_PASSWORD=password
DB_HOST=db
DB_PORT=5432

# Django settings
SECRET_KEY=change-me-in-production
DEBUG=False

# API settings
VITE_API_BASE_URL=
EOF

echo ".env 已写入默认配置，请按生产环境需求修改其中的密码和 SECRET_KEY。"
