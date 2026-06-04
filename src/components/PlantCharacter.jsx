import React from 'react';

const STAGES = [
  { maxPct: 9,   label: { zh: '種子', zhCN: '种子', en: 'Seed',       es: 'Semilla'     } },
  { maxPct: 29,  label: { zh: '幼芽', zhCN: '幼芽', en: 'Sprout',     es: 'Brote'       } },
  { maxPct: 49,  label: { zh: '樹苗', zhCN: '树苗', en: 'Sapling',    es: 'Plántula'    } },
  { maxPct: 79,  label: { zh: '小樹', zhCN: '小树', en: 'Young Tree', es: 'Árbol Joven' } },
  { maxPct: 100, label: { zh: '大樹', zhCN: '大树', en: 'Full Tree',  es: 'Árbol Pleno' } },
];

function getStageIndex(pct) {
  const p = Math.max(0, Math.min(100, Number(pct) || 0));
  const idx = STAGES.findIndex((s) => p <= s.maxPct);
  return idx === -1 ? STAGES.length - 1 : idx;
}

function Soil() {
  return (
    <>
      <ellipse cx={60} cy={143} rx={50} ry={12} fill="#8B5E3C" />
      <ellipse cx={60} cy={139} rx={42} ry={7} fill="#a07040" />
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
      <circle cx={cx} cy={cy} r={r} fill={petalColor} opacity={0.92} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill={centerColor} />
    </>
  );
}

function SeedStage() {
  return (
    <>
      <Soil />
      <ellipse cx={60} cy={130} rx={10} ry={8} fill="#8B5E3C" />
      <ellipse cx={60} cy={126} rx={7} ry={5} fill="#a07040" />
      <path
        d="M60,121 C57,117 62,113 60,109"
        fill="none"
        stroke="#5abf6e"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </>
  );
}

function SproutStage() {
  return (
    <>
      <Soil />
      <rect x={57.5} y={106} width={5} height={24} rx={2.5} fill="#3fa855" />
      <ellipse cx={47} cy={115} rx={12} ry={6} fill="#5abf6e" transform="rotate(-28 47 115)" />
      <ellipse cx={73} cy={115} rx={12} ry={6} fill="#5abf6e" transform="rotate(28 73 115)" />
      <circle cx={60} cy={103} r={6} fill="#5abf6e" />
      <circle cx={60} cy={100.5} r={3.5} fill="#3fa855" />
    </>
  );
}

function SaplingStage() {
  return (
    <>
      <Soil />
      <rect x={57} y={88} width={6} height={42} rx={3} fill="#3fa855" />
      <ellipse cx={44} cy={112} rx={14} ry={7} fill="#3fa855" transform="rotate(-22 44 112)" />
      <ellipse cx={76} cy={112} rx={14} ry={7} fill="#3fa855" transform="rotate(22 76 112)" />
      <ellipse cx={47} cy={100} rx={13} ry={6.5} fill="#5abf6e" transform="rotate(-32 47 100)" />
      <ellipse cx={73} cy={100} rx={13} ry={6.5} fill="#5abf6e" transform="rotate(32 73 100)" />
      <circle cx={60} cy={80} r={16} fill="#5abf6e" />
      <circle cx={52} cy={83} r={10} fill="#5abf6e" />
      <circle cx={68} cy={83} r={10} fill="#5abf6e" />
      <circle cx={60} cy={76} r={12} fill="#5abf6e" />
    </>
  );
}

function YoungTreeStage() {
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

function FullTreeStage() {
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
      <Flower cx={47} cy={66} r={4} petalColor="#ffc0cb" />
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

const PLANT_STAGES = [SeedStage, SproutStage, SaplingStage, YoungTreeStage, FullTreeStage];

export default function PlantCharacter({ progressPercent = 0, language = 'zh', width = 120 }) {
  const height = Math.round(width * (155 / 120));
  const idx = getStageIndex(progressPercent);
  const stage = STAGES[idx];
  const PlantSVG = PLANT_STAGES[idx];
  const label = stage.label[language] ?? stage.label.en;

  return (
    <div key={idx} className="plant-character flex flex-col items-center select-none">
      <svg
        viewBox="0 0 120 155"
        width={width}
        height={height}
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <PlantSVG />
      </svg>
      {width >= 90 && (
        <span
          className="mt-1 rounded-full border px-3 py-0.5 text-[11px] font-semibold"
          style={{
            background: 'rgba(90, 191, 110, 0.14)',
            borderColor: 'rgba(90, 191, 110, 0.32)',
            color: '#2d8a42',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
