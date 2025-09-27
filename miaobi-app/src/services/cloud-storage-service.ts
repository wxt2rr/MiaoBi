import type { CloudStorageConfig } from '@/types';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class CloudStorageService {
  private config: CloudStorageConfig;

  constructor(config: CloudStorageConfig) {
    this.config = config;
  }

  async uploadImage(file: File): Promise<UploadResult> {
    if (!this.config.enabled) {
      return { success: false, error: '云存储未启用' };
    }

    try {
      switch (this.config.provider) {
        case 'github':
          return await this.uploadToGitHub(file);
        case 's3':
          return await this.uploadToS3(file);
        case 'wechat':
          return await this.uploadToWeChat(file);
        case 'juejin':
          return await this.uploadToJueJin(file);
        case 'local':
        default:
          return await this.uploadToLocal(file);
      }
    } catch (error) {
      console.error('图片上传失败:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '上传失败' 
      };
    }
  }

  private async uploadToGitHub(file: File): Promise<UploadResult> {
    if (!this.config.github) {
      return { success: false, error: 'GitHub 配置不完整' };
    }

    const { token, repo, owner, branch, path } = this.config.github;
    const fileName = this.generateFileName(file);
    const filePath = `${path}/${fileName}`;

    try {
      // 将文件转换为 base64
      const base64Content = await this.fileToBase64(file);

      // 检查文件是否已存在
      const existingFile = await this.getGitHubFile(filePath);
      let sha: string | undefined;

      if (existingFile) {
        sha = existingFile.sha;
      }

      // 上传文件到 GitHub
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Upload image: ${fileName}`,
          content: base64Content,
          branch: branch,
          ...(sha && { sha }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'GitHub 上传失败');
      }

      const data = await response.json();
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
      
      return { success: true, url: rawUrl };
    } catch (error) {
      throw new Error(`GitHub 上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  private async uploadToS3(file: File): Promise<UploadResult> {
    if (!this.config.s3) {
      return { success: false, error: 'S3 配置不完整' };
    }

    const { endpoint, accessKeyId, secretAccessKey, bucket, region, path } = this.config.s3;
    const fileName = this.generateFileName(file);
    const filePath = `${path}/${fileName}`;

    try {
      // 简化 S3 上传实现，实际项目中应使用 AWS SDK
      const formData = new FormData();
      formData.append('file', file);

      // 构造 S3 上传 URL
      if (!endpoint) {
        throw new Error('S3 endpoint is required');
      }
      if (!bucket) {
        throw new Error('S3 bucket is required');
      }
      if (!accessKeyId || !secretAccessKey) {
        throw new Error('S3 access credentials are required');
      }
      const uploadUrl = endpoint.endsWith('/') 
        ? `${endpoint}${bucket}/${filePath}`
        : `${endpoint}/${bucket}/${filePath}`;

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`S3 上传失败: ${response.statusText}`);
      }

      return { success: true, url: uploadUrl };
    } catch (error) {
      throw new Error(`S3 上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  private async uploadToWeChat(file: File): Promise<UploadResult> {
    if (!this.config.platform) {
      return { success: false, error: '微信配置不完整' };
    }

    try {
      const formData = new FormData();
      formData.append('media', file);

      const response = await fetch(`${this.config.platform.apiUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.platform.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('微信上传失败');
      }

      const data = await response.json();
      return { success: true, url: data.url };
    } catch (error) {
      throw new Error(`微信上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  private async uploadToJueJin(file: File): Promise<UploadResult> {
    if (!this.config.platform) {
      return { success: false, error: '掘金配置不完整' };
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.config.platform.apiUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.platform.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('掘金上传失败');
      }

      const data = await response.json();
      return { success: true, url: data.url };
    } catch (error) {
      throw new Error(`掘金上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  private async uploadToLocal(file: File): Promise<UploadResult> {
    // 本地存储：创建对象 URL
    const url = URL.createObjectURL(file);
    return { success: true, url };
  }

  private generateFileName(file: File): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop() || 'png';
    return `image_${timestamp}_${randomStr}.${extension}`;
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // 移除 data URL 前缀
        resolve(base64.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  }

  private async getGitHubFile(filePath: string): Promise<{ sha: string } | null> {
    if (!this.config.github) return null;

    const { token, repo, owner, branch } = this.config.github;

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error('获取文件信息失败');
      }

      return await response.json();
    } catch {
      return null;
    }
  }

  // 简化 S3 签名生成（实际项目应使用 AWS SDK）
  private generateS3Signature(secretAccessKey: string): string {
    // 这里只是占位符，实际 S3 签名需要复杂的算法
    return 'simplified-signature-for-demo';
  }
}