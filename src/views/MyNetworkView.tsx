import {useState} from 'react';
import {CheckCircle2, Lock, ShieldOff, Unlock, Users} from 'lucide-react';
import {SHARE_BLOCK_LABELS} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';
import type {ShareBlockKey} from '../types/domain';

const BLOCK_KEYS = Object.keys(SHARE_BLOCK_LABELS) as ShareBlockKey[];

/**
 * Tela "Minha Rede": autorização e revogação demonstrativas de acesso por pessoa
 * e por bloco de informação. Controles apenas simulados em memória.
 */
export function MyNetworkView() {
  const {networkMembers, setMemberBlockPermission, revokeAllForMember, setRole} = useAppState();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggleBlock = (memberId: string, memberName: string, block: ShareBlockKey, next: boolean) => {
    setMemberBlockPermission(memberId, block, next);
    setFeedback(
      next
        ? `Acesso demonstrativo autorizado: "${SHARE_BLOCK_LABELS[block].title}" para ${memberName}.`
        : `Acesso demonstrativo revogado: "${SHARE_BLOCK_LABELS[block].title}" para ${memberName}.`,
    );
  };

  const handleRevokeAll = (memberId: string, memberName: string) => {
    revokeAllForMember(memberId);
    setFeedback(`Todos os blocos foram revogados para ${memberName} nesta sessão demonstrativa.`);
  };

  return (
    <div className="space-y-6">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
          <Users className="w-4 h-4" aria-hidden="true" />
          <span>Controle familiar de compartilhamento (simulação em memória)</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">Minha Rede</h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          A família escolhe exatamente o que cada pessoa ou escola pode visualizar. Este controle é
          exclusivamente demonstrativo em memória (sem autenticação real ou alegação de segurança
          operacional).
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => setRole('escola')}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50"
          >
            Testar visão do perfil Escola
          </button>
          <button
            type="button"
            onClick={() => setRole('profissional')}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50"
          >
            Testar visão do perfil Profissional
          </button>
        </div>
      </header>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-blue-950 flex items-center gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" aria-hidden="true" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="space-y-6">
        {networkMembers.map((member) => {
          const authorizedCount = BLOCK_KEYS.filter((k) => member.permissions[k]).length;
          return (
            <section
              key={member.id}
              aria-labelledby={`member-${member.id}`}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-500">
                    {member.roleLabel} · {member.institution}
                  </p>
                  <h2 id={`member-${member.id}`} className="font-display text-lg font-bold text-slate-900 mt-0.5">
                    {member.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-600 mt-1 tabular-nums">
                    {authorizedCount} de {BLOCK_KEYS.length} blocos autorizados
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRevokeAll(member.id, member.name)}
                  disabled={authorizedCount === 0}
                  className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    authorizedCount === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border border-red-300 bg-red-50 text-red-800 hover:bg-red-100'
                  }`}
                >
                  <ShieldOff className="w-4 h-4" aria-hidden="true" />
                  <span>Revogar todos os acessos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BLOCK_KEYS.map((blockKey) => {
                  const allowed = member.permissions[blockKey];
                  const meta = SHARE_BLOCK_LABELS[blockKey];
                  return (
                    <div
                      key={blockKey}
                      className={`rounded-xl border p-4 flex items-start justify-between gap-3 ${
                        allowed ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {allowed ? (
                            <Unlock className="w-4 h-4 text-blue-700 shrink-0" aria-hidden="true" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                          )}
                          <h3 className="text-sm font-semibold text-slate-900">{meta.title}</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>
                        <p className="text-xs font-semibold text-slate-700">
                          Situação: {allowed ? 'Autorizado' : 'Revogado / Não compartilhado'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleBlock(member.id, member.name, blockKey, !allowed)}
                        aria-label={`${allowed ? 'Revogar' : 'Autorizar'} ${meta.title} para ${member.name}`}
                        className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                          allowed
                            ? 'border border-red-300 bg-white text-red-800 hover:bg-red-50'
                            : 'bg-blue-700 text-white hover:bg-blue-800'
                        }`}
                      >
                        {allowed ? 'Revogar' : 'Autorizar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
