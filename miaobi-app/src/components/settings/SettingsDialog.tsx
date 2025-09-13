'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSettingsStore } from '@/stores/settings-store';
import { Eye, EyeOff, Save, Settings, Bot, Image as ImageIcon } from 'lucide-react';
import type { ImageGenerationConfig } from '@/types';

interface SettingsDialogProps {
  children?: React.ReactNode;
}

export default function SettingsDialog({ children }: SettingsDialogProps) {
  const { aiConfig, imageConfig, updateAIConfig, updateSettings } = useSettingsStore();
  const [open, setOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showImageApiKey, setShowImageApiKey] = useState(false);
  const [localConfig, setLocalConfig] = useState(aiConfig);
  const [localImageConfig, setLocalImageConfig] = useState(imageConfig);

  const handleSave = () => {
    updateAIConfig(localConfig);
    updateSettings({ imageConfig: localImageConfig });
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // 重置本地配置为当前配置
      setLocalConfig(aiConfig);
      setLocalImageConfig(imageConfig);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>设置</DialogTitle>
          <DialogDescription>
            配置AI服务和应用偏好设置
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI文本
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              AI图像
            </TabsTrigger>
          </TabsList>

          {/* AI文本设置 */}
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>OpenAI 配置</CardTitle>
                <CardDescription>
                  配置用于文本生成的OpenAI服务
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="sk-..."
                      value={localConfig.openaiApiKey || ''}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        openaiApiKey: e.target.value
                      }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">模型</Label>
                  <Input
                    id="model"
                    placeholder="gpt-4o"
                    value={localConfig.openaiModel || ''}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      openaiModel: e.target.value
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseUrl">API Base URL</Label>
                  <Input
                    id="baseUrl"
                    placeholder="https://api.openai.com/v1"
                    value={localConfig.openaiBaseUrl || ''}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      openaiBaseUrl: e.target.value
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    如果使用代理或其他兼容服务，请填写此项
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI图像设置 */}
          <TabsContent value="image" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>图像生成配置</CardTitle>
                <CardDescription>
                  配置AI图像生成服务和参数
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageApiKey">API Key *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageApiKey"
                      type={showImageApiKey ? 'text' : 'password'}
                      placeholder="sk-..."
                      value={localImageConfig.apiKey || ''}
                      onChange={(e) => setLocalImageConfig((prev: ImageGenerationConfig) => ({
                        ...prev,
                        apiKey: e.target.value
                      }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowImageApiKey(!showImageApiKey)}
                    >
                      {showImageApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageModel">模型</Label>
                  <Input
                    id="imageModel"
                    placeholder="dall-e-3"
                    value={localImageConfig.model || ''}
                    onChange={(e) => setLocalImageConfig((prev: ImageGenerationConfig) => ({
                      ...prev,
                      model: e.target.value
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageBaseUrl">API Base URL</Label>
                  <Input
                    id="imageBaseUrl"
                    placeholder="https://api.openai.com/v1"
                    value={localImageConfig.baseUrl || ''}
                    onChange={(e) => setLocalImageConfig((prev: ImageGenerationConfig) => ({
                      ...prev,
                      baseUrl: e.target.value
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    如果使用代理或其他兼容服务，请填写此项
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            保存设置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
