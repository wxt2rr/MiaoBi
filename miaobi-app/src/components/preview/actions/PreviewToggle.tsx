'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { usePreviewStore } from '@/stores/previewStore';
import { Monitor, Smartphone } from 'lucide-react';

export const PreviewToggle: React.FC = () => {
  const { previewMode, setPreviewMode } = usePreviewStore();

  const handleToggle = () => {
    const newMode = previewMode === 'pc' ? 'mobile' : 'pc';
    setPreviewMode(newMode);
  };

  const isPcMode = previewMode === 'pc';

  return (
    <Button
      onClick={handleToggle}
      variant={isPcMode ? "default" : "secondary"}
      size="sm"
      className="w-full justify-start gap-2 h-9"
      title={`切换到${isPcMode ? '移动端' : 'PC端'}预览`}
    >
      {isPcMode ? (
        <>
          <Monitor className="w-4 h-4" />
          <span className="text-sm">PC 预览</span>
        </>
      ) : (
        <>
          <Smartphone className="w-4 h-4" />
          <span className="text-sm">移动端预览</span>
        </>
      )}
    </Button>
  );
};