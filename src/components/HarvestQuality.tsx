import { Droplets, Scale, Smile, Users, FileText } from 'lucide-react';

interface HarvestQualityProps {
  harvestStart: string;
  harvestEnd: string;
  sugarContent: number;
  weight: number;
  taste: string;
  suitableFor: string;
  summary: string;
}

export default function HarvestQuality({ 
  harvestStart, 
  harvestEnd, 
  sugarContent, 
  weight, 
  taste, 
  suitableFor, 
  summary 
}: HarvestQualityProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Droplets className="w-5 h-5 text-orange-500" />
        采收质量信息
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 p-4 rounded-xl">
          <p className="text-sm text-orange-600 mb-1">采收时间</p>
          <p className="font-semibold text-orange-800">{harvestStart} - {harvestEnd}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-xl">
          <p className="text-sm text-yellow-600 mb-1 flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            糖度
          </p>
          <p className="font-semibold text-yellow-800">{sugarContent}°</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-xl">
          <p className="text-sm text-amber-600 mb-1 flex items-center gap-1">
            <Scale className="w-4 h-4" />
            重量
          </p>
          <p className="font-semibold text-amber-800">{weight}g</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-sm text-green-600 mb-1 flex items-center gap-1">
            <Smile className="w-4 h-4" />
            口感
          </p>
          <p className="font-semibold text-green-800">{taste}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <Users className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600 mb-1">适应人群</p>
            <p className="text-gray-800">{suitableFor}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2 pt-4 border-t border-gray-100">
          <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600 mb-1">品质小结</p>
            <p className="text-gray-800 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}