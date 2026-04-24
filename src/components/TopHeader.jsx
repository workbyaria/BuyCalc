import React, { useEffect, useState } from 'react';

const IconBell = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 內嵌圖示：public 若無 logo 檔時仍顯示 */
function LogoFallback({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="3" width="6" height="8" rx="1.2" />
      <rect x="13" y="3" width="6" height="5" rx="1.2" />
      <rect x="13" y="11" width="6" height="10" rx="1.2" />
      <rect x="5" y="14" width="6" height="7" rx="1.2" />
    </svg>
  );
}

export default function TopHeader({ title, bellAriaLabel, onBell, logoSrc }) {
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    setLogoFailed(false);
  }, [logoSrc]);

  return (
    <header className="flex items-center justify-between gap-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-sm backdrop-blur-md">
          {!logoFailed && logoSrc ? (
            <img
              src={logoSrc}
              alt="BuyCalc"
              className="h-full w-full object-contain p-1"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <LogoFallback className="h-6 w-6 text-[var(--color-text)]" />
          )}
        </div>
        <span className="truncate text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-text)]">{title}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onBell}
          className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2 text-[var(--color-text)] shadow-sm backdrop-blur-md transition-colors hover:opacity-90"
          aria-label={bellAriaLabel}
        >
          <IconBell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
