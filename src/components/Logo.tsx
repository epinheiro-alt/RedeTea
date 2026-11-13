/**
 * Logotipo vetorial RedE TEA nas cores institucionais (azul, vermelho e amarelo),
 * representando a rede interdisciplinar entre família, profissionais e escola.
 */
export function Logo({compact = false}: {compact?: boolean}) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="36" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
        <path
          d="M11 23L18 11L25 23H11Z"
          stroke="#1D4ED8"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="11" r="3.6" fill="#1D4ED8" />
        <circle cx="11" cy="23.5" r="3.6" fill="#DC2626" />
        <circle cx="25" cy="23.5" r="3.6" fill="#EAB308" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-slate-900">
        RedE <span className="text-blue-700">TEA</span>
      </span>
      {!compact && <span className="sr-only">Rede Especializada de Apoio e Escuta</span>}
    </span>
  );
}
