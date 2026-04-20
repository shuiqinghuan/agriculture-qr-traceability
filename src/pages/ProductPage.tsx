import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import MediaGallery from '../components/MediaGallery';
import HarvestQuality from '../components/HarvestQuality';
import InteractionBar from '../components/InteractionBar';
import { useAntiSpam } from '../hooks/useAntiSpam';
import { useState, useEffect } from 'react';
import { getProductByCode, userInteraction, Product } from '../services/api';

export default function ProductPage() {
  const { productCode } = useParams<{ productCode: string }>();
  const { deviceId } = useAntiSpam();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productCode) {
        setLoading(false);
        setError('产品编码不能为空');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getProductByCode(productCode);
        // 转换字段名以匹配组件期望的格式
        const formattedProduct = {
          ...data,
          plantingTime: data.planting_time,
          harvestStart: data.harvest_start,
          harvestEnd: data.harvest_end,
          sugarContent: data.sugar_content,
          suitableFor: data.suitable_for,
          images: data.images.map((img: any) => img.image_url),
          videos: data.videos.map((video: any) => video.video_url)
        };
        setProduct(formattedProduct as Product);
      } catch (err) {
        setError('获取产品信息失败');
        console.error('获取产品信息出错:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productCode]);

  const handleLike = async () => {
    if (!product || !productCode) return;
    try {
      const result = await userInteraction(productCode, 'like', deviceId);
      setProduct(prev => prev ? { ...prev, likes: result.count } : null);
    } catch (err) {
      console.error('点赞失败:', err);
    }
  };

  const handleShare = async () => {
    if (!product || !productCode) return;
    try {
      const result = await userInteraction(productCode, 'share', deviceId);
      setProduct(prev => prev ? { ...prev, shares: result.count } : null);
    } catch (err) {
      console.error('分享失败:', err);
    }
  };

  const handleFavorite = async () => {
    if (!product || !productCode) return;
    try {
      const result = await userInteraction(productCode, 'favorite', deviceId);
      setProduct(prev => prev ? { ...prev, favorites: result.count } : null);
    } catch (err) {
      console.error('收藏失败:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">加载中...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{error || '产品未找到'}</h2>
          <p className="text-gray-500">请检查产品编码是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <ProductInfo 
          name={product.name}
          location={product.location}
          plantingTime={(product as any).plantingTime}
          code={product.code}
        />
        
        <MediaGallery 
          images={(product as any).images}
          videos={(product as any).videos}
        />
        
        <HarvestQuality 
          harvestStart={(product as any).harvestStart}
          harvestEnd={(product as any).harvestEnd}
          sugarContent={product.sugar_content}
          weight={product.weight}
          taste={product.taste}
          suitableFor={product.suitable_for}
          summary={product.summary}
        />
      </div>
      
      <InteractionBar 
        likes={product.likes}
        shares={product.shares}
        favorites={product.favorites}
        onLike={handleLike}
        onShare={handleShare}
        onFavorite={handleFavorite}
      />
    </div>
  );
}