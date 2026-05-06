import React, { useState } from 'react';
import GlassCard from '../components/GlassCard.jsx';
import TopHeader from '../components/TopHeader.jsx';

/** 必須在模組層定義，避免父層每次 render 建立新元件型別導致 input 被卸載、焦點跳掉 */
function IncomeRowEdit({ field, label, amount, onChange, editing, setEditing, formatMoney, currency, language, t }) {
  const active = editing === field;
  const display = formatMoney(Number(amount) || 0, currency, language);
  return (
    <div className="border-b border-[var(--glass-border)] py-3 last:border-0 last:pb-0 first:pt-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-subtext)]">{label}</div>
          {!active && <div className="mt-1 text-lg font-semibold tabular-nums text-[var(--color-text)]">{display}</div>}
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg p-2 text-[var(--color-subtext)] hover:bg-black/5"
          aria-label={t.edit}
          onClick={() => setEditing(active ? null : field)}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L8 18l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {active && (
        <input
          type="text"
          inputMode="decimal"
          className="mt-3 w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-lg font-semibold text-[var(--color-text)] outline-none tabular-nums"
          value={Number(amount) === 0 ? '' : String(amount)}
          onChange={onChange}
          onBlur={() => setEditing(null)}
        />
      )}
    </div>
  );
}

const THEMES = [
  { id: 'latte', labelKey: 'themeLatte', swatch: '#f3e9dc' },
  { id: 'minimal', labelKey: 'themeMinimal', swatch: '#2a2a2a' },
  { id: 'ice', labelKey: 'themeIce', swatch: '#d8f3ff' },
  { id: 'pink', labelKey: 'themePink', swatch: '#ffdceb' },
  { id: 'matcha', labelKey: 'themeMatcha', swatch: '#dceee0' },
];

export default function ProfileScreen({
  t,
  logoSrc,
  hourlyWage,
  monthlyTakeHome,
  savingsGoal,
  monthlyFixedCosts,
  onHourlyChange,
  onMonthlyChange,
  onSavingsGoalChange,
  onMonthlyFixedCostsChange,
  currency,
  onCurrency,
  visualTheme,
  onVisualTheme,
  language,
  onLanguage,
  formatMoney,
  onBell,
}) {
  const [editing, setEditing] = useState(null);
  const rowProps = { editing, setEditing, formatMoney, currency, language, t };

  const currencyLabel = currency === 'TWD' ? 'TWD (NT$)' : currency === 'EUR' ? 'EUR (€)' : 'USD ($)';

  return (
    <div className="space-y-6">
      <TopHeader title="BuyCalc" bellAriaLabel={t.notificationBell} logoSrc={logoSrc} onBell={onBell} />

      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">{t.profileTitle}</h1>
        <p className="mt-1 text-sm text-[var(--color-subtext)]">{t.profileSubtitle}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--color-text)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--icon-tile)] text-[var(--color-text)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M7 10h4M7 14h10" strokeLinecap="round" />
            </svg>
          </span>
          {t.incomeSettings}
        </div>
        <GlassCard className="p-5 sm:p-6">
          <IncomeRowEdit {...rowProps} field="hourly" label={t.hourlyWageLabel} amount={hourlyWage} onChange={onHourlyChange} />
          <IncomeRowEdit {...rowProps} field="monthly" label={t.monthlyTakeHome} amount={monthlyTakeHome} onChange={onMonthlyChange} />
          <IncomeRowEdit {...rowProps} field="savings" label={t.savingsGoal} amount={savingsGoal} onChange={onSavingsGoalChange} />
          <IncomeRowEdit {...rowProps} field="fixed" label={t.monthlyFixedCosts} amount={monthlyFixedCosts} onChange={onMonthlyFixedCostsChange} />
        </GlassCard>
        <p className="mt-2 px-0.5 text-xs leading-relaxed text-[var(--color-subtext)]">{t.monthlyFixedCostsHint}</p>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--color-text)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--icon-tile)] text-[var(--color-text)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 10h4M18 16h4" strokeLinecap="round" />
            </svg>
          </span>
          {t.preferences}
        </div>
        <GlassCard className="divide-y divide-[var(--glass-border)] p-0">
          <div className="px-4 py-4">
            <div className="text-sm font-semibold text-[var(--color-text)]">{t.currency}</div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-subtext)]">{t.currencyHint}</p>
            <p className="mt-1 text-xs font-semibold tabular-nums text-[var(--color-text)]">{currencyLabel}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['USD', 'TWD', 'EUR'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCurrency(c)}
                  className={
                    'min-w-0 w-full rounded-2xl border py-2.5 text-center text-xs font-semibold transition-colors ' +
                    (currency === c
                      ? 'border-[var(--btn-primary-border)] bg-[var(--pill-active)] text-[var(--color-text)]'
                      : 'border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--color-subtext)]')
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-4">
            <label htmlFor="profile-language" className="text-sm font-semibold text-[var(--color-text)]">
              {t.language}
            </label>
            <select
              id="profile-language"
              value={language}
              onChange={(e) => onLanguage(e.target.value)}
              className="mt-3 w-full cursor-pointer appearance-none rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] bg-[length:1rem_1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3 pr-11 text-sm font-semibold text-[var(--color-text)] outline-none transition-colors focus:border-[var(--btn-primary-border)]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A7A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              }}
            >
              <option value="zh">{t.langZh}</option>
              <option value="zhCN">{t.langZhCN}</option>
              <option value="en">{t.langEn}</option>
              <option value="es">{t.langEs}</option>
            </select>
          </div>

          <div className="px-4 py-4">
            <div className="text-sm font-semibold text-[var(--color-text)]">{t.themeHint}</div>
            <div className="mt-3 grid grid-cols-5 gap-1 sm:gap-2">
              {THEMES.map((th) => {
                const active = visualTheme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => onVisualTheme(th.id)}
                    className={
                      'flex min-h-0 min-w-0 w-full flex-col items-center gap-1 rounded-xl border p-1 transition-colors sm:gap-1.5 sm:rounded-2xl sm:p-1.5 ' +
                      (active ? 'border-[var(--btn-primary-border)] bg-[var(--pill-active)]' : 'border-transparent bg-transparent')
                    }
                    aria-pressed={active}
                  >
                    <span
                      className="h-7 w-7 shrink-0 rounded-md border border-black/10 shadow-inner sm:h-9 sm:w-9 sm:rounded-lg"
                      style={{ background: th.swatch }}
                    />
                    <span className="w-full truncate text-center text-[8px] font-semibold leading-tight text-[var(--color-subtext)] sm:text-[10px]">
                      {t[th.labelKey]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard variant="dashed" className="p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--color-text)]">
          <span className="text-lg leading-none">✦</span>
          {t.aboutTitle}
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-subtext)]">{t.aboutText}</p>
      </GlassCard>
    </div>
  );
}
