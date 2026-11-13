/**
 * Tipos de domínio do protótipo RedE TEA.
 * Todos os modelos representam exclusivamente dados fictícios mantidos em memória.
 */

export type UserRole = 'familia' | 'profissional' | 'escola' | 'curadoria';

export type AppRoute =
  | 'inicio'
  | 'acolhimento'
  | 'cadastro'
  | 'rotina-agenda'
  | 'recursos'
  | 'biblioteca'
  | 'minha-rede'
  | 'em-estudo'
  | 'profissional'
  | 'escola'
  | 'curadoria';

export type ShareBlockKey =
  | 'apresentacao'
  | 'rotina'
  | 'objetivos'
  | 'agenda'
  | 'diario'
  | 'medicamentos';

export interface CaregiverRegistration {
  id: string;
  caregiverName: string;
  relationship: string;
  municipality: string;
  contactNote: string;
  childNickname: string;
  childAgeYears: number;
  updatedAtLabel: string;
}

export interface ChildPresentation {
  communicationStyle: string;
  sensoryPreferences: string;
  comfortStrategies: string;
  favoriteInterests: string;
}

export interface SupportGoal {
  id: string;
  title: string;
  context: string;
  completed: boolean;
}

export type RoutinePeriod = 'Manhã' | 'Tarde' | 'Noite';

export type RoutineIconName =
  | 'sun'
  | 'utensils'
  | 'backpack'
  | 'book'
  | 'heart'
  | 'moon'
  | 'sparkles'
  | 'music';

export interface RoutineStep {
  id: string;
  period: RoutinePeriod;
  time: string;
  title: string;
  description: string;
  icon: RoutineIconName;
  done: boolean;
}

export type AppointmentCategory =
  | 'Apoio Familiar'
  | 'Academia Inclusiva'
  | 'Atendimento'
  | 'Escola'
  | 'Comunidade';

export interface AppointmentItem {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  category: AppointmentCategory;
  notes: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  period: RoutinePeriod;
  authorRole: 'Família' | 'Escola';
  observation: string;
  highlight: string;
}

export type ResourceCategory =
  | 'Academia Inclusiva'
  | 'Apoio Familiar'
  | 'Fonoaudiologia'
  | 'Terapia Ocupacional'
  | 'Psicologia'
  | 'Educação Especial'
  | 'Lazer Acessível';

export type CurationStatus = 'Aprovado' | 'Em revisão' | 'Ajuste solicitado';

export interface ServiceResource {
  id: string;
  name: string;
  category: ResourceCategory;
  municipality: string;
  description: string;
  acceptsChildrenWithCaregivers: boolean;
  scheduleSummary: string;
  curationStatus: CurationStatus;
}

export interface EducationalArticle {
  id: string;
  title: string;
  theme: 'Acolhimento ao Cuidador' | 'Rotina Visual' | 'Comunicação' | 'Parceria Escola-Família';
  readingMinutes: number;
  summary: string;
  body: string;
  curationStatus: CurationStatus;
}

export interface ProfessionalOffer {
  id: string;
  professionalName: string;
  specialty: string;
  municipality: string;
  title: string;
  format: 'Roda de escuta não clínica' | 'Oficina prática' | 'Orientação educacional';
  scheduleText: string;
  curationStatus: CurationStatus;
}

export interface ContactRequest {
  id: string;
  targetName: string;
  targetCategory: string;
  municipality: string;
  senderName: string;
  message: string;
  createdAtLabel: string;
  status: 'Enviada' | 'Respondida (demonstrativo)';
  replyNote?: string;
}

export interface NetworkMember {
  id: string;
  name: string;
  roleLabel: string;
  institution: string;
  linkedProfile: 'profissional' | 'escola' | 'apoio-familiar';
  permissions: Record<ShareBlockKey, boolean>;
}

export interface MedicationStudyItem {
  id: string;
  name: string;
  scheduleTime: string;
  familyNote: string;
}

export interface PhysicalActivityStudyItem {
  id: string;
  activityName: string;
  daysText: string;
  spaceName: string;
  sensoryNote: string;
}

export interface SleepRoutineStudyItem {
  bedTime: string;
  wakeTime: string;
  eveningRitual: string;
}

export interface FamilyGroupLink {
  id: string;
  name: string;
  municipality: string;
  meetingFormat: string;
  moderationNote: string;
}

export interface ListeningCircle {
  id: string;
  title: string;
  facilitator: string;
  dayAndTime: string;
  modality: string;
  description: string;
}

export interface SchoolNoteItem {
  id: string;
  date: string;
  author: string;
  observation: string;
}
