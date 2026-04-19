import { MapPin, Calendar, Sprout } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  location: string;
  plantingTime: string;
  code: string;
}

export default function ProductInfo({ name, location, plantingTime, code }: ProductInfoProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sprout className="w-6 h-6 text-green-600" />
        <h1 className="text-2xl font-bold text-green-800">{name}</h1>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-700">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">定植地点：</span>
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-green-700">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">定植时间：</span>
          <span>{plantingTime}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-200">
          <span className="text-sm text-green-600">产品编码：</span>
          <span className="ml-2 font-mono text-green-800 font-semibold">{code}</span>
        </div>
      </div>
    </div>
  );
}