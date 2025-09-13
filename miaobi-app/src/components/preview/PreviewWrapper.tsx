'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// 动态导入 PreviewPanel，避免 SSR 问题
const PreviewPanel = dynamic(() => import('./PreviewPanel'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-100 p-2">
      <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm p-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="space-y-2 mt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-32 w-full rounded" />
        </div>
      </div>
    </div>
  ),
});

export default PreviewPanel; 