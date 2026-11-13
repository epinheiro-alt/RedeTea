import React, {useState} from 'react';
import {Lock, Plus, Send, Stethoscope} from 'lucide-react';
import {MUNICIPALITIES} from '../data/mockData';
import {useAppState} from '../state/AppStateContext';

/**
 * Painel do perfil Profissional (demonstrativo):
 * atuação, ofertas de apoio, solicitações recebidas e blocos autorizados pela família.
 */
export function ProfessionalView() {
  const {
    offers,
    addProfessionalOffer,
    contactRequests,
    replyContactRequest,
    getPermissionsForRole,
    registration,
    childPresentation,
    routineSteps,
    supportGoals,
    appointments,
    diaryEntries,
    medicationsStudy,
  } = useAppState();

  const permissions = getPermissionsForRole('profissional');

  const [offerTitle, setOfferTitle] = useState('');
  const [offerFormat, setOfferFormat] = useState<'Roda de escuta não clínica' | 'Oficina prática' | 'Orientação educacional'>('Oficina prática');
  const [offerMunicipality, setOfferMunicipality] = useState<string>('Chapecó');
  const [offerSchedule, setOfferSchedule] = useState('');
  const [offerError, setOfferError] = useState<string | null>(null);

  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const handleCreateOffer = (event: React.FormEvent) => {
    event.preventDefault();
    if (offerTitle.trim().length < 5) {
      setOfferError('Informe o título da oferta de apoio com pelo menos 5 caracteres.');
      return;
    }
    setOfferError(null);
    addProfessionalOffer({
      professionalName: 'Dra. Camila Mendes (Fictícia)',
      specialty: 'Fonoaudiologia Comunitária',
      municipality: offerMunicipality,
      title: offerTitle.trim(),
      format: offerFormat,
      scheduleText: offerSchedule.trim() || 'Horário demonstrativo a combinar',
    });
    setOfferTitle('');
    setOfferSchedule('');
  };

  const handleReply = (id: string) => {
    const text = replyDrafts[id]?.trim();
    if (!text) return;
    replyContactRequest(id, text);
    setReplyDrafts((prev) => ({...prev, [id]: ''}));
  };

  return (
    <div className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
          <Stethoscope className="w-4 h-4" aria-hidden="true" />
          <span>Perfil demonstrativo · Profissional</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Dra. Camila Mendes (Fictícia)
        </h1>
        <p className="text-sm text-slate-600">
          Fonoaudiologia Comunitária · Chapecó · Atuação focada em comunicação acessível e parceria
          com famílias e escolas.
        </p>
      </header>

      {/* Blocos compartilhados pela família */}
      <section aria-labelledby="prof-shared-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div>
          <h2 id="prof-shared-heading" className="font-display text-lg font-bold text-slate-900">
            Informações compartilhadas por {registration.caregiverName}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Exibe apenas os blocos autorizados na tela <strong>Minha Rede</strong> da família.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Apresentação */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Apresentação da criança</h3>
            {permissions.apresentacao ? (
              <div className="text-xs text-slate-700 space-y-1.5">
                <p>
                  <strong>Criança:</strong> {registration.childNickname} ({registration.childAgeYears}{' '}
                  anos)
                </p>
                <p>
                  <strong>Comunicação:</strong> {childPresentation.communicationStyle}
                </p>
                <p>
                  <strong>Preferências sensoriais:</strong> {childPresentation.sensoryPreferences}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Acesso não autorizado ou revogado pela família.</span>
              </p>
            )}
          </div>

          {/* Rotina visual */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Rotina visual</h3>
            {permissions.rotina ? (
              <ul className="text-xs text-slate-700 space-y-1">
                {routineSteps.slice(0, 4).map((s) => (
                  <li key={s.id} className="tabular-nums">
                    {s.time} ({s.period}) — {s.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Acesso não autorizado ou revogado pela família.</span>
              </p>
            )}
          </div>

          {/* Objetivos */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Objetivos de apoio</h3>
            {permissions.objetivos ? (
              <ul className="text-xs text-slate-700 space-y-1">
                {supportGoals.map((g) => (
                  <li key={g.id}>• {g.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Acesso não autorizado ou revogado pela família.</span>
              </p>
            )}
          </div>

          {/* Diário e Agenda */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Agenda e Diário cotidiano</h3>
            {permissions.agenda || permissions.diario ? (
              <div className="text-xs text-slate-700 space-y-1.5">
                {permissions.agenda ? (
                  <p>Agenda liberada: {appointments.length} compromissos registrados.</p>
                ) : (
                  <p className="text-slate-500">Agenda não autorizada.</p>
                )}
                {permissions.diario ? (
                  <p>Último registro do diário: “{diaryEntries[0]?.highlight}”.</p>
                ) : (
                  <p className="text-slate-500">Diário cotidiano mantido privado pela família.</p>
                )}
                {permissions.medicamentos && (
                  <p>Medicações (em estudo): {medicationsStudy.length} horários anotados.</p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Acesso não autorizado ou revogado pela família.</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Solicitações de contato recebidas */}
      <section aria-labelledby="prof-requests-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 id="prof-requests-heading" className="font-display text-lg font-bold text-slate-900">
          Solicitações de contato recebidas ({contactRequests.length})
        </h2>

        <ul className="divide-y divide-slate-200">
          {contactRequests.map((req) => (
            <li key={req.id} className="py-4 space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">
                  {req.createdAtLabel} · {req.municipality} · {req.status}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Para: {req.targetName} — de {req.senderName}
                </p>
                <p className="text-sm text-slate-700">{req.message}</p>
              </div>

              {req.replyNote ? (
                <p className="text-xs bg-blue-50 border border-blue-200 rounded-xl p-3 text-blue-950">
                  <strong>Resposta demonstrativa enviada:</strong> {req.replyNote}
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor={`reply-${req.id}`} className="sr-only">
                    Responder solicitação de {req.senderName}
                  </label>
                  <input
                    id={`reply-${req.id}`}
                    type="text"
                    value={replyDrafts[req.id] || ''}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({...prev, [req.id]: e.target.value}))
                    }
                    placeholder="Escreva uma resposta acolhedora demonstrativa..."
                    className="flex-1 min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleReply(req.id)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Responder</span>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Criar oferta de apoio demonstrativa */}
      <section aria-labelledby="prof-offers-heading" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 id="prof-offers-heading" className="font-display text-lg font-bold text-slate-900">
          Publicar oferta de apoio (vai para revisão da Curadoria)
        </h2>

        <form onSubmit={handleCreateOffer} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
          <div className="sm:col-span-2">
            <label htmlFor="offer-title" className="block text-sm font-medium text-slate-900 mb-1">
              Título da oficina ou roda de escuta
            </label>
            <input
              id="offer-title"
              type="text"
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
              placeholder="Ex.: Conversa prática sobre comunicação em casa"
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="offer-format" className="block text-sm font-medium text-slate-900 mb-1">
              Formato
            </label>
            <select
              id="offer-format"
              value={offerFormat}
              onChange={(e) =>
                setOfferFormat(
                  e.target.value as 'Roda de escuta não clínica' | 'Oficina prática' | 'Orientação educacional',
                )
              }
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white"
            >
              <option value="Oficina prática">Oficina prática</option>
              <option value="Roda de escuta não clínica">Roda de escuta não clínica</option>
              <option value="Orientação educacional">Orientação educacional</option>
            </select>
          </div>
          <div>
            <label htmlFor="offer-city" className="block text-sm font-medium text-slate-900 mb-1">
              Município
            </label>
            <select
              id="offer-city"
              value={offerMunicipality}
              onChange={(e) => setOfferMunicipality(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-sm bg-white"
            >
              {MUNICIPALITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="offer-schedule" className="block text-sm font-medium text-slate-900 mb-1">
              Dias e horários ilustrativos
            </label>
            <input
              id="offer-schedule"
              type="text"
              value={offerSchedule}
              onChange={(e) => setOfferSchedule(e.target.value)}
              placeholder="Ex.: Quintas-feiras · 19:00"
              className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm"
            />
          </div>
          {offerError && (
            <p role="alert" className="sm:col-span-2 text-sm font-medium text-red-700">
              {offerError}
            </p>
          )}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Enviar para curadoria</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-200 space-y-2">
          <h3 className="text-sm font-semibold text-slate-900">Ofertas cadastradas na sessão</h3>
          <ul className="divide-y divide-slate-200">
            {offers.map((offer) => (
              <li key={offer.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-medium text-slate-900">{offer.title}</span>
                <span className="text-xs text-slate-600">
                  {offer.municipality} · Status: {offer.curationStatus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
