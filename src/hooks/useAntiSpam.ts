import { useState, useEffect } from 'react';

interface UseAntiSpamResult {
  deviceId: string;
  isLoading: boolean;
}

export function useAntiSpam(): UseAntiSpamResult {
  const [deviceId, setDeviceId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 生成或获取设备ID
    const storedId = localStorage.getItem('device_id');

    if (storedId) {
      setDeviceId(storedId);
      setIsLoading(false);
    } else {
      // 生成新的设备ID
      const newId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('device_id', newId);
      setDeviceId(newId);
      setIsLoading(false);
    }
  }, []);

  return { deviceId, isLoading };
}

// 防刷验证工具函数
export function validateDeviceId(deviceId: string): boolean {
  if (!deviceId || deviceId.length < 10) {
    return false;
  }
  return deviceId.startsWith('device_');
}

// 获取用户IP信息（用于日志记录）
export function getClientInfo(): {
  userAgent: string;
  language: string;
  platform: string;
} {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
  };
}
