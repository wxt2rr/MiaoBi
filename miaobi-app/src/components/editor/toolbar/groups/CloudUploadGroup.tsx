import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CloudUpload, Loader2 } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { useSettingsStore } from '@/stores/settings-store';
import { CloudStorageService } from '@/services/cloud-storage-service';
import { toast } from 'sonner';

interface CloudUploadGroupProps {
  editor: Editor | null;
}

interface ImageNode {
  node: {
    type: {
      name: string;
    };
    attrs: Record<string, unknown>;
  };
  pos: number;
}

export const CloudUploadGroup: React.FC<CloudUploadGroupProps> = ({ editor }) => {
  const { cloudStorage } = useSettingsStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadToCloud = async () => {
    if (!editor) return;

    // 获取编辑器中的所有图片
    const images: ImageNode[] = [];
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'image') {
        images.push({ node, pos });
      }
    });

    if (images.length === 0) {
      toast.error('未找到可上传的图片');
      return;
    }

    setIsUploading(true);

    try {
      const cloudService = new CloudStorageService(cloudStorage);
      let uploadedCount = 0;
      let errorCount = 0;

      // 遍历所有图片并上传
      for (const imageNode of images) {
        const src = (imageNode.node.attrs as { src: string }).src;
        
        // 跳过已经是云存储 URL 的图片
        if (src.startsWith('http') && !src.startsWith('blob:')) {
          continue;
        }

        // 如果是 blob URL，需要转换为 File 对象
        if (src.startsWith('blob:')) {
          try {
            const response = await fetch(src);
            const blob = await response.blob();
            const file = new File([blob], 'image.png', { type: 'image/png' });
            
            const result = await cloudService.uploadImage(file);
            
            if (result.success && result.url) {
              // 更新编辑器中的图片 URL
              const transaction = editor.state.tr;
              transaction.setNodeAttribute(imageNode.pos, 'src', result.url);
              editor.view.dispatch(transaction);
              uploadedCount++;
            } else {
              console.error('上传失败:', result.error);
              errorCount++;
            }
          } catch (error) {
            console.error('图片处理失败:', error);
            errorCount++;
          }
        } else {
          // 处理本地文件路径
          try {
            // 这里需要根据实际情况处理本地文件
            // 暂时跳过本地文件路径的处理
            console.warn('跳过本地文件路径:', src);
          } catch (error) {
            console.error('本地文件处理失败:', error);
            errorCount++;
          }
        }
      }

      if (uploadedCount > 0) {
        toast.success(`成功上传 ${uploadedCount} 张图片到云端`);
      }
      
      if (errorCount > 0) {
        toast.error(`${errorCount} 张图片上传失败`);
      }
      
      if (uploadedCount === 0 && errorCount === 0) {
        toast.info('所有图片已经是云端链接，无需上传');
      }

    } catch (error) {
      console.error('上传过程出错:', error);
      toast.error('上传失败，请检查云存储配置');
    } finally {
      setIsUploading(false);
    }
  };

  const hasImagesToUpload = () => {
    if (!editor) return false;

    const images: ImageNode[] = [];
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'image') {
        const src = (node.attrs as { src: string }).src;
        // 只上传本地图片（blob URL 或本地路径）
        if (src.startsWith('blob:') || !src.startsWith('http')) {
          images.push({ node, pos });
        }
      }
    });

    return images.length > 0;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleUploadToCloud}
          disabled={isUploading || !hasImagesToUpload() || !cloudStorage.enabled}
          className="h-9 w-9"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CloudUpload className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3 text-sm">
        {!cloudStorage.enabled ? (
          <p>请先启用云存储配置</p>
        ) : !hasImagesToUpload() ? (
          <p>没有可上传的本地图片</p>
        ) : (
          <p>上传图片到云端</p>
        )}
      </PopoverContent>
    </Popover>
  );
};