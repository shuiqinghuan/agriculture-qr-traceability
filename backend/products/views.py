from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, UserInteraction
from .serializers import ProductSerializer, UserInteractionSerializer
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

class ProductDetailView(APIView):
    """产品详情视图"""
    def get(self, request, product_code):
        try:
            product = get_object_or_404(Product, code=product_code)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserInteractionView(APIView):
    """用户交互视图（点赞、分享、收藏）"""
    def post(self, request):
        try:
            product_code = request.data.get('product_code')
            action = request.data.get('action')
            device_id = request.data.get('device_id')
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            ip_address = request.META.get('REMOTE_ADDR', '')

            if not all([product_code, action, device_id]):
                return Response({'error': '缺少必要参数'}, status=status.HTTP_400_BAD_REQUEST)

            product = get_object_or_404(Product, code=product_code)

            # 尝试创建用户交互记录（防刷）
            try:
                UserInteraction.objects.create(
                    product=product,
                    action=action,
                    device_id=device_id,
                    user_agent=user_agent,
                    ip_address=ip_address
                )

                # 更新产品的计数
                if action == 'like':
                    product.likes += 1
                elif action == 'share':
                    product.shares += 1
                elif action == 'favorite':
                    product.favorites += 1
                product.save()

                return Response({'message': '操作成功', 'count': getattr(product, action + 's')},
                              status=status.HTTP_200_OK)
            except IntegrityError:
                # 重复操作，返回当前计数
                return Response({'message': '已经操作过了', 'count': getattr(product, action + 's')},
                              status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductListView(APIView):
    """产品列表视图"""
    def get(self, request):
        try:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
