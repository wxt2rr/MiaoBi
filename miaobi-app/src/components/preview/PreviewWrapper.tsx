'use client';

import React from 'react';
import { PreviewPanel } from './PreviewPanel';

interface PreviewWrapperProps {
  content: string;
  className?: string;
}

export default function PreviewWrapper({ content, className }: PreviewWrapperProps) {
  return <PreviewPanel content={content} className={className} />;
} 