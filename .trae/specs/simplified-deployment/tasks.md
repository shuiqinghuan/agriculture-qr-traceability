# 农产品二维码溯源系统 - 简化部署版 实现计划

## [ ] Task 1: 创建简化的项目结构
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 创建最小化的项目结构
  - 只保留核心文件，移除不必要的依赖
  - 使用静态 HTML 页面代替 React 应用
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - `programmatic` TR-1.1: 项目结构包含必要的文件
  - `human-judgment` TR-1.2: 项目结构简洁明了
- **Notes**: 使用静态 HTML + JavaScript 实现，减少构建过程

## [ ] Task 2: 实现产品页面
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 创建产品详情页面 `product.html`
  - 包含产品基本信息展示
  - 支持通过 URL 参数获取产品编码
  - 硬编码示例数据（枣甜5号）
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-2.1: 访问 `/product/4395` 显示正确的产品信息
  - `human-judgment` TR-2.2: 页面布局清晰，信息完整
- **Notes**: 使用静态数据，不需要后端服务

## [ ] Task 3: 实现管理后台
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - 创建管理后台页面 `admin.html`
  - 实现简单的二维码生成功能
  - 支持输入产品编码
  - 使用客户端 QRCode 生成库
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-3.1: 访问 `/admin` 显示二维码生成界面
  - `human-judgment` TR-3.2: 二维码生成功能正常
- **Notes**: 使用 qrcode.js 库在客户端生成二维码

## [ ] Task 4: 配置 Nginx 和 Docker
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3
- **Description**:
  - 创建简化的 `Dockerfile`
  - 创建 `docker-compose.yml`
  - 配置 Nginx 处理路由
  - 确保静态文件正确服务
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - `programmatic` TR-4.1: Docker 容器成功启动
  - `programmatic` TR-4.2: 服务运行在 80 端口
- **Notes**: 使用 Nginx 作为静态文件服务器，处理 SPA 路由

## [ ] Task 5: 创建部署脚本
- **Priority**: P0
- **Depends On**: Task 4
- **Description**:
  - 创建 `deploy.sh` 脚本
  - 实现一键部署功能
  - 包含环境检查和错误处理
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-5.1: 脚本执行无错误
  - `human-judgment` TR-5.2: 部署过程简单明了
- **Notes**: 脚本应检查 Docker 安装状态，自动构建和启动容器

## [ ] Task 6: 测试部署
- **Priority**: P0
- **Depends On**: Task 5
- **Description**:
  - 在本地测试部署流程
  - 验证所有功能正常
  - 确保页面访问流畅
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `programmatic` TR-6.1: 系统成功运行
  - `programmatic` TR-6.2: 所有页面可正常访问
  - `human-judgment` TR-6.3: 部署过程简单快捷
- **Notes**: 测试所有页面和功能，确保部署成功
