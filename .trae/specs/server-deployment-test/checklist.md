# 服务器部署测试检查清单

## 项目结构检查
- [ ] agriculture-qr-traceability目录存在
- [ ] backend目录存在且包含Django应用
- [ ] src目录存在且包含React应用
- [ ] 所有配置文件存在

## 后端代码检查
- [ ] Django项目配置完整（settings.py）
- [ ] 产品模型定义完整（models.py）
- [ ] API视图函数完整（views.py）
- [ ] Python依赖列表完整（requirements.txt）

## 前端代码检查
- [ ] React根组件完整（App.tsx）
- [ ] 产品信息组件完整（ProductInfo.tsx）
- [ ] 媒体展示组件完整（MediaGallery.tsx）
- [ ] 采收品质组件完整（HarvestQuality.tsx）
- [ ] 交互栏组件完整（InteractionBar.tsx）
- [ ] 页面组件完整（Home.tsx, ProductPage.tsx, AdminPage.tsx）
- [ ] API服务配置完整（api.ts）
- [ ] Vite配置正确（vite.config.ts）
- [ ] npm依赖列表完整（package.json）

## 部署配置检查
- [ ] Dockerfile配置正确
- [ ] docker-compose.yml配置正确
- [ ] Nginx配置正确（nginx.conf）
- [ ] 环境变量配置存在（.env）
- [ ] 部署脚本存在且可执行（deploy.sh, start.sh）
- [ ] setup-env.sh脚本存在且可执行

## Docker相关检查
- [ ] .dockerignore文件存在
- [ ] Docker镜像可以正常构建
- [ ] Docker容器可以正常启动
- [ ] 容器间网络连接正常

## 文档完整性检查
- [ ] README.md存在且内容完整
- [ ] 部署说明清晰
- [ ] 环境要求说明完整
