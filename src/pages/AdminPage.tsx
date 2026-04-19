import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRODUCT_CODES = ['4395'];

export default function AdminPage() {
  const [selectedCode, setSelectedCode] = useState('4395');
  const [customCode, setCustomCode] = useState('');

  const baseUrl = window.location.origin;
  const getProductUrl = (code: string) => `${baseUrl}/product/${code}`;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">二维码生成器</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择产品编码
              </label>
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {PRODUCT_CODES.map(code => (
                  <option key={code} value={code}>
                    {code} - 枣甜5号
                  </option>
                ))}
              </select>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                或输入自定义编码
              </label>
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="输入产品编码..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">生成的二维码</h2>
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <QRCodeSVG 
                    value={getProductUrl(customCode || selectedCode)} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <div className="w-full">
                  <p className="text-sm text-gray-600 mb-2">产品链接：</p>
                  <div className="bg-gray-100 p-3 rounded-lg break-all text-sm text-gray-700">
                    {getProductUrl(customCode || selectedCode)}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getProductUrl(customCode || selectedCode));
                    alert('链接已复制到剪贴板！');
                  }}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  复制链接
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}