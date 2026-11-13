import {useMemo, useState} from 'react';
import {Dumbbell, MapPin, MessageSquarePlus, Search} from 'lucide-react';
import {ContactRequestModal} from '../components/ContactRequestModal';
import {EmptyState} from '../components/EmptyState';
import {MUNICIPALITIES} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';
import type {ResourceCategory} from '../types/domain';

const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'Academia Inclusiva',
  'Apoio Familiar',
  'Fonoaudiologia',
  'Terapia Ocupacional',
  'Psicologia',
  'Educação Especial',
  'Lazer Acessível',
];

/**
 * Busca de recursos e serviços por categoria e município, com destaque para
 * Academias para pais, cuidadores e crianças + solicitação demonstrativa de contato.
 */
export function ResourcesView() {
  const {resources, offers} = useAppState();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Todos');
  const [onlyCaregiverAndChild, setOnlyCaregiverAndChild] = useState(false);

  const [modalTarget, setModalTarget] = useState<{
    name: string;
    category: string;
    municipality: string;
  } | null>(null);

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resources.filter((item) => {
      if (selectedCategory !== 'Todas' && item.category !== selectedCategory) return false;
      if (selectedMunicipality !== 'Todos' && item.municipality !== selectedMunicipality) return false;
      if (onlyCaregiverAndChild && !item.acceptsChildrenWithCaregivers) return false;
      if (normalizedQuery) {
        const haystack = `${item.name} ${item.description} ${item.category} ${item.municipality}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [resources, query, selectedCategory, selectedMunicipality, onlyCaregiverAndChild]);

  const approvedOffers = offers.filter((offer) => offer.curationStatus === 'Aprovado');

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('Todas');
    setSelectedMunicipality('Todos');
    setOnlyCaregiverAndChild(false);
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Recursos, serviços e Academia Inclusiva
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Encontre espaços fictícios por categoria e município, incluindo academias que acolhem
          crianças com TEA junto aos pais e cuidadores. Não há pagamentos ou contratação neste
          protótipo.
        </p>
      </header>

      {/* Destaque dedicado: Academia para pais, cuidadores e crianças */}
      <section
        aria-labelledby="academy-spotlight-heading"
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900">
            <Dumbbell className="w-4 h-4" aria-hidden="true" />
            <span>Espaço que aceita crianças com TEA</span>
          </div>
          <h2 id="academy-spotlight-heading" className="font-display text-lg font-bold text-slate-900">
            Academia para pais, cuidadores e crianças
          </h2>
          <p className="text-sm text-slate-700 max-w-2xl">
            Locais preparados para que cuidadores pratiquem atividade física sem precisar deixar os
            filhos desassistidos, com som reduzido e circuitos motores inclusivos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedCategory('Academia Inclusiva');
            setOnlyCaregiverAndChild(true);
          }}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 whitespace-nowrap shrink-0"
        >
          Filtrar academias inclusivas
        </button>
      </section>

      {/* Filtros de busca */}
      <section aria-label="Filtros de busca de recursos" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="resource-search" className="block text-sm font-medium text-slate-900 mb-1">
              Buscar por nome ou palavra-chave
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="resource-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: academia, escuta, fono..."
                className="w-full min-h-[44px] rounded-xl border border-slate-300 pl-10 pr-3.5 text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="resource-category" className="block text-sm font-medium text-slate-900 mb-1">
              Categoria
            </label>
            <select
              id="resource-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white text-slate-900"
            >
              <option value="Todas">Todas as categorias</option>
              {RESOURCE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="resource-municipality" className="block text-sm font-medium text-slate-900 mb-1">
              Município
            </label>
            <select
              id="resource-municipality"
              value={selectedMunicipality}
              onChange={(e) => setSelectedMunicipality(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white text-slate-900"
            >
              <option value="Todos">Todos os municípios</option>
              {MUNICIPALITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="inline-flex items-center gap-2.5 text-sm text-slate-800 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={onlyCaregiverAndChild}
              onChange={(e) => setOnlyCaregiverAndChild(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-blue-700"
            />
            <span>Mostrar apenas espaços preparados para pais/cuidadores com crianças</span>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-3 py-2 text-sm font-medium text-blue-700 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      </section>

      {/* Lista de recursos filtrados */}
      <section aria-labelledby="resources-results-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="resources-results-heading" className="font-display text-lg font-bold text-slate-900">
            Resultados na rede demonstrativa
          </h2>
          <span className="text-xs font-medium text-slate-500 tabular-nums">
            {filteredResources.length} encontrado(s)
          </span>
        </div>

        {filteredResources.length === 0 ? (
          <EmptyState
            title="Nenhum recurso encontrado com esses filtros"
            description="Tente ampliar o município ou limpar a busca para ver todos os serviços e academias inclusivas disponíveis no protótipo."
            actionLabel="Limpar filtros de busca"
            onAction={clearFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-blue-800">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {item.municipality}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Curadoria: {item.curationStatus}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  <p className="text-xs text-slate-500">Horários: {item.scheduleSummary}</p>
                  {item.acceptsChildrenWithCaregivers && (
                    <p className="text-xs font-semibold text-amber-900">
                      Acolhe crianças com TEA junto aos pais e cuidadores
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setModalTarget({
                        name: item.name,
                        category: item.category,
                        municipality: item.municipality,
                      })
                    }
                    className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                  >
                    <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                    <span>Solicitar contato demonstrativo</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Ofertas de apoio publicadas por profissionais */}
      <section aria-labelledby="offers-list-heading" className="space-y-4">
        <div>
          <h2 id="offers-list-heading" className="font-display text-lg font-bold text-slate-900">
            Oficinas e ofertas de apoio da rede
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Atividades aprovadas pela curadoria demonstrativa (gerenciáveis no perfil Profissional).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvedOffers.map((offer) => (
            <article key={offer.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <p className="text-xs text-slate-500">
                {offer.format} · {offer.municipality} · {offer.scheduleText}
              </p>
              <h3 className="font-display text-base font-bold text-slate-900">{offer.title}</h3>
              <p className="text-sm text-slate-600">
                {offer.professionalName} — {offer.specialty}
              </p>
              <button
                type="button"
                onClick={() =>
                  setModalTarget({
                    name: offer.title,
                    category: offer.format,
                    municipality: offer.municipality,
                  })
                }
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50"
              >
                <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                <span>Solicitar informações</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <ContactRequestModal target={modalTarget} onClose={() => setModalTarget(null)} />
    </div>
  );
}
