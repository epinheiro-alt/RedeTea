import React, {useState} from 'react';
import {
  BookOpen,
  CalendarDays,
  Compass,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Home,
  Menu,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {useAppState} from '../state/AppStateContext';
import type {AppRoute, UserRole} from '../types/domain';
import {Logo} from './Logo';
import {PermanentNotice} from './PermanentNotice';

interface NavItem {
  route: AppRoute;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}

const ROLE_META: Record<UserRole, {label: string; subtitle: string}> = {
  familia: {label: 'Família', subtitle: 'Cuidador(a) e criança'},
  profissional: {label: 'Profissional', subtitle: 'Apoio interdisciplinar'},
  escola: {label: 'Escola', subtitle: 'Acesso autorizado'},
  curadoria: {label: 'Curadoria', subtitle: 'Revisão de conteúdos'},
};

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  familia: [
    {route: 'inicio', label: 'Painel inicial', shortLabel: 'Início', icon: Home},
    {route: 'acolhimento', label: 'Quem cuida de quem cuida', shortLabel: 'Cuidar', icon: HeartHandshake},
    {route: 'cadastro', label: 'Cadastro e criança', shortLabel: 'Criança', icon: UserCheck},
    {route: 'rotina-agenda', label: 'Rotina, agenda e diário', shortLabel: 'Rotina', icon: CalendarDays},
    {route: 'recursos', label: 'Recursos e academia', shortLabel: 'Recursos', icon: Compass},
    {route: 'biblioteca', label: 'Biblioteca educativa', shortLabel: 'Biblioteca', icon: BookOpen},
    {route: 'minha-rede', label: 'Minha Rede', shortLabel: 'Rede', icon: Users},
    {route: 'em-estudo', label: 'Em estudo', shortLabel: 'Estudo', icon: FlaskConical},
  ],
  profissional: [
    {route: 'profissional', label: 'Painel profissional', shortLabel: 'Painel', icon: Stethoscope},
    {route: 'inicio', label: 'Visão geral', shortLabel: 'Início', icon: Home},
    {route: 'recursos', label: 'Diretório e academia', shortLabel: 'Recursos', icon: Compass},
    {route: 'biblioteca', label: 'Biblioteca educativa', shortLabel: 'Biblioteca', icon: BookOpen},
    {route: 'acolhimento', label: 'Quem cuida de quem cuida', shortLabel: 'Acolher', icon: HeartHandshake},
    {route: 'em-estudo', label: 'Em estudo', shortLabel: 'Estudo', icon: FlaskConical},
  ],
  escola: [
    {route: 'escola', label: 'Painel escolar', shortLabel: 'Escola', icon: GraduationCap},
    {route: 'inicio', label: 'Visão geral', shortLabel: 'Início', icon: Home},
    {route: 'biblioteca', label: 'Biblioteca educativa', shortLabel: 'Biblioteca', icon: BookOpen},
    {route: 'acolhimento', label: 'Quem cuida de quem cuida', shortLabel: 'Acolher', icon: HeartHandshake},
  ],
  curadoria: [
    {route: 'curadoria', label: 'Painel de curadoria', shortLabel: 'Curadoria', icon: ShieldCheck},
    {route: 'inicio', label: 'Visão geral', shortLabel: 'Início', icon: Home},
    {route: 'recursos', label: 'Recursos e academia', shortLabel: 'Recursos', icon: Compass},
    {route: 'biblioteca', label: 'Biblioteca educativa', shortLabel: 'Biblioteca', icon: BookOpen},
  ],
};

export function AppShell({children}: {children: React.ReactNode}) {
  const {role, setRole, route, setRoute} = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = NAV_BY_ROLE[role];
  const mobilePrimaryTabs = navItems.slice(0, 4);

  const handleSelectRole = (nextRole: UserRole) => {
    setRole(nextRole);
    setMobileMenuOpen(false);
  };

  const handleNavigate = (nextRoute: AppRoute) => {
    setRoute(nextRoute);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-blue-700 focus:text-white focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>

      <div className="sticky top-0 z-40">
        <PermanentNotice />
      </div>

      {/* Top Bar respeitando contrato de 3 zonas */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => handleNavigate(role === 'familia' ? 'inicio' : role)}
            className="min-h-[44px] flex items-center rounded-xl focus-visible:outline-2 focus-visible:outline-blue-700"
            aria-label="RedE TEA — Ir para o início do perfil ativo"
          >
            <Logo />
          </button>

          <nav aria-label="Navegação rápida" className="hidden lg:flex items-center gap-6">
            {navItems.slice(0, 5).map((item) => {
              const active = route === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavigate(item.route)}
                  aria-current={active ? 'page' : undefined}
                  className={`min-h-[44px] text-sm font-medium whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                    active
                      ? 'text-blue-700 border-blue-700'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate('acolhimento')}
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              Escuta e Apoio
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Fechar menu e perfis' : 'Abrir menu e perfis'}
              className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Seletor de Perfis Demonstrativos */}
      <section
        aria-label="Seletor de perfil demonstrativo"
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-900">Perfil ativo:</span>{' '}
            <span>{ROLE_META[role].label}</span>
            <span aria-hidden="true"> · </span>
            <span>{ROLE_META[role].subtitle}</span>
          </div>

          <div
            role="group"
            aria-label="Alternar perfil de acesso demonstrativo"
            className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl"
          >
            {(Object.keys(ROLE_META) as UserRole[]).map((profileKey) => {
              const selected = role === profileKey;
              return (
                <button
                  key={profileKey}
                  type="button"
                  onClick={() => handleSelectRole(profileKey)}
                  aria-pressed={selected}
                  className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    selected
                      ? 'bg-white text-blue-800 shadow-xs font-semibold'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {ROLE_META[profileKey].label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gaveta mobile completa */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-white border-b border-slate-200 px-4 py-4"
        >
          <p className="text-xs font-semibold text-slate-500 mb-2">
            Navegação do perfil {ROLE_META[role].label}
          </p>
          <nav aria-label="Menu completo móvel" className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = route === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavigate(item.route)}
                  aria-current={active ? 'page' : undefined}
                  className={`min-h-[44px] px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium text-left transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Área principal responsiva (Sidebar desktop + Conteúdo) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-10 flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0" aria-label="Navegação lateral do perfil">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-5">
            <div>
              <p className="font-display text-sm font-bold text-slate-900">
                Quem cuida de quem cuida?
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Rede interdisciplinar demonstrativa — Hack.Health Unochapecó.
              </p>
            </div>

            <nav aria-label="Menu principal lateral" className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = route === item.route;
                return (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => handleNavigate(item.route)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm text-left transition-colors ${
                      active
                        ? 'bg-blue-700 text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-semibold text-slate-900">Escopo ético e técnico</p>
              <p>
                Sem diagnósticos, sem prescrições e sem envio de dados a servidores.
              </p>
            </div>
          </div>
        </aside>

        <main id="main-content" className="flex-1 min-w-0 focus:outline-none" tabIndex={-1}>
          {children}
        </main>
      </div>

      {/* Rodapé discreto desktop */}
      <footer className="hidden lg:block bg-white border-t border-slate-200 py-5 px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <p>
            RedE TEA — Rede Especializada de Apoio e Escuta/Esclarecimento · Lema: “Quem cuida de quem cuida?”
          </p>
          <p>
            Hack.Health · Programa de Pós-Graduação em Ciências da Saúde — Unochapecó · Dados 100% fictícios em memória
          </p>
        </div>
      </footer>

      {/* Navegação móvel fixa inferior (compacta para respeitar limite de 15% da viewport) */}
      <nav
        aria-label="Navegação inferior móvel"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200"
      >
        <div className="grid grid-cols-4 h-14">
          {mobilePrimaryTabs.map((item) => {
            const Icon = item.icon;
            const active = route === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNavigate(item.route)}
                aria-current={active ? 'page' : undefined}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-medium transition-colors ${
                  active ? 'text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-full">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
