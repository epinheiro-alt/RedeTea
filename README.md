# RedE TEA — Rede Especializada de Apoio e Escuta/Esclarecimento

> **Protótipo demonstrativo com dados fictícios. Não insira dados reais.**  
> Lema: **“Quem cuida de quem cuida?”**

Aplicativo web protótipo desenvolvido no contexto do **Hack.Health** — Programa de Pós-Graduação em Ciências da Saúde da **Unochapecó**, voltado a reduzir a sobrecarga de familiares e cuidadores de crianças com Transtorno do Espectro Autista (TEA) e organizar informações cotidianas entre **família**, **profissionais** e **escola**.

> **Escopo ético e técnico:** este projeto está em fase de prototipação para revisão científica, técnica e ética. **Não é um serviço clínico em operação**, não diagnostica, não prescreve, não classifica risco e não interpreta dados clínicos.

---

## 1. Funcionalidades Implementadas

### Perfis de acesso demonstrativos (exclusivamente em memória)
1. **Família**: cadastro fictício, ficha de apresentação da criança, objetivos cotidianos de apoio, agenda de compromissos, diário descritivo fictício, rotina visual com texto e ícones e controle de compartilhamento na tela **Minha Rede**.
2. **Profissional**: perfil demonstrativo, publicação de ofertas de apoio, caixa de solicitações de contato enviadas pelas famílias e visualização restrita apenas aos blocos autorizados pela família.
3. **Escola**: painel demonstrativo que exibe **exclusivamente** os blocos autorizados pela família na tela **Minha Rede** (refletindo imediatamente qualquer revogação) e registro de observações escolares fictícias.
4. **Curadoria**: fila demonstrativa de revisão interdisciplinar de cadastros de espaços/serviços, conteúdos da biblioteca educativa e ofertas de profissionais.

### Funcionalidades centrais
- **Painel inicial**: *“Como podemos apoiar você hoje?”* com atalhos adaptados ao perfil ativo.
- **Área “Quem cuida de quem cuida”**: pausa guiada de respiração (respeitando `prefers-reduced-motion`), lembrete pessoal de autocuidado em memória e rodas de escuta não clínica.
- **Rotina visual, agenda e diário**: cartões visuais por período (Manhã, Tarde, Noite) com texto e ícones, marcação de conclusão, agenda filtrável e diário descritivo sem interpretação clínica.
- **Busca de recursos, serviços e Academia Inclusiva**: filtros por categoria e município, destaque para **Academia para pais, cuidadores e crianças** (espaços que acolhem crianças com TEA), estado vazio recuperável e **solicitação demonstrativa de contato**.
- **Biblioteca de conteúdos educativos**: guias em linguagem acessível com filtro por tema.
- **Tela “Minha Rede”**: autorização e revogação demonstrativas por pessoa/instituição e por bloco de informação.

### Funcionalidades em estudo (*Em revisão interdisciplinar*)
Todas identificadas explicitamente como **“Em revisão interdisciplinar”**, sem recomendações clínicas automáticas:
- Registro descritivo de medicamentos e horários (sem sugestão de dose ou interpretação).
- Organização de atividades físicas.
- Suporte de rede de profissionais com sugestão estática de “Dica do dia”.
- Organização de rotinas de sono.
- Diretório demonstrativo de grupos familiares (sem links externos reais).

---

## 2. Arquitetura e Mapa de Telas

A arquitetura detalhada e o mapa completo de telas estão documentados em [`ARCHITECTURE.md`](./ARCHITECTURE.md).

Resumo da estrutura:
- **Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide React + Fontsource (`Plus Jakarta Sans` e `DM Sans` empacotados localmente, sem chamadas de rastreamento externas).
- **Estado**: `src/state/AppStateContext.tsx` mantém 100% dos dados exclusivamente em memória durante a sessão atual, sem banco de dados, sem `localStorage`, sem autenticação real e sem envio a servidores.
- **Separação modular**: `src/types/`, `src/data/`, `src/state/`, `src/components/`, `src/views/` e `src/__tests__/`.

---

## 3. Como Executar Localmente

### Pré-requisitos
- Node.js 20+ e npm.

### Comandos
```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento (porta 3000)
npm run dev

# Verificar tipagem TypeScript
npm run lint

# Executar suíte de testes automatizados (Vitest + Testing Library)
npm test

# Gerar build de produção
npm run build
```

---

## 4. Testes Executados e Resultados

Os testes automatizados foram implementados em `src/__tests__/app.test.tsx` (Vitest + React Testing Library + jsdom) e verificados no ambiente do projeto:

| Verificação | Como foi executada | Resultado observado |
| :--- | :--- | :--- |
| Aviso permanente e painel inicial | Teste automatizado (`npm test`) | Aprovado |
| Navegação entre os 4 perfis (Família, Profissional, Escola, Curadoria) | Teste automatizado (`npm test`) | Aprovado |
| Cadastro fictício e mensagens de erro de validação | Teste automatizado (`npm test`) | Aprovado |
| Rotina visual, agenda de compromissos e diário fictício | Teste automatizado (`npm test`) | Aprovado |
| Busca/filtros por categoria e município, estado vazio e contato demonstrativo | Teste automatizado (`npm test`) | Aprovado |
| Compartilhamento por bloco e revogação imediata na tela Minha Rede (reflexo no perfil Escola) | Teste automatizado (`npm test`) | Aprovado |
| Seções “Em revisão interdisciplinar”, skip link de teclado e fechamento de modal via `Escape` | Teste automatizado (`npm test`) | Aprovado |
| Checagem de tipos TypeScript (`npm run lint`) | Execução de `tsc --noEmit` | Aprovado após ajustes finais |
| Build de produção (`npm run build`) | Execução de `vite build` | Aprovado após ajustes finais |

**Observação transparente:** testes com leitores de tela físicos (NVDA/VoiceOver) e inspeção manual em aparelhos móveis físicos externos não foram executados neste ambiente automatizado e permanecem recomendados na etapa de avaliação interdisciplinar com usuários.

---

## 5. Limitações do Protótipo

1. **Dados voláteis em memória**: ao recarregar a página, todas as alterações retornam ao conjunto fictício inicial (`src/data/mockData.ts`).
2. **Controle de acesso simulado**: a alternância entre perfis e a matriz de permissões da tela *Minha Rede* demonstram o fluxo conceitual sem autenticação criptográfica ou segurança operacional.
3. **Sem integração clínica ou externa**: não há prontuário, diagnóstico, prescrição, pagamento, contratação de serviços ou envio de mensagens reais.

---

## 6. Sincronização com GitHub e Implantação na Vercel

### Sincronizar com o GitHub
1. Crie um repositório vazio no GitHub (ex.: `rede-tea-prototipo`).
2. No diretório raiz do projeto, execute:
   ```bash
   git init
   git add .
   git commit -m "Prototipo navegavel RedE TEA - Hack.Health Unochapeco"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/rede-tea-prototipo.git
   git push -u origin main
   ```

### Implantar na Vercel
1. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
2. Importe o repositório `rede-tea-prototipo` conectado ao seu GitHub.
3. Confirme as configurações detectadas automaticamente para **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Não é necessário configurar variáveis de ambiente (o protótipo não utiliza chaves de API, banco de dados ou serviços externos).
5. Clique em **Deploy**. A cada novo `git push` na branch `main`, a Vercel publicará uma nova versão automaticamente.
