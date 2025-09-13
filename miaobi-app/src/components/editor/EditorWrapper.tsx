'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// 动态导入 TipTapEditor，禁用 SSR
const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="p-2 border-t bg-muted/50">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  ),
});

export default TipTapEditor; 