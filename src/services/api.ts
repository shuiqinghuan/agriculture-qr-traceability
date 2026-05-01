// API 服务文件

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// 接口返回类型
export interface Product {
  id: number;
  code: string;
  name: string;
  location: string;
  planting_time: string;
  harvest_start: string;
  harvest_end: string;
  sugar_content: number;
  weight: number;
  taste: string;
  suitable_for: string;
  summary: string;
  likes: number;
  shares: number;
  favorites: number;
  images: Array<{
    id: number;
    image_url: string;
    order: number;
  }>;
  videos: Array<{
    id: number;
    video_url: string;
    order: number;
  }>;
}

// 获取产品详情
export async function getProductByCode(productCode: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productCode}/`);
    if (!response.ok) {
      throw new Error('获取产品信息失败');
    }
    return await response.json();
  } catch (error) {
    console.error('获取产品信息出错:', error);
    throw error;
  }
}

// 用户交互（点赞、分享、收藏）
export async function userInteraction(productCode: string, action: 'like' | 'share' | 'favorite', deviceId: string): Promise<{ message: string; count: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/interactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_code: productCode,
        action,
        device_id: deviceId,
      }),
    });
    if (!response.ok) {
      throw new Error('操作失败');
    }
    return await response.json();
  } catch (error) {
    console.error('用户交互出错:', error);
    throw error;
  }
}

// 获取所有产品
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);
    if (!response.ok) {
      throw new Error('获取产品列表失败');
    }
    return await response.json();
  } catch (error) {
    console.error('获取产品列表出错:', error);
    throw error;
  }
}