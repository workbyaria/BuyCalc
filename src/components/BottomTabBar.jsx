import React from 'react';

function IconIsland({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
      {/* island platform */}
      <ellipse cx="12" cy="17" rx="9"   ry="3.5" fill="#5caf50"   opacity="0.9" />
      <ellipse cx="12" cy="18" rx="8.5" ry="2.5" fill="#3d9432"   opacity="0.7" />
      {/* trunk */}
      <rect x="11" y="10" width="2" height="7" rx="1" fill="#2d8a42" />
      {/* canopy */}
      <circle cx="12" cy="8"  r="4.5" fill="#5caf50" />
      <circle cx="12" cy="6.5" r="3.2" fill="#7dcf6e" />
      {/* tiny flower */}
      <circle cx="10.5" cy="7"  r="1.1" fill="white" opacity="0.9" />
      <circle cx="10.5" cy="7"  r="0.5" fill="#ffd700" />
    </svg>
  );
}

function IconCalc({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="7" height="8" rx="2" />
      <rect x="13" y="3" width="7" height="5" rx="2" />
      <rect x="13" y="11" width="7" height="10" rx="2" />
      <rect x="4" y="14" width="7" height="7" rx="2" />
    </svg>
  );
}

function IconBudget({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <circle cx="17" cy="15" r="1.5" />
      <path d="M7 15h4" />
    </svg>
  );
}

function IconProfile({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20a6 6 0 0112 0" />
    </svg>
  );
}

export default function BottomTabBar({ active, onChange, labels }) {
  const items = [
    { id: 'island',  Icon: IconIsland,  label: labels.island  },
    { id: 'calc',    Icon: IconCalc,    label: labels.calc    },
    { id: 'budget',  Icon: IconBudget,  label: labels.budget  },
    { id: 'profile', Icon: IconProfile, label: labels.profile },
  ];

  return (
    <nav
      className="flex items-center justify-around rounded-[30px] bg-white px-2 py-2 shadow-[0_4px_32px_rgba(0,0,0,0.14),0_1px_8px_rgba(0,0,0,0.06)]"
      aria-label="Main"
    >
      {items.map(({ id, Icon, label }) => {
        const isOn = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-current={isOn ? 'page' : undefined}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1 transition-all duration-200 active:scale-[0.92]"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                isOn ? 'bg-[#5caf50] shadow-[0_3px_14px_rgba(92,175,80,0.40)]' : ''
              }`}
            >
              <Icon
                className={`h-[20px] w-[20px] transition-colors ${
                  isOn ? 'text-white' : 'text-[#a8c4d4]'
                }`}
              />
            </div>
            <span
              className={`text-[9px] font-bold uppercase tracking-[0.10em] transition-colors ${
                isOn ? 'text-[#5caf50]' : 'text-[#a8c4d4]'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
