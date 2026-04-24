import React from 'react';

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

function IconShopping({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M6 8h15l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </svg>
  );
}

function IconClothes({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4.5 13 L6.5 11 L9 9.5 Q12 7.5 15 9.5 L17.5 11 L19.5 13 V20.5 H4.5 V13 Z" />
    </svg>
  );
}

function IconTravel({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9L3 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function IconSelfCare({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3z" />
    </svg>
  );
}

function IconHousing({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

function IconTransport({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M3 17 H21" />
      <path d="M3 17 L5.5 12 Q12 8.5 18.5 12 L21 17" />
      <circle cx="7.5" cy="17" r="1.35" />
      <circle cx="16.5" cy="17" r="1.35" />
    </svg>
  );
}

function IconSubscriptions({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 7h4M10 11h4M10 15h2" />
    </svg>
  );
}

function IconBills({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M7 3h10v18l-2-1.5L13 21l-2-1.5L9 21l-2-1.5V3z" />
      <path d="M10 8h4M10 12h4M10 16h3" />
    </svg>
  );
}

const CATEGORIES = [
  { id: 'shopping', Icon: IconShopping, labelKey: 'quickCatShopping' },
  { id: 'clothes', Icon: IconClothes, labelKey: 'quickCatClothes' },
  { id: 'travel', Icon: IconTravel, labelKey: 'quickCatTravel' },
  { id: 'selfCare', Icon: IconSelfCare, labelKey: 'quickCatSelfCare' },
  { id: 'housing', Icon: IconHousing, labelKey: 'quickCatHousing' },
  { id: 'transport', Icon: IconTransport, labelKey: 'quickCatTransport' },
  { id: 'subscriptions', Icon: IconSubscriptions, labelKey: 'quickCatSubscriptions' },
  { id: 'bills', Icon: IconBills, labelKey: 'quickCatBills' },
];

export default function ItemCategoryQuickPick({ t, itemName, onPick }) {
  return (
    <div className="mt-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">{t.calcQuickPickHint}</p>
      <div className="grid grid-cols-4 gap-2">
        {CATEGORIES.map(({ id, Icon, labelKey }) => {
          const label = t[labelKey];
          const selected = itemName === label;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onPick(label)}
              className={
                'flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 py-2 text-center transition-colors ' +
                (selected
                  ? 'border-[var(--btn-primary-border)] bg-[var(--pill-active)] text-[var(--color-text)] shadow-sm'
                  : 'border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--color-text)] hover:border-[var(--glass-border)]')
              }
              aria-pressed={selected}
              aria-label={label}
            >
              <Icon className="h-6 w-6 shrink-0 text-[var(--color-text)] opacity-90" />
              <span className="line-clamp-2 w-full px-0.5 text-[9px] font-semibold leading-tight text-[var(--color-text)]">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
