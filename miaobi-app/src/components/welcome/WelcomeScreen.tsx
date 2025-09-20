'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Sparkles, 
  Eye, 
  Copy, 
  Zap, 
  MessageSquare,
  BookOpen,
  Gem,
  ArrowRight,
  Play,
  Github,
  Star,
  CheckCircle,
  Palette,
  Download,
  Shield
} from 'lucide-react';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleCreateFirst = () => {
    router.push('/editor');
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI 智能写作',
      description: '输入 "/" 唤醒AI助手，智能续写、润色、生成标题，让创作更高效',
      badge: 'AI 驱动'
    },
    {
      icon: Eye,
      title: '多平台预览',
      description: '实时预览在不同平台的显示效果，所见即所得的编辑体验',
      badge: '实时同步'
    },
    {
      icon: Copy,
      title: '一键适配',
      description: '智能适配微信、知乎、掘金、小红书格式，一键复制粘贴',
      badge: '智能适配'
    },
    {
      icon: Palette,
      title: '平台专属样式',
      description: '为每个平台量身定制的样式主题，让内容在各平台都完美呈现',
      badge: '样式丰富'
    },
    {
      icon: Shield,
      title: '本地存储',
      description: '数据安全存储在本地浏览器，支持自动保存，保护您的创作成果',
      badge: '安全可靠'
    },
    {
      icon: Download,
      title: '多格式导出',
      description: '支持导出为 Markdown、PDF、图片等多种格式，满足不同需求',
      badge: '格式丰富'
    }
  ];

  const platforms = [
    { icon: MessageSquare, name: '微信公众号', description: '完美适配微信编辑器，支持图文排版' },
    { icon: BookOpen, name: '知乎', description: '支持知乎富文本格式，专业问答样式' },
    { icon: Gem, name: '掘金', description: '兼容掘金 Markdown，技术文章首选' },
    { icon: Sparkles, name: '小红书', description: '图文并茂，生活分享专用格式' }
  ];

  const highlights = [
    { icon: CheckCircle, text: '支持四大主流内容平台' },
    { icon: CheckCircle, text: '智能格式适配，一键发布' },
    { icon: CheckCircle, text: '本地存储，数据安全可靠' },
    { icon: CheckCircle, text: '开源免费，零配置使用' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 flex h-14 items-center">
          <div className="mr-4 flex">
            <div className="mr-6 flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold">妙笔</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/wxt2rr/MiaoBi" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/wxt2rr/MiaoBi" target="_blank" rel="noopener noreferrer">
                  <Star className="mr-2 h-4 w-4" />
                  Star
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
          <Badge variant="outline" className="mb-4">
            <Zap className="mr-1 h-3 w-3" />
            AI 驱动的写作工具
          </Badge>
          
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            为内容创作者打造的
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              全平台写作工具
            </span>
          </h1>
          
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            支持微信公众号、知乎、掘金、小红书，一次创作，多平台发布。
            集成 AI 智能助手，让图文创作变得简单高效。
          </p>
          
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Button size="lg" onClick={handleCreateFirst}>
              <Play className="mr-2 h-4 w-4" />
              开始创作
            </Button>
            <Button variant="outline" size="lg" onClick={handleCreateFirst}>
              <Eye className="mr-2 h-4 w-4" />
              查看演示
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto max-w-7xl px-4 space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            强大功能，简单易用
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            为创作者精心设计的功能，让写作变得更加高效和愉悦
          </p>
        </div>
        
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Platforms Section */}
      <section className="container mx-auto max-w-7xl px-4 space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            多平台完美适配
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            一次编写，多平台发布，完美适配各大内容平台
          </p>
        </div>
        
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4 md:max-w-[64rem]">
          {platforms.map((platform, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <platform.icon className="mx-auto h-12 w-12 text-primary" />
                <CardTitle>{platform.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{platform.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="container mx-auto max-w-7xl px-4 space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            为什么选择妙笔？
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <highlight.icon className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 space-y-6 py-8 md:py-12 lg:py-24">
        <Card className="mx-auto max-w-[980px]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">准备好开始全平台创作了吗？</CardTitle>
            <CardDescription className="text-lg">
              加入数千名内容创作者，体验一次创作，多平台发布的便捷
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button size="lg" onClick={handleCreateFirst} className="w-full max-w-xs">
              <Sparkles className="mr-2 h-4 w-4" />
              立即开始创作
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">
              无需注册，立即开始使用
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <FileText className="h-6 w-6" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ by the 妙笔 team. Open source and free to use.
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="outline">v1.0.0</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}