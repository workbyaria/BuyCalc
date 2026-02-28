import React, { useState, useRef, useEffect } from 'react';

// --- i18n ---
const i18n = {
  zh: {
    themeSwitchToMinimal: '切換黑白',
    themeSwitchToLatte: '切換奶茶',
    salaryLabel: '薪資設定',
    hourly: '時薪',
    monthly: '月薪',
    yearly: '年薪',
    amount: '金額',
    daysPerWeek: '每週工作天',
    hoursPerDay: '每日工作時數',
    productLabel: '商品計算',
    productName: '商品名稱',
    defaultItemName: '某個心動的東西',
    productNamePlaceholder: '例如：夢幻相機',
    productPrice: '商品價格',
    resultWithItem: (name) => `如果我要買 "${name}"，我需要工作：`,
    resultNoItem: '我需要工作：',
    day: '天',
    hour: '時',
    min: '分',
    adSlot: '廣告版位',
    sharePost: '貼文分享圖',
    shareStory: '限動分享圖',
    footer: 'Friendly Cat Group',
    langZh: '繁體中文',
    langEn: 'English',
    langZhCN: '简体中文',
    langEs: 'Español',
    greeting: '想買什麼？先算一算',
    appTitle: '買不買算算 BuyCalc',
    canvasTagline: '珍惜生命中的每一分鐘，理智消費。',
    adDownloadSoon: '正在生成分享圖，請稍候：',
    adCountdown: '剩餘 {{n}} 秒',
    adCancel: '取消',
    resultYearSalary: '年薪',
    resultHours: '小時',
    resultWorkDays: '個上班日',
    resultWorkDaysFull: '個上班日（每天 8 小時）',
    resultTitleFor: (name) => `"${name}"`,
    resultTitleNoItem: '它',
    resultEquivalent: '相當於',
    resultHoursNote: '以每日 8 小時計算',
    resultWorthIt: '值得買嗎？',
    resultCardFooter: '給自己 24 小時再決定',
  },
  en: {
    themeSwitchToMinimal: 'Dark',
    themeSwitchToLatte: 'Latte',
    salaryLabel: 'Salary',
    hourly: 'Hourly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    amount: 'Amount',
    daysPerWeek: 'Days/week',
    hoursPerDay: 'Hours/day',
    productLabel: 'Item',
    productName: 'Item name',
    defaultItemName: 'Something you want',
    productNamePlaceholder: 'e.g. Dream camera',
    productPrice: 'Price',
    resultWithItem: (name) => `To buy "${name}", I need to work:`,
    resultNoItem: 'I need to work:',
    day: 'd',
    hour: 'h',
    min: 'm',
    adSlot: 'Ad',
    sharePost: 'Post',
    shareStory: 'Story',
    footer: 'Friendly Cat Group',
    langZh: '繁體中文',
    langEn: 'English',
    langZhCN: '简体中文',
    langEs: 'Español',
    greeting: 'Thinking of buying? Calculate the cost.',
    appTitle: 'BuyCalc',
    canvasTagline: 'Every purchase is your time. Spend mindfully.',
    adDownloadSoon: 'Your image will download soon',
    adCountdown: '{{n}} sec',
    adCancel: 'Cancel',
    resultYearSalary: 'years of salary',
    resultHours: 'hours',
    resultWorkDays: 'work days',
    resultWorkDaysFull: 'work days (8h/day)',
    resultTitleFor: (name) => `"${name}"`,
    resultTitleNoItem: 'It',
    resultEquivalent: 'Equivalent to',
    resultHoursNote: 'Based on 8 hours per day',
    resultWorthIt: 'Worth buying?',
    resultCardFooter: 'Give yourself 24 hours before you decide',
  },
  zhCN: {
    themeSwitchToMinimal: '切换黑白',
    themeSwitchToLatte: '切换奶茶',
    salaryLabel: '薪资设定',
    hourly: '时薪',
    monthly: '月薪',
    yearly: '年薪',
    amount: '金额',
    daysPerWeek: '每周工作天',
    hoursPerDay: '每日工作时数',
    productLabel: '商品计算',
    productName: '商品名称',
    defaultItemName: '某个心动的东西',
    productNamePlaceholder: '例如：梦幻相机',
    productPrice: '商品价格',
    resultWithItem: (name) => `如果我要买 "${name}"，我需要工作：`,
    resultNoItem: '我需要工作：',
    day: '天',
    hour: '时',
    min: '分',
    adSlot: '广告位',
    sharePost: '贴文分享图',
    shareStory: '限动分享图',
    footer: 'Friendly Cat Group',
    langZh: '繁體中文',
    langEn: 'English',
    langZhCN: '简体中文',
    langEs: 'Español',
    greeting: '想买什么？先算一算',
    appTitle: '买不买算算 BuyCalc',
    canvasTagline: '珍惜生命中的每一分钟，理智消费。',
    adDownloadSoon: '正在生成分享图，请稍候：',
    adCountdown: '剩余 {{n}} 秒',
    adCancel: '取消',
    resultYearSalary: '年薪',
    resultHours: '小时',
    resultWorkDays: '个上班日',
    resultWorkDaysFull: '个上班日（每天 8 小时）',
    resultTitleFor: (name) => `"${name}"`,
    resultTitleNoItem: '它',
    resultEquivalent: '相当于',
    resultHoursNote: '以每日 8 小时计算',
    resultWorthIt: '值得买吗？',
    resultCardFooter: '给自己 24 小时再决定',
  },
  es: {
    themeSwitchToMinimal: 'Oscuro',
    themeSwitchToLatte: 'Latte',
    salaryLabel: 'Salario',
    hourly: 'Por hora',
    monthly: 'Mensual',
    yearly: 'Anual',
    amount: 'Cantidad',
    daysPerWeek: 'Días/semana',
    hoursPerDay: 'Horas/día',
    productLabel: 'Artículo',
    productName: 'Nombre',
    defaultItemName: 'Algo que deseas',
    productNamePlaceholder: 'ej. Cámara soñada',
    productPrice: 'Precio',
    resultWithItem: (name) => `Para comprar "${name}", necesito trabajar:`,
    resultNoItem: 'Necesito trabajar:',
    day: 'd',
    hour: 'h',
    min: 'm',
    adSlot: 'Anuncio',
    sharePost: 'Publicar',
    shareStory: 'Story',
    footer: 'Friendly Cat Group',
    langZh: '繁體中文',
    langEn: 'English',
    langZhCN: '简体中文',
    langEs: 'Español',
    greeting: 'Haz las cuentas antes de comprar.',
    appTitle: 'BuyCalc',
    canvasTagline: 'Cada compra es tu tiempo. Gasta con conciencia.',
    adDownloadSoon: 'Casi listo...',
    adCountdown: '{{n}} seg',
    adCancel: 'Cancelar',
    resultYearSalary: 'años de salario',
    resultHours: 'horas',
    resultWorkDays: 'días laborables',
    resultWorkDaysFull: 'días laborables (8h/día)',
    resultTitleFor: (name) => `"${name}"`,
    resultTitleNoItem: 'Esto',
    resultEquivalent: 'Equivale a',
    resultHoursNote: 'Según 8 horas al día',
    resultWorthIt: '¿Vale la pena comprarlo?',
    resultCardFooter: 'Date 24 horas antes de decidir',
  },
};

// 依瀏覽器語系／地區偵測慣用語言，回傳 app 支援的 language key
const getDetectedLanguage = () => {
  if (typeof navigator === 'undefined' || !navigator.languages) return 'zh';
  const locales = [...navigator.languages, navigator.language].filter(Boolean).map((l) => l.toLowerCase());
  for (const locale of locales) {
    if (/^zh-(hant|tw|hk)/.test(locale) || locale === 'zh-tw' || locale === 'zh-hk') return 'zh';
    if (/^zh(-(hans|cn|sg))?$/i.test(locale) || locale.startsWith('zh-cn') || locale.startsWith('zh-sg')) return 'zhCN';
    if (locale.startsWith('es')) return 'es';
    if (locale.startsWith('en')) return 'en';
  }
  return 'zh'; // 無法辨識時預設繁中
};

// --- Icons (Inline SVGs) ---
const IconClock = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconWallet = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <circle cx="17" cy="14" r="1.5" />
  </svg>
);

const IconBag = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M6 8a6 6 0 0112 0v1H6V8z" />
    <rect x="3" y="9" width="18" height="11" rx="2" />
  </svg>
);

const IconShare = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
    <path d="M16 6l-4-4-4 4" />
    <path d="M12 2v13" />
  </svg>
);

const IconGear = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
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

const App = () => {
  // --- States（語言依訪客瀏覽器語系／地區自動辨識）---
  const [theme, setTheme] = useState('latte'); // 'latte' or 'minimal'
  const [language, setLanguage] = useState(() => getDetectedLanguage()); // 'zh' | 'zhCN' | 'en' | 'es'
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [salaryType, setSalaryType] = useState('hourly'); // 'hourly', 'monthly', 'yearly'
  const [salaryValue, setSalaryValue] = useState(0);

  const [itemName, setItemName] = useState(() => i18n[getDetectedLanguage()].defaultItemName);
  const [itemPrice, setItemPrice] = useState(0);

  const canvasRef = useRef(null);
  const langMenuRef = useRef(null);

  const t = i18n[language];

  const AD_DURATION_SEC = 15;
  const SHOW_RESULT_FOOTER = true;

  const [showAdModal, setShowAdModal] = useState(false);
  const [adCountdown, setAdCountdown] = useState(0);
  const [pendingShareType, setPendingShareType] = useState(null);
  const pendingShareRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) setLangMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // 切換語言時，若目前是「預設商品名」則改為該語言的預設
  useEffect(() => {
    const defaults = [i18n.zh.defaultItemName, i18n.en.defaultItemName, i18n.zhCN.defaultItemName, i18n.es.defaultItemName];
    if (defaults.includes(itemName)) {
      setItemName(i18n[language].defaultItemName);
    }
  }, [language, itemName]);

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
  }, [showAdModal, pendingShareType]);

  const handleSalaryChange = (e) => {
    const v = e.target.value;
    if (v === '') {
      setSalaryValue(0);
      return;
    }
    const n = Number(v);
    if (!Number.isNaN(n) && n >= 0) setSalaryValue(n);
  };

  const handlePriceChange = (e) => {
    const v = e.target.value;
    if (v === '') {
      setItemPrice(0);
      return;
    }
    const n = Number(v);
    if (!Number.isNaN(n) && n >= 0) setItemPrice(n);
  };

  // 標準工時：一年 52 週 × 每週 40 小時 = 2080 小時；一天 8 小時
  const STANDARD_HOURS_PER_YEAR = 2080;
  const HOURS_PER_WORK_DAY = 8;

  const getYearlySalary = () => {
    if (salaryType === 'hourly') return null;
    if (salaryType === 'monthly') return salaryValue * 12;
    if (salaryType === 'yearly') return salaryValue;
    return null;
  };

  const getHourlyRate = () => {
    if (salaryType === 'hourly') return salaryValue;
    const yearly = getYearlySalary();
    return yearly != null && yearly > 0 ? yearly / STANDARD_HOURS_PER_YEAR : 0;
  };

  // 時薪／月薪／年薪：統一用「年薪倍數、總小時、上班日」呈現（時薪先換算等效年薪 = 時薪 × 2080）
  const getResult = () => {
    if (itemPrice <= 0) return { yearsEquivalent: 0, totalHours: 0, workDays: 0 };

    const yearlySalary = salaryType === 'hourly'
      ? salaryValue * STANDARD_HOURS_PER_YEAR
      : getYearlySalary();
    if (yearlySalary == null || yearlySalary <= 0) return { yearsEquivalent: 0, totalHours: 0, workDays: 0 };

    const hourlyRate = yearlySalary / STANDARD_HOURS_PER_YEAR;
    const totalHours = itemPrice / hourlyRate;
    const yearsEquivalent = itemPrice / yearlySalary;
    const workDays = totalHours / HOURS_PER_WORK_DAY;
    return { yearsEquivalent, totalHours, workDays };
  };

  const result = getResult();

  // --- Theme Styles ---
  const styles = {
    latte: {
      bg: 'bg-gradient-to-b from-[#F8F4EF] to-[#F0EAE2]',
      card: 'bg-white/90 backdrop-blur-sm border border-[#E8E0D8]/80 shadow-card-latte hover:shadow-card-hover transition-shadow duration-300',
      textPrimary: 'text-[#5C524A]',
      textSecondary: 'text-[#8B7D73]',
      accent: 'bg-[#6B5D54] text-white border-[#6B5D54] shadow-md hover:bg-[#5C5048] hover:border-[#5C5048] hover:shadow-lg',
      input: 'border-[#E0D8D0] focus:border-[#6B5D54] focus:bg-white/60',
      divider: 'border-[#E6DFD5]',
      resultCard: 'bg-gradient-to-b from-white to-[#FAF7F3] border border-[#E8E0D8]/80 shadow-result-latte',
      resultHighlight: 'text-[#6B5D54]',
      badge: 'bg-[#6B5D54]/10 text-[#6B5D54]',
      footer: 'text-[#7A6E65]'
    },
    minimal: {
      bg: 'bg-gradient-to-b from-[#1f1f1f] to-[#171717]',
      card: 'bg-[#2e2e2e] border border-neutral-600/50 shadow-card hover:shadow-card-hover transition-shadow duration-300',
      textPrimary: 'text-neutral-100',
      textSecondary: 'text-neutral-400',
      accent: 'bg-neutral-300 text-neutral-900 border-neutral-300 shadow-cta hover:bg-neutral-400 hover:border-neutral-400 hover:shadow-lg',
      input: 'border-neutral-600 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/25',
      divider: 'border-neutral-600',
      resultCard: 'bg-[#2e2e2e] border border-neutral-600/50 shadow-card',
      resultHighlight: 'text-neutral-100',
      badge: 'bg-neutral-600/40 text-neutral-200',
      footer: 'text-neutral-500'
    }
  }[theme];

  // --- Canvas Drawing Logic（依主題與 UI 風格重繪）---
  const generateCanvas = (type = 'story') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isStory = type === 'story';
    const width = 1080;
    const height = isStory ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const isLatte = theme === 'latte';
    const colors = isLatte
      ? {
          bgFrom: '#F8F4EF',
          bgTo: '#F0EAE2',
          cardBg: '#FFFFFF',
          cardBorder: '#E8E0D8',
          primary: '#5C524A',
          secondary: '#8B7D73',
        }
      : {
          bgFrom: '#FAFAFA',
          bgTo: '#FAFAFA',
          cardBg: '#FFFFFF',
          cardBorder: '#E5E5E5',
          primary: '#171717',
          secondary: '#737373',
        };

    const fontFamily = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif';

    // 背景（漸層或純色）
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

    // 圓角卡片
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

    // 品牌
    ctx.fillStyle = colors.secondary;
    ctx.font = `500 32px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(t.appTitle, cx, y);
    y += 56;

    // 標題："X"（產品名粗體）/ 相當於
    ctx.fillStyle = colors.primary;
    ctx.font = `700 ${isStory ? 34 : 28}px ${fontFamily}`;
    ctx.textAlign = 'center';
    const titleLine1 = itemName ? t.resultTitleFor(itemName) : t.resultTitleNoItem;
    ctx.fillText(titleLine1, cx, y);
    y += isStory ? 48 : 40;
    ctx.font = `400 ${isStory ? 32 : 26}px ${fontFamily}`;
    ctx.fillText(t.resultEquivalent, cx, y);
    y += isStory ? 52 : 44;

    // 大數字：時薪／月薪／年薪統一為 X 年薪、X 小時、X 個上班日
    const lineH = isStory ? 50 : 42;
    const resultSize = isStory ? 46 : 36;
    ctx.textAlign = 'center';
    ctx.fillStyle = colors.primary;
    ctx.font = `600 ${resultSize}px ${fontFamily}`;
    ctx.fillText(`${Number(result.yearsEquivalent).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${t.resultYearSalary}`, cx, y);
    y += lineH;
    ctx.font = `500 ${resultSize}px ${fontFamily}`;
    ctx.globalAlpha = 0.92;
    ctx.fillText(`${Math.round(result.totalHours).toLocaleString()} ${t.resultHours}`, cx, y);
    y += lineH;
    ctx.fillText(`${Math.round(result.workDays).toLocaleString()} ${t.resultWorkDays}`, cx, y);
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

    // 商品＋價格（若有）
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
      ctx.textAlign = 'center';
      const nameToShow = itemName.length > 14 ? itemName.slice(0, 13) + '…' : itemName;
      ctx.fillText(nameToShow, cx, y);
      y += 44;
      ctx.fillStyle = colors.secondary;
      ctx.font = `400 ${isStory ? 32 : 26}px ${fontFamily}`;
      ctx.fillText(`$${Number(itemPrice).toLocaleString()}`, cx, y);
      y += 52;
    }

    // 底部標語（卡片內）
    ctx.fillStyle = colors.secondary;
    ctx.font = `400 ${isStory ? 26 : 22}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(t.canvasTagline, cx, y + 24);

    // Download
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `BuyCalc_${itemName || 'item'}_${type}.png`;
    link.href = dataURL;
    link.click();
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans p-5 sm:p-6 ${styles.bg} bg-fixed ${styles.textPrimary}`}>

      {/* Header：固定於頂部，寬度與內容區一致 */}
      <header className={`sticky top-0 z-20 max-w-md mx-auto flex justify-between items-center py-4 mb-4 sm:mb-6 ${theme === 'latte' ? 'bg-[#F8F4EF]' : 'bg-[#1f1f1f]'}`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center overflow-hidden rounded-2xl w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 ${theme === 'latte' ? 'bg-white/80 shadow-card-latte' : 'bg-[#2e2e2e] border border-neutral-600/50 shadow-card'}`}>
            <img
              src={theme === 'minimal' ? '/logo-black.png' : '/logo-latte.png'}
              alt="BuyCalc"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            {t.appTitle}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'latte' ? 'minimal' : 'latte')}
            className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${styles.divider} ${theme === 'latte' ? 'bg-white/60 hover:bg-white/80 shadow-sm' : 'bg-[#2e2e2e] hover:bg-neutral-600 shadow-sm'}`}
          >
            {theme === 'latte' ? t.themeSwitchToMinimal : t.themeSwitchToLatte}
          </button>
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLangMenuOpen((o) => !o); }}
              className={`p-2 rounded-full border transition-all duration-200 ${styles.divider} ${theme === 'latte' ? 'bg-white/60 hover:bg-white/80 shadow-sm' : 'bg-[#2e2e2e] hover:bg-neutral-600 shadow-sm'}`}
              aria-label="Language"
            >
              <IconGear className="w-4 h-4" />
            </button>
            {langMenuOpen && (
              <div className={`absolute right-0 top-full mt-1.5 py-1 rounded-xl border shadow-lg min-w-[8rem] z-10 ${theme === 'latte' ? 'bg-white/95 border-[#E8E0D8]' : 'bg-[#2e2e2e] border-neutral-600'}`}>
                <button
                  type="button"
                  onClick={() => { setLanguage('zh'); setLangMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm ${language === 'zh' ? 'font-medium opacity-100' : 'opacity-70'} hover:opacity-100 ${theme === 'latte' ? 'hover:bg-[#F5F0E9]' : 'hover:bg-neutral-600'}`}
                >
                  {t.langZh}
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('zhCN'); setLangMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm ${language === 'zhCN' ? 'font-medium opacity-100' : 'opacity-70'} hover:opacity-100 ${theme === 'latte' ? 'hover:bg-[#F5F0E9]' : 'hover:bg-neutral-600'}`}
                >
                  {t.langZhCN}
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm ${language === 'en' ? 'font-medium opacity-100' : 'opacity-70'} hover:opacity-100 ${theme === 'latte' ? 'hover:bg-[#F5F0E9]' : 'hover:bg-neutral-600'}`}
                >
                  {t.langEn}
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('es'); setLangMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm ${language === 'es' ? 'font-medium opacity-100' : 'opacity-70'} hover:opacity-100 ${theme === 'latte' ? 'hover:bg-[#F5F0E9]' : 'hover:bg-neutral-600'}`}
                >
                  {t.langEs}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 招呼語 - 與衝動消費相關 */}
      <p className="max-w-md mx-auto text-center text-sm sm:text-base opacity-80 mb-6 sm:mb-8 px-2">
        {t.greeting}
      </p>

      <main className="max-w-md mx-auto space-y-6 sm:space-y-8">

        {/* Salary Section */}
        <section className={`p-6 sm:p-7 rounded-3xl ${styles.card} text-center`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 ${styles.badge} text-xs font-medium tracking-wide`}>
            <span className="flex-shrink-0 inline-flex items-center justify-center">
              <IconWallet className="w-3.5 h-3.5" />
            </span>
            <span>{t.salaryLabel}</span>
          </div>

          <div className="flex justify-center gap-2 mb-5">
            {['hourly', 'monthly', 'yearly'].map((type) => (
              <button
                key={type}
                onClick={() => setSalaryType(type)}
                className={`flex-1 max-w-[5.5rem] py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 ${
                  salaryType === type ? styles.accent : `border-transparent opacity-60 hover:opacity-80`
                }`}
              >
                {type === 'hourly' ? t.hourly : type === 'monthly' ? t.monthly : t.yearly}
              </button>
            ))}
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="flex flex-col w-full max-w-xs mx-auto">
              <label className="text-xs uppercase mb-1.5 opacity-70 font-medium tracking-wider">{t.amount}</label>
              <input
                type="text"
                inputMode="numeric"
                value={salaryValue === 0 ? '' : salaryValue}
                onChange={handleSalaryChange}
                onFocus={(e) => e.target.select()}
                placeholder="0"
                className={`text-2xl font-semibold bg-transparent border-b-2 outline-none pb-2 pt-1 text-center w-full rounded-t transition-colors duration-200 ${styles.input}`}
              />
            </div>
          </div>
        </section>

        {/* Calculation Section */}
        <section className={`p-6 sm:p-7 rounded-3xl ${styles.card} text-center`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 ${styles.badge} text-xs font-medium tracking-wide`}>
            <span className="flex-shrink-0 inline-flex items-center justify-center">
              <IconBag className="w-3.5 h-3.5" />
            </span>
            <span>{t.productLabel}</span>
          </div>

          <div className="space-y-5 flex flex-col items-center">
            <div className="flex flex-col w-full max-w-xs mx-auto">
              <label className="text-xs uppercase mb-1.5 opacity-70 font-medium tracking-wider">{t.productName}</label>
              <input
                type="text"
                placeholder={t.productNamePlaceholder}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onFocus={(e) => e.target.select()}
                className={`text-lg font-bold bg-transparent border-b-2 outline-none pb-2 pt-1 text-center w-full rounded-t transition-colors duration-200 ${styles.input}`}
              />
            </div>
            <div className="flex flex-col w-full max-w-xs mx-auto">
              <label className="text-xs uppercase mb-1.5 opacity-70 font-medium tracking-wider">{t.productPrice}</label>
              <input
                type="text"
                inputMode="numeric"
                value={itemPrice === 0 ? '' : itemPrice}
                onChange={handlePriceChange}
                onFocus={(e) => e.target.select()}
                placeholder="0"
                className={`text-2xl font-semibold bg-transparent border-b-2 outline-none pb-2 pt-1 text-center w-full rounded-t transition-colors duration-200 ${styles.input}`}
              />
            </div>
          </div>
        </section>

        {/* Result Area - 結果卡 */}
        <div className={`rounded-3xl p-6 sm:p-8 ${styles.resultCard} transition-shadow duration-300`}>
          <p className={`text-center text-lg font-bold ${styles.textPrimary}`}>
            {itemName ? t.resultTitleFor(itemName) : t.resultTitleNoItem}
          </p>
          <p className={`text-center text-base mt-1 ${styles.textSecondary}`}>
            {t.resultEquivalent}
          </p>
          <div className="space-y-1.5 text-center mt-4">
            {[
              { value: result.yearsEquivalent, unit: t.resultYearSalary, format: (v) => Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 }) },
              { value: result.totalHours, unit: t.resultHours, format: (v) => Math.round(v).toLocaleString() },
              { value: result.workDays, unit: t.resultWorkDays, format: (v) => Math.round(v).toLocaleString() },
            ].map((row, i) => (
              <p key={i} className={`tabular-nums text-2xl sm:text-3xl font-bold ${styles.resultHighlight}`}>
                <span>{row.format(row.value)}</span>
                <span className="ml-1.5 font-bold">{row.unit}</span>
              </p>
            ))}
          </div>
          <div className={`text-center text-sm mt-5 ${styles.textSecondary}`}>
            <p className="opacity-60">{t.resultHoursNote}</p>
          </div>
          <p className={`text-center text-base sm:text-lg font-semibold mt-4 ${styles.resultHighlight}`}>
            {t.resultWorthIt}
          </p>
          {SHOW_RESULT_FOOTER && (
            <p className={`text-center text-sm mt-2 opacity-55 ${styles.textSecondary}`}>
              {t.resultCardFooter}
            </p>
          )}
        </div>

        {/* Ad Placeholder */}
        <div className={`w-full h-20 rounded-2xl border border-dashed flex items-center justify-center text-xs opacity-40 ${styles.divider}`}>
          {t.adSlot}
        </div>

        {/* Share Buttons - CTA 風格（點擊後先顯示廣告再下載） */}
        <div className="flex gap-3 sm:gap-4 pb-10">
          <button
            onClick={() => {
              setAdCountdown(AD_DURATION_SEC);
              setPendingShareType('post');
              setShowAdModal(true);
            }}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] ${styles.accent}`}
          >
            <IconShare className="w-5 h-5" />
            {t.sharePost}
          </button>
          <button
            onClick={() => {
              setAdCountdown(AD_DURATION_SEC);
              setPendingShareType('story');
              setShowAdModal(true);
            }}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] ${styles.accent}`}
          >
            <IconShare className="w-5 h-5" />
            {t.shareStory}
          </button>
        </div>

      </main>

      {/* Hidden Canvas for Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Footer Text + Social Icons */}
      <footer className={`text-center pb-10 text-[10px] uppercase tracking-widest ${styles.footer}`}>
        <p>BuyCalc © {new Date().getFullYear()} · {t.footer}</p>
        <div className="flex justify-center gap-4 mt-3">
          <a
            href="https://instagram.com/friendlycatgroup"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded-lg transition-colors ${theme === 'latte' ? 'hover:bg-[#6B5D54]/10 hover:text-[#6B5D54]' : 'hover:bg-neutral-200 hover:text-neutral-900'}`}
            aria-label="Instagram @friendlycatgroup"
          >
            <IconInstagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:workbyaria@gmail.com"
            className={`p-1.5 rounded-lg transition-colors ${theme === 'latte' ? 'hover:bg-[#6B5D54]/10 hover:text-[#6B5D54]' : 'hover:bg-neutral-200 hover:text-neutral-900'}`}
            aria-label="Email"
          >
            <IconEmail className="w-5 h-5" />
          </a>
        </div>
      </footer>

      {/* 廣告插頁 Modal：分享圖下載前顯示 */}
      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-3xl overflow-hidden ${theme === 'latte' ? 'bg-white' : 'bg-[#2e2e2e]'} shadow-2xl`}>
            <div className={`p-4 border-b flex justify-between items-center ${theme === 'latte' ? 'border-neutral-200' : 'border-neutral-500'}`}>
              <span className={`text-sm font-medium opacity-80 ${theme === 'minimal' ? 'text-neutral-300' : ''}`}>{t.adDownloadSoon}</span>
              <span className={`text-lg font-bold tabular-nums ${theme === 'latte' ? 'text-[#6B5D54]' : 'text-neutral-100'}`}>
                {t.adCountdown.replace('{{n}}', String(adCountdown))}
              </span>
            </div>
            <div className={`aspect-video flex items-center justify-center text-sm ${theme === 'latte' ? 'bg-neutral-100 text-neutral-400' : 'bg-neutral-800 text-neutral-500'}`}>
              {/* 廣告版位：之後可替換成 AdMob / 自訂影片或橫幅 */}
              廣告播放中…
            </div>
            <div className="p-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setShowAdModal(false);
                  setPendingShareType(null);
                  pendingShareRef.current = null;
                }}
                className={`px-6 py-2 rounded-xl border text-sm ${theme === 'latte' ? 'border-neutral-300 text-neutral-600 hover:bg-neutral-50' : 'border-neutral-500 text-neutral-400 hover:bg-neutral-600'}`}
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
