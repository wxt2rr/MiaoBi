'use client';

import { useEditorStore } from '@/stores/editor-store';
import { ExportService } from '@/services/export-service';
import { useEffect, useRef } from 'react';

export default function PreviewPanel() {
  const { content } = useEditorStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      // 使用ExportService生成预览HTML
      const previewHTML = ExportService.generatePreviewHTML(content);

      // 使用srcdoc属性而不是data URL，避免sandbox问题
      const iframe = iframeRef.current;
      iframe.srcdoc = previewHTML;
    }
  }, [content]);

  return (
    <div className="h-full bg-gray-100 p-2">
      <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="微信预览"
          sandbox="allow-same-origin"
          loading="lazy"
        />
      </div>
    </div>
  );
} 