import React, {useState} from 'react';
import {CheckCircle2, Plus, UserCheck} from 'lucide-react';
import {MUNICIPALITIES} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';

/**
 * Cadastro fictício do cuidador, ficha de apresentação da criança e objetivos de apoio.
 */
export function ChildProfileView() {
  const {
    registration,
    updateRegistration,
    childPresentation,
    updateChildPresentation,
    supportGoals,
    toggleSupportGoal,
    addSupportGoal,
  } = useAppState();

  const [caregiverName, setCaregiverName] = useState(registration.caregiverName);
  const [relationship, setRelationship] = useState(registration.relationship);
  const [municipality, setMunicipality] = useState(registration.municipality);
  const [childNickname, setChildNickname] = useState(registration.childNickname);
  const [childAgeYears, setChildAgeYears] = useState(String(registration.childAgeYears));
  const [contactNote, setContactNote] = useState(registration.contactNote);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSavedMessage, setRegSavedMessage] = useState<string | null>(null);

  const [communicationStyle, setCommunicationStyle] = useState(childPresentation.communicationStyle);
  const [sensoryPreferences, setSensoryPreferences] = useState(childPresentation.sensoryPreferences);
  const [comfortStrategies, setComfortStrategies] = useState(childPresentation.comfortStrategies);
  const [favoriteInterests, setFavoriteInterests] = useState(childPresentation.favoriteInterests);
  const [presSaved, setPresSaved] = useState(false);

  const [goalTitle, setGoalTitle] = useState('');
  const [goalContext, setGoalContext] = useState('');
  const [goalError, setGoalError] = useState<string | null>(null);

  const handleSaveRegistration = (event: React.FormEvent) => {
    event.preventDefault();
    const ageNum = Number(childAgeYears);

    if (caregiverName.trim().length < 3 || childNickname.trim().length < 2) {
      setRegError('Preencha nomes fictícios válidos para o cuidador e para a criança.');
      setRegSavedMessage(null);
      return;
    }
    if (!Number.isFinite(ageNum) || ageNum < 1 || ageNum > 18) {
      setRegError('Informe uma idade fictícia entre 1 e 18 anos.');
      setRegSavedMessage(null);
      return;
    }

    setRegError(null);
    updateRegistration({
      caregiverName: caregiverName.trim(),
      relationship: relationship.trim() || 'Familiar cuidador',
      municipality,
      contactNote: contactNote.trim() || 'Contato demonstrativo em memória',
      childNickname: childNickname.trim(),
      childAgeYears: ageNum,
    });
    setRegSavedMessage('Cadastro fictício atualizado apenas em memória nesta sessão.');
  };

  const handleSavePresentation = (event: React.FormEvent) => {
    event.preventDefault();
    updateChildPresentation({
      communicationStyle: communicationStyle.trim(),
      sensoryPreferences: sensoryPreferences.trim(),
      comfortStrategies: comfortStrategies.trim(),
      favoriteInterests: favoriteInterests.trim(),
    });
    setPresSaved(true);
    window.setTimeout(() => setPresSaved(false), 3000);
  };

  const handleAddGoal = (event: React.FormEvent) => {
    event.preventDefault();
    if (goalTitle.trim().length < 5) {
      setGoalError('Descreva o objetivo cotidiano com pelo menos 5 caracteres.');
      return;
    }
    setGoalError(null);
    addSupportGoal(goalTitle, goalContext);
    setGoalTitle('');
    setGoalContext('');
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1">
          <UserCheck className="w-4 h-4" aria-hidden="true" />
          <span>Perfil Família · Dados fictícios em memória</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Cadastro fictício, apresentação da criança e objetivos
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Utilize apenas nomes inventados. Na tela <strong>Minha Rede</strong>, a família decide quais
          partes ficam visíveis para profissionais e escola.
        </p>
      </header>

      {/* Bloco 1: Cadastro fictício */}
      <section aria-labelledby="registration-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div>
          <h2 id="registration-heading" className="font-display text-lg font-bold text-slate-900">
            1. Cadastro demonstrativo da família
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{registration.updatedAtLabel}</p>
        </div>

        <form onSubmit={handleSaveRegistration} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
          <div>
            <label htmlFor="caregiver-name" className="block text-sm font-medium text-slate-900 mb-1">
              Nome fictício do(a) cuidador(a)
            </label>
            <input
              id="caregiver-name"
              type="text"
              value={caregiverName}
              onChange={(e) => setCaregiverName(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="caregiver-relationship" className="block text-sm font-medium text-slate-900 mb-1">
              Vínculo de cuidado
            </label>
            <input
              id="caregiver-relationship"
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="child-nickname" className="block text-sm font-medium text-slate-900 mb-1">
              Apelido ou nome fictício da criança
            </label>
            <input
              id="child-nickname"
              type="text"
              value={childNickname}
              onChange={(e) => setChildNickname(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="child-age" className="block text-sm font-medium text-slate-900 mb-1">
                Idade fictícia
              </label>
              <input
                id="child-age"
                type="number"
                min={1}
                max={18}
                value={childAgeYears}
                onChange={(e) => setChildAgeYears(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="family-municipality" className="block text-sm font-medium text-slate-900 mb-1">
                Município
              </label>
              <select
                id="family-municipality"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm text-slate-900 bg-white"
              >
                {MUNICIPALITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-note" className="block text-sm font-medium text-slate-900 mb-1">
              Observação demonstrativa de contato (não usar telefone ou documento real)
            </label>
            <input
              id="contact-note"
              type="text"
              value={contactNote}
              onChange={(e) => setContactNote(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
          </div>

          {regError && (
            <div className="sm:col-span-2" role="alert">
              <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {regError}
              </p>
            </div>
          )}

          {regSavedMessage && (
            <div className="sm:col-span-2" role="status" aria-live="polite">
              <p className="text-sm font-medium text-blue-900 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" aria-hidden="true" />
                <span>{regSavedMessage}</span>
              </p>
            </div>
          )}

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              Salvar cadastro fictício
            </button>
          </div>
        </form>
      </section>

      {/* Bloco 2: Apresentação da criança */}
      <section aria-labelledby="presentation-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div>
          <h2 id="presentation-heading" className="font-display text-lg font-bold text-slate-900">
            2. Apresentação da criança (compartilhável por bloco)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Ajuda escola, familiares e profissionais a acolherem a criança respeitando seu jeito de
            se comunicar e suas preferências sensoriais.
          </p>
        </div>

        <form onSubmit={handleSavePresentation} className="space-y-4">
          <div>
            <label htmlFor="pres-comm" className="block text-sm font-medium text-slate-900 mb-1">
              Como prefere se comunicar
            </label>
            <textarea
              id="pres-comm"
              rows={2}
              value={communicationStyle}
              onChange={(e) => setCommunicationStyle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="pres-sensory" className="block text-sm font-medium text-slate-900 mb-1">
              Preferências e sensibilidades sensoriais
            </label>
            <textarea
              id="pres-sensory"
              rows={2}
              value={sensoryPreferences}
              onChange={(e) => setSensoryPreferences(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="pres-comfort" className="block text-sm font-medium text-slate-900 mb-1">
              Estratégias que trazem conforto e previsibilidade
            </label>
            <textarea
              id="pres-comfort"
              rows={2}
              value={comfortStrategies}
              onChange={(e) => setComfortStrategies(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="pres-interests" className="block text-sm font-medium text-slate-900 mb-1">
              Interesses e atividades favoritas
            </label>
            <input
              id="pres-interests"
              type="text"
              value={favoriteInterests}
              onChange={(e) => setFavoriteInterests(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div aria-live="polite">
              {presSaved && (
                <span className="text-sm font-medium text-blue-800">
                  Apresentação atualizada em memória.
                </span>
              )}
            </div>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Atualizar apresentação
            </button>
          </div>
        </form>
      </section>

      {/* Bloco 3: Objetivos de apoio */}
      <section aria-labelledby="goals-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div>
          <h2 id="goals-heading" className="font-display text-lg font-bold text-slate-900">
            3. Objetivos de apoio cotidianos
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Combinados práticos construídos pela família (não são metas clínicas ou escalas de
            avaliação).
          </p>
        </div>

        <form onSubmit={handleAddGoal} className="grid grid-cols-1 sm:grid-cols-3 gap-3" noValidate>
          <div className="sm:col-span-2">
            <label htmlFor="goal-title-input" className="sr-only">
              Novo objetivo de apoio
            </label>
            <input
              id="goal-title-input"
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              placeholder="Ex.: Usar cartão de escolha no lanche da escola"
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="goal-context-input" className="sr-only">
              Contexto do objetivo
            </label>
            <input
              id="goal-context-input"
              type="text"
              value={goalContext}
              onChange={(e) => setGoalContext(e.target.value)}
              placeholder="Contexto (ex.: Escola)"
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900"
            />
            <button
              type="submit"
              aria-label="Adicionar objetivo de apoio"
              className="min-h-[44px] min-w-[44px] px-4 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 inline-flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Incluir</span>
            </button>
          </div>
        </form>

        {goalError && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {goalError}
          </p>
        )}

        <ul className="divide-y divide-slate-200">
          {supportGoals.map((goal) => (
            <li key={goal.id} className="py-3 flex items-start gap-3">
              <input
                id={`goal-check-${goal.id}`}
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleSupportGoal(goal.id)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
              />
              <label htmlFor={`goal-check-${goal.id}`} className="flex-1 cursor-pointer">
                <span
                  className={`block text-sm font-medium ${
                    goal.completed ? 'line-through text-slate-500' : 'text-slate-900'
                  }`}
                >
                  {goal.title}
                </span>
                <span className="block text-xs text-slate-500 mt-0.5">{goal.context}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
