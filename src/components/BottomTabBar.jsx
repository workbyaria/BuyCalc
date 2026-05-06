import React from 'react';

function IconCalc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="3" width="7" height="8" rx="1.5" />
      <rect x="13" y="3" width="7" height="5" rx="1.5" />
      <rect x="13" y="11" width="7" height="10" rx="1.5" />
      <rect x="4" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconBudget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="17" cy="14" r="1.5" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20a6 6 0 0112 0" />
    </svg>
  );
}

export default function BottomTabBar({ active, onChange, labels }) {
  const items = [
    { id: 'calc', Icon: IconCalc, label: labels.calc },
    { id: 'budget', Icon: IconBudget, label: labels.budget },
    { id: 'profile', Icon: IconProfile, label: labels.profile },
  ];

  return (
    <nav
      className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-2 shadow-[var(--glass-shadow)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]"
      aria-label="Main"
    >
      {items.map(({ id, Icon, label }) => {
        const isOn = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={
              'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-150 ' +
              (isOn
                ? 'bg-[var(--tab-active-bg)] text-[var(--color-text)] shadow-[0_1px_6px_rgba(0,0,0,0.07)]'
                : 'text-[var(--color-subtext)] hover:text-[var(--color-text)] active:scale-[0.95]')
            }
          >
            <Icon />
            <span className="truncate">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
