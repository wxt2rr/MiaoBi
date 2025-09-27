'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettingsStore } from '@/stores/settings-store';
import { Eye, EyeOff, Save } from 'lucide-react';
import type { ImageGenerationConfig } from '@/types';
import { CloudStorageSettings } from './CloudStorageSettings';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { aiConfig, imageConfig, updateAIConfig, updateSettings } = useSettingsStore();
  const [showApiKey, setShowApiKey] = useState(false);
  const [showImageApiKey, setShowImageApiKey] = useState(false);
  const [localConfig, setLocalConfig] = useState(aiConfig);
  const [localImageConfig, setLocalImageConfig] = useState(imageConfig);

  const handleSave = () => {
    updateAIConfig(localConfig);
    updateSettings({ imageConfig: localImageConfig });
    onClose();
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>设置</SheetTitle>
          <SheetDescription>
            配置您的AI服务和偏好设置
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* AI配置 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">AI 配置</h3>
            
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <div className="relative">
                <Input
                  id="openai-key"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="请输入您的 OpenAI API Key"
                  value={localConfig.openaiApiKey || ''}
                  onChange={(e) => setLocalConfig(prev => ({
                    ...prev,
                    openaiApiKey: e.target.value
                  }))}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                您的API密钥仅存储在本地浏览器中，不会上传到任何服务器
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openai-model">模型选择</Label>
              <Select
                value={localConfig.openaiModel || 'gpt-4o'}
                onValueChange={(value) => setLocalConfig(prev => ({
                  ...prev,
                  openaiModel: value
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openai-base-url">Base URL (可选)</Label>
              <Input
                id="openai-base-url"
                placeholder="https://api.openai.com/v1"
                value={localConfig.openaiBaseUrl || ''}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  openaiBaseUrl: e.target.value
                }))}
              />
              <p className="text-sm text-muted-foreground">
                如果您使用代理或其他兼容服务，请填写此项
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">创作温度: {localConfig.temperature || 0.7}</Label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={localConfig.temperature || 0.7}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  temperature: parseFloat(e.target.value)
                }))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>保守 (0.0)</span>
                <span>创意 (2.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 云存储配置 */}
        <CloudStorageSettings />

        {/* 图像生成配置 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">图像生成设置</h3>
            <p className="text-sm text-muted-foreground">
              配置AI图像生成功能
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageProvider">图像生成服务</Label>
              <Select
                value={localImageConfig.provider}
                onValueChange={(value: 'openai' | 'stability' | 'midjourney') => 
                  setLocalImageConfig((prev: ImageGenerationConfig) => ({ ...prev, provider: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择图像生成服务" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI DALL-E</SelectItem>
                  <SelectItem value="stability" disabled>Stability AI (即将支持)</SelectItem>
                  <SelectItem value="midjourney" disabled>Midjourney (即将支持)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {localImageConfig.provider === 'openai' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="imageApiKey">OpenAI API Key</Label>
                  <div className="flex">
                    <Input
                      id="imageApiKey"
                      type={showImageApiKey ? 'text' : 'password'}
                      placeholder="sk-..."
                      value={localImageConfig.openaiApiKey || ''}
                      onChange={(e) => setLocalImageConfig((prev: ImageGenerationConfig) => ({
                        ...prev,
                        openaiApiKey: e.target.value
                      }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={() => setShowImageApiKey(!showImageApiKey)}
                    >
                      {showImageApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    可以与文本生成使用相同的API Key
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dalleModel">DALL-E 模型</Label>
                  <Select
                    value={localImageConfig.dalleModel || 'dall-e-3'}
                    onValueChange={(value: 'dall-e-2' | 'dall-e-3') => 
                      setLocalImageConfig((prev: ImageGenerationConfig) => ({ ...prev, dalleModel: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dall-e-3">DALL-E 3 (推荐)</SelectItem>
                      <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageSize">图片尺寸</Label>
                  <Select
                    value={localImageConfig.imageSize || '1024x1024'}
                    onValueChange={(value: string) => 
                      setLocalImageConfig((prev: ImageGenerationConfig) => ({ 
                        ...prev, 
                        imageSize: value as ImageGenerationConfig['imageSize']
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024x1024">正方形 (1024×1024)</SelectItem>
                      <SelectItem value="1792x1024">横版 (1792×1024)</SelectItem>
                      <SelectItem value="1024x1792">竖版 (1024×1792)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageQuality">图片质量</Label>
                  <Select
                    value={localImageConfig.imageQuality || 'standard'}
                    onValueChange={(value: 'standard' | 'hd') => 
                      setLocalImageConfig((prev: ImageGenerationConfig) => ({ ...prev, imageQuality: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">标准质量</SelectItem>
                      <SelectItem value="hd">高清质量</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageStyle">图片风格</Label>
                  <Select
                    value={localImageConfig.imageStyle || 'natural'}
                    onValueChange={(value: 'vivid' | 'natural') => 
                      setLocalImageConfig((prev: ImageGenerationConfig) => ({ ...prev, imageStyle: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">自然风格</SelectItem>
                      <SelectItem value="vivid">鲜艳风格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            保存设置
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
} 