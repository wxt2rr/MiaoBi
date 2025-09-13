import { useState, useCallback } from 'react';
import { getAIService } from '@/services/ai-service';
import { useSettingsStore } from '@/stores/settings-store';

export function useAI() {
  const { aiConfig } = useSettingsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = getAIService(aiConfig);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 流式续写
  const continueWriting = useCallback(async function* (context: string) {
    if (!aiConfig.openaiApiKey) {
      setError('请先在设置中配置 OpenAI API Key');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      yield* aiService.continueWriting(context);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '续写失败';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [aiConfig, aiService]);

  // 润色文本
  const polishText = useCallback(async (text: string, instruction?: string) => {
    if (!aiConfig.openaiApiKey) {
      setError('请先在设置中配置 OpenAI API Key');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await aiService.polishText(text, instruction);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '润色失败';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aiConfig, aiService]);

  // 生成标题
  const generateTitles = useCallback(async (content: string, count = 5) => {
    if (!aiConfig.openaiApiKey) {
      setError('请先在设置中配置 OpenAI API Key');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const titles = await aiService.generateTitles(content, count);
      return titles;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '生成标题失败';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [aiConfig, aiService]);

  // 总结文本
  const summarizeText = useCallback(async (text: string) => {
    if (!aiConfig.openaiApiKey) {
      setError('请先在设置中配置 OpenAI API Key');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const summary = await aiService.summarizeText(text);
      return summary;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '总结失败';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aiConfig, aiService]);

  return {
    isLoading,
    error,
    clearError,
    continueWriting,
    polishText,
    generateTitles,
    summarizeText,
  };
} 