import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import MediaGallery from '../components/MediaGallery';
import HarvestQuality from '../components/HarvestQuality';
import InteractionBar from '../components/InteractionBar';
import { useAntiSpam } from '../hooks/useAntiSpam';
import { useState, useEffect } from 'react';

// 示例数据 - 在实际应用中，这些数据会从 Convex 获取
const SAMPLE_PRODUCTS = {
  '4395': {
    _id: 'sample_id_4395' as any,
    code: '4395',
    name: '枣甜5号',
    location: '山东省泰安市岱岳区',
    plantingTime: '2024年4月15日',
    images: [
      'https://images.unsplash.com/photo-1544510808-91bcbee1df55?w=800',
      'https://images.unsplash.com/photo-1568702846914-96b305d246c8?w=800',
      'https://images.unsplash.com/photo-1595475207225-428e60ebc13d?w=800'
    ],
    videos: [],
    harvestStart: '2024年10月1日',
    harvestEnd: '2024年11月15日',
    sugarContent: 28.5,
    weight: 15,
    taste: '脆甜多汁',
    suitableFor: '所有人群，尤其适合儿童和老人',
    summary: '枣甜5号是经过多年选育的优良品种，果实饱满，口感极佳。生长过程严格按照绿色食品标准管理，无农药残留，安全健康。',
    likes: 128,
    shares: 45,
    favorites: 67
  }
};

export default function ProductPage() {
  const { productCode } = useParams<{ productCode: string }>();
  const { deviceId, userAgent, ipAddress } = useAntiSpam();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟从 Convex 获取数据
    if (productCode && SAMPLE_PRODUCTS[productCode as keyof typeof SAMPLE_PRODUCTS]) {
      setTimeout(() => {
        setProduct(SAMPLE_PRODUCTS[productCode as keyof typeof SAMPLE_PRODUCTS]);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [productCode]);

  const handleLike = async () => {
    if (!product) return;
    // 在实际应用中，这里会调用 Convex mutation
    setProduct(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleShare = async () => {
    if (!product) return;
    // 在实际应用中，这里会调用 Convex mutation
    setProduct(prev => ({ ...prev, shares: prev.shares + 1 }));
  };

  const handleFavorite = async () => {
    if (!product) return;
    // 在实际应用中，这里会调用 Convex mutation
    setProduct(prev => ({ ...prev, favorites: prev.favorites + 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">产品未找到</h2>
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
          plantingTime={product.plantingTime}
          code={product.code}
        />
        
        <MediaGallery 
          images={product.images}
          videos={product.videos}
        />
        
        <HarvestQuality 
          harvestStart={product.harvestStart}
          harvestEnd={product.harvestEnd}
          sugarContent={product.sugarContent}
          weight={product.weight}
          taste={product.taste}
          suitableFor={product.suitableFor}
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