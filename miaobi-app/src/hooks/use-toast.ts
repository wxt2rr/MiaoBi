import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

interface ToastState {
  toasts: Toast[];
}

let toastCount = 0;

export function useToast() {
  const [state, setState] = useState<ToastState>({ toasts: [] });

  const toast = useCallback(
    ({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
      const id = (++toastCount).toString();
      const newToast: Toast = { id, title, description, variant };

      setState((prevState) => ({
        toasts: [...prevState.toasts, newToast],
      }));

      // 自动移除toast
      setTimeout(() => {
        setState((prevState) => ({
          toasts: prevState.toasts.filter((t) => t.id !== id),
        }));
      }, 3000);

      return { id };
    },
    []
  );

  const dismiss = useCallback((toastId?: string) => {
    setState((prevState) => ({
      toasts: toastId
        ? prevState.toasts.filter((t) => t.id !== toastId)
        : [],
    }));
  }, []);

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  };
}

// 简化的toast函数
export const toast = {
  success: (message: string) => {
    // 简单的成功提示实现
    console.log('✅ Success:', message);
  },
  error: (message: string) => {
    // 简单的错误提示实现
    console.error('❌ Error:', message);
  },
};