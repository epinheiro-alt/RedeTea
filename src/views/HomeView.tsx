import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Compass,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import {useAppState} from '../state/AppStateContext';

/**
 * Painel inicial ("Como podemos apoiar você hoje?") adaptado ao perfil ativo.
 */
export function HomeView() {
  const {
    role,
    setRoute,
    registration,
    routineSteps,
    appointments,
    contactRequests,
    resources,
    articles,
    offers,
    getPermissionsForRole,
  } = useAppState();

  const completedSteps = routineSteps.filter((step) => step.done).length;
  const pendingCurationCount =
    resources.filter((r) => r.curationStatus !== 'Aprovado').length +
    articles.filter((a) => a.curationStatus !== 'Aprovado').length +
    offers.filter((o) => o.curationStatus !== 'Aprovado').length;

  const schoolPermissions = getPermissionsForRole('escola');
  const schoolAuthorizedCount = Object.values(schoolPermissions).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Banner principal de acolhimento */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold text-blue-700">
            RedE TEA · Quem cuida de quem cuida?
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Como podemos apoiar você hoje?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Espaço demonstrativo para organizar informações do cuidado cotidiano entre família,
            profissionais e escola, com foco no acolhimento de quem cuida. Não realiza diagnósticos,
            classificações ou recomendações clínicas.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {role === 'familia' && (
            <>
              <button
                type="button"
                onClick={() => setRoute('acolhimento')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                <HeartHandshake className="w-4 h-4" aria-hidden="true" />
                <span>Espaço do cuidador</span>
              </button>
              <button
                type="button"
                onClick={() => setRoute('rotina-agenda')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                <CalendarDays className="w-4 h-4" aria-hidden="true" />
                <span>Ver rotina e agenda</span>
              </button>
              <button
                type="button"
                onClick={() => setRoute('minha-rede')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Gerenciar Minha Rede</span>
              </button>
            </>
          )}

          {role === 'profissional' && (
            <button
              type="button"
              onClick={() => setRoute('profissional')}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              <Stethoscope className="w-4 h-4" aria-hidden="true" />
              <span>Abrir painel profissional</span>
            </button>
          )}

          {role === 'escola' && (
            <button
              type="button"
              onClick={() => setRoute('escola')}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>Abrir painel escolar</span>
            </button>
          )}

          {role === 'curadoria' && (
            <button
              type="button"
              onClick={() => setRoute('curadoria')}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Abrir painel de curadoria</span>
            </button>
          )}
        </div>
      </section>

      {/* Indicadores descritivos rápidos (sem scores clínicos ou métricas inventadas) */}
      <section aria-label="Resumo da sessão demonstrativa" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-medium text-slate-500">Família fictícia ativa</p>
          <p className="font-display text-lg font-bold text-slate-900 mt-1">
            {registration.childNickname}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {registration.municipality} · {registration.childAgeYears} anos
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-medium text-slate-500">Rotina visual de hoje</p>
          <p className="font-display text-lg font-bold text-slate-900 mt-1 tabular-nums">
            {completedSteps} de {routineSteps.length} passos marcados
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {appointments.length} compromissos registrados
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-medium text-slate-500">Visibilidade na rede</p>
          <p className="font-display text-lg font-bold text-slate-900 mt-1 tabular-nums">
            {schoolAuthorizedCount} blocos liberados para escola
          </p>
          <p className="text-xs text-slate-600 mt-1 tabular-nums">
            {contactRequests.length} solicitações · {pendingCurationCount} itens em revisão
          </p>
        </div>
      </section>

      {/* Atalhos organizados por necessidade */}
      <section aria-labelledby="home-shortcuts-heading" className="space-y-4">
        <h2 id="home-shortcuts-heading" className="font-display text-lg font-bold text-slate-900">
          Áreas da rede de apoio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRoute('acolhimento')}
            className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-colors flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-red-700">
                <HeartHandshake className="w-4 h-4" aria-hidden="true" />
                <span>Quem cuida de quem cuida</span>
              </div>
              <p className="text-sm text-slate-600">
                Pausa de respiração, orientações contra sobrecarga e rodas de escuta não clínica.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setRoute('recursos')}
            className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-colors flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Recursos, serviços e Academia Inclusiva</span>
              </div>
              <p className="text-sm text-slate-600">
                Busque por categoria e município, incluindo academias preparadas para pais e crianças.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setRoute('biblioteca')}
            className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-colors flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Biblioteca de conteúdos educativos</span>
              </div>
              <p className="text-sm text-slate-600">
                Leituras curtas e acessíveis sobre rotina visual, comunicação e parceria escolar.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setRoute('em-estudo')}
            className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-colors flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                <FlaskConical className="w-4 h-4" aria-hidden="true" />
                <span>Funcionalidades em estudo (revisão interdisciplinar)</span>
              </div>
              <p className="text-sm text-slate-600">
                Protótipos em avaliação ética e científica: horários, sono, atividade física e grupos.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Próximo passo sugerido para testes entre perfis */}
      <section className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs sm:text-sm text-slate-700 space-y-1">
          <p className="font-semibold text-slate-900">
            Como testar a integração demonstrativa entre perfis
          </p>
          <p>
            No perfil <strong>Família</strong>, acesse <strong>Minha Rede</strong> para autorizar ou
            revogar blocos de informação. Depois, alterne no topo para <strong>Profissional</strong>{' '}
            ou <strong>Escola</strong> e observe a mudança imediata de visibilidade.
          </p>
        </div>
      </section>
    </div>
  );
}
