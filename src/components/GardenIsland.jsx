import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PlantCharacter, { getStageIndex, getStageName, VARIANT_NAMES } from './PlantCharacter.jsx';

/* ── Island configs ───────────────────────────────────────── */
// Bottom row: 4 larger plants (slots 0-3) — appear in front
// Top row:    3 smaller plants (slots 4-6) — appear behind, in the gaps
const GRASSLAND_PLOTS = [
  { variant: 'oak',    unlockDrops: 0   }, // bottom row
  { variant: 'cactus', unlockDrops: 10  },
  { variant: 'cherry', unlockDrops: 40  },
  { variant: 'pine',   unlockDrops: 100 },
  { variant: 'cherry', unlockDrops: 20  }, // top row
  { variant: 'pine',   unlockDrops: 70  },
  { variant: 'oak',    unlockDrops: 130 },
];
const RAINFOREST_PLOTS = [
  { variant: 'palm',     unlockDrops: 30  }, // bottom row
  { variant: 'banana',   unlockDrops: 50  },
  { variant: 'hibiscus', unlockDrops: 80  },
  { variant: 'bamboo',   unlockDrops: 150 },
  { variant: 'banana',   unlockDrops: 45  }, // top row
  { variant: 'palm',     unlockDrops: 90  },
  { variant: 'hibiscus', unlockDrops: 170 },
];
const ISLAND_PLOTS = { grassland: GRASSLAND_PLOTS, rainforest: RAINFOREST_PLOTS };

const BOTTOM_ROW = [
  { slotIdx: 0, width: 78 },
  { slotIdx: 1, width: 56 },
  { slotIdx: 2, width: 54 },
  { slotIdx: 3, width: 74 },
];
const TOP_ROW = [
  { slotIdx: 4, width: 54 },
  { slotIdx: 5, width: 50 },
  { slotIdx: 6, width: 56 },
];

/* ── Sky decorations ──────────────────────────────────────── */
function SkyGrassland() {
  return (
    <svg viewBox="0 0 400 250" width="100%" style={{ display: 'block' }} aria-hidden="true">
      {/* Sun — upper right */}
      <g transform="translate(358,52)">
        {[0,45,90,135,180,225,270,315].map((a, i) => {
          const rad = a * Math.PI / 180;
          return <line key={i} x1={Math.cos(rad)*18} y1={Math.sin(rad)*18}
            x2={Math.cos(rad)*28} y2={Math.sin(rad)*28}
            stroke="#ffd700" strokeWidth="3" strokeLinecap="round" />;
        })}
        <circle r={17} fill="#ffd700" />
        <circle r={13} fill="#ffe84e" />
      </g>
      {/* Rainbow — center below viewBox, only colourful tops show */}
      <g opacity="0.62">
        {[
          [138, '#ff4444'], [131, '#ff9900'], [124, '#ffee00'],
          [117, '#44bb44'], [110, '#4499ff'], [103, '#9944dd'],
        ].map(([r, c], i) => (
          <path key={i} d={`M${200-r},268 A${r},${r} 0 0,1 ${200+r},268`}
            fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
        ))}
      </g>
      {/* Cloud left — mid sky */}
      <g opacity="0.42">
        <circle cx="48"  cy="140" r="20" fill="white" />
        <circle cx="72"  cy="128" r="25" fill="white" />
        <circle cx="98"  cy="138" r="18" fill="white" />
      </g>
      {/* Cloud right — faint */}
      <g opacity="0.28">
        <circle cx="310" cy="120" r="22" fill="white" />
        <circle cx="338" cy="110" r="28" fill="white" />
        <circle cx="362" cy="122" r="18" fill="white" />
      </g>
      {/* Butterfly */}
      <g transform="translate(162,88)" opacity="0.52">
        <path d="M0,0 Q-14,-10 -18,-2 Q-10,6 0,0 Q14,-10 18,-2 Q10,6 0,0Z" fill="#ffb347" />
      </g>
      {/* Bird pair */}
      <g transform="translate(272,72)" opacity="0.38" fill="none" stroke="#5da8e8" strokeWidth="1.6" strokeLinecap="round">
        <path d="M0,0 Q-8,-5 -14,-2" />
        <path d="M0,0 Q8,-5 14,-2" />
        <path d="M18,8 Q10,3 4,6" />
        <path d="M18,8 Q26,3 32,6" />
      </g>
    </svg>
  );
}

function SkyRainforest() {
  return (
    <svg viewBox="0 0 400 250" width="100%" style={{ display: 'block' }} aria-hidden="true">
      {/* Sun — upper right */}
      <g transform="translate(352,48)">
        {[0,45,90,135,180,225,270,315].map((a, i) => {
          const rad = a * Math.PI / 180;
          return <line key={i} x1={Math.cos(rad)*18} y1={Math.sin(rad)*18}
            x2={Math.cos(rad)*26} y2={Math.sin(rad)*26}
            stroke="#ffd700" strokeWidth="2.8" strokeLinecap="round" opacity="0.78" />;
        })}
        <circle r={16} fill="#ffd700" opacity="0.90" />
      </g>
      {/* Large tropical cloud — left */}
      <g opacity="0.78">
        <circle cx="52"  cy="100" r="26" fill="white" />
        <circle cx="80"  cy="82"  r="32" fill="white" />
        <circle cx="112" cy="94"  r="26" fill="white" />
        <circle cx="105" cy="120" r="20" fill="white" />
        {[50,66,82,98].map((x, i) => (
          <line key={i} x1={x} y1={128} x2={x-4} y2={148}
            stroke="#5da8e8" strokeWidth="2" strokeLinecap="round" opacity="0.58" />
        ))}
      </g>
      {/* Cloud right — behind sun */}
      <g opacity="0.70">
        <circle cx="308" cy="68"  r="28" fill="white" />
        <circle cx="340" cy="56"  r="26" fill="white" />
        <circle cx="366" cy="70"  r="22" fill="white" />
      </g>
      {/* Misty mid-sky band */}
      <ellipse cx="200" cy="185" rx="200" ry="30" fill="white" opacity="0.10" />
      {/* Parrot */}
      <g transform="translate(198,118)" opacity="0.60" fill="#ff6b35">
        <ellipse cx="0" cy="0" rx="6" ry="8" />
        <path d="M-6,-4 Q-18,-14 -22,-8 Q-16,0 -6,-4Z" />
        <path d="M6,-4 Q18,-14 22,-8 Q16,0 6,-4Z" />
        <circle cx="0" cy="-6" r="4" fill="#ffb347" />
      </g>
      {/* Tropical birds */}
      <g opacity="0.36" fill="none" stroke="#74c69d" strokeWidth="1.5" strokeLinecap="round">
        <path d="M278,92 Q270,87 264,89" />
        <path d="M278,92 Q286,87 292,89" />
        <path d="M298,108 Q291,103 285,105" />
        <path d="M298,108 Q305,103 311,105" />
      </g>
    </svg>
  );
}

/* ── Island platform SVGs (taller) ───────────────────────── */
function IslandPlatformGrassland() {
  // viewBox 0 0 380 270 = 50 % taller than previous 180 (all y ×1.5)
  return (
    <svg viewBox="0 0 380 270" width="100%" style={{ display: 'block' }}>
      <ellipse cx="190" cy="267" rx="155" ry="15"  fill="rgba(0,0,0,0.09)" />
      <ellipse cx="190" cy="249" rx="168" ry="39"  fill="#5a3318" />
      <ellipse cx="190" cy="228" rx="164" ry="33"  fill="#7b4e28" />
      <ellipse cx="190" cy="204" rx="168" ry="51"  fill="#8B5E3C" />
      <ellipse cx="190" cy="183" rx="168" ry="42"  fill="#a07040" opacity="0.38" />
      <ellipse cx="190" cy="135" rx="168" ry="66"  fill="#3d9432" />
      <ellipse cx="190" cy="120" rx="168" ry="66"  fill="#5caf50" />
      <ellipse cx="122" cy="87"  rx="106" ry="27"  fill="#7dcf6e" opacity="0.44" />
      <ellipse cx="308" cy="105" rx="62"  ry="15"  fill="#7dcf6e" opacity="0.28" />
      <circle cx="62"  cy="111" r="4.2" fill="white"   opacity="0.80" />
      <circle cx="62"  cy="111" r="1.9" fill="#ffd700" opacity="0.94" />
      <circle cx="320" cy="102" r="3.6" fill="white"   opacity="0.65" />
      <circle cx="320" cy="102" r="1.6" fill="#ffd700" opacity="0.80" />
      <circle cx="190" cy="69"  r="3.6" fill="white"   opacity="0.54" />
      <circle cx="190" cy="69"  r="1.6" fill="#ffc0cb" opacity="0.70" />
      <circle cx="108" cy="90"  r="2.8" fill="white"   opacity="0.48" />
      <circle cx="108" cy="90"  r="1.2" fill="#a8e6cf" opacity="0.64" />
      <circle cx="268" cy="99"  r="2.6" fill="white"   opacity="0.44" />
      <circle cx="268" cy="99"  r="1.1" fill="#ffd700" opacity="0.60" />
      <ellipse cx="86"  cy="126" rx="12" ry="7"  fill="#9a7a5c" opacity="0.42" />
      <ellipse cx="306" cy="120" rx="10" ry="6"  fill="#9a7a5c" opacity="0.36" />
    </svg>
  );
}

function IslandPlatformRainforest() {
  return (
    <svg viewBox="0 0 380 270" width="100%" style={{ display: 'block' }}>
      <ellipse cx="190" cy="267" rx="155" ry="15"  fill="rgba(0,0,0,0.11)" />
      <ellipse cx="190" cy="249" rx="168" ry="39"  fill="#1a0c04" />
      <ellipse cx="190" cy="228" rx="164" ry="33"  fill="#2a1508" />
      <ellipse cx="190" cy="204" rx="168" ry="51"  fill="#3d2010" />
      <ellipse cx="190" cy="135" rx="168" ry="66"  fill="#1a6644" />
      <ellipse cx="190" cy="120" rx="168" ry="66"  fill="#2d8a42" />
      <ellipse cx="122" cy="87"  rx="106" ry="27"  fill="#3da552" opacity="0.44" />
      <ellipse cx="308" cy="105" rx="62"  ry="15"  fill="#3da552" opacity="0.28" />
      <circle cx="64"  cy="111" r="4.2" fill="#ff4d2d" opacity="0.84" />
      <circle cx="64"  cy="111" r="1.9" fill="#ffd700" opacity="0.95" />
      <circle cx="318" cy="102" r="3.6" fill="#ff6b35" opacity="0.74" />
      <circle cx="318" cy="102" r="1.6" fill="#ffd700" opacity="0.88" />
      <circle cx="190" cy="69"  r="3.6" fill="#ff4d2d" opacity="0.62" />
      <circle cx="190" cy="69"  r="1.6" fill="#ffd700" opacity="0.78" />
      <ellipse cx="38"  cy="126" rx="26" ry="10" fill="#3aa8d0" opacity="0.45" />
      <ellipse cx="38"  cy="121" rx="22" ry="7"  fill="#5bc8f0" opacity="0.34" />
      <ellipse cx="92"  cy="126" rx="13" ry="7"  fill="#7a4520" opacity="0.40" />
      <ellipse cx="307" cy="120" rx="11" ry="6"  fill="#7a4520" opacity="0.36" />
    </svg>
  );
}

const SKY   = { grassland: SkyGrassland,          rainforest: SkyRainforest          };
const PLAT  = { grassland: IslandPlatformGrassland, rainforest: IslandPlatformRainforest };

/* ── LockedPlot ───────────────────────────────────────────── */
function LockedPlot({ width, unlockDrops }) {
  const height = Math.round(width * (155 / 120));
  return (
    <div className="relative flex flex-col items-center justify-end select-none" style={{ width, height }}>
      <div
        className="absolute flex flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed"
        style={{
          width: Math.round(width * 0.70), height: Math.round(width * 0.70),
          top: '8%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.20)',
          borderColor: 'rgba(168,196,212,0.55)',
        }}
      >
        <span style={{ fontSize: Math.max(14, Math.round(width * 0.28)) }}>🔒</span>
        {unlockDrops > 0 && (
          <span className="rounded-full px-1.5 font-bold tabular-nums" style={{
            fontSize: Math.max(8, Math.round(width * 0.13)),
            background: 'rgba(93,168,232,0.20)', color: '#2a6a9e',
            border: '1px solid rgba(93,168,232,0.30)', lineHeight: 1.6,
          }}>
            💧{unlockDrops}
          </span>
        )}
      </div>
      <svg viewBox="0 0 120 26" width={width} style={{ display: 'block' }}>
        <ellipse cx="60" cy="20" rx="50" ry="11" fill="#8B5E3C" opacity="0.35" />
        <ellipse cx="60" cy="16" rx="42" ry="7"  fill="#a07040" opacity="0.28" />
      </svg>
    </div>
  );
}

/* ── Plant detail popup — collectible card style ──────────── */
const LEVEL_COLORS = ['#8B6914', '#74c69d', '#5caf50', '#f0a030', '#2d8a42'];

function PlantDetailPopup({ slot, plotIndex, plots, language, onClose }) {
  const plot      = plots[plotIndex];
  const stageIdx  = getStageIndex(slot.progress);
  const stageName = getStageName(slot.progress, language);
  const varName   = VARIANT_NAMES[plot.variant]?.[language] ?? VARIANT_NAMES[plot.variant]?.en ?? '';
  const level     = stageIdx + 1;
  const lc        = LEVEL_COLORS[stageIdx] ?? '#5caf50';

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[300px] overflow-hidden rounded-[32px]"
        style={{
          background: '#ffffff',
          border: `2px solid ${lc}30`,
          boxShadow: `0 12px 48px rgba(0,0,0,0.30), 0 0 0 1px ${lc}22`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header stripe */}
        <div className="h-2.5 w-full" style={{ background: `linear-gradient(90deg, ${lc}, ${lc}99)` }} />

        {/* Plant illustration */}
        <div className="flex justify-center pt-5 pb-1">
          <PlantCharacter progressPercent={slot.progress} language={language} width={118} variant={plot.variant} />
        </div>

        {/* Species badge */}
        <div className="flex justify-center mb-2">
          <span
            className="rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.14em]"
            style={{ background: lc + '20', color: lc, border: `1.5px solid ${lc}44` }}
          >
            {varName}
          </span>
        </div>

        {/* Stage name + level */}
        <p className="text-center text-lg font-black text-[var(--color-text)] leading-tight">{stageName}</p>
        <p className="text-center text-xs text-[var(--color-subtext)] mt-0.5">Level {level} / 5</p>

        {/* Progress bar */}
        <div className="mx-5 mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--color-subtext)] uppercase tracking-wide">Growth</span>
            <span className="text-sm font-black tabular-nums" style={{ color: lc }}>{Math.round(slot.progress)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full" style={{ background: 'var(--ring-track)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${slot.progress}%`, background: `linear-gradient(90deg, ${lc}bb, ${lc})` }}
            />
          </div>
        </div>

        {/* Stage dots — active dot larger */}
        <div className="mt-3.5 flex items-center justify-center gap-2">
          {[1,2,3,4,5].map((l) => (
            <div
              key={l}
              className="rounded-full transition-all duration-300"
              style={{
                width:  l === level ? 14 : 9,
                height: l === level ? 14 : 9,
                background: l <= level ? lc : 'var(--ring-track)',
                boxShadow: l === level ? `0 0 6px ${lc}88` : 'none',
              }}
            />
          ))}
        </div>

        {/* Close button */}
        <div className="px-5 pb-5 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl py-3 text-sm font-bold transition-all hover:opacity-80 active:scale-[0.97]"
            style={{ background: lc + '18', color: lc, border: `1.5px solid ${lc}35` }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
  // createPortal renders into document.body, completely outside any
  // CSS animation stacking context — guarantees true viewport centring
  // and prevents the HUD chips from ever covering the popup.
  return createPortal(content, document.body);
}

/* ── GardenIsland ─────────────────────────────────────────── */
export default function GardenIsland({ slots = [], language = 'zh', islandType = 'grassland' }) {
  const [selected, setSelected] = useState(null);
  const plots    = ISLAND_PLOTS[islandType] ?? GRASSLAND_PLOTS;
  const Platform = PLAT[islandType] ?? IslandPlatformGrassland;
  const SkyLayer = SKY[islandType]  ?? SkyGrassland;
  const s        = (i) => slots[i] ?? { locked: true, progress: 0 };

  const tap = (slotIdx) => {
    if (!s(slotIdx).locked) {
      navigator.vibrate?.(25);
      setSelected(slotIdx);
    } else {
      navigator.vibrate?.([30, 20, 30]);
    }
  };

  return (
    <>
      <div className="island-garden mx-auto w-full select-none" style={{ maxWidth: 400 }}>
        {/* ── Sky decorations ─────────────────────────────── */}
        <div className="pointer-events-none">
          <SkyLayer />
        </div>

        {/* ── Island platform — rendered BEFORE plants so plants paint on top ── */}
        <Platform />

        {/* ── Top row (3 plants) — independently grounded at grass-top surface ── */}
        {/* sky≈225 + island≈255.8 = 480.8 normal.                               */}
        {/* Grass top ≈ 225+51 = 276. Top row h=72. marginTop = 480.8+72-281 = -272 */}
        <div className="flex items-end justify-evenly px-16" style={{ marginTop: -272 }}>
          {TOP_ROW.map(({ slotIdx, width }) => {
            const slot = s(slotIdx);
            const plot = plots[slotIdx];
            return (
              <div
                key={slotIdx}
                onClick={() => tap(slotIdx)}
                className={!slot.locked ? 'cursor-pointer active:scale-95 transition-transform duration-150' : ''}
              >
                {slot.locked
                  ? <LockedPlot width={width} unlockDrops={plot?.unlockDrops ?? 0} />
                  : <PlantCharacter progressPercent={slot.progress} language={language} width={width} variant={plot?.variant ?? 'oak'} />
                }
              </div>
            );
          })}
        </div>

        {/* ── Bottom row (4 plants) — grounded at grass-centre surface ── */}
        {/* Top row ends at 281. Bottom row h=101. marginTop = -(281+101-346-8) = -28 */}
        <div className="flex items-end justify-around px-1" style={{ marginTop: -35 }}>
          {BOTTOM_ROW.map(({ slotIdx, width }) => {
            const slot = s(slotIdx);
            const plot = plots[slotIdx];
            return (
              <div
                key={slotIdx}
                onClick={() => tap(slotIdx)}
                className={!slot.locked ? 'cursor-pointer active:scale-95 transition-transform duration-150' : ''}
              >
                {slot.locked
                  ? <LockedPlot width={width} unlockDrops={plot?.unlockDrops ?? 0} />
                  : <PlantCharacter progressPercent={slot.progress} language={language} width={width} variant={plot?.variant ?? 'oak'} />
                }
              </div>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <PlantDetailPopup
          slot={s(selected)}
          plotIndex={selected}
          plots={plots}
          language={language}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
