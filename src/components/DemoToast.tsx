import { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';

export function useDemoToast() {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  }, []);

  const Toast = message ? (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg animate-slide-up">
      <CheckCircle className="w-4 h-4" />
      {message}
    </div>
  ) : null;

  return { show, Toast };
}
