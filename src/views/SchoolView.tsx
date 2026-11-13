import React, {useState} from 'react';
import {GraduationCap, Lock, Plus, Unlock} from 'lucide-react';
import {SHARE_BLOCK_LABELS} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';
import type {ShareBlockKey} from '../types/domain';

const BLOCK_ORDER: ShareBlockKey[] = [
  'apresentacao',
  'rotina',
  'objetivos',
  'agenda',
  'diario',
  'medicamentos',
];

/**
 * Painel demonstrativo do perfil Escola.
 * Exibe estritamente os blocos autorizados pela família na tela Minha Rede.
 */
export function SchoolView() {
  const {
    getPermissionsForRole,
    registration,
    childPresentation,
    routineSteps,
    supportGoals,
    appointments,
    diaryEntries,
    medicationsStudy,
    schoolNotes,
    addSchoolNote,
  } = useAppState();

  const permissions = getPermissionsForRole('escola');
  const [noteInput, setNoteInput] = useState('');
  const [noteError, setNoteError] = useState<string | null>(null);

  const handleAddSchoolNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (noteInput.trim().length < 8) {
      setNoteError('Escreva uma observação escolar fictícia com pelo menos 8 caracteres.');
      return;
    }
    setNoteError(null);
    addSchoolNote(noteInput);
    setNoteInput('');
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
          <GraduationCap className="w-4 h-4" aria-hidden="true" />
          <span>Perfil demonstrativo · Escola</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Prof.ª Helena Souza — Sala de Recursos (Fictícia)
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Este perfil acessa apenas os blocos que a família de{' '}
          <strong>{registration.childNickname}</strong> autorizou na tela <strong>Minha Rede</strong>.
          Quando um bloco é revogado pela família, ele deixa de ser exibido aqui imediatamente.
        </p>
      </header>

      <section aria-labelledby="school-blocks-heading" className="space-y-4">
        <h2 id="school-blocks-heading" className="font-display text-lg font-bold text-slate-900">
          Blocos de informação da família
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BLOCK_ORDER.map((blockKey) => {
            const allowed = permissions[blockKey];
            const meta = SHARE_BLOCK_LABELS[blockKey];

            return (
              <article
                key={blockKey}
                className={`rounded-2xl border p-5 space-y-3 ${
                  allowed ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-slate-900">{meta.title}</h3>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      allowed ? 'text-blue-800' : 'text-slate-600'
                    }`}
                  >
                    {allowed ? (
                      <>
                        <Unlock className="w-4 h-4" aria-hidden="true" />
                        <span>Autorizado</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" aria-hidden="true" />
                        <span>Não autorizado</span>
                      </>
                    )}
                  </span>
                </div>

                {!allowed ? (
                  <p className="text-sm text-slate-600">
                    Acesso não autorizado ou revogado pela família para este bloco.
                  </p>
                ) : (
                  <div className="text-sm text-slate-700 space-y-2">
                    {blockKey === 'apresentacao' && (
                      <>
                        <p>
                          <strong>Comunicação:</strong> {childPresentation.communicationStyle}
                        </p>
                        <p>
                          <strong>Sensorial:</strong> {childPresentation.sensoryPreferences}
                        </p>
                        <p>
                          <strong>Conforto:</strong> {childPresentation.comfortStrategies}
                        </p>
                      </>
                    )}

                    {blockKey === 'rotina' && (
                      <ul className="space-y-1.5">
                        {routineSteps.map((step) => (
                          <li key={step.id} className="text-xs sm:text-sm tabular-nums">
                            {step.time} ({step.period}) — {step.title}
                          </li>
                        ))}
                      </ul>
                    )}

                    {blockKey === 'objetivos' && (
                      <ul className="space-y-1.5">
                        {supportGoals.map((goal) => (
                          <li key={goal.id} className="text-xs sm:text-sm">
                            • {goal.title} ({goal.context})
                          </li>
                        ))}
                      </ul>
                    )}

                    {blockKey === 'agenda' && (
                      <ul className="space-y-1.5">
                        {appointments.map((ag) => (
                          <li key={ag.id} className="text-xs sm:text-sm tabular-nums">
                            {ag.date} · {ag.time} — {ag.title}
                          </li>
                        ))}
                      </ul>
                    )}

                    {blockKey === 'diario' && (
                      <ul className="space-y-1.5">
                        {diaryEntries.map((entry) => (
                          <li key={entry.id} className="text-xs sm:text-sm">
                            <strong>{entry.highlight}:</strong> {entry.observation}
                          </li>
                        ))}
                      </ul>
                    )}

                    {blockKey === 'medicamentos' && (
                      <ul className="space-y-1.5">
                        {medicationsStudy.map((med) => (
                          <li key={med.id} className="text-xs sm:text-sm tabular-nums">
                            {med.scheduleTime} — {med.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Registro cotidiano escolar */}
      <section aria-labelledby="school-notes-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 id="school-notes-heading" className="font-display text-lg font-bold text-slate-900">
          Registros escolares demonstrativos (convivência e acolhimento)
        </h2>

        <form onSubmit={handleAddSchoolNote} className="space-y-3" noValidate>
          <label htmlFor="school-note-input" className="block text-sm font-medium text-slate-900">
            Nova observação escolar fictícia
          </label>
          <textarea
            id="school-note-input"
            rows={2}
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Ex.: Participou bem da roda de leitura usando o apoio visual na mesa."
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
          />
          {noteError && (
            <p role="alert" className="text-sm font-medium text-red-700">
              {noteError}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Registrar observação escolar</span>
            </button>
          </div>
        </form>

        <ul className="divide-y divide-slate-200">
          {schoolNotes.map((note) => (
            <li key={note.id} className="py-3 space-y-1">
              <p className="text-xs text-slate-500">
                {note.date} · {note.author}
              </p>
              <p className="text-sm text-slate-800">{note.observation}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
