from django.contrib import admin
from django.urls import path
from products.views import ProductDetailView, ProductListView, UserInteractionView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', ProductListView.as_view(), name='product-list'),
    path('api/products/<str:product_code>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/interactions/', UserInteractionView.as_view(), name='user-interaction'),
]
