import React, {useState} from 'react';
import {
  Backpack,
  BookOpen,
  CalendarDays,
  Check,
  Heart,
  Moon,
  Music,
  NotebookPen,
  Plus,
  Sparkles,
  Sun,
  Utensils,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {EmptyState} from '../components/EmptyState';
import {useAppState} from '../state/AppStateContext';
import type {AppointmentCategory, RoutineIconName, RoutinePeriod} from '../types/domain';

const ROUTINE_ICONS: Record<RoutineIconName, LucideIcon> = {
  sun: Sun,
  utensils: Utensils,
  backpack: Backpack,
  book: BookOpen,
  heart: Heart,
  moon: Moon,
  sparkles: Sparkles,
  music: Music,
};

const ICON_OPTIONS: {value: RoutineIconName; label: string}[] = [
  {value: 'sun', label: 'Sol / Manhã'},
  {value: 'utensils', label: 'Refeição'},
  {value: 'backpack', label: 'Escola / Saída'},
  {value: 'book', label: 'Leitura / Estudo'},
  {value: 'sparkles', label: 'Atividade física'},
  {value: 'music', label: 'Música / Relaxamento'},
  {value: 'heart', label: 'Acolhimento'},
  {value: 'moon', label: 'Noite / Descanso'},
];

const APPOINTMENT_CATEGORIES: AppointmentCategory[] = [
  'Apoio Familiar',
  'Academia Inclusiva',
  'Atendimento',
  'Escola',
  'Comunidade',
];

type SubTab = 'rotina' | 'agenda' | 'diario';

/**
 * Tela integrada de Rotina Visual (texto e ícones), Agenda de Compromissos e Diário Fictício.
 */
export function RoutineAgendaDiaryView() {
  const {
    routineSteps,
    toggleRoutineStep,
    addRoutineStep,
    appointments,
    addAppointment,
    diaryEntries,
    addDiaryEntry,
  } = useAppState();

  const [activeTab, setActiveTab] = useState<SubTab>('rotina');

  // Estados da Rotina Visual
  const [stepPeriod, setStepPeriod] = useState<RoutinePeriod>('Manhã');
  const [stepTime, setStepTime] = useState('10:00');
  const [stepTitle, setStepTitle] = useState('');
  const [stepDescription, setStepDescription] = useState('');
  const [stepIcon, setStepIcon] = useState<RoutineIconName>('sun');
  const [stepError, setStepError] = useState<string | null>(null);

  // Estados da Agenda
  const [agendaFilter, setAgendaFilter] = useState<string>('Todas');
  const [agDate, setAgDate] = useState('Próxima semana');
  const [agTime, setAgTime] = useState('14:00');
  const [agTitle, setAgTitle] = useState('');
  const [agLocation, setAgLocation] = useState('');
  const [agCategory, setAgCategory] = useState<AppointmentCategory>('Apoio Familiar');
  const [agNotes, setAgNotes] = useState('');
  const [agError, setAgError] = useState<string | null>(null);

  // Estados do Diário
  const [diaryPeriod, setDiaryPeriod] = useState<RoutinePeriod>('Tarde');
  const [diaryHighlight, setDiaryHighlight] = useState('');
  const [diaryObservation, setDiaryObservation] = useState('');
  const [diaryError, setDiaryError] = useState<string | null>(null);

  const handleAddRoutine = (event: React.FormEvent) => {
    event.preventDefault();
    if (stepTitle.trim().length < 3) {
      setStepError('Informe um título curto para o cartão da rotina visual.');
      return;
    }
    setStepError(null);
    addRoutineStep({
      period: stepPeriod,
      time: stepTime,
      title: stepTitle.trim(),
      description: stepDescription.trim() || 'Passo visual combinado com a família.',
      icon: stepIcon,
    });
    setStepTitle('');
    setStepDescription('');
  };

  const handleAddAppointment = (event: React.FormEvent) => {
    event.preventDefault();
    if (agTitle.trim().length < 4 || agLocation.trim().length < 3) {
      setAgError('Preencha o nome do compromisso e o local fictício.');
      return;
    }
    setAgError(null);
    addAppointment({
      date: agDate.trim() || 'A definir',
      time: agTime,
      title: agTitle.trim(),
      location: agLocation.trim(),
      category: agCategory,
      notes: agNotes.trim() || 'Anotação demonstrativa da família.',
    });
    setAgTitle('');
    setAgLocation('');
    setAgNotes('');
  };

  const handleAddDiary = (event: React.FormEvent) => {
    event.preventDefault();
    if (diaryObservation.trim().length < 8) {
      setDiaryError('Escreva uma observação descritiva do cotidiano com pelo menos 8 caracteres.');
      return;
    }
    setDiaryError(null);
    addDiaryEntry({
      date: 'Hoje (sessão demonstrativa)',
      period: diaryPeriod,
      authorRole: 'Família',
      highlight: diaryHighlight.trim() || 'Registro do dia a dia',
      observation: diaryObservation.trim(),
    });
    setDiaryHighlight('');
    setDiaryObservation('');
  };

  const filteredAppointments =
    agendaFilter === 'Todas'
      ? appointments
      : appointments.filter((item) => item.category === agendaFilter);

  return (
    <div className="space-y-6">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Rotina visual, agenda e diário
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Organização cotidiana em memória com dados fictícios. Não há interpretação automática
            nem análise clínica dos registros.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Seções de rotina, agenda e diário"
          className="inline-flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'rotina'}
            onClick={() => setActiveTab('rotina')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'rotina'
                ? 'bg-white text-blue-800 shadow-xs font-semibold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Rotina visual
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'agenda'}
            onClick={() => setActiveTab('agenda')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'agenda'
                ? 'bg-white text-blue-800 shadow-xs font-semibold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Agenda de compromissos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'diario'}
            onClick={() => setActiveTab('diario')}
            className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'diario'
                ? 'bg-white text-blue-800 shadow-xs font-semibold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Diário fictício
          </button>
        </div>
      </header>

      {/* ABA 1: ROTINA VISUAL */}
      {activeTab === 'rotina' && (
        <div className="space-y-6" role="tabpanel" aria-label="Rotina visual">
          {(['Manhã', 'Tarde', 'Noite'] as RoutinePeriod[]).map((period) => {
            const periodSteps = routineSteps.filter((step) => step.period === period);
            return (
              <section key={period} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-slate-900">{period}</h2>
                  <span className="text-xs font-medium text-slate-500 tabular-nums">
                    {periodSteps.filter((s) => s.done).length}/{periodSteps.length} concluídos
                  </span>
                </div>

                {periodSteps.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    Nenhum cartão cadastrado neste período ainda.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {periodSteps.map((step) => {
                      const Icon = ROUTINE_ICONS[step.icon];
                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => toggleRoutineStep(step.id)}
                          aria-pressed={step.done}
                          className={`text-left rounded-2xl border p-4 flex items-start gap-3.5 transition-colors min-h-[72px] ${
                            step.done
                              ? 'bg-blue-50/70 border-blue-300 text-slate-900'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                              step.done ? 'bg-blue-700 text-white' : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-600 tabular-nums">
                                {step.time}
                              </span>
                              <span className="text-xs font-semibold text-blue-800 inline-flex items-center gap-1">
                                {step.done ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Feito</span>
                                  </>
                                ) : (
                                  'Marcar feito'
                                )}
                              </span>
                            </div>
                            <p className="font-display text-sm font-bold text-slate-900 mt-0.5">
                              {step.title}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">{step.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}

          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Adicionar passo na rotina visual
            </h2>
            <form onSubmit={handleAddRoutine} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
              <div>
                <label htmlFor="routine-title" className="block text-sm font-medium text-slate-900 mb-1">
                  Nome da atividade
                </label>
                <input
                  id="routine-title"
                  type="text"
                  value={stepTitle}
                  onChange={(e) => setStepTitle(e.target.value)}
                  placeholder="Ex.: Lanche tranquilo da tarde"
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="routine-period" className="block text-sm font-medium text-slate-900 mb-1">
                    Período
                  </label>
                  <select
                    id="routine-period"
                    value={stepPeriod}
                    onChange={(e) => setStepPeriod(e.target.value as RoutinePeriod)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-2.5 text-sm bg-white"
                  >
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="routine-time" className="block text-sm font-medium text-slate-900 mb-1">
                    Horário
                  </label>
                  <input
                    id="routine-time"
                    type="time"
                    value={stepTime}
                    onChange={(e) => setStepTime(e.target.value)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-2.5 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="routine-icon" className="block text-sm font-medium text-slate-900 mb-1">
                    Ícone
                  </label>
                  <select
                    id="routine-icon"
                    value={stepIcon}
                    onChange={(e) => setStepIcon(e.target.value as RoutineIconName)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-2 text-sm bg-white"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="routine-desc" className="block text-sm font-medium text-slate-900 mb-1">
                  Apoio visual ou dica curta (opcional)
                </label>
                <input
                  id="routine-desc"
                  type="text"
                  value={stepDescription}
                  onChange={(e) => setStepDescription(e.target.value)}
                  placeholder="Ex.: Mostrar imagem da fruta favorita antes de sentar à mesa."
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                />
              </div>
              {stepError && (
                <p role="alert" className="sm:col-span-2 text-sm font-medium text-red-700">
                  {stepError}
                </p>
              )}
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Adicionar à rotina</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* ABA 2: AGENDA */}
      {activeTab === 'agenda' && (
        <div className="space-y-6" role="tabpanel" aria-label="Agenda de compromissos">
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-700" aria-hidden="true" />
                <span>Compromissos da semana (fictícios)</span>
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="agenda-filter" className="text-xs font-medium text-slate-600">
                  Filtrar categoria:
                </label>
                <select
                  id="agenda-filter"
                  value={agendaFilter}
                  onChange={(e) => setAgendaFilter(e.target.value)}
                  className="min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white"
                >
                  <option value="Todas">Todas</option>
                  {APPOINTMENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <EmptyState
                title="Nenhum compromisso nesta categoria"
                description="Altere o filtro acima ou registre um novo compromisso fictício abaixo."
                actionLabel="Mostrar todos os compromissos"
                onAction={() => setAgendaFilter('Todas')}
              />
            ) : (
              <ul className="divide-y divide-slate-200">
                {filteredAppointments.map((item) => (
                  <li key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 tabular-nums">
                        {item.date} · {item.time} · {item.category}
                      </p>
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600">{item.location}</p>
                      {item.notes && <p className="text-xs text-slate-500">{item.notes}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Novo compromisso demonstrativo
            </h2>
            <form onSubmit={handleAddAppointment} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
              <div>
                <label htmlFor="ag-title" className="block text-sm font-medium text-slate-900 mb-1">
                  Título do compromisso
                </label>
                <input
                  id="ag-title"
                  type="text"
                  value={agTitle}
                  onChange={(e) => setAgTitle(e.target.value)}
                  placeholder="Ex.: Visita à academia inclusiva"
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                />
              </div>
              <div>
                <label htmlFor="ag-location" className="block text-sm font-medium text-slate-900 mb-1">
                  Local fictício
                </label>
                <input
                  id="ag-location"
                  type="text"
                  value={agLocation}
                  onChange={(e) => setAgLocation(e.target.value)}
                  placeholder="Ex.: Espaço Comunitário · Chapecó"
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ag-date" className="block text-sm font-medium text-slate-900 mb-1">
                    Dia
                  </label>
                  <input
                    id="ag-date"
                    type="text"
                    value={agDate}
                    onChange={(e) => setAgDate(e.target.value)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="ag-time" className="block text-sm font-medium text-slate-900 mb-1">
                    Horário
                  </label>
                  <input
                    id="ag-time"
                    type="time"
                    value={agTime}
                    onChange={(e) => setAgTime(e.target.value)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm tabular-nums"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ag-category" className="block text-sm font-medium text-slate-900 mb-1">
                  Categoria
                </label>
                <select
                  id="ag-category"
                  value={agCategory}
                  onChange={(e) => setAgCategory(e.target.value as AppointmentCategory)}
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white"
                >
                  {APPOINTMENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ag-notes" className="block text-sm font-medium text-slate-900 mb-1">
                  Lembrete de preparação (opcional)
                </label>
                <input
                  id="ag-notes"
                  type="text"
                  value={agNotes}
                  onChange={(e) => setAgNotes(e.target.value)}
                  placeholder="Ex.: Levar garrafa de água e cartão visual de transição."
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                />
              </div>
              {agError && (
                <p role="alert" className="sm:col-span-2 text-sm font-medium text-red-700">
                  {agError}
                </p>
              )}
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
                >
                  Salvar compromisso na agenda
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* ABA 3: DIÁRIO */}
      {activeTab === 'diario' && (
        <div className="space-y-6" role="tabpanel" aria-label="Diário fictício">
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <NotebookPen className="w-5 h-5 text-blue-700" aria-hidden="true" />
              <span>Registrar anotação cotidiana (sem interpretação clínica)</span>
            </h2>

            <form onSubmit={handleAddDiary} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="diary-period" className="block text-sm font-medium text-slate-900 mb-1">
                    Período
                  </label>
                  <select
                    id="diary-period"
                    value={diaryPeriod}
                    onChange={(e) => setDiaryPeriod(e.target.value as RoutinePeriod)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white"
                  >
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="diary-highlight" className="block text-sm font-medium text-slate-900 mb-1">
                    Resumo curto do momento
                  </label>
                  <input
                    id="diary-highlight"
                    type="text"
                    value={diaryHighlight}
                    onChange={(e) => setDiaryHighlight(e.target.value)}
                    placeholder="Ex.: Brincadeira calma no quintal"
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="diary-obs" className="block text-sm font-medium text-slate-900 mb-1">
                  Observação descritiva fictícia
                </label>
                <textarea
                  id="diary-obs"
                  rows={3}
                  value={diaryObservation}
                  onChange={(e) => setDiaryObservation(e.target.value)}
                  placeholder="Descreva o que aconteceu no cotidiano, preferências ou estratégias que funcionaram bem."
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              {diaryError && (
                <p role="alert" className="text-sm font-medium text-red-700">
                  {diaryError}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
                >
                  Adicionar registro ao diário
                </button>
              </div>
            </form>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Registros recentes da família
            </h2>
            <ul className="divide-y divide-slate-200">
              {diaryEntries.map((entry) => (
                <li key={entry.id} className="py-4 space-y-1.5">
                  <p className="text-xs text-slate-500">
                    {entry.date} · {entry.period} · Registrado por {entry.authorRole}
                  </p>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {entry.highlight}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{entry.observation}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
