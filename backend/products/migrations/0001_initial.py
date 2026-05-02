from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20, unique=True, verbose_name='产品编码')),
                ('name', models.CharField(max_length=100, verbose_name='产品名称')),
                ('location', models.CharField(max_length=200, verbose_name='定植地点')),
                ('planting_time', models.DateField(verbose_name='定植时间')),
                ('harvest_start', models.DateField(verbose_name='采收开始时间')),
                ('harvest_end', models.DateField(verbose_name='采收结束时间')),
                ('sugar_content', models.CharField(max_length=50, verbose_name='糖度')),
                ('weight', models.FloatField(verbose_name='单果重量(g)')),
                ('taste', models.CharField(max_length=100, verbose_name='口感描述')),
                ('suitable_for', models.CharField(max_length=200, verbose_name='适应人群')),
                ('summary', models.TextField(verbose_name='品质小结')),
                ('likes', models.IntegerField(default=0, verbose_name='点赞数')),
                ('shares', models.IntegerField(default=0, verbose_name='分享数')),
                ('favorites', models.IntegerField(default=0, verbose_name='收藏数')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '产品',
                'verbose_name_plural': '产品管理',
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField(max_length=500, verbose_name='图片URL')),
                ('order', models.IntegerField(default=0, verbose_name='排序')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.product', verbose_name='产品')),
            ],
            options={
                'verbose_name': '产品图片',
                'verbose_name_plural': '产品图片管理',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='ProductVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_url', models.URLField(max_length=500, verbose_name='视频URL')),
                ('order', models.IntegerField(default=0, verbose_name='排序')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='products.product', verbose_name='产品')),
            ],
            options={
                'verbose_name': '产品视频',
                'verbose_name_plural': '产品视频管理',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='UserInteraction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(choices=[('like', '点赞'), ('share', '分享'), ('favorite', '收藏')], max_length=20, verbose_name='操作类型')),
                ('device_id', models.CharField(max_length=100, verbose_name='设备ID')),
                ('user_agent', models.CharField(max_length=500, verbose_name='用户代理')),
                ('ip_address', models.CharField(max_length=50, verbose_name='IP地址')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='操作时间')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='产品')),
            ],
            options={
                'verbose_name': '用户交互',
                'verbose_name_plural': '用户交互管理',
                'unique_together': {('product', 'action', 'device_id')},
            },
        ),
    ]
