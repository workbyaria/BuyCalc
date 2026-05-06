import React from 'react';

export default function ReflectionSelector({
  t,
  purchaseIntent,
  onPurchaseIntent,
  needOrWant,
  onNeedOrWant,
  frequency,
  onFrequency,
  rating,
  onRating,
}) {
  const freqs = [
    { id: 'daily', label: t.freqDaily },
    { id: 'weekly', label: t.freqWeekly },
    { id: 'rarely', label: t.freqRarely },
  ];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold leading-snug text-[var(--color-text)]">{t.reflectionPurchaseDecision}</p>

        <div
          className="mt-3 flex rounded-full border border-[var(--input-border)] bg-[var(--input-bg)] p-1"
          role="group"
          aria-label={t.reflectionPurchaseDecision}
        >
          <button
            type="button"
            onClick={() => onPurchaseIntent('buy')}
            className={
              'min-w-0 flex-1 rounded-full py-2.5 text-center text-[11px] font-bold uppercase tracking-wide transition-all duration-150 ' +
              (purchaseIntent === 'buy'
                ? 'bg-[var(--btn-primary)] text-[var(--btn-primary-text)] shadow-sm'
                : 'text-[var(--color-subtext)] hover:text-[var(--color-text)]')
            }
          >
            {t.intentBuy}
          </button>
          <button
            type="button"
            onClick={() => onPurchaseIntent('save_later')}
            className={
              'min-w-0 flex-1 rounded-full py-2.5 text-center text-[11px] font-bold uppercase tracking-wide transition-all duration-150 ' +
              (purchaseIntent === 'save_later'
                ? 'bg-[var(--pill-active)] text-[var(--color-text)] shadow-sm'
                : 'text-[var(--color-subtext)] hover:text-[var(--color-text)]')
            }
          >
            {t.intentSaveLater}
          </button>
        </div>
      </div>

      <details className="group rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)]/60 px-3 py-2 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2 text-sm font-medium text-[var(--color-text)] select-none">
          <span>{t.reflectionAdvancedSummary}</span>
          <svg
            className="h-4 w-4 shrink-0 text-[var(--color-subtext)] transition-transform group-open:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="space-y-5 border-t border-[var(--glass-border)] pb-3 pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[var(--color-text)]">{t.reflectionNeedWant}</p>
            <div
              className="flex shrink-0 rounded-full border border-[var(--input-border)] bg-[var(--input-bg)] p-1"
              role="group"
              aria-label={t.reflectionNeedWant}
            >
              <button
                type="button"
                onClick={() => onNeedOrWant('want')}
                className={
                  'rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ' +
                  (needOrWant === 'want'
                    ? 'bg-white text-[var(--color-text)] shadow-sm'
                    : 'text-[var(--color-subtext)]')
                }
              >
                {t.want}
              </button>
              <button
                type="button"
                onClick={() => onNeedOrWant('need')}
                className={
                  'rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ' +
                  (needOrWant === 'need'
                    ? 'bg-[var(--pill-active)] text-[var(--color-text)] shadow-sm'
                    : 'text-[var(--color-subtext)]')
                }
              >
                {t.need}
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[var(--color-text)]">{t.reflectionFrequency}</p>
            <div className="flex flex-wrap gap-2">
              {freqs.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onFrequency(f.id)}
                  className={
                    'rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-150 border ' +
                    (frequency === f.id
                      ? 'border-[var(--btn-primary-border)] bg-[var(--pill-active)] text-[var(--color-text)]'
                      : 'border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--color-subtext)] hover:text-[var(--color-text)]')
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[var(--color-text)]">{t.reflectionWorth}</p>
            <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-subtext)]">
              <span>{t.notReally}</span>
              <span>{t.absolutely}</span>
            </div>
            <div className="flex justify-between gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={rating === n}
                  onClick={() => onRating(n)}
                  className={
                    'h-8 w-8 rounded-full border transition-all duration-150 active:scale-[0.92] sm:h-9 sm:w-9 ' +
                    (n <= rating
                      ? 'border-[var(--btn-primary-border)] bg-[var(--btn-primary)]'
                      : 'border-[var(--input-border)] bg-[var(--input-bg)] hover:border-[var(--btn-primary-border)]/50')
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
