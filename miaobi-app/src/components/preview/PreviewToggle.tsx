'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export function PreviewToggle() {
  const [isPreviewMode, setIsPreviewMode] = React.useState(true);

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={togglePreview}
      className="gap-2"
    >
      {isPreviewMode ? (
        <>
          <Eye className="h-4 w-4" />
          <span>预览</span>
        </>
      ) : (
        <>
          <EyeOff className="h-4 w-4" />
          <span>编辑</span>
        </>
      )}
    </Button>
  );
}