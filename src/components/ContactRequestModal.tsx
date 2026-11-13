import React, {useEffect, useRef, useState} from 'react';
import {CheckCircle2, Send, X} from 'lucide-react';
import {useAppState} from '../state/AppStateContext';

interface ContactRequestModalProps {
  target: {
    name: string;
    category: string;
    municipality: string;
  } | null;
  onClose: () => void;
}

export function ContactRequestModal({target, onClose}: ContactRequestModalProps) {
  const {submitContactRequest} = useAppState();
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (target) {
      setMessage('');
      setError(null);
      setSent(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 20);
    }
  }, [target]);

  useEffect(() => {
    if (!target) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [target, onClose]);

  if (!target) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim().length < 10) {
      setError('Escreva uma mensagem fictícia com pelo menos 10 caracteres para simular a solicitação.');
      return;
    }
    setError(null);
    submitContactRequest({
      targetName: target.name,
      targetCategory: target.category,
      municipality: target.municipality,
      message,
    });
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-medium text-blue-700 mb-1">
              Solicitação demonstrativa de contato
            </p>
            <h2 id="contact-modal-title" className="font-display text-lg font-bold text-slate-900">
              {target.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {target.category} · {target.municipality}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de solicitação de contato"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="space-y-4 py-2" role="status" aria-live="polite">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-slate-900">
              <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Solicitação registrada em memória</p>
                <p className="text-slate-700">
                  Esta simulação já pode ser visualizada ao alternar para o perfil{' '}
                  <strong>Profissional</strong>. Nenhum dado foi enviado a servidores.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3">
              Aviso: utilize apenas texto fictício. Este protótipo não realiza agendamentos reais,
              pagamentos ou contratação de serviços.
            </p>

            <div>
              <label
                htmlFor="contact-request-message"
                className="block text-sm font-medium text-slate-900 mb-1.5"
              >
                Mensagem demonstrativa para o espaço ou profissional
              </label>
              <textarea
                id="contact-request-message"
                ref={textareaRef}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ex.: Gostaria de conhecer os horários acolhedores disponíveis para famílias (dados fictícios)."
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'contact-request-error' : undefined}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700"
              />
              {error && (
                <p id="contact-request-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Enviar solicitação demonstrativa</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
