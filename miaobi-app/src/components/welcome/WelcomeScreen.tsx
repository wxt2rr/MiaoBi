'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEditorStore } from '@/stores/editor-store';
import { FileText, Sparkles, Eye, Copy, Settings } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const { createNewArticle } = useEditorStore();

  const handleCreateFirst = () => {
    createNewArticle();
    onGetStarted();
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI 智能助手',
      description: '输入 "/" 使用AI续写、润色、生成标题等功能'
    },
    {
      icon: Eye,
      title: '实时预览',
      description: '所见即所得，实时预览微信文章效果'
    },
    {
      icon: Copy,
      title: '一键复制',
      description: '完美兼容微信编辑器，一键复制粘贴'
    },
    {
      icon: Settings,
      title: '本地存储',
      description: '数据安全存储在本地，支持自动保存'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">妙笔</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">微信文章创作「副驾驶」</p>
          <p className="text-gray-500">为「心流」创作而生，告别繁琐工作流</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="px-8 py-3 text-lg"
            onClick={handleCreateFirst}
          >
            <FileText className="h-5 w-5 mr-2" />
            开始创作第一篇文章
          </Button>
          
          <p className="text-sm text-gray-500">
            使用前请先在设置中配置您的 OpenAI API Key
          </p>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 text-sm text-gray-400">
            <span>✨ 纯前端应用</span>
            <span>🔒 数据本地存储</span>
            <span>🚀 零服务器成本</span>
          </div>
        </div>
      </div>
    </div>
  );
} 