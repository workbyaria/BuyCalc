import React from 'react';

const R = 54;
const C = 2 * Math.PI * R;

export default function ProgressRing({ percent, label, sublabel, className = '' }) {
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  const offset = C * (1 - p / 100);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: R * 2 + 36, height: R * 2 + 36 }}>
        <svg width={R * 2 + 36} height={R * 2 + 36} className="-rotate-90">
          <circle
            cx={(R * 2 + 36) / 2}
            cy={(R * 2 + 36) / 2}
            r={R}
            fill="none"
            stroke="var(--ring-track)"
            strokeWidth="10"
          />
          <circle
            cx={(R * 2 + 36) / 2}
            cy={(R * 2 + 36) / 2}
            r={R}
            fill="none"
            stroke="var(--ring-fill)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tabular-nums text-[var(--color-text)]">{label}</span>
          {sublabel && <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">{sublabel}</span>}
        </div>
      </div>
    </div>
  );
}
