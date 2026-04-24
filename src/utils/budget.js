const HOURS_PER_WORK_DAY = 8;

export function hoursFromPrice(price, hourly) {
  const p = Number(price);
  const h = Number(hourly);
  if (!(p > 0) || !(h > 0)) return 0;
  return p / h;
}

/** 可選花費額度 = 實領 − 每月固定支出 − 儲蓄目標（不低於 0） */
export function flexibleBudget(monthlyTakeHome, savingsGoal, monthlyFixedCosts = 0) {
  const m = Number(monthlyTakeHome);
  const s = Number(savingsGoal);
  const f = Number(monthlyFixedCosts);
  if (!Number.isFinite(m) || !Number.isFinite(s)) return 0;
  const fixed = Number.isFinite(f) && f > 0 ? f : 0;
  return Math.max(0, m - fixed - s);
}

/** 僅將「決定購買」(intent === 'buy') 計入本月已花費；「先存起來」與未標記不計入。 */
export function spentThisMonth(history, now = new Date()) {
  const y = now.getFullYear();
  const mo = now.getMonth();
  return (history || []).reduce((sum, row) => {
    if (row.intent !== 'buy') return sum;
    const d = new Date(row.ts);
    if (d.getFullYear() === y && d.getMonth() === mo) return sum + (Number(row.price) || 0);
    return sum;
  }, 0);
}

export function daysRemainingInMonth(now = new Date()) {
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return Math.max(1, last - now.getDate() + 1);
}

export function budgetSnapshot({ monthlyTakeHome, savingsGoal, monthlyFixedCosts = 0, history, now = new Date() }) {
  const flex = flexibleBudget(monthlyTakeHome, savingsGoal, monthlyFixedCosts);
  const spent = spentThisMonth(history, now);
  const remaining = Math.max(0, flex - spent);
  const pctUsed = flex > 0 ? Math.min(100, (spent / flex) * 100) : 0;
  const dailyCap = remaining / daysRemainingInMonth(now);
  return { flex, spent, remaining, pctUsed, dailyCap };
}

export function workDaysFromHours(totalHours) {
  const h = Number(totalHours) || 0;
  return h / HOURS_PER_WORK_DAY;
}
