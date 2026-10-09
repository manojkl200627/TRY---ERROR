import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-neo-yellow text-black';
        let Icon = CheckCircle2;
        if (toast.type === 'error') {
          bg = 'bg-neo-pink text-white';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          bg = 'bg-neo-cyan text-black';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto border-3 border-black shadow-brutal p-3.5 flex items-center justify-between gap-3 font-display font-bold text-sm transform transition-all duration-200 animate-bounce-subtle ${bg}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black hover:text-white border border-black transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
