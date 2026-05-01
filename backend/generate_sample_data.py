#!/usr/bin/env python
"""
生成示例数据脚本
用于初始化数据库时创建示例产品数据
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product, ProductImage, ProductVideo


def create_sample_data():
    """创建示例产品数据"""
    print('开始创建示例数据...')

    # 删除现有数据
    deleted_count, _ = Product.objects.all().delete()
    print(f'已删除 {deleted_count} 条现有产品记录')

    # 创建示例产品 - 枣甜5号
    product = Product.objects.create(
        code='4395',
        name='枣甜5号',
        location='山东省寿光市蔬菜基地A区',
        planting_time='2024-03-15',
        harvest_start='2024-09-01',
        harvest_end='2024-10-31',
        sugar_content=22.5,
        weight=15.8,
        taste='甜脆可口，果肉细腻，香气浓郁',
        suitable_for='一般人群均可食用，尤其适合老年人、儿童、孕妇及体弱者',
        summary='优质红枣品种，果形美观，大小均匀，口感甘甜，营养丰富。含有丰富的维生素C、蛋白质、氨基酸等营养成分，具有补血养气、健脾益胃的功效。种植过程全程可追溯，确保品质安全。',
        likes=128,
        shares=45,
        favorites=89
    )
    print(f'创建产品: {product.name} (编码: {product.code})')

    # 创建示例图片
    ProductImage.objects.create(
        product=product,
        image_url='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        order=1
    )
    ProductImage.objects.create(
        product=product,
        image_url='https://images.unsplash.com/photo-1597484662317-9bd7bdda2901?w=400&h=300&fit=crop',
        order=2
    )
    ProductImage.objects.create(
        product=product,
        image_url='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=400&h=300&fit=crop',
        order=3
    )
    print(f'为 {product.name} 创建了 3 张示例图片')

    # 创建示例视频
    ProductVideo.objects.create(
        product=product,
        video_url='https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        order=1
    )
    print(f'为 {product.name} 创建了 1 个示例视频')

    # 创建第二个示例产品 - 有机蔬菜包
    product2 = Product.objects.create(
        code='4396',
        name='有机蔬菜包',
        location='河北省张家口市有机农场',
        planting_time='2024-04-20',
        harvest_start='2024-06-15',
        harvest_end='2024-09-30',
        sugar_content=0,
        weight=500,
        taste='新鲜爽口，蔬菜本味',
        suitable_for='追求健康饮食的人群，适合减肥人士及三高人群',
        summary='精选有机蔬菜组合，包含西红柿、黄瓜、青椒、菠菜等时令蔬菜。全部采用有机种植方式，无农药残留，全程冷链配送，保证新鲜度。',
        likes=256,
        shares=89,
        favorites=167
    )
    print(f'创建产品: {product2.name} (编码: {product2.code})')

    # 为第二个产品创建图片
    ProductImage.objects.create(
        product=product2,
        image_url='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        order=1
    )
    ProductImage.objects.create(
        product=product2,
        image_url='https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
        order=2
    )
    print(f'为 {product2.name} 创建了 2 张示例图片')

    print('')
    print('=' * 50)
    print('示例数据创建成功！')
    print('=' * 50)
    print(f'共创建 {Product.objects.count()} 个产品')
    print(f'共创建 {ProductImage.objects.count()} 张图片')
    print(f'共创建 {ProductVideo.objects.count()} 个视频')
    print('')
    print('您现在可以访问:')
    print(f'  - 产品详情: http://localhost:8000/api/products/4395/')
    print(f'  - 产品列表: http://localhost:8000/api/products/')
    print('')


if __name__ == '__main__':
    create_sample_data()
