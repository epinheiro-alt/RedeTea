import {ShieldAlert} from 'lucide-react';

/**
 * Faixa informativa permanente exigida em todas as telas do protótipo.
 * Não utiliza apenas cor para transmitir o aviso: combina ícone e texto explícito.
 */
export function PermanentNotice() {
  return (
    <div
      role="note"
      aria-label="Aviso permanente do protótipo"
      className="bg-amber-50 border-b border-amber-300 text-slate-900 px-3 py-1.5 text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" aria-hidden="true" />
        <span>Protótipo demonstrativo com dados fictícios. Não insira dados reais.</span>
      </div>
    </div>
  );
}
