# Arquitetura e Mapa de Telas — RedE TEA

> **Protótipo demonstrativo com dados fictícios. Não insira dados reais.**  
> Projeto vinculado ao **Hack.Health** — Programa de Pós-Graduação em Ciências da Saúde da **Unochapecó**.

## 1. Mapa de Telas e Fluxos de Navegação

```
Camada Global Persistente
├── Faixa permanente de aviso ("Protótipo demonstrativo com dados fictícios. Não insira dados reais.")
├── Barra superior (Logotipo RedE TEA · Navegação principal · Seletor de Perfil Ativo)
└── Barra inferior móvel (acesso ergonômico para polegar, >= 44px)

Perfis Demonstrativos (estado em memória)
├── [1] Família
│   ├── Início ("Como podemos apoiar você hoje?")
│   ├── Quem Cuida de Quem Cuida (acolhimento, pausa guiada e escuta não clínica)
│   ├── Cadastro & Criança (cadastro fictício, apresentação sensorial/comunicação, objetivos de apoio)
│   ├── Rotina, Agenda & Diário (rotina visual com ícones, agenda, registros cotidianos fictícios)
│   ├── Recursos, Serviços & Academia (busca por categoria/município, academia inclusiva, contato)
│   ├── Biblioteca Educativa (guias e artigos validados pela curadoria)
│   ├── Minha Rede (autorização e revogação granular por pessoa/instituição e bloco)
│   └── Em Estudo (funcionalidades marcadas "Em revisão interdisciplinar")
│
├── [2] Profissional
│   ├── Painel Profissional (resumo de atuação, blocos autorizados pela família, solicitações recebidas)
│   ├── Ofertas de Apoio (criação/edição demonstrativa de oficinas e escuta)
│   ├── Recursos & Biblioteca (visualização do diretório regional)
│   └── Acolhimento & Em Estudo
│
├── [3] Escola
│   ├── Painel Escolar (visualização estritamente limitada aos blocos autorizados pela família)
│   ├── Registro Escolar Fictício (observações cotidianas do ambiente escolar)
│   └── Biblioteca Educativa
│
└── [4] Curadoria
    ├── Painel de Curadoria (revisão interdisciplinar fictícia de cadastros, conteúdos e ofertas)
    └── Biblioteca & Diretório (conferência do catálogo publicado)
```

## 2. Matriz de Permissões Demonstrativas por Bloco ("Minha Rede")

Na tela **Minha Rede**, o perfil **Família** controla a visibilidade de seis blocos independentes para cada integrante conectado (ex.: *Profissional — Fonoaudióloga Fictícia*, *Escola Municipal Fictícia*, *Familiar de Apoio Fictício*):

| Bloco de Informação | Família | Profissional (se autorizado) | Escola (se autorizado) |
| :--- | :---: | :---: | :---: |
| Apresentação da criança | Edição completa | Leitura | Leitura |
| Rotina visual | Edição completa | Leitura | Leitura |
| Objetivos de apoio | Edição completa | Leitura | Leitura |
| Agenda de compromissos | Edição completa | Leitura | Leitura |
| Diário cotidiano | Edição completa | Leitura | Não compartilhado por padrão |
| Medicações em estudo | Edição completa | Leitura (sem sugestão de dose) | Não compartilhado por padrão |

A revogação ou autorização reflete **imediatamente** na sessão em memória ao alternar para os perfis **Profissional** ou **Escola**.

## 3. Arquitetura de Software (Frontend-Only em Memória)

```
src/
├── types/
│   └── domain.ts              # Contratos TypeScript de perfis, blocos, agenda, diário, recursos e curadoria
├── data/
│   └── mockData.ts            # Base inicial 100% fictícia (sem dados reais ou identificadores pessoais reais)
├── state/
│   └── AppStateContext.tsx    # Estado global em memória (React Context + ações puras; zero localStorage/API)
├── components/
│   ├── Logo.tsx               # Logotipo vetorial RedE TEA (azul, vermelho e amarelo)
│   ├── PermanentNotice.tsx    # Aviso permanente obrigatório de protótipo
│   ├── AppShell.tsx           # Navegação responsiva (sidebar desktop + bottom bar mobile) e seletor de perfil
│   ├── ContactRequestModal.tsx# Fluxo acessível de solicitação demonstrativa de contato
│   └── EmptyState.tsx         # Estado vazio padronizado com ação de retorno
├── views/
│   ├── HomeView.tsx           # "Como podemos apoiar você hoje?" adaptado ao perfil ativo
│   ├── CaregiverSupportView.tsx # "Quem cuida de quem cuida" (acolhimento e escuta não clínica)
│   ├── ChildProfileView.tsx   # Cadastro fictício, apresentação da criança e objetivos de apoio
│   ├── RoutineAgendaDiaryView.tsx # Rotina visual, agenda de compromissos e diário descritivo
│   ├── ResourcesView.tsx      # Busca por categoria/município + Academia para pais, cuidadores e crianças
│   ├── LibraryView.tsx        # Biblioteca de conteúdos educativos
│   ├── MyNetworkView.tsx      # Autorização e revogação demonstrativas por pessoa e bloco
│   ├── StudyFeaturesView.tsx  # Seções "Em revisão interdisciplinar" sem recomendações clínicas
│   ├── ProfessionalView.tsx   # Visão do perfil Profissional
│   ├── SchoolView.tsx         # Visão do perfil Escola (acesso condicionado às permissões)
│   └── CurationView.tsx       # Revisão fictícia de cadastros, conteúdos e ofertas
└── __tests__/
    └── app.test.tsx           # Suíte Vitest + React Testing Library
```

## 4. Princípios Éticos, Acessibilidade (WCAG 2.2 AA) e Privacidade

- **Sem backend, banco de dados ou rastreadores**: Nenhum dado sai do navegador; não há `localStorage`, cookies, analytics, chamadas de IA ou serviços externos de terceiros.
- **Não-clínico por concepção**: Proibição estrutural de diagnósticos, prescrições, escores de risco, alertas automáticos ou interpretações de sintomas.
- **WCAG 2.2 AA**: Contraste mínimo de 4,5:1, foco visível (`:focus-visible`), alvos de toque $\ge 44 \times 44\text{px}$, rótulos explícitos em formulários, `aria-live` para mensagens de feedback/erro e suporte a `prefers-reduced-motion`.
