import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import BottomTabBar from './components/BottomTabBar.jsx';
import CalcScreen from './screens/CalcScreen.jsx';
import BudgetScreen from './screens/BudgetScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import IslandScreen from './screens/IslandScreen.jsx';
import { i18n, getDetectedLanguage, QUICK_CATEGORY_KEYS, I18N_LANGUAGE_CODES } from './i18n.js';
import { formatMoney } from './utils/money.js';
import { hoursFromPrice, budgetSnapshot, flexibleBudget, workDaysFromHours, workHoursFromPurchase } from './utils/budget.js';
import { themeIds } from './theme.js';

const STORAGE_KEY = 'buycalc_state_v2';

/** 舊版預設商品名；載入或切換語言時改為空字串 */
const LEGACY_DEFAULT_ITEM_NAMES = ['某個心動的東西', 'Something you want', '某个心动的东西', 'Algo que deseas'];

function normalizeStoredItemName(stored) {
  const n = stored?.itemName;
  if (n == null) return '';
  if (LEGACY_DEFAULT_ITEM_NAMES.includes(n)) return '';
  return n;
}

function normalizeStoredHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];
  return rawHistory
    .filter((row) => row && typeof row === 'object')
    .map((row) => {
      const id = Number(row.id) || Date.now();
      const ts = Number(row.ts) || id;
      const price = Number(row.price) || 0;
      const workHours =
        Number(row.workHours) > 0 ? Number(row.workHours) : Number(row.minutes) > 0 ? Number(row.minutes) / 60 : 0;
      const safeIcon = row.icon === 'coffee' || row.icon === 'bag' || row.icon === 'play' ? row.icon : 'bag';
      const safeIntent = row.intent === 'buy' || row.intent === 'save_later' ? row.intent : null;
      return {
        ...row,
        id,
        ts,
        price,
        workHours,
        icon: safeIcon,
        intent: safeIntent,
        title: typeof row.title === 'string' ? row.title : '',
      };
    });
}
const STANDARD_HOURS_PER_YEAR = 2080;
const AD_DURATION_SEC = 15;

const defaultState = () => ({
  tab: 'island',
  visualTheme: 'game',
  hourlyWage: 25,
  monthlyTakeHome: 5800,
  savingsGoal: 1200,
  monthlyFixedCosts: 0,
  currency: 'USD',
  history: [],
  latestHistoryId: null,
  needOrWant: 'want',
  frequency: 'daily',
  rating: 3,
  itemName: '',
  itemPrice: 0,
  waterDrops: 0,
});

function GameCloud({ style, width, opacity, drift, duration, delay }) {
  return (
    <div
      className="absolute"
      style={{ ...style, width, opacity, animation: `${drift} ${duration} ease-in-out infinite ${delay}` }}
    >
      <svg viewBox="0 0 140 52" fill="white" style={{ width: '100%', display: 'block' }}>
        <path d="M10,48 Q5,48 5,40 Q5,27 17,25 Q15,11 29,9 Q39,2 53,8 Q63,1 77,8 Q91,2 103,14 Q119,11 126,25 Q137,27 137,40 Q137,48 128,48 Z" />
      </svg>
    </div>
  );
}

function GameClouds() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <GameCloud style={{ top: '4%',    left: '-4%'   }} width={200} opacity={0.82} drift="cloud-drift"   duration="10s" delay="0s"  />
      <GameCloud style={{ top: '17%',   right: '-3%'  }} width={160} opacity={0.75} drift="cloud-drift-r" duration="13s" delay="2s"  />
      <GameCloud style={{ top: '46%',   left: '-6%'   }} width={130} opacity={0.65} drift="cloud-drift"   duration="16s" delay="5s"  />
      <GameCloud style={{ bottom: '22%', right: '2%'  }} width={110} opacity={0.58} drift="cloud-drift-r" duration="11s" delay="3s"  />
    </div>
  );
}

const IconShare = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
    <path d="M16 6l-4-4-4 4" />
    <path d="M12 2v13" />
  </svg>
);

const IconInstagram = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const IconEmail = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function formatHistoryWhen(ts, language) {
  const loc = { zh: 'zh-Hant-TW', zhCN: 'zh-CN', en: 'en-US', es: 'es-ES' }[language] || 'en-US';
  try {
    return new Date(ts).toLocaleString(loc, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return new Date(ts).toISOString();
  }
}

/** 舊版 localStorage：postal→pink、cloud→ice；無效值回落 latte，避免 CSS 變數未定義造成白屏 */
function normalizeStoredTheme(theme) {
  if (theme === 'postal') return 'pink';
  if (theme === 'cloud') return 'ice';
  const t = theme == null || theme === '' ? null : String(theme);
  if (t && themeIds.includes(t)) return t;
  return 'latte';
}

function normalizeStoredLanguage(code) {
  const c = code == null || code === '' ? null : String(code);
  if (c && I18N_LANGUAGE_CODES.includes(c)) return c;
  return getDetectedLanguage();
}

const App = () => {
  const initial = loadStored();
  const [tab, setTab] = useState(initial?.tab ?? 'calc');
  const [visualTheme, setVisualTheme] = useState(normalizeStoredTheme(initial?.visualTheme ?? 'latte'));
  const [language, setLanguage] = useState(normalizeStoredLanguage(initial?.language));

  const [hourlyWage, setHourlyWage] = useState(initial?.hourlyWage ?? 25);
  const [monthlyTakeHome, setMonthlyTakeHome] = useState(initial?.monthlyTakeHome ?? 5800);
  const [savingsGoal, setSavingsGoal] = useState(initial?.savingsGoal ?? 1200);
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState(initial?.monthlyFixedCosts ?? 0);
  const [currency, setCurrency] = useState(initial?.currency ?? 'USD');
  const [history, setHistory] = useState(normalizeStoredHistory(initial?.history));
  const [latestHistoryId, setLatestHistoryId] = useState(initial?.latestHistoryId ?? null);

  const [needOrWant, setNeedOrWant] = useState(initial?.needOrWant ?? 'want');
  const [frequency, setFrequency] = useState(initial?.frequency ?? 'daily');
  const [rating, setRating] = useState(initial?.rating ?? 3);

  const [itemName, setItemName] = useState(() => normalizeStoredItemName(initial));
  const [itemPrice, setItemPrice] = useState(initial?.itemPrice ?? 0);
  const [waterDrops, setWaterDrops] = useState(initial?.waterDrops ?? 0);

  const [showResult, setShowResult] = useState(false);
  const [resultHours, setResultHours] = useState(0);
  const [resultDays, setResultDays] = useState(0);
  const [budgetPctLine, setBudgetPctLine] = useState('');

  const canvasRef = useRef(null);
  const pendingShareRef = useRef(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adCountdown, setAdCountdown] = useState(0);
  const [pendingShareType, setPendingShareType] = useState(null);

  const t = i18n[language] ?? i18n.zh;

  useEffect(() => {
    document.documentElement.dataset.theme = visualTheme;
  }, [visualTheme]);

  useEffect(() => {
    const payload = {
      tab,
      visualTheme,
      language,
      hourlyWage,
      monthlyTakeHome,
      savingsGoal,
      monthlyFixedCosts,
      currency,
      history,
      latestHistoryId,
      needOrWant,
      frequency,
      rating,
      itemName,
      itemPrice,
      waterDrops,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [
    tab,
    visualTheme,
    language,
    hourlyWage,
    monthlyTakeHome,
    savingsGoal,
    monthlyFixedCosts,
    currency,
    history,
    latestHistoryId,
    needOrWant,
    frequency,
    rating,
    itemName,
    itemPrice,
    waterDrops,
  ]);

  useEffect(() => {
    const defaults = [...new Set([...LEGACY_DEFAULT_ITEM_NAMES, i18n.zh.defaultItemName, i18n.en.defaultItemName, i18n.zhCN.defaultItemName, i18n.es.defaultItemName])];
    if (defaults.includes(itemName)) {
      setItemName(i18n[language].defaultItemName);
      return;
    }
    for (const key of QUICK_CATEGORY_KEYS) {
      for (const lang of ['zh', 'zhCN', 'en', 'es']) {
        if (i18n[lang][key] === itemName) {
          const next = i18n[language][key];
          if (next !== itemName) setItemName(next);
          return;
        }
      }
    }
  }, [language, itemName]);

  useEffect(() => {
    setShowResult(false);
  }, [itemPrice, hourlyWage]);

  const logoSrc = visualTheme === 'minimal' ? '/logo-black.png' : '/logo-latte.png';

  const snap = useMemo(
    () => budgetSnapshot({ monthlyTakeHome, savingsGoal, monthlyFixedCosts, history }),
    [monthlyTakeHome, savingsGoal, monthlyFixedCosts, history],
  );

  const savingsProgressPct = useMemo(() => {
    if (!(savingsGoal > 0)) return 0;
    const saved = history
      .filter((h) => h.intent === 'save_later')
      .reduce((sum, h) => sum + (Number(h.price) || 0), 0);
    return Math.min(100, (saved / savingsGoal) * 100);
  }, [history, savingsGoal]);

  const gardenSlots = useMemo(() => [
    { locked: false, progress: savingsProgressPct },
    {
      locked: waterDrops < 10,
      progress: waterDrops < 10 ? 0 : Math.min(100, ((waterDrops - 10) / 30) * 100),
    },
    {
      locked: waterDrops < 40,
      progress: waterDrops < 40 ? 0 : Math.min(100, ((waterDrops - 40) / 60) * 100),
    },
    {
      locked: waterDrops < 100,
      progress: waterDrops < 100 ? 0 : Math.min(100, ((waterDrops - 100) / 200) * 100),
    },
  ], [savingsProgressPct, waterDrops]);

  const coachMessage = snap.pctUsed >= 85 ? t.coachTight : t.coachCalm;

  const historyRows = useMemo(
    () =>
      history.map((row) => ({
        ...row,
        whenLabel: formatHistoryWhen(row.ts, language),
      })),
    [history, language],
  );

  const purchaseIntent = useMemo(() => {
    if (latestHistoryId == null) return null;
    const row = history.find((h) => h.id === latestHistoryId);
    return row?.intent ?? null;
  }, [history, latestHistoryId]);

  const onPurchaseIntent = (intent) => {
    if (latestHistoryId == null) return;

    const item = history.find((h) => h.id === latestHistoryId);
    if (item && item.intent !== intent && hourlyWage > 0) {
      const saveDrops = Math.round((item.price / hourlyWage) * 2);
      const buyDrops = Math.round((item.price / hourlyWage) * 1);
      let delta = 0;
      if (item.intent === 'save_later') delta -= saveDrops;
      if (item.intent === 'buy') delta += buyDrops;
      if (intent === 'save_later') delta += saveDrops;
      if (intent === 'buy') delta -= buyDrops;
      setWaterDrops((prev) => Math.max(0, prev + delta));
    }

    setHistory((prev) => prev.map((h) => (h.id === latestHistoryId ? { ...h, intent } : h)));
  };

  const deleteHistoryEntry = (id) => {
    if (!window.confirm(t.historyDeleteConfirm)) return;
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  useEffect(() => {
    if (latestHistoryId == null) return;
    if (!history.some((h) => h.id === latestHistoryId)) {
      setLatestHistoryId(history[0]?.id ?? null);
    }
  }, [history, latestHistoryId]);

  const remainingBarPct = snap.flex > 0 ? (snap.remaining / snap.flex) * 100 : 0;

  const parseNum = (e, setter) => {
    const v = e.target.value;
    if (v === '') {
      setter(0);
      return;
    }
    const n = Number(v);
    if (!Number.isNaN(n) && n >= 0) setter(n);
  };

  const onCalculate = () => {
    const h = hoursFromPrice(itemPrice, hourlyWage);
    if (!(itemPrice > 0) || !(hourlyWage > 0)) {
      setShowResult(false);
      return;
    }
    const hoursRounded = Math.round(h * 10) / 10;
    const daysRounded = Math.round(workDaysFromHours(h) * 10) / 10;
    setResultHours(hoursRounded);
    setResultDays(daysRounded);

    const flex = flexibleBudget(monthlyTakeHome, savingsGoal, monthlyFixedCosts);
    let line = t.resultBudgetNA;
    if (flex > 0) {
      const pct = Math.min(999, Math.round((itemPrice / flex) * 1000) / 10);
      line = t.resultBudgetLine.replace('{{pct}}', String(pct));
    }
    setBudgetPctLine(line);
    setShowResult(true);

    const workHours = workHoursFromPurchase(itemPrice, hourlyWage);
    const icons = ['coffee', 'bag', 'play'];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const title = itemName.trim() || t.defaultItemName;
    const id = Date.now();
    setLatestHistoryId(id);
    setHistory((prev) =>
      [{ id, title, ts: id, price: itemPrice, workHours, icon, intent: null }, ...prev].slice(0, 50),
    );
  };

  const generateCanvas = useCallback(
    (type = 'story') => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const isStory = type === 'story';
      const width = 1080;
      const height = isStory ? 1920 : 1080;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      const isDark = visualTheme === 'minimal';
      const colors = isDark
        ? { bgFrom: '#FAFAFA', bgTo: '#FAFAFA', cardBg: '#FFFFFF', cardBorder: '#E5E5E5', primary: '#171717', secondary: '#737373' }
        : { bgFrom: '#F8F4EF', bgTo: '#F0EAE2', cardBg: '#FFFFFF', cardBorder: '#E8E0D8', primary: '#6b4a3c', secondary: '#6a5a52' };

      const yearlySalary = hourlyWage * STANDARD_HOURS_PER_YEAR;
      const totalHours = yearlySalary > 0 ? itemPrice / (yearlySalary / STANDARD_HOURS_PER_YEAR) : 0;
      const yearsEquivalent = yearlySalary > 0 ? itemPrice / yearlySalary : 0;
      const workDays = totalHours / 8;

      const fontFamily = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif';
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, colors.bgFrom);
      bg.addColorStop(1, colors.bgTo);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const margin = 72;
      const cardPadding = 64;
      const cardW = width - margin * 2;
      const cardH = isStory ? height - margin * 2 - 140 : height - margin * 2 - 80;
      const cardX = margin;
      const cardY = margin;
      const radius = 48;

      ctx.beginPath();
      ctx.moveTo(cardX + radius, cardY);
      ctx.lineTo(cardX + cardW - radius, cardY);
      ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + radius);
      ctx.lineTo(cardX + cardW, cardY + cardH - radius);
      ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - radius, cardY + cardH);
      ctx.lineTo(cardX + radius, cardY + cardH);
      ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - radius);
      ctx.lineTo(cardX, cardY + radius);
      ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
      ctx.closePath();
      ctx.fillStyle = colors.cardBg;
      ctx.fill();
      ctx.strokeStyle = colors.cardBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const cx = width / 2;
      let y = cardY + cardPadding + 36;

      ctx.fillStyle = colors.secondary;
      ctx.font = `500 32px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.fillText(t.appTitle, cx, y);
      y += 56;

      ctx.fillStyle = colors.primary;
      ctx.font = `700 ${isStory ? 34 : 28}px ${fontFamily}`;
      const titleLine1 = itemName ? t.resultTitleFor(itemName) : t.resultTitleNoItem;
      ctx.fillText(titleLine1, cx, y);
      y += isStory ? 48 : 40;
      ctx.font = `400 ${isStory ? 32 : 26}px ${fontFamily}`;
      ctx.fillText(t.resultEquivalent, cx, y);
      y += isStory ? 52 : 44;

      const lineH = isStory ? 50 : 42;
      const resultSize = isStory ? 46 : 36;
      ctx.fillStyle = colors.primary;
      ctx.font = `600 ${resultSize}px ${fontFamily}`;
      ctx.fillText(`${Number(yearsEquivalent).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${t.resultYearSalary}`, cx, y);
      y += lineH;
      ctx.font = `500 ${resultSize}px ${fontFamily}`;
      ctx.globalAlpha = 0.92;
      ctx.fillText(`${Math.round(totalHours).toLocaleString()} ${t.resultHours}`, cx, y);
      y += lineH;
      ctx.fillText(`${Math.round(workDays).toLocaleString()} ${t.resultWorkDays}`, cx, y);
      ctx.globalAlpha = 1;
      y += lineH;
      ctx.font = `400 ${isStory ? 24 : 20}px ${fontFamily}`;
      ctx.fillStyle = colors.secondary;
      ctx.globalAlpha = 0.6;
      ctx.fillText(t.resultHoursNote, cx, y);
      y += isStory ? 40 : 32;
      ctx.font = `400 ${isStory ? 28 : 22}px ${fontFamily}`;
      ctx.globalAlpha = 0.75;
      ctx.fillText(t.resultWorthIt, cx, y);
      ctx.globalAlpha = 1;
      y += lineH + 16;

      if (itemName && itemPrice > 0) {
        ctx.strokeStyle = colors.cardBorder;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 120, y);
        ctx.lineTo(cx + 120, y);
        ctx.stroke();
        y += 48;
        ctx.fillStyle = colors.primary;
        ctx.font = `600 ${isStory ? 36 : 30}px ${fontFamily}`;
        const nameToShow = itemName.length > 14 ? `${itemName.slice(0, 13)}…` : itemName;
        ctx.fillText(nameToShow, cx, y);
        y += 44;
        ctx.fillStyle = colors.secondary;
        ctx.font = `400 ${isStory ? 32 : 26}px ${fontFamily}`;
        ctx.fillText(formatMoney(itemPrice, currency, language), cx, y);
        y += 52;
      }

      ctx.fillStyle = colors.secondary;
      ctx.font = `400 ${isStory ? 26 : 22}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.fillText(t.canvasTagline, cx, y + 24);

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `BuyCalc_${itemName || 'item'}_${type}.png`;
      link.href = dataURL;
      link.click();
    },
    [currency, itemName, itemPrice, hourlyWage, language, t, visualTheme],
  );

  useEffect(() => {
    if (!showAdModal || pendingShareType == null) return;
    pendingShareRef.current = pendingShareType;
    const timer = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          const type = pendingShareRef.current;
          if (type) generateCanvas(type);
          setShowAdModal(false);
          setPendingShareType(null);
          pendingShareRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showAdModal, pendingShareType, generateCanvas]);

  const onBell = () => {
    window.alert(t.comingSoon);
  };

  return (
    <div className="app-gradient min-h-screen text-[var(--color-text)]">
      {visualTheme === 'game' && <GameClouds />}
      <div className="relative z-10 mx-auto max-w-md px-4 pb-32 pt-3">
        {tab === 'island' && (
          <IslandScreen
            t={t}
            gardenSlots={gardenSlots}
            waterDrops={waterDrops}
            language={language}
          />
        )}

        {tab === 'calc' && (
          <CalcScreen
            t={t}
            logoSrc={logoSrc}
            currency={currency}
            itemName={itemName}
            onItemNameChange={(e) => setItemName(e.target.value)}
            onPickCategory={setItemName}
            itemPrice={itemPrice}
            onItemPriceChange={(e) => parseNum(e, setItemPrice)}
            hourlyWage={hourlyWage}
            onHourlyChange={(e) => parseNum(e, setHourlyWage)}
            onCalculate={onCalculate}
            showResult={showResult}
            resultHours={resultHours}
            resultDays={resultDays}
            budgetPctLine={budgetPctLine}
            needOrWant={needOrWant}
            onNeedOrWant={setNeedOrWant}
            frequency={frequency}
            onFrequency={setFrequency}
            rating={rating}
            onRating={setRating}
            purchaseIntent={purchaseIntent}
            onPurchaseIntent={onPurchaseIntent}
            onBell={onBell}
          />
        )}

        {tab === 'budget' && (
          <BudgetScreen
            t={t}
            logoSrc={logoSrc}
            formatMoney={formatMoney}
            currency={currency}
            language={language}
            monthlyTakeHome={monthlyTakeHome}
            savingsGoal={savingsGoal}
            onEditIncome={() => setTab('profile')}
            pctUsed={snap.pctUsed}
            remaining={snap.remaining}
            remainingBarPct={remainingBarPct}
            dailyCap={snap.dailyCap}
            coachMessage={coachMessage}
            history={historyRows}
            onDeleteHistoryEntry={deleteHistoryEntry}
            onBell={onBell}
            waterDrops={waterDrops}
          />
        )}

        {tab === 'profile' && (
          <ProfileScreen
            t={t}
            logoSrc={logoSrc}
            hourlyWage={hourlyWage}
            monthlyTakeHome={monthlyTakeHome}
            savingsGoal={savingsGoal}
            monthlyFixedCosts={monthlyFixedCosts}
            onHourlyChange={(e) => parseNum(e, setHourlyWage)}
            onMonthlyChange={(e) => parseNum(e, setMonthlyTakeHome)}
            onSavingsGoalChange={(e) => parseNum(e, setSavingsGoal)}
            onMonthlyFixedCostsChange={(e) => parseNum(e, setMonthlyFixedCosts)}
            currency={currency}
            onCurrency={setCurrency}
            visualTheme={visualTheme}
            onVisualTheme={setVisualTheme}
            language={language}
            onLanguage={setLanguage}
            formatMoney={formatMoney}
            onBell={onBell}
          />
        )}

        {tab === 'calc' && (
          <>
            <div className="mt-6 flex h-20 items-center justify-center rounded-[22px] border border-dashed border-[var(--glass-border)] text-xs font-light text-[var(--color-subtext)]">
              {t.adSlot}
            </div>
            <div className="mt-4 flex gap-3 pb-4">
              <button
                type="button"
                onClick={() => {
                  setAdCountdown(AD_DURATION_SEC);
                  setPendingShareType('post');
                  setShowAdModal(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-[22px] border border-[var(--btn-primary-border)] bg-[var(--btn-primary)] py-4 text-sm font-semibold text-[var(--btn-primary-text)] shadow-md transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              >
                <IconShare className="h-5 w-5" />
                {t.sharePost}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdCountdown(AD_DURATION_SEC);
                  setPendingShareType('story');
                  setShowAdModal(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-[22px] border border-[var(--btn-primary-border)] bg-[var(--btn-primary)] py-4 text-sm font-semibold text-[var(--btn-primary-text)] shadow-md transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              >
                <IconShare className="h-5 w-5" />
                {t.shareStory}
              </button>
            </div>
          </>
        )}

        <footer className="mt-8 text-center text-[10px] font-light tracking-[0.2em] text-[var(--color-subtext)]">
          <p>
            BuyCalc © {new Date().getFullYear()} ·{' '}
            <a href="http://www.friendlycatgroup.com/" target="_blank" rel="noopener noreferrer" className="underline">
              {t.footer}
            </a>
          </p>
          <div className="mt-3 flex justify-center gap-4">
            <a
              href="https://instagram.com/friendlycatgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 transition-colors hover:bg-black/5"
              aria-label="Instagram @friendlycatgroup"
            >
              <IconInstagram className="h-5 w-5" />
            </a>
            <a href="mailto:workbyaria@gmail.com" className="rounded-lg p-1.5 transition-colors hover:bg-black/5" aria-label="Email">
              <IconEmail className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 pb-4 pt-2">
        <div className="pointer-events-auto mx-auto max-w-md px-4">
          <BottomTabBar
            active={tab}
            onChange={setTab}
            labels={{ island: t.tabIsland, calc: t.tabCalc, budget: t.tabBudget, profile: t.tabProfile }}
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] p-4">
              <span className="text-sm font-medium opacity-80">{t.adDownloadSoon}</span>
              <span className="text-lg font-bold tabular-nums text-[var(--color-text)]">{t.adCountdown.replace('{{n}}', String(adCountdown))}</span>
            </div>
            <div className="flex aspect-video items-center justify-center text-sm text-[var(--color-subtext)]">{t.adSlot}</div>
            <div className="flex justify-center p-4">
              <button
                type="button"
                onClick={() => {
                  setShowAdModal(false);
                  setPendingShareType(null);
                  pendingShareRef.current = null;
                }}
                className="rounded-xl border border-[var(--input-border)] px-6 py-2 text-sm text-[var(--color-text)] hover:bg-black/5"
              >
                {t.adCancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
