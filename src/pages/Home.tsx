import { Link } from 'react-router-dom';
import { Sprout, QrCode, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <Sprout className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">农产品溯源系统</h1>
          <p className="text-green-600">扫一扫，了解产品详情</p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/product/4395"
            className="block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">查看示例产品</h2>
                <p className="text-sm text-gray-500">枣甜5号 - 产品编码 4395</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/admin"
            className="block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">管理后台</h2>
                <p className="text-sm text-gray-500">生成产品二维码</p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-8 text-center text-sm text-green-600">
          <p>扫描产品包装上的二维码即可访问产品溯源页面</p>
        </div>
      </div>
    </div>
  );
}