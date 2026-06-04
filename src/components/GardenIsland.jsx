import React from 'react';
import PlantCharacter from './PlantCharacter.jsx';

function IslandPlatform() {
  return (
    <svg viewBox="0 0 360 72" width="100%" style={{ display: 'block' }}>
      <ellipse cx="180" cy="70" rx="148" ry="7"  fill="rgba(0,0,0,0.08)" />
      <ellipse cx="180" cy="63" rx="160" ry="16" fill="#6b4422" />
      <ellipse cx="180" cy="57" rx="156" ry="12" fill="#8B5E3C" />
      <ellipse cx="180" cy="44" rx="160" ry="20" fill="#3d9432" />
      <ellipse cx="180" cy="40" rx="160" ry="20" fill="#5caf50" />
      <ellipse cx="122" cy="32" rx="88"  ry="9"  fill="#7dcf6e" opacity="0.45" />
      <ellipse cx="272" cy="37" rx="52"  ry="6"  fill="#7dcf6e" opacity="0.28" />
      <circle cx="58"  cy="38" r="3.2" fill="white"   opacity="0.75" />
      <circle cx="58"  cy="38" r="1.4" fill="#ffd700" opacity="0.90" />
      <circle cx="295" cy="35" r="2.6" fill="white"   opacity="0.60" />
      <circle cx="295" cy="35" r="1.1" fill="#ffd700" opacity="0.75" />
      <circle cx="180" cy="24" r="2.6" fill="white"   opacity="0.50" />
      <circle cx="180" cy="24" r="1.1" fill="#ffc0cb" opacity="0.65" />
      <circle cx="102" cy="30" r="2.0" fill="white"   opacity="0.45" />
      <circle cx="102" cy="30" r="0.9" fill="#a8e6cf" opacity="0.60" />
    </svg>
  );
}

function LockedPlot({ width, unlockDrops }) {
  const height = Math.round(width * (155 / 120));
  return (
    <div className="relative flex flex-col items-center justify-end select-none" style={{ width, height }}>
      <div
        className="absolute flex flex-col items-center justify-center gap-0.5 rounded-full border-2 border-dashed"
        style={{
          width:  Math.round(width * 0.68),
          height: Math.round(width * 0.68),
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.20)',
          borderColor: 'rgba(168,196,212,0.55)',
        }}
      >
        <span style={{ fontSize: Math.max(14, Math.round(width * 0.28)) }}>🔒</span>
        {unlockDrops > 0 && (
          <span
            className="rounded-full px-1.5 font-bold tabular-nums"
            style={{
              fontSize: Math.max(8, Math.round(width * 0.13)),
              background: 'rgba(93,168,232,0.18)',
              color: '#2a6a9e',
              border: '1px solid rgba(93,168,232,0.28)',
              lineHeight: 1.6,
            }}
          >
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

function PlotSlot({ slot, width, unlockDrops, language }) {
  if (slot.locked) return <LockedPlot width={width} unlockDrops={unlockDrops} />;
  return <PlantCharacter progressPercent={slot.progress} language={language} width={width} />;
}

export default function GardenIsland({ slots = [], language = 'zh' }) {
  const s = (i) => slots[i] ?? { locked: true, progress: 0 };

  return (
    <div className="mx-auto w-full select-none" style={{ maxWidth: 360 }}>
      {/* Back row — smaller + narrower span = looks further away */}
      <div className="flex items-end justify-center gap-4 px-12">
        <PlotSlot slot={s(0)} width={62}  unlockDrops={0}   language={language} />
        <PlotSlot slot={s(1)} width={58}  unlockDrops={10}  language={language} />
      </div>

      {/* Front row — larger + wider span = looks closer */}
      <div className="flex items-end justify-around px-3" style={{ marginTop: -6 }}>
        <PlotSlot slot={s(2)} width={78}  unlockDrops={40}  language={language} />
        <PlotSlot slot={s(3)} width={74}  unlockDrops={100} language={language} />
      </div>

      {/* Island platform — overlaps plant bases slightly */}
      <div style={{ marginTop: -22 }}>
        <IslandPlatform />
      </div>
    </div>
  );
}
