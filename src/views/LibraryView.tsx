import {useState} from 'react';
import {BookOpen, ChevronDown, ChevronUp} from 'lucide-react';
import {EmptyState} from '../components/EmptyState';
import {useAppState} from '../state/AppStateContext';

const THEMES = [
  'Todos',
  'Acolhimento ao Cuidador',
  'Rotina Visual',
  'Comunicação',
  'Parceria Escola-Família',
] as const;

/**
 * Biblioteca de conteúdos educativos com filtro por tema e leitura expansível.
 */
export function LibraryView() {
  const {articles} = useAppState();
  const [selectedTheme, setSelectedTheme] = useState<string>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>('art-1');

  const filtered = articles.filter((article) => {
    if (selectedTheme !== 'Todos' && article.theme !== selectedTheme) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800">
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Educação em saúde e apoio cotidiano</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Biblioteca de conteúdos educativos
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Textos curtos em linguagem clara para famílias, educadores e cuidadores. Conteúdo
          informativo não clínico, sem prescrições ou recomendações diagnósticas.
        </p>

        <div role="group" aria-label="Filtrar conteúdos por tema" className="flex flex-wrap gap-2 pt-2">
          {THEMES.map((theme) => {
            const active = selectedTheme === theme;
            return (
              <button
                key={theme}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                aria-pressed={active}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {theme}
              </button>
            );
          })}
        </div>
      </header>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nenhum conteúdo encontrado neste tema"
          description="Selecione outro tema ou exiba todos os materiais disponíveis na biblioteca."
          actionLabel="Ver todos os conteúdos"
          onAction={() => setSelectedTheme('Todos')}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((article) => {
            const isOpen = expandedId === article.id;
            return (
              <article key={article.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-500 tabular-nums">
                      {article.theme} · {article.readingMinutes} min de leitura · Curadoria:{' '}
                      {article.curationStatus}
                    </p>
                    <h2 className="font-display text-lg font-bold text-slate-900">
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{article.summary}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : article.id)}
                    aria-expanded={isOpen}
                    className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 shrink-0"
                  >
                    <span>{isOpen ? 'Recolher leitura' : 'Ler guia'}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-700 leading-relaxed">
                    {article.body}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
