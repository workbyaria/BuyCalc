import React from 'react';
import GlassCard from '../components/GlassCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import InputField from '../components/InputField.jsx';
import ReflectionSelector from '../components/ReflectionSelector.jsx';
import TopHeader from '../components/TopHeader.jsx';
import ItemCategoryQuickPick from '../components/ItemCategoryQuickPick.jsx';

export default function CalcScreen({
  t,
  logoSrc,
  currency,
  itemName,
  onItemNameChange,
  onPickCategory,
  itemPrice,
  onItemPriceChange,
  hourlyWage,
  onHourlyChange,
  onCalculate,
  showResult,
  resultHours,
  resultDays,
  budgetPctLine,
  needOrWant,
  onNeedOrWant,
  frequency,
  onFrequency,
  rating,
  onRating,
  purchaseIntent,
  onPurchaseIntent,
  onBell,
}) {
  const pricePrefix = currency === 'TWD' ? 'NT$' : currency === 'EUR' ? '€' : '$';

  return (
    <div className="space-y-6">
      <TopHeader
        title="BuyCalc"
        bellAriaLabel={t.notificationBell}
        logoSrc={logoSrc}
        onBell={onBell}
      />

      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-subtext)]">{t.headerKicker}</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-[var(--color-text)]">{t.headerHeadline}</h1>
      </div>

      <GlassCard className="p-5 sm:p-6 space-y-5">
        <InputField
          label={t.itemPriceLabel}
          prefix={pricePrefix}
          value={itemPrice === 0 ? '' : String(itemPrice)}
          onChange={onItemPriceChange}
          placeholder="0.00"
        />
        <InputField
          label={t.hourlyWageLabel}
          value={hourlyWage === 0 ? '' : String(hourlyWage)}
          onChange={onHourlyChange}
          placeholder="0"
        />
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-subtext)] mb-2">{t.calcOptionalName}</div>
          <input
            type="text"
            value={itemName}
            onChange={onItemNameChange}
            placeholder={t.productNamePlaceholder}
            className="w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm font-medium text-[var(--color-text)] outline-none placeholder:text-[var(--color-subtext)]/50"
          />
          <ItemCategoryQuickPick t={t} itemName={itemName} onPick={onPickCategory} />
        </div>
        <PrimaryButton type="button" onClick={onCalculate}>
          {t.calculateCost}
        </PrimaryButton>
      </GlassCard>

      {showResult && (
        <>
          <GlassCard className="p-6 sm:p-7 text-center space-y-2">
            <p className="text-sm text-[var(--color-subtext)]">{t.resultCostsYou}</p>
            <p className="text-2xl sm:text-[1.65rem] font-bold leading-snug text-[var(--color-text)]">
              {t.resultHoursLine.replace('{{n}}', String(resultHours))}
            </p>
            <p className="text-sm text-[var(--color-subtext)]">{t.resultDaysApprox.replace('{{d}}', String(resultDays))}</p>
            <div className="mx-auto mt-5 max-w-xs border-t border-[var(--glass-border)] pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-subtext)] leading-relaxed">{budgetPctLine}</p>
            </div>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6">
            <ReflectionSelector
              t={t}
              purchaseIntent={purchaseIntent}
              onPurchaseIntent={onPurchaseIntent}
              needOrWant={needOrWant}
              onNeedOrWant={onNeedOrWant}
              frequency={frequency}
              onFrequency={onFrequency}
              rating={rating}
              onRating={onRating}
            />
          </GlassCard>
        </>
      )}
    </div>
  );
}
