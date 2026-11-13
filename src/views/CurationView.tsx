import {CheckCircle2, Clock, ShieldCheck} from 'lucide-react';
import {useAppState} from '../state/AppStateContext';
import type {CurationStatus} from '../types/domain';

/**
 * Painel demonstrativo do perfil Curadoria:
 * revisão fictícia de cadastros de recursos, conteúdos educativos e ofertas profissionais.
 */
export function CurationView() {
  const {
    resources,
    updateResourceCuration,
    articles,
    updateArticleCuration,
    offers,
    updateOfferCuration,
  } = useAppState();

  const renderStatusButtons = (
    current: CurationStatus,
    onChange: (next: CurationStatus) => void,
    itemLabel: string,
  ) => {
    const statuses: CurationStatus[] = ['Aprovado', 'Em revisão', 'Ajuste solicitado'];
    return (
      <div className="flex flex-wrap gap-2" role="group" aria-label={`Ações de curadoria para ${itemLabel}`}>
        {statuses.map((status) => {
          const active = current === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => onChange(status)}
              aria-pressed={active}
              className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                active
                  ? 'bg-blue-700 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>Perfil demonstrativo · Curadoria interdisciplinar</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Revisão de cadastros, conteúdos e ofertas
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Simulação de governança editorial e ética para verificar linguagem acessível, ausência de
          promessas clínicas e adequação dos espaços indicados na rede.
        </p>
      </header>

      {/* Ofertas de profissionais */}
      <section aria-labelledby="cur-offers-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 id="cur-offers-heading" className="font-display text-lg font-bold text-slate-900">
          Ofertas de apoio de profissionais
        </h2>
        <ul className="divide-y divide-slate-200">
          {offers.map((offer) => (
            <li key={offer.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">
                  {offer.professionalName} · {offer.municipality} · {offer.format}
                </p>
                <p className="text-sm font-bold text-slate-900">{offer.title}</p>
                <p className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5">
                  {offer.curationStatus === 'Aprovado' ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-700" aria-hidden="true" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-700" aria-hidden="true" />
                  )}
                  <span>Status atual: {offer.curationStatus}</span>
                </p>
              </div>
              {renderStatusButtons(
                offer.curationStatus,
                (next) => updateOfferCuration(offer.id, next),
                offer.title,
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Conteúdos educativos */}
      <section aria-labelledby="cur-articles-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 id="cur-articles-heading" className="font-display text-lg font-bold text-slate-900">
          Conteúdos da biblioteca educativa
        </h2>
        <ul className="divide-y divide-slate-200">
          {articles.map((article) => (
            <li key={article.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">
                  {article.theme} · {article.readingMinutes} min
                </p>
                <p className="text-sm font-bold text-slate-900">{article.title}</p>
                <p className="text-xs text-slate-600">Status atual: {article.curationStatus}</p>
              </div>
              {renderStatusButtons(
                article.curationStatus,
                (next) => updateArticleCuration(article.id, next),
                article.title,
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Recursos e serviços */}
      <section aria-labelledby="cur-resources-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 id="cur-resources-heading" className="font-display text-lg font-bold text-slate-900">
          Cadastros de espaços e serviços
        </h2>
        <ul className="divide-y divide-slate-200">
          {resources.map((res) => (
            <li key={res.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">
                  {res.category} · {res.municipality}
                </p>
                <p className="text-sm font-bold text-slate-900">{res.name}</p>
                <p className="text-xs text-slate-600">Status atual: {res.curationStatus}</p>
              </div>
              {renderStatusButtons(
                res.curationStatus,
                (next) => updateResourceCuration(res.id, next),
                res.name,
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
