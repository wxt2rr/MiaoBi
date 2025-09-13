import type { ImageGenerationConfig } from '@/types';

export interface ImageGenerationResult {
  url: string;
  blob: Blob;
  width: number;
  height: number;
}

export class ImageGenerationService {
  private config: ImageGenerationConfig;

  constructor(config: ImageGenerationConfig) {
    this.config = config;
  }

  updateConfig(config: ImageGenerationConfig) {
    this.config = config;
  }

  async generateImage(
    prompt: string,
    type: 'illustration' | 'diagram',
    selectedText?: string
  ): Promise<ImageGenerationResult> {
    // 构建完整的提示词
    const fullPrompt = this.buildPrompt(prompt, type, selectedText);
    
    console.log('生成图片提示词:', fullPrompt);

    // 默认使用DALL-E API格式
    return this.generateWithDALLE(fullPrompt);
  }

  private buildPrompt(
    userPrompt: string,
    type: 'illustration' | 'diagram',
    selectedText?: string
  ): string {
    let basePrompt = '';

    // 根据类型构建基础提示词
    if (type === 'illustration') {
      basePrompt = '创建一个高质量的插图，风格现代简洁，适合文章配图。';
      if (selectedText) {
        basePrompt += ` 基于以下文本内容：${selectedText}`;
      }
    } else if (type === 'diagram') {
      basePrompt = '创建一个清晰的图表或示意图，包含标签和说明，适合展示概念或流程。';
      if (selectedText) {
        basePrompt += ` 基于以下内容制作图表：${selectedText}`;
      }
    }

    // 添加用户自定义提示词
    if (userPrompt) {
      basePrompt += ` ${userPrompt}`;
    }

    // 添加质量和风格要求
    basePrompt += ' 高质量，专业，适合微信公众号文章使用。';

    return basePrompt;
  }

  private async generateWithDALLE(prompt: string): Promise<ImageGenerationResult> {
    if (!this.config.apiKey) {
      throw new Error('请先配置 API Key');
    }

    const baseUrl = this.config.baseUrl || 'https://api.openai.com/v1';
    
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model || 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: this.config.imageSize || '1024x1024',
        quality: this.config.imageQuality || 'standard',
        style: this.config.imageStyle || 'natural'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `DALL-E API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // 下载图片并转换为Blob
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('下载生成的图片失败');
    }

    const blob = await imageResponse.blob();
    
    // 获取图片尺寸
    const { width, height } = await this.getImageDimensions(blob);

    return {
      url: imageUrl,
      blob,
      width,
      height
    };
  }

  private async generateWithStableDiffusion(prompt: string): Promise<ImageGenerationResult> {
    // TODO: 实现 Stable Diffusion API 调用
    throw new Error('Stable Diffusion 支持即将推出');
  }

  private async getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('无法读取图片尺寸'));
      };
      
      img.src = url;
    });
  }

  // 图片优化方法
  async optimizeForWechat(blob: Blob): Promise<Blob> {
    // 如果图片小于 2MB 且是支持的格式，直接返回
    if (blob.size < 2 * 1024 * 1024 && this.isSupportedFormat(blob)) {
      return blob;
    }

    // 否则进行压缩
    return this.compressImage(blob, 0.8);
  }

  private isSupportedFormat(blob: Blob): boolean {
    return ['image/jpeg', 'image/png', 'image/webp'].includes(blob.type);
  }

  private async compressImage(blob: Blob, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // 计算压缩后的尺寸
        let { width, height } = img;
        const maxWidth = 1920;
        const maxHeight = 1080;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // 绘制压缩后的图片
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (compressedBlob) => {
            if (compressedBlob) {
              resolve(compressedBlob);
            } else {
              reject(new Error('图片压缩失败'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('图片加载失败'));
      img.src = URL.createObjectURL(blob);
    });
  }
}

export default ImageGenerationService;
