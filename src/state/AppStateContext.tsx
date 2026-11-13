import React, {createContext, useContext, useMemo, useState} from 'react';
import {
  INITIAL_ACTIVITIES_STUDY,
  INITIAL_APPOINTMENTS,
  INITIAL_ARTICLES,
  INITIAL_CHILD_PRESENTATION,
  INITIAL_CONTACT_REQUESTS,
  INITIAL_DIARY_ENTRIES,
  INITIAL_MEDICATIONS_STUDY,
  INITIAL_NETWORK_MEMBERS,
  INITIAL_OFFERS,
  INITIAL_REGISTRATION,
  INITIAL_RESOURCES,
  INITIAL_ROUTINE_STEPS,
  INITIAL_SCHOOL_NOTES,
  INITIAL_SLEEP_STUDY,
  INITIAL_SUPPORT_GOALS,
} from '../data/mockData';
import type {
  AppointmentItem,
  AppRoute,
  CaregiverRegistration,
  ChildPresentation,
  ContactRequest,
  CurationStatus,
  DiaryEntry,
  EducationalArticle,
  MedicationStudyItem,
  NetworkMember,
  PhysicalActivityStudyItem,
  ProfessionalOffer,
  RoutineStep,
  SchoolNoteItem,
  ServiceResource,
  ShareBlockKey,
  SleepRoutineStudyItem,
  SupportGoal,
  UserRole,
} from '../types/domain';

interface AppStateContextValue {
  role: UserRole;
  route: AppRoute;
  setRole: (nextRole: UserRole) => void;
  setRoute: (nextRoute: AppRoute) => void;

  registration: CaregiverRegistration;
  updateRegistration: (next: Omit<CaregiverRegistration, 'id' | 'updatedAtLabel'>) => void;

  childPresentation: ChildPresentation;
  updateChildPresentation: (next: ChildPresentation) => void;

  supportGoals: SupportGoal[];
  toggleSupportGoal: (id: string) => void;
  addSupportGoal: (title: string, context: string) => void;

  routineSteps: RoutineStep[];
  toggleRoutineStep: (id: string) => void;
  addRoutineStep: (step: Omit<RoutineStep, 'id' | 'done'>) => void;

  appointments: AppointmentItem[];
  addAppointment: (item: Omit<AppointmentItem, 'id'>) => void;

  diaryEntries: DiaryEntry[];
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void;

  resources: ServiceResource[];
  updateResourceCuration: (id: string, status: CurationStatus) => void;

  articles: EducationalArticle[];
  updateArticleCuration: (id: string, status: CurationStatus) => void;

  offers: ProfessionalOffer[];
  addProfessionalOffer: (offer: Omit<ProfessionalOffer, 'id' | 'curationStatus'>) => void;
  updateOfferCuration: (id: string, status: CurationStatus) => void;

  contactRequests: ContactRequest[];
  submitContactRequest: (
    payload: Pick<ContactRequest, 'targetName' | 'targetCategory' | 'municipality' | 'message'>,
  ) => void;
  replyContactRequest: (id: string, replyNote: string) => void;

  networkMembers: NetworkMember[];
  setMemberBlockPermission: (memberId: string, block: ShareBlockKey, allowed: boolean) => void;
  revokeAllForMember: (memberId: string) => void;
  getPermissionsForRole: (targetRole: 'profissional' | 'escola') => Record<ShareBlockKey, boolean>;

  medicationsStudy: MedicationStudyItem[];
  addMedicationStudy: (item: Omit<MedicationStudyItem, 'id'>) => void;

  activitiesStudy: PhysicalActivityStudyItem[];
  addActivityStudy: (item: Omit<PhysicalActivityStudyItem, 'id'>) => void;

  sleepStudy: SleepRoutineStudyItem;
  updateSleepStudy: (next: SleepRoutineStudyItem) => void;

  schoolNotes: SchoolNoteItem[];
  addSchoolNote: (observation: string) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, AppRoute> = {
  familia: 'inicio',
  profissional: 'profissional',
  escola: 'escola',
  curadoria: 'curadoria',
};

/**
 * Provedor de estado em memória da RedE TEA.
 * Nenhum dado é persistido em armazenamento local ou enviado a servidores.
 */
export function AppStateProvider({children}: {children: React.ReactNode}) {
  const [role, setRoleState] = useState<UserRole>('familia');
  const [route, setRoute] = useState<AppRoute>('inicio');

  const [registration, setRegistration] = useState<CaregiverRegistration>(INITIAL_REGISTRATION);
  const [childPresentation, setChildPresentation] = useState<ChildPresentation>(
    INITIAL_CHILD_PRESENTATION,
  );
  const [supportGoals, setSupportGoals] = useState<SupportGoal[]>(INITIAL_SUPPORT_GOALS);
  const [routineSteps, setRoutineSteps] = useState<RoutineStep[]>(INITIAL_ROUTINE_STEPS);
  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(INITIAL_DIARY_ENTRIES);

  const [resources, setResources] = useState<ServiceResource[]>(INITIAL_RESOURCES);
  const [articles, setArticles] = useState<EducationalArticle[]>(INITIAL_ARTICLES);
  const [offers, setOffers] = useState<ProfessionalOffer[]>(INITIAL_OFFERS);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(INITIAL_CONTACT_REQUESTS);
  const [networkMembers, setNetworkMembers] = useState<NetworkMember[]>(INITIAL_NETWORK_MEMBERS);

  const [medicationsStudy, setMedicationsStudy] =
    useState<MedicationStudyItem[]>(INITIAL_MEDICATIONS_STUDY);
  const [activitiesStudy, setActivitiesStudy] =
    useState<PhysicalActivityStudyItem[]>(INITIAL_ACTIVITIES_STUDY);
  const [sleepStudy, setSleepStudy] = useState<SleepRoutineStudyItem>(INITIAL_SLEEP_STUDY);
  const [schoolNotes, setSchoolNotes] = useState<SchoolNoteItem[]>(INITIAL_SCHOOL_NOTES);

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
    setRoute(DEFAULT_ROUTE_BY_ROLE[nextRole]);
  };

  const updateRegistration = (next: Omit<CaregiverRegistration, 'id' | 'updatedAtLabel'>) => {
    setRegistration({
      ...next,
      id: registration.id,
      updatedAtLabel: 'Atualizado agora (apenas em memória)',
    });
  };

  const updateChildPresentation = (next: ChildPresentation) => {
    setChildPresentation(next);
  };

  const toggleSupportGoal = (id: string) => {
    setSupportGoals((prev) =>
      prev.map((goal) => (goal.id === id ? {...goal, completed: !goal.completed} : goal)),
    );
  };

  const addSupportGoal = (title: string, context: string) => {
    setSupportGoals((prev) => [
      {
        id: `goal-${Date.now()}`,
        title: title.trim(),
        context: context.trim() || 'Rotina cotidiana',
        completed: false,
      },
      ...prev,
    ]);
  };

  const toggleRoutineStep = (id: string) => {
    setRoutineSteps((prev) =>
      prev.map((step) => (step.id === id ? {...step, done: !step.done} : step)),
    );
  };

  const addRoutineStep = (step: Omit<RoutineStep, 'id' | 'done'>) => {
    setRoutineSteps((prev) => [
      ...prev,
      {
        ...step,
        id: `rot-${Date.now()}`,
        done: false,
      },
    ]);
  };

  const addAppointment = (item: Omit<AppointmentItem, 'id'>) => {
    setAppointments((prev) => [
      {
        ...item,
        id: `ag-${Date.now()}`,
      },
      ...prev,
    ]);
  };

  const addDiaryEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    setDiaryEntries((prev) => [
      {
        ...entry,
        id: `dia-${Date.now()}`,
      },
      ...prev,
    ]);
  };

  const updateResourceCuration = (id: string, status: CurationStatus) => {
    setResources((prev) =>
      prev.map((item) => (item.id === id ? {...item, curationStatus: status} : item)),
    );
  };

  const updateArticleCuration = (id: string, status: CurationStatus) => {
    setArticles((prev) =>
      prev.map((item) => (item.id === id ? {...item, curationStatus: status} : item)),
    );
  };

  const addProfessionalOffer = (offer: Omit<ProfessionalOffer, 'id' | 'curationStatus'>) => {
    setOffers((prev) => [
      {
        ...offer,
        id: `off-${Date.now()}`,
        curationStatus: 'Em revisão',
      },
      ...prev,
    ]);
  };

  const updateOfferCuration = (id: string, status: CurationStatus) => {
    setOffers((prev) =>
      prev.map((item) => (item.id === id ? {...item, curationStatus: status} : item)),
    );
  };

  const submitContactRequest = (
    payload: Pick<ContactRequest, 'targetName' | 'targetCategory' | 'municipality' | 'message'>,
  ) => {
    setContactRequests((prev) => [
      {
        id: `req-${Date.now()}`,
        targetName: payload.targetName,
        targetCategory: payload.targetCategory,
        municipality: payload.municipality,
        senderName: registration.caregiverName,
        message: payload.message.trim(),
        createdAtLabel: 'Agora (sessão demonstrativa)',
        status: 'Enviada',
      },
      ...prev,
    ]);
  };

  const replyContactRequest = (id: string, replyNote: string) => {
    setContactRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'Respondida (demonstrativo)',
              replyNote: replyNote.trim(),
            }
          : req,
      ),
    );
  };

  const setMemberBlockPermission = (memberId: string, block: ShareBlockKey, allowed: boolean) => {
    setNetworkMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              permissions: {
                ...member.permissions,
                [block]: allowed,
              },
            }
          : member,
      ),
    );
  };

  const revokeAllForMember = (memberId: string) => {
    setNetworkMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              permissions: {
                apresentacao: false,
                rotina: false,
                objetivos: false,
                agenda: false,
                diario: false,
                medicamentos: false,
              },
            }
          : member,
      ),
    );
  };

  const getPermissionsForRole = (targetRole: 'profissional' | 'escola') => {
    const member = networkMembers.find((item) => item.linkedProfile === targetRole);
    if (!member) {
      return {
        apresentacao: false,
        rotina: false,
        objetivos: false,
        agenda: false,
        diario: false,
        medicamentos: false,
      };
    }
    return member.permissions;
  };

  const addMedicationStudy = (item: Omit<MedicationStudyItem, 'id'>) => {
    setMedicationsStudy((prev) => [
      ...prev,
      {
        ...item,
        id: `med-${Date.now()}`,
      },
    ]);
  };

  const addActivityStudy = (item: Omit<PhysicalActivityStudyItem, 'id'>) => {
    setActivitiesStudy((prev) => [
      ...prev,
      {
        ...item,
        id: `act-${Date.now()}`,
      },
    ]);
  };

  const updateSleepStudy = (next: SleepRoutineStudyItem) => {
    setSleepStudy(next);
  };

  const addSchoolNote = (observation: string) => {
    setSchoolNotes((prev) => [
      {
        id: `esc-note-${Date.now()}`,
        date: 'Agora (demonstrativo)',
        author: 'Prof.ª Helena Souza (Fictícia)',
        observation: observation.trim(),
      },
      ...prev,
    ]);
  };

  const value = useMemo<AppStateContextValue>(
    () => ({
      role,
      route,
      setRole,
      setRoute,
      registration,
      updateRegistration,
      childPresentation,
      updateChildPresentation,
      supportGoals,
      toggleSupportGoal,
      addSupportGoal,
      routineSteps,
      toggleRoutineStep,
      addRoutineStep,
      appointments,
      addAppointment,
      diaryEntries,
      addDiaryEntry,
      resources,
      updateResourceCuration,
      articles,
      updateArticleCuration,
      offers,
      addProfessionalOffer,
      updateOfferCuration,
      contactRequests,
      submitContactRequest,
      replyContactRequest,
      networkMembers,
      setMemberBlockPermission,
      revokeAllForMember,
      getPermissionsForRole,
      medicationsStudy,
      addMedicationStudy,
      activitiesStudy,
      addActivityStudy,
      sleepStudy,
      updateSleepStudy,
      schoolNotes,
      addSchoolNote,
    }),
    [
      role,
      route,
      registration,
      childPresentation,
      supportGoals,
      routineSteps,
      appointments,
      diaryEntries,
      resources,
      articles,
      offers,
      contactRequests,
      networkMembers,
      medicationsStudy,
      activitiesStudy,
      sleepStudy,
      schoolNotes,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState deve ser utilizado dentro de AppStateProvider.');
  }
  return ctx;
}
