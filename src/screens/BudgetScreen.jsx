import React, { useMemo, useState } from 'react';
import GlassCard from '../components/GlassCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import TopHeader from '../components/TopHeader.jsx';
import { formatWorkHoursForLabel } from '../utils/budget.js';

function HistoryIcon({ kind }) {
  if (kind === 'coffee')
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--color-text)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 10h12v4a4 4 0 01-4 4H10a4 4 0 01-4-4v-4z" />
        <path d="M6 10V8a2 2 0 012-2h8a2 2 0 012 2v2" />
        <path d="M18 12h1a2 2 0 010 4h-1" />
      </svg>
    );
  if (kind === 'bag')
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--color-text)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 8a6 6 0 0112 0v1H6V8z" />
        <rect x="3" y="9" width="18" height="11" rx="2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--color-text)]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="8 5 19 12 8 19 8 5" />
    </svg>
  );
}

function HistoryRow({ row, t, currency, language, formatMoney, onDeleteHistoryEntry }) {
  const workHours = row.workHours ?? (Number(row.minutes) > 0 ? row.minutes / 60 : 0);
  const hoursLabel = formatWorkHoursForLabel(workHours);
  const hoursTemplate = typeof t.hoursWork === 'string' ? t.hoursWork : '≈ {{n}} hr work';
  return (
    <GlassCard className="flex items-stretch gap-2 p-2.5 sm:gap-3 sm:p-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-2xl bg-[var(--icon-tile)]">
        <HistoryIcon kind={row.icon} />
      </div>
      <div className="min-w-0 flex-1 self-center">
        <div className="truncate text-sm font-semibold text-[var(--color-text)]">{row.title}</div>
        <div className="mt-1">
          <span className="text-xs text-[var(--color-subtext)]">{row.whenLabel}</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-center gap-1 self-center text-right">
        <div className="text-sm font-bold tabular-nums text-[var(--color-text)]">{formatMoney(row.price, currency, language)}</div>
        <div className="text-[11px] tabular-nums text-[var(--color-subtext)]">{hoursTemplate.replace('{{n}}', hoursLabel)}</div>
      </div>
      <button
        type="button"
        onClick={() => onDeleteHistoryEntry(row.id)}
        className="flex shrink-0 items-center justify-center self-center rounded-xl p-2 text-[var(--color-subtext)] transition-colors hover:bg-red-500/10 hover:text-red-700"
        aria-label={t.historyDelete}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
        </svg>
      </button>
    </GlassCard>
  );
}

export default function BudgetScreen({
  t,
  logoSrc,
  formatMoney,
  currency,
  language,
  monthlyTakeHome,
  savingsGoal,
  onEditIncome,
  pctUsed,
  remaining,
  remainingBarPct,
  dailyCap,
  coachMessage,
  history,
  onDeleteHistoryEntry,
  onBell,
}) {
  const [historyTab, setHistoryTab] = useState('spent');

  const filtered = useMemo(() => {
    return historyTab === 'spent'
      ? history.filter((r) => r.intent === 'buy')
      : history.filter((r) => r.intent === 'save_later');
  }, [history, historyTab]);

  const emptyMessage = historyTab === 'spent' ? t.historyEmptySpent : t.historyEmptySaved;

  const pctLabel = `${Math.round(pctUsed)}%`;

  return (
    <div className="space-y-6">
      <TopHeader
        title="BuyCalc"
        bellAriaLabel={t.notificationBell}
        logoSrc={logoSrc}
        onBell={onBell}
      />

      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">{t.budgetTitle}</h1>
        <p className="mt-1 text-sm text-[var(--color-subtext)]">{t.budgetSubtitle}</p>
      </div>

      <GlassCard className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">{t.monthlyIncome}</div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-lg font-bold tabular-nums text-[var(--color-text)]">{formatMoney(monthlyTakeHome, currency, language)}</span>
              <button type="button" onClick={onEditIncome} className="shrink-0 rounded-lg p-1.5 text-[var(--color-subtext)] hover:bg-black/5" aria-label={t.edit}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L8 18l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">{t.savingsGoal}</div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-lg font-bold tabular-nums text-[var(--color-text)]">{formatMoney(savingsGoal, currency, language)}</span>
              <button type="button" onClick={onEditIncome} className="shrink-0 rounded-lg p-1.5 text-[var(--color-subtext)] hover:bg-black/5" aria-label={t.edit}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L8 18l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <ProgressRing percent={pctUsed} label={pctLabel} sublabel={t.used} />
        </div>

        <p className="mt-4 text-center text-sm italic text-[var(--color-subtext)] leading-relaxed">{coachMessage}</p>
        <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-subtext)] opacity-90">
          {t.budgetSpentHint}
        </p>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4 sm:p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">{t.remaining}</div>
          <div className="mt-1 text-lg font-bold tabular-nums text-[var(--color-text)]">{formatMoney(remaining, currency, language)}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--ring-track)]">
            <div
              className="h-full rounded-full bg-[var(--ring-fill)] transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, remainingBarPct))}%` }}
            />
          </div>
        </GlassCard>
        <GlassCard className="p-4 sm:p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-subtext)]">{t.dailyCap}</div>
          <div className="mt-1 text-lg font-bold tabular-nums text-[var(--color-text)]">{formatMoney(dailyCap, currency, language)}</div>
          <p className="mt-2 text-[11px] text-[var(--color-subtext)]">{t.optimalSpending}</p>
        </GlassCard>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-bold text-[var(--color-text)]">{t.reflectiveHistory}</h2>

        <div
          className="mb-3 flex rounded-full border border-[var(--input-border)] bg-[var(--input-bg)] p-1"
          role="tablist"
          aria-label={t.reflectiveHistory}
        >
          <button
            type="button"
            role="tab"
            aria-selected={historyTab === 'spent'}
            onClick={() => setHistoryTab('spent')}
            className={
              'min-w-0 flex-1 rounded-full py-2.5 text-center text-[11px] font-bold uppercase tracking-wide transition-colors ' +
              (historyTab === 'spent'
                ? 'bg-[var(--btn-primary)] text-[var(--btn-primary-text)] shadow-sm'
                : 'text-[var(--color-subtext)] hover:text-[var(--color-text)]')
            }
          >
            {t.historyTabSpent}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={historyTab === 'saved'}
            onClick={() => setHistoryTab('saved')}
            className={
              'min-w-0 flex-1 rounded-full py-2.5 text-center text-[11px] font-bold uppercase tracking-wide transition-colors ' +
              (historyTab === 'saved'
                ? 'bg-[var(--pill-active)] text-[var(--color-text)] shadow-sm'
                : 'text-[var(--color-subtext)] hover:text-[var(--color-text)]')
            }
          >
            {t.historyTabSaved}
          </button>
        </div>

        <div className="space-y-3">
          {history.length === 0 ? (
            <GlassCard className="p-4 text-center text-sm text-[var(--color-subtext)]">{t.historyEmpty}</GlassCard>
          ) : filtered.length === 0 ? (
            <GlassCard className="p-4 text-center text-sm text-[var(--color-subtext)]">{emptyMessage}</GlassCard>
          ) : (
            filtered.slice(0, 8).map((row) => (
              <HistoryRow
                key={row.id}
                row={row}
                t={t}
                currency={currency}
                language={language}
                formatMoney={formatMoney}
                onDeleteHistoryEntry={onDeleteHistoryEntry}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
