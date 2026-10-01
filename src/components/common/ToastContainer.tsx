import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-ink text-bone border border-stone-dark/30 shadow-2xl p-4 flex items-start gap-3 transition-all duration-300"
          role="status"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-brass" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-oxblood-light" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-bone/70" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-bone">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-warmgrey-light mt-0.5 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone hover:text-bone p-0.5 shrink-0 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
