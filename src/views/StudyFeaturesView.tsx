import React, {useState} from 'react';
import {
  Activity,
  Clock,
  FlaskConical,
  Lightbulb,
  Moon,
  Pill,
  Plus,
  UsersRound,
} from 'lucide-react';
import {DAILY_TIP_STUDY, INITIAL_FAMILY_GROUPS} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';

/**
 * Funcionalidades em estudo — todas explicitamente identificadas como
 * "Em revisão interdisciplinar", sem recomendações clínicas automáticas.
 */
export function StudyFeaturesView() {
  const {
    medicationsStudy,
    addMedicationStudy,
    activitiesStudy,
    addActivityStudy,
    sleepStudy,
    updateSleepStudy,
    setRoute,
  } = useAppState();

  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState('08:00');
  const [medNote, setMedNote] = useState('');
  const [medError, setMedError] = useState<string | null>(null);

  const [actName, setActName] = useState('');
  const [actDays, setActDays] = useState('');
  const [actSpace, setActSpace] = useState('');
  const [actError, setActError] = useState<string | null>(null);

  const [bedTime, setBedTime] = useState(sleepStudy.bedTime);
  const [wakeTime, setWakeTime] = useState(sleepStudy.wakeTime);
  const [eveningRitual, setEveningRitual] = useState(sleepStudy.eveningRitual);
  const [sleepSaved, setSleepSaved] = useState(false);

  const [groupInterestMsg, setGroupInterestMsg] = useState<string | null>(null);

  const handleAddMedication = (event: React.FormEvent) => {
    event.preventDefault();
    if (medName.trim().length < 3) {
      setMedError('Informe um nome ilustrativo ou fictício com pelo menos 3 caracteres.');
      return;
    }
    setMedError(null);
    addMedicationStudy({
      name: medName.trim(),
      scheduleTime: medTime,
      familyNote: medNote.trim() || 'Lembrete descritivo pessoal (sem interpretação clínica).',
    });
    setMedName('');
    setMedNote('');
  };

  const handleAddActivity = (event: React.FormEvent) => {
    event.preventDefault();
    if (actName.trim().length < 4) {
      setActError('Descreva a atividade física com pelo menos 4 caracteres.');
      return;
    }
    setActError(null);
    addActivityStudy({
      activityName: actName.trim(),
      daysText: actDays.trim() || 'Dias a combinar',
      spaceName: actSpace.trim() || 'Espaço comunitário fictício',
      sensoryNote: 'Organização de preferência familiar sem avaliação física automática.',
    });
    setActName('');
    setActDays('');
    setActSpace('');
  };

  const handleSaveSleep = (event: React.FormEvent) => {
    event.preventDefault();
    updateSleepStudy({
      bedTime,
      wakeTime,
      eveningRitual: eveningRitual.trim(),
    });
    setSleepSaved(true);
    window.setTimeout(() => setSleepSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900">
          <FlaskConical className="w-4 h-4" aria-hidden="true" />
          <span>Em revisão interdisciplinar · Sem recomendações clínicas automáticas</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Funcionalidades em estudo
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Módulos conceituais submetidos à avaliação ética, científica e técnica junto ao Hack.Health
          (Unochapecó). Nenhuma destas seções diagnostica, prescreve, sugere doses ou classifica risco.
        </p>
      </header>

      {/* 1. Dica do dia e suporte de rede de profissionais */}
      <section
        aria-labelledby="study-tip-heading"
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900">
            <Lightbulb className="w-4 h-4" aria-hidden="true" />
            <span>Em revisão interdisciplinar · Suporte de rede profissional</span>
          </div>
        </div>
        <h2 id="study-tip-heading" className="font-display text-lg font-bold text-slate-900">
          {DAILY_TIP_STUDY.title}
        </h2>
        <p className="text-sm text-slate-800 leading-relaxed">{DAILY_TIP_STUDY.text}</p>
        <p className="text-xs text-slate-600">{DAILY_TIP_STUDY.authorNote}</p>
      </section>

      {/* 2. Registro de medicamentos e horários (sem sugestões de dose ou interpretação) */}
      <section
        aria-labelledby="study-meds-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold text-amber-900">
            Em revisão interdisciplinar · Apenas anotação de horários (sem sugestão de dose)
          </p>
          <h2 id="study-meds-heading" className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <span>Registro descritivo de medicamentos e horários</span>
          </h2>
          <p className="text-sm text-slate-600">
            Este protótipo nunca calcula doses, não interpreta prescrições e não substitui a
            orientação presencial de profissionais de saúde. Use apenas nomes ilustrativos.
          </p>
        </div>

        <ul className="divide-y divide-slate-200">
          {medicationsStudy.map((item) => (
            <li key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-600">{item.familyNote}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 tabular-nums shrink-0">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {item.scheduleTime}
              </span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddMedication} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2" noValidate>
          <div className="sm:col-span-2">
            <label htmlFor="med-name" className="block text-xs font-medium text-slate-800 mb-1">
              Nome ilustrativo (não usar dado real)
            </label>
            <input
              id="med-name"
              type="text"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              placeholder="Ex.: Registro ilustrativo C"
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm"
            />
          </div>
          <div>
            <label htmlFor="med-time" className="block text-xs font-medium text-slate-800 mb-1">
              Horário anotado
            </label>
            <input
              id="med-time"
              type="time"
              value={medTime}
              onChange={(e) => setMedTime(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm tabular-nums"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Anotar horário</span>
            </button>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="med-note" className="block text-xs font-medium text-slate-800 mb-1">
              Observação da família (opcional, sem dados clínicos reais)
            </label>
            <input
              id="med-note"
              type="text"
              value={medNote}
              onChange={(e) => setMedNote(e.target.value)}
              placeholder="Ex.: Conferir receita original em papel com o responsável."
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm"
            />
          </div>
          {medError && (
            <p role="alert" className="sm:col-span-4 text-sm font-medium text-red-700">
              {medError}
            </p>
          )}
        </form>
      </section>

      {/* 3. Organização de atividades físicas */}
      <section
        aria-labelledby="study-activities-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-amber-900">Em revisão interdisciplinar</p>
            <h2 id="study-activities-heading" className="font-display text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
              <Activity className="w-5 h-5 text-blue-700" aria-hidden="true" />
              <span>Organização de atividades físicas</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setRoute('recursos')}
            className="min-h-[44px] text-sm font-semibold text-blue-700 hover:underline self-start"
          >
            Buscar academias inclusivas
          </button>
        </div>

        <ul className="divide-y divide-slate-200">
          {activitiesStudy.map((act) => (
            <li key={act.id} className="py-3 space-y-1">
              <p className="text-xs text-slate-500">
                {act.daysText} · {act.spaceName}
              </p>
              <p className="text-sm font-semibold text-slate-900">{act.activityName}</p>
              <p className="text-xs text-slate-600">{act.sensoryNote}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddActivity} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2" noValidate>
          <input
            aria-label="Nome da atividade física"
            type="text"
            value={actName}
            onChange={(e) => setActName(e.target.value)}
            placeholder="Atividade (ex.: Natação adaptada)"
            className="min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm"
          />
          <input
            aria-label="Dias e horário da atividade"
            type="text"
            value={actDays}
            onChange={(e) => setActDays(e.target.value)}
            placeholder="Dias (ex.: Terças · 16:00)"
            className="min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm"
          />
          <div className="flex gap-2">
            <input
              aria-label="Espaço ou academia"
              type="text"
              value={actSpace}
              onChange={(e) => setActSpace(e.target.value)}
              placeholder="Local fictício"
              className="flex-1 min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm"
            />
            <button
              type="submit"
              className="min-h-[44px] px-4 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 shrink-0"
            >
              Incluir
            </button>
          </div>
          {actError && (
            <p role="alert" className="sm:col-span-3 text-sm font-medium text-red-700">
              {actError}
            </p>
          )}
        </form>
      </section>

      {/* 4. Organização de rotinas de sono */}
      <section
        aria-labelledby="study-sleep-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
      >
        <div>
          <p className="text-xs font-semibold text-amber-900">
            Em revisão interdisciplinar · Registro descritivo (sem análise clínica de sono)
          </p>
          <h2 id="study-sleep-heading" className="font-display text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <Moon className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <span>Organização de rotinas de sono</span>
          </h2>
        </div>

        <form onSubmit={handleSaveSleep} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sleep-bed" className="block text-sm font-medium text-slate-900 mb-1">
              Horário combinado para deitar
            </label>
            <input
              id="sleep-bed"
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm tabular-nums"
            />
          </div>
          <div>
            <label htmlFor="sleep-wake" className="block text-sm font-medium text-slate-900 mb-1">
              Horário habitual de acordar
            </label>
            <input
              id="sleep-wake"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm tabular-nums"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sleep-ritual" className="block text-sm font-medium text-slate-900 mb-1">
              Sequência visual da noite em família
            </label>
            <textarea
              id="sleep-ritual"
              rows={2}
              value={eveningRitual}
              onChange={(e) => setEveningRitual(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
            />
          </div>
          <div className="sm:col-span-2 flex items-center justify-between gap-3">
            <div aria-live="polite">
              {sleepSaved && (
                <span className="text-sm font-medium text-blue-800">
                  Rotina noturna atualizada em memória.
                </span>
              )}
            </div>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
            >
              Salvar rotina noturna
            </button>
          </div>
        </form>
      </section>

      {/* 5. Links demonstrativos de grupos familiares */}
      <section
        aria-labelledby="study-groups-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
      >
        <div>
          <p className="text-xs font-semibold text-amber-900">
            Em revisão interdisciplinar · Diretório demonstrativo sem redirecionamento externo
          </p>
          <h2 id="study-groups-heading" className="font-display text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <UsersRound className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <span>Grupos familiares de apoio</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_FAMILY_GROUPS.map((group) => (
            <article key={group.id} className="border border-slate-200 rounded-xl p-4 space-y-2">
              <p className="text-xs text-slate-500">
                {group.municipality} · {group.meetingFormat}
              </p>
              <h3 className="font-display text-base font-bold text-slate-900">{group.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{group.moderationNote}</p>
              <button
                type="button"
                onClick={() =>
                  setGroupInterestMsg(
                    `Convite demonstrativo exibido para "${group.name}". Links externos reais permanecem desabilitados na fase de protótipo.`,
                  )
                }
                className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Acessar espaço demonstrativo
              </button>
            </article>
          ))}
        </div>

        {groupInterestMsg && (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-blue-950 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3"
          >
            {groupInterestMsg}
          </p>
        )}
      </section>
    </div>
  );
}
