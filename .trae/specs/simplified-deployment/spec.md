# 农产品二维码溯源系统 - 简化部署版 产品需求文档

## Overview
- **Summary**: 一个简化版的农产品二维码溯源系统，专注于方便部署和快速实现，通过 Docker 部署到指定服务器。
- **Purpose**: 提供一个轻量级的农产品溯源解决方案，便于快速部署和验证功能。
- **Target Users**: 农产品生产者、消费者和系统部署人员。

## Goals
- 在服务器 `http://139.155.97.74/` 成功部署系统
- 提供简化的产品溯源功能（基本信息展示）
- 确保 Docker 配置文件简单易用，便于部署
- 简化代码结构，减少依赖和复杂度

## Non-Goals (Out of Scope)
- 复杂的后端逻辑和数据库
- 防刷机制和用户认证
- 视频展示和复杂交互功能
- 生产级别的性能优化

## Background & Context
- 原始系统功能复杂，部署步骤繁琐
- 需要一个简化版本以便快速部署和验证
- 服务器环境为 Linux，支持 Docker 部署

## Functional Requirements
- **FR-1**: 提供产品基本信息展示页面
- **FR-2**: 支持通过二维码访问产品页面
- **FR-3**: 提供简单的管理后台生成二维码
- **FR-4**: 通过 Docker 容器化部署

## Non-Functional Requirements
- **NFR-1**: 部署过程简单，最多3个步骤
- **NFR-2**: 系统启动时间不超过30秒
- **NFR-3**: 页面加载时间不超过2秒
- **NFR-4**: 代码结构清晰，便于维护

## Constraints
- **Technical**: 使用 Docker 部署，基于 Nginx 静态站点
- **Business**: 快速部署，简化功能
- **Dependencies**: 仅依赖 Docker 和 Docker Compose

## Assumptions
- 服务器已安装 Docker 和 Docker Compose
- 服务器 80 端口可用
- 不需要真实的后端服务，使用静态数据

## Acceptance Criteria

### AC-1: 系统部署成功
- **Given**: 服务器已安装 Docker
- **When**: 执行部署脚本
- **Then**: 系统成功运行在 `http://139.155.97.74/`
- **Verification**: `programmatic`

### AC-2: 产品页面访问
- **Given**: 系统已部署
- **When**: 访问 `http://139.155.97.74/product/4395`
- **Then**: 显示枣甜5号的产品信息
- **Verification**: `programmatic`

### AC-3: 二维码生成
- **Given**: 系统已部署
- **When**: 访问 `http://139.155.97.74/admin`
- **Then**: 显示二维码生成界面
- **Verification**: `human-judgment`

### AC-4: 部署过程简单
- **Given**: 服务器环境准备就绪
- **When**: 执行部署脚本
- **Then**: 部署过程不超过3个步骤，无错误
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要保留原始系统的所有文件结构？
- [ ] 简化后是否需要保留示例产品数据？
