import type {
  AppointmentItem,
  CaregiverRegistration,
  ChildPresentation,
  ContactRequest,
  DiaryEntry,
  EducationalArticle,
  FamilyGroupLink,
  ListeningCircle,
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
} from '../types/domain';

export const MUNICIPALITIES = [
  'Chapecó',
  'Xanxerê',
  'Concórdia',
  'Pinhalzinho',
  'São Miguel do Oeste',
] as const;

export const SHARE_BLOCK_LABELS: Record<
  ShareBlockKey,
  {title: string; description: string; isStudy?: boolean}
> = {
  apresentacao: {
    title: 'Apresentação da criança',
    description: 'Preferências sensoriais, comunicação, interesses e estratégias de conforto.',
  },
  rotina: {
    title: 'Rotina visual',
    description: 'Sequência diária em blocos de manhã, tarde e noite com apoio visual.',
  },
  objetivos: {
    title: 'Objetivos de apoio',
    description: 'Metas cotidianas combinadas pela família para autonomia e bem-estar.',
  },
  agenda: {
    title: 'Agenda de compromissos',
    description: 'Horários de atendimentos, escola, academia inclusiva e encontros.',
  },
  diario: {
    title: 'Diário cotidiano',
    description: 'Registros descritivos do dia a dia feitos pela família.',
  },
  medicamentos: {
    title: 'Medicações (em estudo)',
    description: 'Anotações simples de nomes e horários, sem sugestão de dose ou análise.',
    isStudy: true,
  },
};

export const INITIAL_REGISTRATION: CaregiverRegistration = {
  id: 'fam-demo-01',
  caregiverName: 'Mariana Oliveira (Perfil Fictício)',
  relationship: 'Mãe e cuidadora principal',
  municipality: 'Chapecó',
  contactNote: 'Contato demonstrativo — não representa pessoa real',
  childNickname: 'Lucas (Fictício)',
  childAgeYears: 7,
  updatedAtLabel: 'Atualizado na sessão demonstrativa',
};

export const INITIAL_CHILD_PRESENTATION: ChildPresentation = {
  communicationStyle:
    'Comunicação verbal em frases curtas combinada com cartões visuais para escolhas e transições de atividade.',
  sensoryPreferences:
    'Sensibilidade a ruídos agudos e lâmpadas fluorescentes muito fortes; prefere ambientes com iluminação suave e abafador auricular em espaços movimentados.',
  comfortStrategies:
    'Avisar com 5 minutos de antecedência antes de trocar de tarefa; oferecer objeto tátil de apoio e pausa em canto tranquilo.',
  favoriteInterests:
    'Blocos de montar, trens, desenhos de mapas e circuitos motores ao ar livre.',
};

export const INITIAL_SUPPORT_GOALS: SupportGoal[] = [
  {
    id: 'goal-1',
    title: 'Antecipar a saída para a escola com cartão visual',
    context: 'Rotina da manhã em casa',
    completed: true,
  },
  {
    id: 'goal-2',
    title: 'Experimentar circuito motor em dupla com cuidador na academia',
    context: 'Atividade física compartilhada',
    completed: false,
  },
  {
    id: 'goal-3',
    title: 'Combinar sinal simples de pausa durante atividades em grupo',
    context: 'Sala de aula e sala de recursos',
    completed: false,
  },
];

export const INITIAL_ROUTINE_STEPS: RoutineStep[] = [
  {
    id: 'rot-1',
    period: 'Manhã',
    time: '07:15',
    title: 'Acordar e higiene com cartão visual',
    description: 'Sequência de 3 passos ilustrados no banheiro com tempo tranquilo.',
    icon: 'sun',
    done: true,
  },
  {
    id: 'rot-2',
    period: 'Manhã',
    time: '07:45',
    title: 'Café da manhã sem telas',
    description: 'Mesa organizada com os mesmos talheres e aviso de 5 minutos antes de sair.',
    icon: 'utensils',
    done: true,
  },
  {
    id: 'rot-3',
    period: 'Manhã',
    time: '08:20',
    title: 'Chegada à escola e transição',
    description: 'Acolhimento na entrada com a professora de apoio.',
    icon: 'backpack',
    done: false,
  },
  {
    id: 'rot-4',
    period: 'Tarde',
    time: '15:30',
    title: 'Academia Pais & Crianças (circuito livre)',
    description: 'Espaço preparado para movimento conjunto e pausa sensorial quando necessário.',
    icon: 'sparkles',
    done: false,
  },
  {
    id: 'rot-5',
    period: 'Noite',
    time: '20:15',
    title: 'Leitura curta e redução de luzes',
    description: 'Luz amarela baixa e música instrumental suave antes de deitar.',
    icon: 'moon',
    done: false,
  },
];

export const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 'ag-1',
    date: 'Hoje',
    time: '15:30',
    title: 'Horário família na Academia Movimento Acolhedor',
    location: 'Centro · Chapecó (fictício)',
    category: 'Academia Inclusiva',
    notes: 'Levar garrafa de água e abafador opcional.',
  },
  {
    id: 'ag-2',
    date: 'Amanhã',
    time: '09:30',
    title: 'Encontro com fonoaudióloga demonstrativa',
    location: 'Clínica Escola Fictícia · Chapecó',
    category: 'Atendimento',
    notes: 'Alinhar novos cartões de comunicação usados em casa.',
  },
  {
    id: 'ag-3',
    date: 'Quinta-feira',
    time: '18:30',
    title: 'Roda "Quem cuida de quem cuida?" — Escuta entre cuidadores',
    location: 'Espaço Comunitário Universitário (fictício)',
    category: 'Apoio Familiar',
    notes: 'Espaço não clínico com monitoria recreativa inclusiva ao lado.',
  },
  {
    id: 'ag-4',
    date: 'Sexta-feira',
    time: '13:45',
    title: 'Conversa de alinhamento bimestral com a escola',
    location: 'Escola Municipal Fictícia',
    category: 'Escola',
    notes: 'Revisar blocos compartilhados na tela Minha Rede.',
  },
];

export const INITIAL_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'dia-1',
    date: 'Hoje',
    period: 'Manhã',
    authorRole: 'Família',
    observation:
      'Usou o cartão de aviso de 5 minutos antes de vestir o uniforme e fez a transição sem choro. Pediu para levar um trem pequeno na mochila.',
    highlight: 'Transição tranquila na saída de casa',
  },
  {
    id: 'dia-2',
    date: 'Ontem',
    period: 'Tarde',
    authorRole: 'Família',
    observation:
      'Participou por 25 minutos da atividade motora na academia inclusiva; quando o som ambiente aumentou, escolheu descansar no colchonete lateral por 5 minutos e depois voltou a brincar.',
    highlight: 'Autorregulação com pausa no colchonete',
  },
  {
    id: 'dia-3',
    date: 'Há 2 dias',
    period: 'Noite',
    authorRole: 'Família',
    observation:
      'Cuidadora sentiu cansaço acumulado no fim do dia; alternar o preparo do jantar com outro familiar ajudou a manter o ritual noturno calmo.',
    highlight: 'Divisão de tarefas entre cuidadores',
  },
];

export const INITIAL_RESOURCES: ServiceResource[] = [
  {
    id: 'res-1',
    name: 'Academia Movimento Acolhedor — Espaço Pais & Filhos',
    category: 'Academia Inclusiva',
    municipality: 'Chapecó',
    description:
      'Academia com horário reservado em ambiente de som reduzido, onde pais e cuidadores treinam enquanto crianças com TEA participam de circuitos motores acompanhados.',
    acceptsChildrenWithCaregivers: true,
    scheduleSummary: 'Seg, Qua e Sex · 15:00 às 17:00',
    curationStatus: 'Aprovado',
  },
  {
    id: 'res-2',
    name: 'Núcleo Comunitário de Escuta Familiar Oeste (Fictício)',
    category: 'Apoio Familiar',
    municipality: 'Chapecó',
    description:
      'Encontros semanais não clínicos voltados ao bem-estar de mães, pais e avós cuidadores, com troca de experiências e orientações sobre rede de direitos.',
    acceptsChildrenWithCaregivers: true,
    scheduleSummary: 'Quintas · 18:30 às 20:00',
    curationStatus: 'Aprovado',
  },
  {
    id: 'res-3',
    name: 'Estúdio Corpo & Calma — Treino Integrado Familiar',
    category: 'Academia Inclusiva',
    municipality: 'Xanxerê',
    description:
      'Espaço físico adaptado com iluminação indireta, sala de descompressão e atividades lúdicas para crianças enquanto cuidadores praticam alongamento e fortalecimento.',
    acceptsChildrenWithCaregivers: true,
    scheduleSummary: 'Ter e Qui · 09:00 às 11:00',
    curationStatus: 'Aprovado',
  },
  {
    id: 'res-4',
    name: 'Centro Interdisciplinar de Fonoaudiologia Comunitária (Fictício)',
    category: 'Fonoaudiologia',
    municipality: 'Chapecó',
    description:
      'Atuação fictícia voltada à comunicação alternativa, parceria com a família e diálogo com escolas da rede municipal.',
    acceptsChildrenWithCaregivers: false,
    scheduleSummary: 'Seg a Sex · horário comercial',
    curationStatus: 'Aprovado',
  },
  {
    id: 'res-5',
    name: 'Espaço Terapia Ocupacional & Cotidiano (Fictício)',
    category: 'Terapia Ocupacional',
    municipality: 'Concórdia',
    description:
      'Apoio fictício à organização de rotinas diárias, habilidades motoras e adaptação sensorial de ambientes domésticos e escolares.',
    acceptsChildrenWithCaregivers: false,
    scheduleSummary: 'Ter a Sex · 08:00 às 17:30',
    curationStatus: 'Aprovado',
  },
  {
    id: 'res-6',
    name: 'Rede de Apoio Educacional Inclusivo (Fictício)',
    category: 'Educação Especial',
    municipality: 'Pinhalzinho',
    description:
      'Oficinas demonstrativas para professores e cuidadores sobre previsibilidade visual e acolhimento escolar.',
    acceptsChildrenWithCaregivers: false,
    scheduleSummary: 'Sábados quinzenais · 09:00',
    curationStatus: 'Aprovado',
  },
  {
    id: 'res-7',
    name: 'Parque Sensorial & Lazer em Família (Fictício)',
    category: 'Lazer Acessível',
    municipality: 'São Miguel do Oeste',
    description:
      'Programação mensal ao ar livre com horários de menor fluxo sonoro para famílias e cuidadores.',
    acceptsChildrenWithCaregivers: true,
    scheduleSummary: '1º sábado do mês · 08:30 às 11:30',
    curationStatus: 'Em revisão',
  },
];

export const INITIAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art-1',
    title: 'Cuidar de quem cuida: reconhecendo sinais cotidianos de cansaço',
    theme: 'Acolhimento ao Cuidador',
    readingMinutes: 4,
    summary:
      'Estratégias práticas para distribuir tarefas na rede de apoio e reservar pequenas pausas sem culpa.',
    body: 'A sobrecarga de familiares raramente vem de um único evento, mas do acúmulo diário de agendamentos, deslocamentos e decisões isoladas. Compartilhar um resumo simples da rotina com outro familiar ou com a escola reduz a necessidade de explicar tudo repetidas vezes. Pequenas pausas de 5 minutos, grupos de escuta não clínica e horários combinados de atividade física ajudam a sustentar o cuidado contínuo.',
    curationStatus: 'Aprovado',
  },
  {
    id: 'art-2',
    title: 'Como montar uma rotina visual simples em casa',
    theme: 'Rotina Visual',
    readingMinutes: 5,
    summary:
      'Uso de ícones claros, horários aproximados e avisos prévios para tornar as transições mais previsíveis.',
    body: 'Uma rotina visual não precisa ser rígida nem complexa. Dividir o dia em três blocos (manhã, tarde e noite) com até 4 passos por bloco facilita a leitura tanto para a criança quanto para familiares e cuidadores que revezam o acompanhamento. O mais importante é combinar sinais tranquilos antes de mudar de atividade.',
    curationStatus: 'Aprovado',
  },
  {
    id: 'art-3',
    title: 'Alinhamento respeitoso entre família, escola e profissionais',
    theme: 'Parceria Escola-Família',
    readingMinutes: 4,
    summary:
      'Por que compartilhar apenas os blocos necessários protege a privacidade e fortalece a colaboração.',
    body: 'Nem toda informação da rotina doméstica precisa ser visível para todos os integrantes da rede. Compartilhar preferências sensoriais e objetivos de apoio com a escola, mantendo anotações íntimas do diário restritas à família, promove colaboração prática com respeito à autonomia familiar.',
    curationStatus: 'Aprovado',
  },
  {
    id: 'art-4',
    title: 'Comunicação acolhedora em ambientes comunitários e academias',
    theme: 'Comunicação',
    readingMinutes: 3,
    summary:
      'Pequenos ajustes ambientais que tornam espaços de exercício físico acessíveis para pais e crianças.',
    body: 'Ambientes com música mais baixa, sinalização clara de espaços de descanso e profissionais informados sobre preferências individuais ampliam a permanência das famílias em atividades físicas comunitárias.',
    curationStatus: 'Em revisão',
  },
];

export const INITIAL_OFFERS: ProfessionalOffer[] = [
  {
    id: 'off-1',
    professionalName: 'Dra. Camila Mendes (Fictícia)',
    specialty: 'Fonoaudiologia Comunitária',
    municipality: 'Chapecó',
    title: 'Oficina de Cartões Visuais para o Dia a Dia Familiar',
    format: 'Oficina prática',
    scheduleText: 'Quartas-feiras · 19:00 (demonstrativo)',
    curationStatus: 'Aprovado',
  },
  {
    id: 'off-2',
    professionalName: 'Prof. Ricardo Tavares (Fictício)',
    specialty: 'Educação Física Inclusiva',
    municipality: 'Chapecó',
    title: 'Vivência Motora Pais, Cuidadores e Crianças',
    format: 'Oficina prática',
    scheduleText: 'Sábados · 09:30 (demonstrativo)',
    curationStatus: 'Aprovado',
  },
  {
    id: 'off-3',
    professionalName: 'Psic. Beatriz Lemos (Fictícia)',
    specialty: 'Apoio Familiar e Escuta',
    municipality: 'Xanxerê',
    title: 'Roda de Escuta Não Clínica para Cuidadores',
    format: 'Roda de escuta não clínica',
    scheduleText: 'Terças-feiras · 18:30 (demonstrativo)',
    curationStatus: 'Em revisão',
  },
];

export const INITIAL_CONTACT_REQUESTS: ContactRequest[] = [
  {
    id: 'req-1',
    targetName: 'Academia Movimento Acolhedor — Espaço Pais & Filhos',
    targetCategory: 'Academia Inclusiva',
    municipality: 'Chapecó',
    senderName: 'Mariana Oliveira (Perfil Fictício)',
    message:
      'Gostaria de saber os horários de menor movimento para visitar o espaço com meu filho de 7 anos.',
    createdAtLabel: 'Hoje, 10:15',
    status: 'Respondida (demonstrativo)',
    replyNote:
      'Olá! Nossas tardes de segunda e quarta às 15h têm som ambiente reduzido e espaço lateral tranquilo. Será um prazer receber vocês.',
  },
];

export const INITIAL_NETWORK_MEMBERS: NetworkMember[] = [
  {
    id: 'net-prof-1',
    name: 'Dra. Camila Mendes (Fictícia)',
    roleLabel: 'Profissional · Fonoaudiologia',
    institution: 'Clínica Escola Fictícia · Chapecó',
    linkedProfile: 'profissional',
    permissions: {
      apresentacao: true,
      rotina: true,
      objetivos: true,
      agenda: true,
      diario: false,
      medicamentos: false,
    },
  },
  {
    id: 'net-esc-1',
    name: 'Prof.ª Helena Souza (Fictícia)',
    roleLabel: 'Escola · Sala de Recursos Multifuncionais',
    institution: 'Escola Municipal Fictícia · Chapecó',
    linkedProfile: 'escola',
    permissions: {
      apresentacao: true,
      rotina: true,
      objetivos: true,
      agenda: false,
      diario: false,
      medicamentos: false,
    },
  },
  {
    id: 'net-fam-1',
    name: 'Carlos Oliveira (Fictício)',
    roleLabel: 'Familiar de apoio · Pai',
    institution: 'Rede familiar',
    linkedProfile: 'apoio-familiar',
    permissions: {
      apresentacao: true,
      rotina: true,
      objetivos: true,
      agenda: true,
      diario: true,
      medicamentos: true,
    },
  },
];

export const INITIAL_MEDICATIONS_STUDY: MedicationStudyItem[] = [
  {
    id: 'med-1',
    name: 'Registro ilustrativo A (nome fictício)',
    scheduleTime: '08:00',
    familyNote: 'Anotação pessoal da família apenas para organização de horário.',
  },
  {
    id: 'med-2',
    name: 'Registro ilustrativo B (nome fictício)',
    scheduleTime: '20:00',
    familyNote: 'Lembrar de conferir orientação diretamente com a equipe de saúde responsável.',
  },
];

export const INITIAL_ACTIVITIES_STUDY: PhysicalActivityStudyItem[] = [
  {
    id: 'act-1',
    activityName: 'Circuito motor compartilhado (cuidador + criança)',
    daysText: 'Segundas e Quartas · 15:30',
    spaceName: 'Academia Movimento Acolhedor',
    sensoryNote: 'Ambiente com som reduzido e opção de pausa em colchonete.',
  },
  {
    id: 'act-2',
    activityName: 'Caminhada leve ao ar livre em parque tranquilo',
    daysText: 'Sábados · 09:00',
    spaceName: 'Parque Municipal (horário calmo)',
    sensoryNote: 'Preferência por trilhas planas com sombra.',
  },
];

export const INITIAL_SLEEP_STUDY: SleepRoutineStudyItem = {
  bedTime: '21:00',
  wakeTime: '07:00',
  eveningRitual:
    '20:00 desligar telas · 20:15 banho morno · 20:35 luz amarela suave e história curta · 21:00 descanso.',
};

export const DAILY_TIP_STUDY = {
  title: 'Dica educativa do dia (curadoria interdisciplinar)',
  text: 'Antes de iniciar uma nova atividade em grupo, apresentar duas imagens simples do que vai acontecer e do momento de pausa ajuda a reduzir incertezas no ambiente.',
  authorNote: 'Conteúdo educativo estático de referência, sem recomendação clínica automática.',
};

export const INITIAL_FAMILY_GROUPS: FamilyGroupLink[] = [
  {
    id: 'grp-1',
    name: 'Grupo de Cuidadores — Chapecó e Região (Fictício)',
    municipality: 'Chapecó',
    meetingFormat: 'Encontros quinzenais presenciais + mural informativo',
    moderationNote: 'Espaço moderado pela curadoria demonstrativa para troca respeitosa entre famílias.',
  },
  {
    id: 'grp-2',
    name: 'Rede de Pais & Esporte Inclusivo Oeste (Fictício)',
    municipality: 'Xanxerê',
    meetingFormat: 'Rodas mensais em espaços de lazer e academias parceiras',
    moderationNote: 'Foco em atividades físicas conjuntas e acolhimento de cuidadores.',
  },
];

export const LISTENING_CIRCLES: ListeningCircle[] = [
  {
    id: 'esc-1',
    title: 'Roda de Escuta "Quem cuida de quem cuida?"',
    facilitator: 'Equipe interdisciplinar demonstrativa (Unochapecó / Hack.Health)',
    dayAndTime: 'Quintas-feiras · 18:30 às 19:45',
    modality: 'Presencial com espaço de apoio lúdico ou encontro online',
    description:
      'Conversa aberta e acolhedora sobre rotina, cansaço do cuidador e divisão de responsabilidades. Não constitui atendimento psicoterápico ou clínico.',
  },
  {
    id: 'esc-2',
    title: 'Café entre Avós, Mães, Pais e Educadores',
    facilitator: 'Comunidade escolar e familiares voluntários (fictício)',
    dayAndTime: 'Sábados quinzenais · 09:30',
    modality: 'Presencial em espaço acessível',
    description:
      'Troca de vivências cotidianas sobre transições escolares, lazer e redes de vizinhança.',
  },
];

export const INITIAL_SCHOOL_NOTES: SchoolNoteItem[] = [
  {
    id: 'esc-note-1',
    date: 'Hoje',
    author: 'Prof.ª Helena Souza (Fictícia)',
    observation:
      'Na sala de recursos, respondeu muito bem ao quadro de sequência com 3 atividades e escolheu o canto de leitura após o recreio.',
  },
];
