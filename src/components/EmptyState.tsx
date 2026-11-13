import {SearchX} from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({title, description, actionLabel, onAction}: EmptyStateProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-xl mx-auto">
      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-5">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
