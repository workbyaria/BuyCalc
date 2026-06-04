import React from 'react';

/* ── Colourful category icons ─────────────────────────────── */

function IconShopping() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* handle */}
      <path d="M9 11V8a3 3 0 116 0v3" stroke="#d44d8e" strokeWidth="2" strokeLinecap="round" />
      {/* bag body */}
      <rect x="4" y="11" width="16" height="10" rx="3" fill="#ff8fc8" />
      {/* top stripe */}
      <rect x="4" y="11" width="16" height="3.5" rx="3" fill="#f06ba4" />
      {/* shine */}
      <circle cx="14.5" cy="16" r="1.1" fill="white" opacity="0.55" />
      <circle cx="17"   cy="14" r="0.7" fill="white" opacity="0.35" />
    </svg>
  );
}

function IconClothes() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* shirt body */}
      <path d="M5 13L7 11L9.5 9.5C10.5 8.8 13.5 8.8 14.5 9.5L17 11L19 13V21H5V13Z" fill="#7ec8e3" />
      {/* collar */}
      <path d="M9.5 9.5C10.5 8.8 13.5 8.8 14.5 9.5L13.5 11.5C12.8 10.5 11.2 10.5 10.5 11.5Z" fill="#5da8e8" />
      {/* sleeve shading */}
      <path d="M5 13L7 11L8.5 13L7 14Z"  fill="#5da8e8" />
      <path d="M19 13L17 11L15.5 13L17 14Z" fill="#5da8e8" />
      {/* shine */}
      <circle cx="15" cy="16.5" r="1.1" fill="white" opacity="0.45" />
    </svg>
  );
}

function IconTravel() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* fuselage */}
      <ellipse cx="12" cy="12" rx="2.4" ry="8.5" fill="#60b4da" />
      {/* wings */}
      <path d="M3.5 14.5L12 11L20.5 14.5V16.5L12 13L3.5 16.5Z" fill="#87ceeb" />
      {/* tail fins */}
      <path d="M8 19.5L12 17.5L16 19.5V21L12 19L8 21Z" fill="#87ceeb" />
      {/* nose */}
      <ellipse cx="12" cy="5" rx="1.8" ry="2.2" fill="#c8e8fb" />
      {/* window */}
      <circle cx="12" cy="9.5" r="1.1" fill="white" opacity="0.75" />
    </svg>
  );
}

function IconSelfCare() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* outer star */}
      <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="#c77dff" />
      {/* inner gold star */}
      <path d="M12 6.5L13.2 10.5L17.2 11L13.2 12L12 16L10.8 12L6.8 11L10.8 10.5L12 6.5Z" fill="#ffd700" />
      {/* tiny accent stars */}
      <circle cx="19.5" cy="5.5" r="1.3" fill="#f5a6ff" />
      <circle cx="4.5"  cy="18"  r="1.0" fill="#ffd700" />
      <circle cx="20"   cy="17"  r="0.8" fill="#c77dff" />
    </svg>
  );
}

function IconHousing() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* roof */}
      <path d="M2.5 12L12 4L21.5 12H19V20.5H5V12H2.5Z" fill="#ff6b6b" />
      <path d="M12 4L21.5 12H19L12 6.5L5 12H2.5L12 4Z" fill="#e55" />
      {/* walls */}
      <rect x="5" y="12" width="14" height="8.5" rx="1" fill="#ffaa7a" />
      {/* door */}
      <rect x="9.8" y="16" width="4.4" height="4.5" rx="1.2" fill="#8B5E3C" />
      <circle cx="13.5" cy="18.3" r="0.55" fill="#ffd700" />
      {/* window */}
      <rect x="6.5" y="13.5" width="3.8" height="3.2" rx="0.8" fill="#87ceeb" />
      <path d="M8.4 13.5V16.7M6.5 15.1H10.3" stroke="white" strokeWidth="0.7" opacity="0.6" />
      {/* chimney */}
      <rect x="15" y="6.5" width="2.5" height="5" rx="0.8" fill="#cc4444" />
      {/* smoke puff */}
      <circle cx="16.2" cy="5.5" r="1.2" fill="#e0e0e0" opacity="0.7" />
      <circle cx="17.5" cy="4.5" r="0.9" fill="#e0e0e0" opacity="0.5" />
    </svg>
  );
}

function IconTransport() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* car body */}
      <path d="M2 15H22V17.5C22 18.6 21.1 19.5 20 19.5H4C2.9 19.5 2 18.6 2 17.5V15Z" fill="#e84444" />
      {/* car cabin */}
      <path d="M5.5 15L7.5 10.5C7.9 9.5 9 9 10 9H14C15 9 16.1 9.5 16.5 10.5L18.5 15Z" fill="#ff6666" />
      {/* windshield */}
      <path d="M8 15L9.5 11.2C9.8 10.4 10.5 10 11.5 10H12.5C13.5 10 14.2 10.4 14.5 11.2L16 15Z" fill="#b8e0f7" opacity="0.92" />
      {/* side windows */}
      <path d="M5.5 15L7 11.5L8.3 15Z"  fill="#b8e0f7" opacity="0.6" />
      <path d="M18.5 15L17 11.5L15.7 15Z" fill="#b8e0f7" opacity="0.6" />
      {/* wheels */}
      <circle cx="7"  cy="19.5" r="2.5" fill="#2d2d2d" />
      <circle cx="7"  cy="19.5" r="1.1" fill="#888" />
      <circle cx="17" cy="19.5" r="2.5" fill="#2d2d2d" />
      <circle cx="17" cy="19.5" r="1.1" fill="#888" />
      {/* headlight */}
      <rect x="20" y="15" width="2.2" height="1.4" rx="0.7" fill="#ffe566" />
      {/* tail light */}
      <rect x="1.8" y="15" width="2.2" height="1.4" rx="0.7" fill="#ff6666" />
      {/* hood stripe */}
      <path d="M4 15.8H20" stroke="#c83232" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

function IconSubscriptions() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* phone body */}
      <rect x="6" y="2" width="12" height="20" rx="3" fill="#9b59b6" />
      {/* screen bezel */}
      <rect x="7.2" y="3.8" width="9.6" height="14.4" rx="1.5" fill="#c39bd3" />
      {/* app icons 2x2 */}
      <rect x="8.8"  y="5.4"  width="3" height="3" rx="0.8" fill="#e74c3c" />
      <rect x="12.8" y="5.4"  width="3" height="3" rx="0.8" fill="#3498db" />
      <rect x="8.8"  y="9.4"  width="3" height="3" rx="0.8" fill="#2ecc71" />
      <rect x="12.8" y="9.4"  width="3" height="3" rx="0.8" fill="#f39c12" />
      {/* play icons on app tiles */}
      <path d="M10 6.6L11.5 7.4L10 8.2Z" fill="white" opacity="0.8" />
      <path d="M14 6.6L15.5 7.4L14 8.2Z" fill="white" opacity="0.8" />
      {/* home button */}
      <circle cx="12" cy="20.5" r="1.1" fill="#7d3c98" />
      <circle cx="12" cy="20.5" r="0.5" fill="#c39bd3" />
    </svg>
  );
}

function IconBills() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* receipt body */}
      <path d="M7 3H17V21.5L15.2 20L13 22L11 20L8.8 22L7 20.5V3Z" fill="#2ecc71" />
      {/* top header stripe */}
      <path d="M7 3H17V6.5H7Z" fill="#27ae60" />
      {/* coin/dollar circle */}
      <circle cx="12" cy="9.5" r="2.8" fill="#ffd700" />
      <circle cx="12" cy="9.5" r="2"   fill="#f1c40f" />
      {/* $ symbol — two short horizontal bars + vertical line */}
      <path d="M12 7.8V11.2M10.5 8.8H13.5M10.5 10.2H13.5" stroke="#b8860b" strokeWidth="1" strokeLinecap="round" />
      {/* line items */}
      <rect x="9"  y="13.5" width="6"   height="1.1" rx="0.5" fill="white" opacity="0.65" />
      <rect x="9"  y="15.5" width="6"   height="1.1" rx="0.5" fill="white" opacity="0.65" />
      <rect x="9"  y="17.5" width="4.5" height="1.1" rx="0.5" fill="white" opacity="0.65" />
    </svg>
  );
}

/* ── Category data ────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'shopping',      Icon: IconShopping,      labelKey: 'quickCatShopping'      },
  { id: 'clothes',       Icon: IconClothes,        labelKey: 'quickCatClothes'       },
  { id: 'travel',        Icon: IconTravel,         labelKey: 'quickCatTravel'        },
  { id: 'selfCare',      Icon: IconSelfCare,       labelKey: 'quickCatSelfCare'      },
  { id: 'housing',       Icon: IconHousing,        labelKey: 'quickCatHousing'       },
  { id: 'transport',     Icon: IconTransport,      labelKey: 'quickCatTransport'     },
  { id: 'subscriptions', Icon: IconSubscriptions,  labelKey: 'quickCatSubscriptions' },
  { id: 'bills',         Icon: IconBills,          labelKey: 'quickCatBills'         },
];

export default function ItemCategoryQuickPick({ t, itemName, onPick }) {
  return (
    <div className="mt-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">
        {t.calcQuickPickHint}
      </p>
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
                'flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 py-2 text-center transition-all duration-150 active:scale-[0.93] ' +
                (selected
                  ? 'border-[var(--btn-primary-border)] bg-[var(--pill-active)] shadow-sm scale-[1.05]'
                  : 'border-[var(--input-border)] bg-[var(--input-bg)] hover:border-[var(--glass-border)] hover:bg-[var(--glass-bg)]')
              }
              aria-pressed={selected}
              aria-label={label}
            >
              <Icon />
              <span className="line-clamp-2 w-full px-0.5 text-[9px] font-semibold leading-tight text-[var(--color-text)]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
