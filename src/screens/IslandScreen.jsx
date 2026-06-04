import React, { useState, useRef } from 'react';
import GardenIsland from '../components/GardenIsland.jsx';
import TopHeader from '../components/TopHeader.jsx';
import { ISLAND_DEMO } from '../islandDemo.js';

const ISLAND_UNLOCK_AT = [0, 30];
const ISLANDS = [
  { type: 'grassland',  nameKey: 'islandGrassland'  },
  { type: 'rainforest', nameKey: 'islandRainforest' },
];
/* ── HUD chip (game-button style) ────────────────────────── */
function HudChip({ children, accent = 'rgba(255,255,255,0.88)', text = '#2d4a5a', shadow = 'rgba(0,0,0,0.14)' }) {
  return (
    <span
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black tabular-nums"
      style={{
        background: 'rgba(255,255,255,0.94)',
        border: `2px solid ${accent}`,
        boxShadow: `0 3px 0 ${shadow}, 0 5px 14px ${shadow}`,
        color: text,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

/* ── Dot indicator ────────────────────────────────────────── */
function IslandDots({ count, active, onClick }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i} type="button"
          onClick={() => { navigator.vibrate?.(15); onClick(i); }}
          className="rounded-full transition-all duration-300"
          style={{
            width:  i === active ? 18 : 7,
            height: 7,
            background: i === active ? '#5caf50' : 'rgba(255,255,255,0.55)',
          }}
          aria-label={`Island ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ── Arrow button ─────────────────────────────────────────── */
function ArrowBtn({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={() => { if (!disabled) { navigator.vibrate?.(20); onClick(); } }}
      disabled={disabled}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-100 ${
        disabled ? 'opacity-30' : 'active:translate-y-[3px]'
      }`}
      style={disabled ? {
        background: 'rgba(168,196,212,0.30)',
        border: '2px solid rgba(168,196,212,0.20)',
      } : {
        background: 'linear-gradient(150deg, #5ec8fa, #2e8fd6)',
        border: '2.5px solid #1a6cb0',
        boxShadow: '0 4px 0 #145494, 0 5px 16px rgba(30,100,195,0.42)',
      }}
      aria-label={dir === 'left' ? 'Previous island' : 'Next island'}
    >
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none"
        stroke={disabled ? 'rgba(168,196,212,0.50)' : 'white'}
        strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
      >
        {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/* ── Locked island overlay ────────────────────────────────── */
function LockedIslandOverlay({ dropsNeeded, t }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      style={{ background: 'rgba(20,40,60,0.60)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="pointer-events-auto flex flex-col items-center gap-2.5 rounded-3xl px-7 py-5 text-center"
        style={{
          background: 'rgba(255,255,255,0.96)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          border: '2px solid rgba(255,255,255,0.9)',
        }}
      >
        <span className="text-5xl">🌴</span>
        <p className="text-base font-black text-[var(--color-text)]">
          {t.islandLockedHint.replace('{{n}}', String(dropsNeeded))}
        </p>
      </div>
    </div>
  );
}

/* ── IslandScreen ─────────────────────────────────────────── */
export default function IslandScreen({ t, allIslandSlots, waterDrops, language, logoSrc, onBell }) {
  const [islandIdx, setIslandIdx] = useState(0);
  const startXRef                 = useRef(null);

  const island      = ISLANDS[islandIdx];
  const slots       = allIslandSlots[islandIdx] ?? [];
  const unlockAt    = ISLAND_UNLOCK_AT[islandIdx] ?? 0;
  const unlocked    = ISLAND_DEMO || waterDrops >= unlockAt;
  const dropsNeeded = Math.max(0, unlockAt - waterDrops);
  const islandName  = t[island.nameKey] ?? island.type;

  const growingCount = slots.filter((s) => !s.locked).length;
  const nextLocked   = slots.findIndex((s) => s.locked);

  const goLeft  = () => islandIdx > 0 && setIslandIdx(i => i - 1);
  const goRight = () => islandIdx < ISLANDS.length - 1 && setIslandIdx(i => i + 1);

  const onPtrDown = (e) => { startXRef.current = e.clientX; };
  const onPtrUp   = (e) => {
    if (startXRef.current === null) return;
    const dx = e.clientX - startXRef.current;
    if (dx < -50) { goRight(); navigator.vibrate?.(20); }
    if (dx > 50)  { goLeft();  navigator.vibrate?.(20); }
    startXRef.current = null;
  };

  return (
    <div className="flex flex-col">
      {/* App banner */}
      <TopHeader title="BuyCalc" bellAriaLabel={t.notificationBell} logoSrc={logoSrc} onBell={onBell} />

      {/* HUD — 20px below banner; stays fixed while island bobs */}
      <div className="mt-5 flex items-start justify-between gap-2 px-0.5">
        <HudChip accent="rgba(93,168,232,0.45)" text="#1560a0" shadow="rgba(93,168,232,0.30)">
          <svg viewBox="0 0 16 20" width={12} height={15} aria-hidden="true">
            <path d="M8 1C8 1,1.5 9.5,1.5 13.5C1.5 17,4.4 19,8 19C11.6 19,14.5 17,14.5 13.5C14.5 9.5,8 1,8 1Z" fill="#5da8e8" />
          </svg>
          {waterDrops}
        </HudChip>

        <div className="flex flex-col items-center gap-1.5">
          <span
            className="rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]"
            style={{
              background: 'rgba(255,255,255,0.90)',
              color: '#2d4a5a',
              border: '1.5px solid rgba(255,255,255,0.98)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            }}
          >
            {islandName}
          </span>
          <IslandDots count={ISLANDS.length} active={islandIdx} onClick={setIslandIdx} />
        </div>

        <HudChip accent="rgba(92,175,80,0.45)" text="#2a7a36" shadow="rgba(92,175,80,0.28)">
          🌱 {growingCount}/{slots.length}
        </HudChip>
      </div>

      {/* Island scene — overflow visible; scroll buffer keeps footer below the art */}
      <div
        className="island-scene relative mt-2 overflow-visible"
        onPointerDown={onPtrDown}
        onPointerUp={onPtrUp}
        onPointerLeave={() => { startXRef.current = null; }}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="island-float relative overflow-visible">
          <GardenIsland slots={slots} language={language} islandType={island.type} />
          {!unlocked && <LockedIslandOverlay dropsNeeded={dropsNeeded} t={t} />}
        </div>

        {/* Above locked overlay (z-20) so user can always navigate back */}
        <div className="pointer-events-none absolute inset-x-0 z-30 flex items-center justify-between" style={{ bottom: 140 }}>
          <div className="pointer-events-auto">
            <ArrowBtn dir="left" onClick={goLeft} disabled={islandIdx === 0} />
          </div>
          <div className="pointer-events-auto">
            <ArrowBtn dir="right" onClick={goRight} disabled={islandIdx === ISLANDS.length - 1} />
          </div>
        </div>
      </div>

      {unlocked && nextLocked === -1 && (
        <p className="mt-2 text-center text-sm font-bold" style={{ color: '#5caf50' }}>
          🌟 {t.islandAllUnlocked}
        </p>
      )}
    </div>
  );
}
