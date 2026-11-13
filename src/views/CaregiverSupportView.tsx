import {useEffect, useState} from 'react';
import {CalendarClock, HeartHandshake, MessageCircleHeart, Pause, Play, RotateCcw} from 'lucide-react';
import {LISTENING_CIRCLES} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';

const BREATHING_PHASES = [
  {label: 'Inspire devagar pelo nariz', seconds: 4},
  {label: 'Segure o ar com conforto', seconds: 2},
  {label: 'Solte o ar suavemente pela boca', seconds: 6},
];

/**
 * Área "Quem cuida de quem cuida?"
 * Acolhimento emocional não clínico, pausa guiada e rodas de escuta demonstrativas.
 */
export function CaregiverSupportView() {
  const {setRoute, submitContactRequest} = useAppState();
  const [breathingActive, setBreathingActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(BREATHING_PHASES[0].seconds);
  const [joinedCircleId, setJoinedCircleId] = useState<string | null>(null);
  const [selfCareNote, setSelfCareNote] = useState('');
  const [savedReflection, setSavedReflection] = useState<string | null>(null);

  useEffect(() => {
    if (!breathingActive) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        const nextIndex = (phaseIndex + 1) % BREATHING_PHASES.length;
        setPhaseIndex(nextIndex);
        return BREATHING_PHASES[nextIndex].seconds;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [breathingActive, phaseIndex]);

  const resetBreathing = () => {
    setBreathingActive(false);
    setPhaseIndex(0);
    setSecondsLeft(BREATHING_PHASES[0].seconds);
  };

  const handleJoinCircle = (title: string, id: string) => {
    submitContactRequest({
      targetName: title,
      targetCategory: 'Escuta não clínica',
      municipality: 'Chapecó',
      message: 'Interesse demonstrativo em participar da próxima roda de escuta entre cuidadores.',
    });
    setJoinedCircleId(id);
  };

  const handleSaveReflection = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selfCareNote.trim()) return;
    setSavedReflection(selfCareNote.trim());
    setSelfCareNote('');
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700">
          <HeartHandshake className="w-4 h-4" aria-hidden="true" />
          <span>Quem cuida de quem cuida?</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Acolhimento e escuta para familiares e cuidadores
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Cuidar continuamente exige apoio compartilhado. Este espaço reúne pausas simples do dia,
          grupos de escuta não clínica e caminhos práticos para dividir tarefas sem sobrecarga.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Pausa de respiração acessível (sem animações agressivas) */}
        <section
          aria-labelledby="breathing-heading"
          className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-5"
        >
          <div className="space-y-2">
            <h2 id="breathing-heading" className="font-display text-lg font-bold text-slate-900">
              Pausa tranquila de 1 minuto
            </h2>
            <p className="text-sm text-slate-600">
              Um ritmo gentil para desacelerar entre tarefas. Você pode pausar ou reiniciar a qualquer
              momento.
            </p>
          </div>

          <div
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2"
            aria-live="polite"
          >
            <p className="text-xs font-medium text-slate-500">
              {breathingActive ? 'Etapa atual' : 'Pronto para iniciar quando desejar'}
            </p>
            <p className="font-display text-xl font-bold text-blue-800">
              {BREATHING_PHASES[phaseIndex].label}
            </p>
            <p className="text-3xl font-bold text-slate-900 tabular-nums">{secondsLeft}s</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setBreathingActive((prev) => !prev)}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              {breathingActive ? (
                <>
                  <Pause className="w-4 h-4" aria-hidden="true" />
                  <span>Pausar ritmo</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Iniciar pausa guiada</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={resetBreathing}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reiniciar</span>
            </button>
          </div>
        </section>

        {/* Registro pessoal de autocuidado do dia */}
        <section
          aria-labelledby="caregiver-checkin-heading"
          className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <h2 id="caregiver-checkin-heading" className="font-display text-lg font-bold text-slate-900">
              Lembrete gentil de apoio para hoje
            </h2>
            <p className="text-sm text-slate-600">
              Anote uma pequena ação de cuidado para você (ex.: pedir ajuda com um deslocamento ou
              reservar 20 minutos na academia). Permanece apenas nesta sessão em memória.
            </p>
          </div>

          <form onSubmit={handleSaveReflection} className="space-y-3">
            <label htmlFor="self-care-input" className="block text-sm font-medium text-slate-800">
              O que pode aliviar o seu dia hoje?
            </label>
            <textarea
              id="self-care-input"
              rows={3}
              value={selfCareNote}
              onChange={(e) => setSelfCareNote(e.target.value)}
              placeholder="Ex.: Combinar revezamento no fim da tarde e ler 15 minutos em silêncio."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Guardar lembrete na sessão
              </button>
              <button
                type="button"
                onClick={() => setRoute('recursos')}
                className="min-h-[44px] text-sm font-semibold text-blue-700 hover:underline"
              >
                Ver academias e espaços de apoio
              </button>
            </div>
          </form>

          {savedReflection && (
            <div
              role="status"
              aria-live="polite"
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-slate-900"
            >
              <p className="font-semibold text-amber-900">Seu combinado de hoje:</p>
              <p className="mt-1 text-slate-800">{savedReflection}</p>
            </div>
          )}
        </section>
      </div>

      {/* Espaços de escuta não clínica */}
      <section aria-labelledby="listening-circles-heading" className="space-y-4">
        <div>
          <h2 id="listening-circles-heading" className="font-display text-xl font-bold text-slate-900">
            Espaços de escuta não clínica
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Encontros comunitários fictícios para partilha entre cuidadores. Não substituem
            acompanhamento clínico ou atendimento de emergência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LISTENING_CIRCLES.map((circle) => {
            const joined = joinedCircleId === circle.id;
            return (
              <article
                key={circle.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarClock className="w-4 h-4 text-blue-700" aria-hidden="true" />
                    <span>{circle.dayAndTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{circle.modality}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{circle.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{circle.description}</p>
                  <p className="text-xs text-slate-500">Facilitação: {circle.facilitator}</p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleJoinCircle(circle.title, circle.id)}
                    disabled={joined}
                    className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      joined
                        ? 'bg-slate-100 text-slate-700 cursor-default'
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                    }`}
                  >
                    <MessageCircleHeart className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {joined ? 'Interesse registrado (demonstrativo)' : 'Solicitar participação demonstrativa'}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
