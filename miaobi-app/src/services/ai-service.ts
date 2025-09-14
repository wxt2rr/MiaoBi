import type { AIConfig } from '@/types';
// import { useSettingsStore } from '@/stores/settings-store';

export class AIService {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  updateConfig(config: AIConfig) {
    this.config = config;
  }

  /**
   * 流式文本生成
   */
  async *streamCompletion(prompt: string, context?: string): AsyncGenerator<string> {
    if (!this.config.openaiApiKey) {
      throw new Error('请先配置 OpenAI API Key');
    }

    const baseUrl = this.config.openaiBaseUrl || 'https://api.openai.com/v1';
    const model = this.config.openaiModel || 'gpt-4o';

    const messages = [];
    
    // 添加系统提示
    messages.push({
      role: 'system',
      content: '你是一个专业的中文写作助手，专门帮助用户创作微信公众号文章。你的回答应该自然流畅，符合中文表达习惯。'
    });

    // 添加上下文
    if (context) {
      messages.push({
        role: 'user',
        content: `文章上下文：\n${context}`
      });
    }

    // 添加当前请求
    messages.push({
      role: 'user',
      content: prompt
    });

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.openaiApiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: this.config.temperature || 0.7,
          stream: true,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应流');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;
            
            const data = trimmed.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch {
              // 忽略解析错误的行
              continue;
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error('AI API 调用失败:', error);
      throw new Error('AI 服务暂时不可用，请稍后重试');
    }
  }

  /**
   * 续写文章
   */
  async *continueWriting(context: string): AsyncGenerator<string> {
    const prompt = `请基于以下内容继续写作，保持语言风格和逻辑连贯性：

${context}

请自然地续写下去，不要重复已有内容：`;

    yield* this.streamCompletion(prompt);
  }

  /**
   * 润色文章
   */
  async polishText(text: string, instruction?: string): Promise<string> {
    const prompt = instruction 
      ? `请根据以下要求润色这段文字：${instruction}\n\n原文：\n${text}`
      : `请润色以下文字，使其更加流畅、准确和有吸引力：\n\n${text}`;

    let result = '';
    for await (const chunk of this.streamCompletion(prompt)) {
      result += chunk;
    }
    return result.trim();
  }

  /**
   * 生成标题
   */
  async generateTitles(content: string, count = 5): Promise<string[]> {
    const prompt = `请基于以下文章内容，生成${count}个吸引人的微信公众号标题：

${content}

要求：
1. 标题要有吸引力，能够激发读者的点击欲望
2. 符合微信公众号标题的特点
3. 每个标题不超过25个字
4. 风格可以多样化（悬疑、实用、情感等）

请只返回标题列表，每行一个：`;

    let result = '';
    for await (const chunk of this.streamCompletion(prompt)) {
      result += chunk;
    }

    return result
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.match(/^\d+[.\s]/))
      .slice(0, count);
  }

  /**
   * 总结文章
   */
  async summarizeText(text: string): Promise<string> {
    const prompt = `请总结以下文章的核心内容，生成一段简洁的摘要：

${text}

要求：
1. 摘要应该包含文章的主要观点
2. 长度控制在100-200字之间
3. 语言简洁明了`;

    let result = '';
    for await (const chunk of this.streamCompletion(prompt)) {
      result += chunk;
    }
    return result.trim();
  }
}

// 全局AI服务实例
let aiServiceInstance: AIService | null = null;

export function getAIService(config: AIConfig): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService(config);
  } else {
    aiServiceInstance.updateConfig(config);
  }
  return aiServiceInstance;
} 