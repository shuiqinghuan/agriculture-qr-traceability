## 1. 架构设计
```mermaid
graph TB
    subgraph "前端层"
        A[React 应用]
        B[产品溯源页面]
        C[管理后台]
    end
    
    subgraph "反向代理层"
        D[Nginx]
    end
    
    subgraph "后端层"
        E[Django + Gunicorn]
        F[产品查询 API]
        G[交互处理 API]
        H[防刷逻辑]
    end
    
    subgraph "数据层"
        I[PostgreSQL 15]
        J[产品表]
        K[图片表]
        L[视频表]
        M[交互记录表]
    end
    
    subgraph "部署层"
        N[Docker 容器]
        O[云服务器]
    end
    
    A --> D
    B --> A
    C --> A
    D --> E
    E --> I
    F --> J
    F --> K
    F --> L
    G --> M
    H --> M
    I --> N
    N --> O
```

## 2. 技术栈
- **前端**：React@18 + TypeScript + Tailwind CSS + Vite + React Router 7
- **后端**：Django 6.0.4 + Django REST Framework + Gunicorn
- **数据库**：PostgreSQL 15
- **反向代理**：Nginx
- **部署**：Docker + Docker Compose
- **二维码**：qrcode.react
- **图标**：lucide-react

## 3. 路由定义
| 路由 | 用途 |
|-----|------|
| / | 首页 |
| /product/:productCode | 产品溯源页面，根据产品编码展示信息 |
| /admin | 管理后台 |

### 后端 API 路由
| 接口 | 方法 | 说明 |
|------|------|------|
| /api/products/ | GET | 获取产品列表 |
| /api/products/{code}/ | GET | 获取产品详情 |
| /api/interactions/ | POST | 提交用户交互（点赞/分享/收藏） |

## 4. 数据模型

### 4.1 数据模型定义
```mermaid
erDiagram
    PRODUCT {
        int id PK "产品ID"
        string code UK "产品编码 (如4395)"
        string name "产品名称"
        string location "定植地点"
        date planting_time "定植时间"
        date harvest_start "采收起始时间"
        date harvest_end "采收终止时间"
        float sugar_content "糖度"
        float weight "单果重量(g)"
        string taste "口感描述"
        string suitable_for "适应人群"
        text summary "品质小结"
        int likes "点赞数"
        int shares "转发数"
        int favorites "收藏数"
        datetime created_at "创建时间"
        datetime updated_at "更新时间"
    }
    
    PRODUCT_IMAGE {
        int id PK "图片ID"
        int product_id FK "产品ID"
        string image_url "图片URL"
        int order "排序"
    }
    
    PRODUCT_VIDEO {
        int id PK "视频ID"
        int product_id FK "产品ID"
        string video_url "视频URL"
        int order "排序"
    }
    
    USER_INTERACTION {
        int id PK "记录ID"
        int product_id FK "产品ID"
        string action "交互类型 (like/share/favorite)"
        string device_id "设备标识"
        string user_agent "用户代理"
        string ip_address "IP地址"
        datetime created_at "时间戳"
    }
    
    PRODUCT ||--o{ PRODUCT_IMAGE : "has"
    PRODUCT ||--o{ PRODUCT_VIDEO : "has"
    PRODUCT ||--o{ USER_INTERACTION : "receives"
```

### 4.2 Django 模型

```python
# backend/products/models.py
from django.db import models

class Product(models.Model):
    """产品模型"""
    code = models.CharField(max_length=20, unique=True, verbose_name="产品编码")
    name = models.CharField(max_length=100, verbose_name="产品名称")
    location = models.CharField(max_length=200, verbose_name="定植地点")
    planting_time = models.DateField(verbose_name="定植时间")
    harvest_start = models.DateField(verbose_name="采收开始时间")
    harvest_end = models.DateField(verbose_name="采收结束时间")
    sugar_content = models.FloatField(verbose_name="糖度")
    weight = models.FloatField(verbose_name="单果重量(g)")
    taste = models.CharField(max_length=100, verbose_name="口感描述")
    suitable_for = models.CharField(max_length=200, verbose_name="适应人群")
    summary = models.TextField(verbose_name="品质小结")
    likes = models.IntegerField(default=0, verbose_name="点赞数")
    shares = models.IntegerField(default=0, verbose_name="分享数")
    favorites = models.IntegerField(default=0, verbose_name="收藏数")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

class ProductImage(models.Model):
    """产品图片模型"""
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image_url = models.URLField(max_length=500, verbose_name="图片URL")
    order = models.IntegerField(default=0, verbose_name="排序")

class ProductVideo(models.Model):
    """产品视频模型"""
    product = models.ForeignKey(Product, related_name="videos", on_delete=models.CASCADE)
    video_url = models.URLField(max_length=500, verbose_name="视频URL")
    order = models.IntegerField(default=0, verbose_name="排序")

class UserInteraction(models.Model):
    """用户交互模型（防刷）"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    action = models.CharField(max_length=20, choices=[
        ('like', '点赞'),
        ('share', '分享'),
        ('favorite', '收藏')
    ])
    device_id = models.CharField(max_length=100, verbose_name="设备ID")
    user_agent = models.CharField(max_length=500, verbose_name="用户代理")
    ip_address = models.CharField(max_length=50, verbose_name="IP地址")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="操作时间")
    
    class Meta:
        unique_together = ['product', 'action', 'device_id']  # 防止同一设备重复操作
```

## 5. 防刷机制设计
1. **设备指纹**：使用 localStorage 存储设备标识
2. **数据库唯一约束**：同一设备对同一产品的同一操作只能执行一次
3. **IP 记录**：记录每次操作的 IP 地址，便于后续分析
4. **前端频率限制**：防止频繁点击

## 6. Docker 配置
- **应用容器**：多阶段构建（node:20-alpine + python:3.11-slim）
- **数据库容器**：postgres:15-alpine
- **反向代理**：nginx:alpine
- **暴露端口**：80（HTTP），内部 8000（Django）
