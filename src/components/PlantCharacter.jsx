import React from 'react';

const STAGES = [
  { maxPct: 9,   label: { zh: '種子', zhCN: '种子', en: 'Seed',       es: 'Semilla'     } },
  { maxPct: 29,  label: { zh: '幼芽', zhCN: '幼芽', en: 'Sprout',     es: 'Brote'       } },
  { maxPct: 49,  label: { zh: '樹苗', zhCN: '树苗', en: 'Sapling',    es: 'Plántula'    } },
  { maxPct: 79,  label: { zh: '小樹', zhCN: '小树', en: 'Young Tree', es: 'Árbol Joven' } },
  { maxPct: 100, label: { zh: '大樹', zhCN: '大树', en: 'Full Tree',  es: 'Árbol Pleno' } },
];

export function getStageIndex(pct) {
  const p = Math.max(0, Math.min(100, Number(pct) || 0));
  const idx = STAGES.findIndex((s) => p <= s.maxPct);
  return idx === -1 ? STAGES.length - 1 : idx;
}

/* ── Shared helpers ───────────────────────────────────────── */

function Soil() {
  return (
    <>
      <ellipse cx={60} cy={143} rx={50} ry={12} fill="#8B5E3C" />
      <ellipse cx={60} cy={139} rx={42} ry={7}  fill="#a07040" />
    </>
  );
}

function Sparkle({ cx, cy, r = 5, color = '#ffd700', opacity = 0.85 }) {
  const d = r * 0.65;
  return (
    <g opacity={opacity}>
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx - d} y1={cy - d} x2={cx + d} y2={cy + d} stroke={color} strokeWidth="1" strokeLinecap="round" />
      <line x1={cx + d} y1={cy - d} x2={cx - d} y2={cy + d} stroke={color} strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

function Flower({ cx, cy, r = 4, petalColor = '#ffffff', centerColor = '#ffd700' }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r}         fill={petalColor}  opacity={0.92} />
      <circle cx={cx} cy={cy} r={r * 0.42}  fill={centerColor} />
    </>
  );
}

function Star({ cx, cy, r = 8, color = '#ffd700' }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 - 90) * (Math.PI / 180);
    const rr = i % 2 === 0 ? r : r * 0.42;
    return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
  }).join(' ');
  return <polygon points={pts} fill={color} />;
}

/* ── OAK stages ───────────────────────────────────────────── */

function OakSeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={130} rx={10} ry={8}  fill="#8B5E3C" />
      <ellipse cx={60} cy={126} rx={7}  ry={5}  fill="#a07040" />
      <path d="M60,121 C57,117 62,113 60,109" fill="none" stroke="#5abf6e" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </>
  );
}
function OakSprout() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={106} width={5}  height={24} rx={2.5} fill="#3fa855" />
      <ellipse cx={47} cy={115} rx={12} ry={6}  fill="#5abf6e" transform="rotate(-28 47 115)" />
      <ellipse cx={73} cy={115} rx={12} ry={6}  fill="#5abf6e" transform="rotate(28 73 115)" />
      <circle  cx={60} cy={103} r={6}            fill="#5abf6e" />
      <circle  cx={60} cy={100.5} r={3.5}        fill="#3fa855" />
    </>
  );
}
function OakSapling() {
  return (
    <>
      <Soil />
      <rect x={57} y={88} width={6} height={42} rx={3} fill="#3fa855" />
      <ellipse cx={44} cy={112} rx={14} ry={7}   fill="#3fa855" transform="rotate(-22 44 112)" />
      <ellipse cx={76} cy={112} rx={14} ry={7}   fill="#3fa855" transform="rotate(22 76 112)" />
      <ellipse cx={47} cy={100} rx={13} ry={6.5} fill="#5abf6e" transform="rotate(-32 47 100)" />
      <ellipse cx={73} cy={100} rx={13} ry={6.5} fill="#5abf6e" transform="rotate(32 73 100)" />
      <circle cx={60} cy={80} r={16} fill="#5abf6e" />
      <circle cx={52} cy={83} r={10} fill="#5abf6e" />
      <circle cx={68} cy={83} r={10} fill="#5abf6e" />
      <circle cx={60} cy={76} r={12} fill="#5abf6e" />
    </>
  );
}
function OakYoung() {
  return (
    <>
      <Soil />
      <rect x={56} y={78} width={8} height={52} rx={4} fill="#2d8a42" />
      <circle cx={60} cy={58} r={28} fill="#3fa855" />
      <circle cx={44} cy={64} r={18} fill="#5abf6e" />
      <circle cx={76} cy={64} r={18} fill="#5abf6e" />
      <circle cx={60} cy={45} r={21} fill="#5abf6e" />
      <circle cx={60} cy={62} r={19} fill="#5abf6e" />
      <Flower cx={43} cy={55} r={4.5} />
      <Flower cx={77} cy={58} r={4} />
      <Flower cx={60} cy={40} r={4} />
      <Flower cx={53} cy={72} r={3.5} petalColor="#ffc0cb" />
    </>
  );
}
function OakFull() {
  return (
    <>
      <Soil />
      <rect x={55.5} y={72} width={9} height={58} rx={4.5} fill="#2d8a42" />
      <circle cx={60} cy={50} r={32} fill="#3fa855" />
      <circle cx={42} cy={58} r={21} fill="#5abf6e" />
      <circle cx={78} cy={58} r={21} fill="#5abf6e" />
      <circle cx={60} cy={36} r={25} fill="#5abf6e" />
      <circle cx={60} cy={54} r={22} fill="#5abf6e" />
      <circle cx={35} cy={50} r={15} fill="#3fa855" />
      <circle cx={85} cy={50} r={15} fill="#3fa855" />
      <Flower cx={38} cy={48} r={5} />
      <Flower cx={80} cy={46} r={4.5} />
      <Flower cx={60} cy={26} r={4.5} />
      <Flower cx={47} cy={66} r={4}   petalColor="#ffc0cb" />
      <Flower cx={73} cy={64} r={3.5} petalColor="#ffc0cb" />
      <Flower cx={53} cy={38} r={3.5} petalColor="#ffc0cb" centerColor="#ff8c69" />
      <Sparkle cx={18} cy={38} r={5} />
      <Sparkle cx={100} cy={40} r={4.5} />
      <Sparkle cx={22} cy={66} r={3.5} opacity={0.7} />
      <Sparkle cx={100} cy={68} r={3.5} opacity={0.75} />
      <Sparkle cx={84} cy={24} r={4} color="#ffc0cb" opacity={0.8} />
    </>
  );
}

/* ── CACTUS stages ────────────────────────────────────────── */

const CC = '#52b788';   // cactus main
const CL = '#74c69d';   // cactus light
const CD = '#2d6a4f';   // cactus dark / spines

function CactusSpines({ pairs }) {
  return (
    <>
      {pairs.map(([x, y, dir], i) => {
        const dx = dir === 'r' ? 5 : -5;
        return <line key={i} x1={x} y1={y} x2={x + dx} y2={y - 3} stroke={CD} strokeWidth="1.3" strokeLinecap="round" />;
      })}
    </>
  );
}

function CactusSeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={132} rx={8}  ry={6}  fill={CC} />
      <line x1={55} y1={130} x2={51} y2={126} stroke={CD} strokeWidth="1.2" strokeLinecap="round" />
      <line x1={65} y1={130} x2={69} y2={126} stroke={CD} strokeWidth="1.2" strokeLinecap="round" />
    </>
  );
}
function CactusSprout() {
  return (
    <>
      <Soil />
      <rect x={54} y={115} width={12} height={18} rx={6} fill={CC} />
      <CactusSpines pairs={[[53,122,'l'],[53,118,'l'],[67,122,'r'],[67,118,'r']]} />
    </>
  );
}
function CactusSapling() {
  return (
    <>
      <Soil />
      {/* body */}
      <rect x={53} y={97} width={14} height={33} rx={7}  fill={CC} />
      {/* right arm */}
      <rect x={67} y={105} width={15} height={9}  rx={4.5} fill={CC} />
      <rect x={74} y={91}  width={9}  height={17} rx={4.5} fill={CC} />
      {/* rib */}
      <line x1={60} y1={100} x2={60} y2={128} stroke={CD} strokeWidth="1" opacity={0.45} />
      <CactusSpines pairs={[[52,103,'l'],[52,110,'l'],[52,117,'l'],[68,103,'r'],[68,110,'r']]} />
    </>
  );
}
function CactusYoung() {
  return (
    <>
      <Soil />
      {/* body */}
      <rect x={53} y={83} width={14} height={47} rx={7}  fill={CC} />
      {/* left arm */}
      <rect x={37} y={100} width={16} height={9}  rx={4.5} fill={CC} />
      <rect x={37} y={86}  width={9}  height={17} rx={4.5} fill={CC} />
      {/* right arm */}
      <rect x={67} y={103} width={16} height={9}  rx={4.5} fill={CC} />
      <rect x={74} y={89}  width={9}  height={17} rx={4.5} fill={CC} />
      {/* ribs */}
      <line x1={60} y1={86} x2={60} y2={128} stroke={CD} strokeWidth="1.1" opacity={0.4} />
      <CactusSpines pairs={[[52,90,'l'],[52,97,'l'],[52,104,'l'],[52,112,'l'],[68,90,'r'],[68,97,'r'],[68,104,'r']]} />
    </>
  );
}
function CactusFull() {
  return (
    <>
      <Soil />
      {/* body */}
      <rect x={53} y={72} width={14} height={58} rx={7}  fill={CC} />
      {/* left arm */}
      <rect x={35} y={96}  width={18} height={9}  rx={4.5} fill={CC} />
      <rect x={35} y={82}  width={9}  height={17} rx={4.5} fill={CL} />
      {/* right arm */}
      <rect x={67} y={99}  width={18} height={9}  rx={4.5} fill={CC} />
      <rect x={76} y={85}  width={9}  height={17} rx={4.5} fill={CL} />
      {/* rib */}
      <line x1={60} y1={75} x2={60} y2={128} stroke={CD} strokeWidth="1.2" opacity={0.38} />
      {/* top flower */}
      <circle cx={60} cy={68} r={6}   fill="#ff6b6b" />
      <circle cx={60} cy={68} r={2.8} fill="#ffd700" />
      <circle cx={53} cy={70} r={2.5} fill="#ff6b6b" opacity={0.7} />
      <circle cx={67} cy={70} r={2.5} fill="#ff6b6b" opacity={0.7} />
      <CactusSpines pairs={[[52,78,'l'],[52,86,'l'],[52,94,'l'],[52,102,'l'],[52,110,'l'],[68,78,'r'],[68,86,'r'],[68,94,'r'],[68,102,'r']]} />
      <Sparkle cx={22} cy={55} r={4.5} />
      <Sparkle cx={97} cy={60} r={4} />
      <Sparkle cx={26} cy={80} r={3.5} opacity={0.7} />
    </>
  );
}

/* ── CHERRY stages ────────────────────────────────────────── */

const CT = '#7c4f2a';     // cherry trunk
const CP = '#ffb3c6';     // cherry petal light
const CPM = '#ff8fab';    // cherry petal medium
const CPD = '#e8607a';    // cherry petal dark

function CherrySeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={130} rx={10} ry={8}  fill="#8B5E3C" />
      <ellipse cx={60} cy={126} rx={7}  ry={5}  fill="#a07040" />
      <path d="M60,121 C57,117 62,113 60,109" fill="none" stroke={CP} strokeWidth="2" strokeLinecap="round" opacity={0.75} />
    </>
  );
}
function CherrySprout() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={116} width={5} height={16} rx={2.5} fill={CT} />
      <circle cx={55} cy={112} r={5}   fill={CP} />
      <circle cx={65} cy={110} r={5}   fill={CPM} />
      <circle cx={60} cy={108} r={4.5} fill={CP} />
      <circle cx={55} cy={112} r={2}   fill="white" opacity={0.7} />
      <circle cx={65} cy={110} r={2}   fill="white" opacity={0.7} />
    </>
  );
}
function CherrySapling() {
  return (
    <>
      <Soil />
      <rect x={57} y={98} width={6} height={32} rx={3} fill={CT} />
      <circle cx={60} cy={84} r={18} fill={CPM} />
      <circle cx={46} cy={88} r={12} fill={CP} />
      <circle cx={74} cy={88} r={12} fill={CP} />
      <circle cx={60} cy={74} r={14} fill={CP} />
      <Flower cx={55} cy={80} r={3.5} petalColor="white" centerColor="#ffb3c6" />
      <Flower cx={68} cy={82} r={3}   petalColor="white" centerColor={CPM} />
    </>
  );
}
function CherryYoung() {
  return (
    <>
      <Soil />
      <rect x={57} y={86} width={6} height={44} rx={3} fill={CT} />
      <circle cx={60} cy={68} r={26} fill={CPM} />
      <circle cx={44} cy={74} r={18} fill={CP} />
      <circle cx={76} cy={74} r={18} fill={CP} />
      <circle cx={60} cy={55} r={20} fill={CP} />
      <circle cx={60} cy={70} r={18} fill={CPM} />
      <Flower cx={46} cy={62} r={4}   petalColor="white" centerColor="#ffb3c6" />
      <Flower cx={74} cy={65} r={3.5} petalColor="white" centerColor={CPM} />
      <Flower cx={60} cy={50} r={3.5} petalColor="white" centerColor={CP} />
      <Flower cx={52} cy={76} r={3}   petalColor="white" centerColor={CPD} />
    </>
  );
}
function CherryFull() {
  return (
    <>
      <Soil />
      <rect x={57} y={80} width={7} height={50} rx={3.5} fill={CT} />
      {/* big pink cloud */}
      <circle cx={60} cy={54} r={30} fill={CPM} />
      <circle cx={42} cy={60} r={20} fill={CP} />
      <circle cx={78} cy={60} r={20} fill={CP} />
      <circle cx={60} cy={40} r={24} fill={CP} />
      <circle cx={60} cy={56} r={22} fill={CPM} />
      <circle cx={35} cy={52} r={14} fill={CPM} />
      <circle cx={85} cy={52} r={14} fill={CPM} />
      {/* flowers */}
      <Flower cx={40} cy={50} r={5}   petalColor="white" centerColor={CP} />
      <Flower cx={78} cy={48} r={4.5} petalColor="white" centerColor={CPM} />
      <Flower cx={60} cy={30} r={4.5} petalColor="white" centerColor={CP} />
      <Flower cx={46} cy={66} r={4}   petalColor="white" centerColor={CPD} />
      <Flower cx={74} cy={64} r={3.5} petalColor="white" centerColor={CPD} />
      {/* falling petals */}
      <ellipse cx={22} cy={48} rx={4} ry={2}  fill={CP} transform="rotate(-30 22 48)" opacity={0.8} />
      <ellipse cx={96} cy={52} rx={4} ry={1.8} fill={CPM} transform="rotate(25 96 52)" opacity={0.7} />
      <ellipse cx={18} cy={72} rx={3} ry={1.5} fill={CP} transform="rotate(-20 18 72)" opacity={0.6} />
      <ellipse cx={100} cy={68} rx={3} ry={1.5} fill={CPM} transform="rotate(35 100 68)" opacity={0.65} />
      <Sparkle cx={14} cy={60} r={4.5} color={CP} />
      <Sparkle cx={104} cy={44} r={4}  color={CPM} />
    </>
  );
}

/* ── PINE stages ──────────────────────────────────────────── */

const PT  = '#7c4f2a';   // pine trunk
const PD  = '#2e7d6e';   // pine dark
const PM  = '#3d9d8c';   // pine mid
const PL  = '#58bfad';   // pine light

function PineSeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={131} rx={8} ry={6} fill={PD} />
      <path d="M60,125 L60,118" stroke={PM} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}
function PineSprout() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={126} width={5} height={8} rx={2.5} fill={PT} />
      <path d="M60,122 L53,130 L67,130 Z" fill={PM} />
    </>
  );
}
function PineSapling() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={120} width={5} height={14} rx={2.5} fill={PT} />
      {/* tier 1 */}
      <path d="M60,103 L42,122 L78,122 Z" fill={PM} />
      {/* snow dots on branch tips */}
      <circle cx={44} cy={120} r={2} fill="white" opacity={0.65} />
      <circle cx={76} cy={120} r={2} fill="white" opacity={0.65} />
    </>
  );
}
function PineYoung() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={116} width={5} height={18} rx={2.5} fill={PT} />
      {/* tier 1 (lower) */}
      <path d="M60,100 L39,120 L81,120 Z" fill={PD} />
      {/* tier 2 (upper) */}
      <path d="M60,80 L43,104 L77,104 Z" fill={PM} />
      {/* snow dots */}
      <circle cx={41} cy={118} r={2.2} fill="white" opacity={0.65} />
      <circle cx={79} cy={118} r={2.2} fill="white" opacity={0.65} />
      <circle cx={45} cy={102} r={1.8} fill="white" opacity={0.6} />
      <circle cx={75} cy={102} r={1.8} fill="white" opacity={0.6} />
    </>
  );
}
function PineFull() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={114} width={5} height={20} rx={2.5} fill={PT} />
      {/* tier 1 */}
      <path d="M60,97 L37,118 L83,118 Z" fill={PD} />
      {/* tier 2 */}
      <path d="M60,76 L41,100 L79,100 Z" fill={PM} />
      {/* tier 3 */}
      <path d="M60,57 L44,80 L76,80 Z"   fill={PL} />
      {/* star on top */}
      <Star cx={60} cy={50} r={9} />
      {/* snow */}
      <circle cx={39} cy={116} r={2.4} fill="white" opacity={0.70} />
      <circle cx={81} cy={116} r={2.4} fill="white" opacity={0.70} />
      <circle cx={43} cy={98}  r={2}   fill="white" opacity={0.65} />
      <circle cx={77} cy={98}  r={2}   fill="white" opacity={0.65} />
      <circle cx={46} cy={78}  r={1.6} fill="white" opacity={0.60} />
      <circle cx={74} cy={78}  r={1.6} fill="white" opacity={0.60} />
      <Sparkle cx={20} cy={62} r={4.5} color="#a8e6cf" />
      <Sparkle cx={98} cy={58} r={4}   color="#a8e6cf" />
    </>
  );
}

/* ── PALM stages ──────────────────────────────────────────── */
// Fronds are quadratic bezier paths from trunk top — gives natural droop

const PAT = '#a0722a'; // palm trunk
const PAD = '#3d8a42'; // palm dark frond
const PAL = '#5abf6e'; // palm light frond
const PAC = '#4a3010'; // coconut

function PalmSeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={130} rx={11} ry={8}  fill={PAC} />
      <ellipse cx={60} cy={127} rx={8}  ry={5}  fill="#6b4820" />
      <path d="M60,122 C58,118 62,114 60,110" fill="none" stroke={PAL} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </>
  );
}
function PalmSprout() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={126} width={5} height={6}  rx={2.5} fill={PAT} />
      <path d="M60,126 Q46,118 38,122" stroke={PAL} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M60,126 Q74,118 82,122" stroke={PAD} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </>
  );
}
function PalmSapling() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={110} width={5} height={22} rx={2.5} fill={PAT} />
      <path d="M60,110 Q40,98 28,104" stroke={PAD} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M60,110 Q50,96 48,86" stroke={PAL} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M60,110 Q70,96 72,86" stroke={PAD} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M60,110 Q80,98 92,104" stroke={PAL} strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  );
}
function PalmYoung() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={93} width={5.5} height={39} rx={2.8} fill={PAT} />
      <path d="M60,93 Q38,78 24,86" stroke={PAD} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M60,93 Q46,77 42,65" stroke={PAL} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M60,93 Q60,74 60,62" stroke={PAD} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M60,93 Q74,77 78,65" stroke={PAL} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M60,93 Q82,78 96,86" stroke={PAD} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M60,93 Q32,90 18,100" stroke={PAL} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </>
  );
}
function PalmFull() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={78} width={6} height={54} rx={3} fill={PAT} />
      {[
        ['M60,78 Q36,62 20,70', PAD, 6],
        ['M60,78 Q44,60 38,48', PAL, 6],
        ['M60,78 Q60,58 60,46', PAD, 6],
        ['M60,78 Q76,60 82,48', PAL, 6],
        ['M60,78 Q84,62 100,70', PAD, 6],
        ['M60,78 Q28,74 14,86', PAL, 5],
        ['M60,78 Q92,74 106,86', PAD, 5],
        ['M60,82 Q46,78 30,86', PAL, 4.5],
      ].map(([d, col, w], i) => (
        <path key={i} d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
      ))}
      <circle cx={53} cy={80} r={5.5} fill={PAC} />
      <circle cx={64} cy={78} r={5}   fill={PAC} />
      <circle cx={57} cy={86} r={4.5} fill={PAC} />
      <Sparkle cx={15} cy={52} r={4.5} color="#90ee90" />
      <Sparkle cx={105} cy={48} r={4}  color="#90ee90" />
    </>
  );
}

/* ── BANANA stages ────────────────────────────────────────── */

const BAS = '#4a7c3c'; // banana stem
const BAL = '#2d5e1e'; // banana leaf dark
const BAM = '#3d7230'; // banana leaf mid
const BAY = '#ffd700'; // banana fruit

function BananaSeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={130} rx={9} ry={7}  fill={BAS} />
      <path d="M60,123 C58,118 63,113 60,108" fill="none" stroke="#74c69d" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </>
  );
}
function BananaSprout() {
  return (
    <>
      <Soil />
      <rect x={56.5} y={118} width={7} height={14} rx={3.5} fill={BAS} />
      <path d="M60,118 Q40,104 28,112" stroke={BAL} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M60,118 Q40,104 28,112" stroke={BAM} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}
function BananaSapling() {
  return (
    <>
      <Soil />
      <rect x={56} y={100} width={8} height={32} rx={4} fill={BAS} />
      <path d="M60,100 Q36,82 18,92" stroke={BAL} strokeWidth="13" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M60,100 Q36,82 18,92" stroke={BAM} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M60,108 Q84,92 100,100" stroke={BAL} strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M60,108 Q84,92 100,100" stroke={BAM} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M60,100 Q62,78 60,66" stroke={BAL} strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M60,100 Q62,78 60,66" stroke={BAM} strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}
function BananaYoung() {
  return (
    <>
      <Soil />
      <rect x={56} y={85} width={8} height={47} rx={4} fill={BAS} />
      {[
        ['M60,85 Q34,65 14,76', BAL, 14, BAM],
        ['M60,92 Q86,72 106,82', BAL, 13, BAM],
        ['M60,85 Q62,62 58,50', BAL, 12, BAM],
        ['M60,96 Q30,82 14,94', BAL, 11, BAM],
        ['M60,96 Q90,82 106,92', BAL, 10, BAM],
      ].map(([d, col, w, rib], i) => (
        <g key={i}>
          <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" opacity="0.92" />
          <path d={d} stroke={rib} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}
function BananaFull() {
  return (
    <>
      <Soil />
      <rect x={56} y={72} width={9} height={60} rx={4.5} fill={BAS} />
      {[
        ['M60,72 Q32,50 10,62', BAL, 15, BAM],
        ['M60,80 Q88,58 110,68', BAL, 14, BAM],
        ['M60,72 Q62,48 58,34', BAL, 13, BAM],
        ['M60,82 Q28,66 10,80', BAL, 12, BAM],
        ['M60,82 Q92,66 110,78', BAL, 11, BAM],
        ['M60,88 Q60,68 58,56', BAL, 10, BAM],
      ].map(([d, col, w, rib], i) => (
        <g key={i}>
          <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" opacity="0.92" />
          <path d={d} stroke={rib} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {/* banana bunch */}
      <ellipse cx={56} cy={70} rx={4.5} ry={9} fill={BAY} transform="rotate(-20 56 70)" />
      <ellipse cx={64} cy={68} rx={4.5} ry={9} fill="#f5c800" />
      <ellipse cx={70} cy={72} rx={4}   ry={8} fill={BAY} transform="rotate(22 70 72)" />
      <Sparkle cx={12} cy={45} r={4.5} color="#90ee90" />
      <Sparkle cx={108} cy={42} r={4}  color="#90ee90" />
    </>
  );
}

/* ── HIBISCUS stages ──────────────────────────────────────── */

const HIS = '#3d6b2c'; // hibiscus stem
const HIL = '#2d5e1e'; // hibiscus leaf
const HIF = '#ff4d6d'; // flower main
const HIB = '#ff6635'; // flower accent

function HibiscusFlower({ cx, cy, r = 7 }) {
  const petals = [0, 72, 144, 216, 288].map((deg, i) => {
    const rad = deg * Math.PI / 180;
    const px = cx + Math.cos(rad) * r * 0.52;
    const py = cy + Math.sin(rad) * r * 0.52;
    return <circle key={i} cx={px} cy={py} r={r * 0.52} fill={i % 2 === 0 ? HIF : HIB} opacity={0.90} />;
  });
  return (
    <>
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.26} fill="#ffd700" />
    </>
  );
}

function HibiscusSeed() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={131} rx={8} ry={6}  fill={HIS} />
      <circle  cx={60} cy={125} r={4.5}         fill={HIF} opacity={0.7} />
      <circle  cx={60} cy={125} r={2}            fill="#ffd700" opacity={0.8} />
    </>
  );
}
function HibiscusSprout() {
  return (
    <>
      <Soil />
      <rect x={58} y={118} width={4} height={14} rx={2} fill={HIS} />
      <ellipse cx={52} cy={122} rx={8} ry={3.5} fill={HIL} transform="rotate(-25 52 122)" />
      <HibiscusFlower cx={60} cy={114} r={6} />
    </>
  );
}
function HibiscusSapling() {
  return (
    <>
      <Soil />
      <rect x={58} y={100} width={4} height={32} rx={2} fill={HIS} />
      <path d="M60,108 Q46,103 38,96" stroke={HIS} strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx={44} cy={102} rx={10} ry={4} fill={HIL} transform="rotate(-28 44 102)" />
      <ellipse cx={72} cy={106} rx={10} ry={4} fill={HIL} transform="rotate(20 72 106)" />
      <HibiscusFlower cx={36} cy={92} r={7.5} />
      <HibiscusFlower cx={60} cy={96} r={6.5} />
    </>
  );
}
function HibiscusYoung() {
  return (
    <>
      <Soil />
      <rect x={58} y={88} width={4} height={44} rx={2} fill={HIS} />
      <path d="M60,96 Q44,90 34,82"  stroke={HIS} strokeWidth="3"   fill="none" strokeLinecap="round" />
      <path d="M60,100 Q76,94 86,88" stroke={HIS} strokeWidth="3"   fill="none" strokeLinecap="round" />
      <path d="M60,106 Q42,98 30,92" stroke={HIS} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx={40} cy={88}  rx={11} ry={4.5} fill={HIL} transform="rotate(-30 40 88)"  />
      <ellipse cx={80} cy={92}  rx={11} ry={4.5} fill={HIL} transform="rotate(22 80 92)"   />
      <ellipse cx={35} cy={100} rx={10} ry={4}   fill={HIL} transform="rotate(-38 35 100)" />
      <HibiscusFlower cx={33} cy={80}  r={8}   />
      <HibiscusFlower cx={86} cy={84}  r={7.5} />
      <HibiscusFlower cx={30} cy={92}  r={6.5} />
    </>
  );
}
function HibiscusFull() {
  return (
    <>
      <Soil />
      <rect x={58} y={80} width={4} height={52} rx={2} fill={HIS} />
      <path d="M60,88 Q42,81 30,72"  stroke={HIS} strokeWidth="3"   fill="none" strokeLinecap="round" />
      <path d="M60,92 Q78,85 90,76"  stroke={HIS} strokeWidth="3"   fill="none" strokeLinecap="round" />
      <path d="M60,98 Q40,90 26,84"  stroke={HIS} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M60,102 Q80,94 94,88" stroke={HIS} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[
        [42,86,11,4.5,-28], [78,90,11,4.5,22], [32,98,10,4,-36],
        [88,96,10,4,30],    [45,74, 9,4,-20],  [76,76, 9,4,18],
      ].map(([x,y,rx,ry,a],i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={HIL} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <HibiscusFlower cx={30} cy={70}  r={8.5} />
      <HibiscusFlower cx={90} cy={72}  r={8}   />
      <HibiscusFlower cx={28} cy={84}  r={7}   />
      <HibiscusFlower cx={92} cy={88}  r={6.5} />
      <HibiscusFlower cx={60} cy={76}  r={7.5} />
      <Sparkle cx={16} cy={58} r={4.5} color={HIF} />
      <Sparkle cx={104} cy={56} r={4}  color={HIB} />
    </>
  );
}

/* ── BAMBOO stages ────────────────────────────────────────── */

const BAB = '#90be6d'; // bamboo stalk light
const BAK = '#6a994e'; // bamboo stalk dark / node
const BAG = '#a0d080'; // bamboo stalk lighter
const BAF = '#5abf6e'; // bamboo leaf

function BambooSeed() {
  return (
    <>
      <Soil />
      <rect x={58} y={128} width={4} height={5} rx={2} fill={BAB} />
      <path d="M60,128 C58,124 62,120 60,116" fill="none" stroke={BAF} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
    </>
  );
}
function BambooSprout() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={110} width={5} height={22} rx={2.5} fill={BAB} />
      <rect x={56.5} y={120} width={7} height={3}  rx={1.5} fill={BAK} />
      <ellipse cx={52} cy={112} rx={9} ry={3} fill={BAF} transform="rotate(-30 52 112)" />
      <ellipse cx={68} cy={114} rx={9} ry={3} fill={BAF} transform="rotate(35 68 114)" />
    </>
  );
}
function BambooSapling() {
  return (
    <>
      <Soil />
      <rect x={57} y={88}  width={6} height={44} rx={3}   fill={BAB} />
      <rect x={56} y={100} width={8} height={3}  rx={1.5} fill={BAK} />
      <rect x={56} y={114} width={8} height={3}  rx={1.5} fill={BAK} />
      <rect x={57} y={102} width={5} height={28} rx={2.5} fill={BAG} opacity={0.7} />
      <rect x={66} y={105} width={5} height={25} rx={2.5} fill={BAB} />
      <rect x={65} y={116} width={7} height={2.5} rx={1.2} fill={BAK} />
      <ellipse cx={50} cy={90}  rx={10} ry={3.5} fill={BAF} transform="rotate(-35 50 90)"  />
      <ellipse cx={70} cy={93}  rx={10} ry={3.5} fill={BAF} transform="rotate(32 70 93)"   />
      <ellipse cx={72} cy={105} rx={9}  ry={3}   fill={BAF} transform="rotate(40 72 105)"  />
    </>
  );
}
function BambooYoung() {
  return (
    <>
      <Soil />
      <rect x={48} y={78}  width={7} height={54} rx={3.5} fill={BAB} />
      {[92, 106, 120].map(y => <rect key={y} x={47} y={y} width={9} height={3} rx={1.5} fill={BAK} />)}
      <rect x={60} y={90}  width={6} height={42} rx={3}   fill={BAB} />
      {[102, 116].map(y => <rect key={y} x={59} y={y} width={8} height={3} rx={1.5} fill={BAK} />)}
      <rect x={70} y={100} width={5} height={30} rx={2.5} fill={BAG} />
      <rect x={69} y={112} width={7} height={2.5} rx={1.2} fill={BAK} />
      {[
        [42,82,11,3.5,-38],[56,80,11,3.5,28],[66,88,10,3.5,-30],
        [74,100,9,3,42],[54,104,9,3,-25],[72,112,8,3,35],
      ].map(([x,y,rx,ry,a],i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={BAF} transform={`rotate(${a} ${x} ${y})`} />
      ))}
    </>
  );
}
function BambooFull() {
  return (
    <>
      <Soil />
      <rect x={44} y={70}  width={7} height={62} rx={3.5} fill={BAB} />
      {[84,98,112,126].map(y => <rect key={y} x={43} y={y} width={9} height={3} rx={1.5} fill={BAK} />)}
      <rect x={56} y={80}  width={6.5} height={52} rx={3.5} fill={BAB} />
      {[93,107,121].map(y => <rect key={y} x={55} y={y} width={8.5} height={3} rx={1.5} fill={BAK} />)}
      <rect x={67} y={90}  width={6} height={42} rx={3}   fill={BAG} />
      {[103,117].map(y => <rect key={y} x={66} y={y} width={8} height={3} rx={1.5} fill={BAK} />)}
      <rect x={76} y={102} width={5} height={28} rx={2.5} fill={BAB} opacity={0.85} />
      <rect x={75} y={114} width={7} height={2.5} rx={1.2} fill={BAK} />
      {[
        [38,74,12,4,-40],[52,72,12,4,30],[62,80,11,4,-32],
        [40,90,10,3.5,-42],[58,90,10,3.5,26],[70,96,10,3.5,-28],
        [74,104,9,3,45],[54,106,9,3,-24],[74,116,8,3,38],
        [42,106,9,3.5,-35],[58,112,9,3.5,22],
      ].map(([x,y,rx,ry,a],i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={BAF} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <Sparkle cx={20} cy={58} r={4.5} color={BAF} />
      <Sparkle cx={100} cy={54} r={4}  color={BAG} />
    </>
  );
}

/* ── Variant registry ─────────────────────────────────────── */

const OAK_STAGES      = [OakSeed,      OakSprout,      OakSapling,      OakYoung,      OakFull      ];
const CACTUS_STAGES   = [CactusSeed,   CactusSprout,   CactusSapling,   CactusYoung,   CactusFull   ];
const CHERRY_STAGES   = [CherrySeed,   CherrySprout,   CherrySapling,   CherryYoung,   CherryFull   ];
const PINE_STAGES     = [PineSeed,     PineSprout,     PineSapling,     PineYoung,     PineFull     ];
const PALM_STAGES     = [PalmSeed,     PalmSprout,     PalmSapling,     PalmYoung,     PalmFull     ];
const BANANA_STAGES   = [BananaSeed,   BananaSprout,   BananaSapling,   BananaYoung,   BananaFull   ];
const HIBISCUS_STAGES = [HibiscusSeed, HibiscusSprout, HibiscusSapling, HibiscusYoung, HibiscusFull ];
const BAMBOO_STAGES   = [BambooSeed,   BambooSprout,   BambooSapling,   BambooYoung,   BambooFull   ];

const VARIANT_STAGES = {
  oak: OAK_STAGES, cactus: CACTUS_STAGES, cherry: CHERRY_STAGES, pine: PINE_STAGES,
  palm: PALM_STAGES, banana: BANANA_STAGES, hibiscus: HIBISCUS_STAGES, bamboo: BAMBOO_STAGES,
};

export const VARIANT_NAMES = {
  oak:      { zh: '橡樹',   zhCN: '橡树',   en: 'Oak',      es: 'Roble'    },
  cactus:   { zh: '仙人掌', zhCN: '仙人掌', en: 'Cactus',   es: 'Cactus'   },
  cherry:   { zh: '櫻花樹', zhCN: '樱花树', en: 'Cherry',   es: 'Cerezo'   },
  pine:     { zh: '松樹',   zhCN: '松树',   en: 'Pine',     es: 'Pino'     },
  palm:     { zh: '棕櫚',   zhCN: '棕榈',   en: 'Palm',     es: 'Palma'    },
  banana:   { zh: '香蕉樹', zhCN: '香蕉树', en: 'Banana',   es: 'Bananero' },
  hibiscus: { zh: '芙蓉花', zhCN: '芙蓉花', en: 'Hibiscus', es: 'Hibisco'  },
  bamboo:   { zh: '竹子',   zhCN: '竹子',   en: 'Bamboo',   es: 'Bambú'    },
};

export default function PlantCharacter({ progressPercent = 0, language = 'zh', width = 120, variant = 'oak', hideLevelBadge = false }) {
  const height   = Math.round(width * (155 / 120));
  const idx      = getStageIndex(progressPercent);
  const stages   = VARIANT_STAGES[variant] ?? OAK_STAGES;
  const PlantSVG = stages[idx];
  const level = idx + 1;

  return (
    <div key={`${variant}-${idx}`} className="plant-character flex flex-col items-center select-none">
      <svg viewBox="0 0 120 155" width={width} height={height} aria-hidden="true" style={{ overflow: 'visible' }}>
        <PlantSVG />
      </svg>
      {!hideLevelBadge && width >= 90 && (
        <span
          className="mt-1 rounded-full border px-3 py-0.5 text-[11px] font-semibold tabular-nums"
          style={{ background: 'rgba(90,191,110,0.14)', borderColor: 'rgba(90,191,110,0.32)', color: '#2d8a42' }}
        >
          Lv.{level}
        </span>
      )}
    </div>
  );
}
