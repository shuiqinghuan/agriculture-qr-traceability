from rest_framework import serializers
from .models import Product, ProductImage, ProductVideo, UserInteraction


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'order']


class ProductVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVideo
        fields = ['id', 'video_url', 'order']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    videos = ProductVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'code', 'name', 'location', 'planting_time',
            'harvest_start', 'harvest_end', 'sugar_content', 'weight',
            'taste', 'suitable_for', 'summary', 'likes', 'shares',
            'favorites', 'images', 'videos', 'created_at', 'updated_at'
        ]
        read_only_fields = ['likes', 'shares', 'favorites', 'created_at', 'updated_at']


class UserInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInteraction
        fields = ['id', 'product', 'action', 'device_id', 'user_agent', 'ip_address', 'created_at']
        read_only_fields = ['user_agent', 'ip_address', 'created_at']
