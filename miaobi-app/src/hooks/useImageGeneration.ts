import { useState, useCallback, useMemo } from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import ImageGenerationService, { ImageGenerationResult } from '@/services/image-generation-service';

export function useImageGeneration() {
  const { imageConfig } = useSettingsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 创建图像生成服务实例
  const imageService = useMemo(() => {
    return new ImageGenerationService(imageConfig);
  }, [imageConfig]);

  // 生成图片
  const generateImage = useCallback(async (
    selectedText: string,
    prompt: string,
    type: 'illustration' | 'diagram'
  ): Promise<ImageGenerationResult | null> => {
    console.log('🖼️ useImageGeneration.generateImage 被调用');
    console.log('🖼️ imageConfig:', imageConfig);
    console.log('🖼️ 参数:', { selectedText, prompt, type });
    
    if (!imageConfig.apiKey) {
      const errorMsg = '请先在设置中配置图像生成 API Key';
      console.log('❌', errorMsg);
      setError(errorMsg);
      alert(errorMsg);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔄 调用 imageService.generateImage...');
      const result = await imageService.generateImage(prompt, type, selectedText);
      console.log('✅ imageService.generateImage 成功:', result);
      
      // 优化图片以适配微信
      console.log('🔄 优化图片...');
      const optimizedBlob = await imageService.optimizeForWechat(result.blob);
      console.log('✅ 图片优化完成');
      
      const finalResult = {
        ...result,
        blob: optimizedBlob
      };
      
      console.log('🎉 图片生成完全成功:', finalResult);
      return finalResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '图片生成失败';
      console.error('❌ 图片生成失败:', err);
      setError(errorMessage);
      alert(`图片生成失败: ${errorMessage}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [imageConfig, imageService]);

  // 将Blob转换为Data URL用于显示
  const blobToDataUrl = useCallback((blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('转换图片失败'));
      reader.readAsDataURL(blob);
    });
  }, []);

  return {
    generateImage,
    blobToDataUrl,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}

export default useImageGeneration;
