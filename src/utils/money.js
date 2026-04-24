const localeMap = { zh: 'zh-Hant-TW', zhCN: 'zh-CN', en: 'en-US', es: 'es-ES' };

export function formatMoney(amount, currency, language) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return '—';
  const loc = localeMap[language] || 'en-US';
  if (currency === 'TWD') {
    return new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(Math.round(n)) + ' 元';
  }
  try {
    const code = currency === 'EUR' ? 'EUR' : 'USD';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: code }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}
