import { Heart, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface InteractionBarProps {
  likes: number;
  shares: number;
  favorites: number;
  onLike: () => Promise<void>;
  onShare: () => Promise<void>;
  onFavorite: () => Promise<void>;
}

export default function InteractionBar({ 
  likes, 
  shares, 
  favorites, 
  onLike, 
  onShare, 
  onFavorite 
}: InteractionBarProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);

  const handleInteraction = async (type: 'like' | 'share' | 'favorite') => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowMessage(null);
    
    try {
      if (type === 'like') {
        await onLike();
        setLiked(true);
        setTimeout(() => setLiked(false), 500);
        setShowMessage('点赞成功！');
      } else if (type === 'share') {
        await onShare();
        if (navigator.share) {
          try {
            await navigator.share({
              title: '农产品溯源',
              url: window.location.href,
            });
          } catch (err) {
            // User cancelled or share failed - that's okay
          }
        } else {
          // Fallback: copy to clipboard
          await navigator.clipboard.writeText(window.location.href);
          setShowMessage('链接已复制到剪贴板！');
        }
      } else if (type === 'favorite') {
        await onFavorite();
        setFavorited(true);
        setTimeout(() => setFavorited(false), 500);
        setShowMessage('收藏成功！');
      }
      
      setTimeout(() => setShowMessage(null), 2000);
    } catch (error) {
      setShowMessage(error instanceof Error ? error.message : '操作失败，请稍后重试');
      setTimeout(() => setShowMessage(null), 2000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-lg mx-auto">
        {showMessage && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm animate-bounce">
            {showMessage}
          </div>
        )}
        
        <div className="flex justify-around items-center">
          <button
            onClick={() => handleInteraction('like')}
            disabled={isProcessing}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              liked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            } disabled:opacity-50`}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">{likes}</span>
          </button>
          
          <button
            onClick={() => handleInteraction('share')}
            disabled={isProcessing}
            className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-xs font-medium">{shares}</span>
          </button>
          
          <button
            onClick={() => handleInteraction('favorite')}
            disabled={isProcessing}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              favorited ? 'text-yellow-500 bg-yellow-50' : 'text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'
            } disabled:opacity-50`}
          >
            <Bookmark className={`w-6 h-6 ${favorited ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">{favorites}</span>
          </button>
        </div>
      </div>
    </div>
  );
}