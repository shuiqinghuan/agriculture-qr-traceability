import { useState } from 'react';
import { Image as ImageIcon, Play } from 'lucide-react';

interface MediaGalleryProps {
  images: string[];
  videos: string[];
}

export default function MediaGallery({ images, videos }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const allMedia = [...images, ...videos];

  if (allMedia.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-2xl text-center">
        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">暂无媒体资源</p>
      </div>
    );
  }

  const isVideo = (url: string) => url.includes('.mp4') || url.includes('.webm') || videos.includes(url);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
        {isVideo(allMedia[selectedIndex]) ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <video 
              src={allMedia[selectedIndex]} 
              controls 
              className="max-w-full max-h-full"
            />
          </div>
        ) : (
          <img 
            src={allMedia[selectedIndex]} 
            alt={`Product media ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {allMedia.map((media, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index ? 'border-green-500 ring-2 ring-green-200' : 'border-transparent hover:border-gray-300'
            }`}
          >
            {isVideo(media) ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-500" />
              </div>
            ) : (
              <img 
                src={media} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}