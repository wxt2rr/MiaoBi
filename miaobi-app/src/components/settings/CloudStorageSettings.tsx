import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
// Switch 组件不存在，使用 Toggle 替代
import { Toggle } from '@/components/ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettingsStore } from '@/stores/settings-store';

export const CloudStorageSettings: React.FC = () => {
  const { cloudStorage, updateCloudStorage } = useSettingsStore();

  const handleProviderChange = (provider: string) => {
    updateCloudStorage({ 
      provider: provider as 'github' | 's3' | 'wechat' | 'juejin' | 'local' 
    });
  };

  const handleEnabledChange = (enabled: boolean) => {
    updateCloudStorage({ enabled });
  };

  const handleGitHubConfigChange = (key: string, value: string) => {
    const currentGitHub = cloudStorage.github || {};
    updateCloudStorage({
      github: {
        ...currentGitHub,
        [key]: value
      }
    });
  };

  const handleS3ConfigChange = (key: string, value: string) => {
    const currentS3 = cloudStorage.s3 || {};
    updateCloudStorage({
      s3: {
        ...currentS3,
        [key]: value
      }
    });
  };

  const handlePlatformConfigChange = (key: string, value: string) => {
    const currentPlatform = cloudStorage.platform || {};
    updateCloudStorage({
      platform: {
        ...currentPlatform,
        [key]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>云存储配置</CardTitle>
        <CardDescription>
          配置图片上传到云存储服务，支持 GitHub、S3、微信、掘金等平台
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 启用开关 */}
        <div className="flex items-center justify-between">
          <Label htmlFor="cloud-storage-enabled">启用云存储</Label>
          <Toggle
            id="cloud-storage-enabled"
            pressed={cloudStorage.enabled}
            onPressedChange={handleEnabledChange}
          >
            {cloudStorage.enabled ? '开启' : '关闭'}
          </Toggle>
        </div>

        {cloudStorage.enabled && (
          <>
            {/* 存储提供商选择 */}
            <div className="space-y-2">
              <Label htmlFor="cloud-storage-provider">存储提供商</Label>
              <Select value={cloudStorage.provider} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">本地存储</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="s3">S3 协议</SelectItem>
                  <SelectItem value="wechat">微信</SelectItem>
                  <SelectItem value="juejin">掘金</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* GitHub 配置 */}
            {cloudStorage.provider === 'github' && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h4 className="font-medium">GitHub 配置</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github-token">Token</Label>
                    <Input
                      id="github-token"
                      type="password"
                      value={cloudStorage.github?.token || ''}
                      onChange={(e) => handleGitHubConfigChange('token', e.target.value)}
                      placeholder="输入 GitHub Personal Access Token"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github-owner">所有者</Label>
                    <Input
                      id="github-owner"
                      value={cloudStorage.github?.owner || ''}
                      onChange={(e) => handleGitHubConfigChange('owner', e.target.value)}
                      placeholder="GitHub 用户名或组织名"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github-repo">仓库名</Label>
                    <Input
                      id="github-repo"
                      value={cloudStorage.github?.repo || ''}
                      onChange={(e) => handleGitHubConfigChange('repo', e.target.value)}
                      placeholder="仓库名称"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github-branch">分支</Label>
                    <Input
                      id="github-branch"
                      value={cloudStorage.github?.branch || 'main'}
                      onChange={(e) => handleGitHubConfigChange('branch', e.target.value)}
                      placeholder="分支名称"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="github-path">存储路径</Label>
                    <Input
                      id="github-path"
                      value={cloudStorage.github?.path || 'images'}
                      onChange={(e) => handleGitHubConfigChange('path', e.target.value)}
                      placeholder="图片存储路径"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* S3 配置 */}
            {cloudStorage.provider === 's3' && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h4 className="font-medium">S3 配置</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="s3-endpoint">Endpoint</Label>
                    <Input
                      id="s3-endpoint"
                      value={cloudStorage.s3?.endpoint || ''}
                      onChange={(e) => handleS3ConfigChange('endpoint', e.target.value)}
                      placeholder="S3 服务端点"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s3-region">区域</Label>
                    <Input
                      id="s3-region"
                      value={cloudStorage.s3?.region || 'us-east-1'}
                      onChange={(e) => handleS3ConfigChange('region', e.target.value)}
                      placeholder="区域"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s3-access-key">Access Key ID</Label>
                    <Input
                      id="s3-access-key"
                      type="password"
                      value={cloudStorage.s3?.accessKeyId || ''}
                      onChange={(e) => handleS3ConfigChange('accessKeyId', e.target.value)}
                      placeholder="Access Key ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s3-secret-key">Secret Access Key</Label>
                    <Input
                      id="s3-secret-key"
                      type="password"
                      value={cloudStorage.s3?.secretAccessKey || ''}
                      onChange={(e) => handleS3ConfigChange('secretAccessKey', e.target.value)}
                      placeholder="Secret Access Key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s3-bucket">Bucket</Label>
                    <Input
                      id="s3-bucket"
                      value={cloudStorage.s3?.bucket || ''}
                      onChange={(e) => handleS3ConfigChange('bucket', e.target.value)}
                      placeholder="Bucket 名称"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s3-path">存储路径</Label>
                    <Input
                      id="s3-path"
                      value={cloudStorage.s3?.path || 'images'}
                      onChange={(e) => handleS3ConfigChange('path', e.target.value)}
                      placeholder="图片存储路径"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 平台配置 */}
            {(cloudStorage.provider === 'wechat' || cloudStorage.provider === 'juejin') && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h4 className="font-medium">{cloudStorage.provider === 'wechat' ? '微信' : '掘金'} 配置</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-api-url">API 地址</Label>
                    <Input
                      id="platform-api-url"
                      value={cloudStorage.platform?.apiUrl || ''}
                      onChange={(e) => handlePlatformConfigChange('apiUrl', e.target.value)}
                      placeholder="上传 API 地址"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-token">Token</Label>
                    <Input
                      id="platform-token"
                      type="password"
                      value={cloudStorage.platform?.token || ''}
                      onChange={(e) => handlePlatformConfigChange('token', e.target.value)}
                      placeholder="API Token"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="platform-path">上传路径</Label>
                    <Input
                      id="platform-path"
                      value={cloudStorage.platform?.uploadPath || 'images'}
                      onChange={(e) => handlePlatformConfigChange('uploadPath', e.target.value)}
                      placeholder="图片上传路径"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};