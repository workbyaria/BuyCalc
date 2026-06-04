import React from 'react';
import GardenIsland from '../components/GardenIsland.jsx';

const UNLOCK_THRESHOLDS = [0, 10, 40, 100];

const STAGE_EMOJI = ['🌰', '🌱', '🪴', '🌿', '🌳'];
function stageEmoji(progress) {
  if (progress >= 80) return STAGE_EMOJI[4];
  if (progress >= 50) return STAGE_EMOJI[3];
  if (progress >= 30) return STAGE_EMOJI[2];
  if (progress >= 10) return STAGE_EMOJI[1];
  return STAGE_EMOJI[0];
}

const STAGE_LABELS = {
  zh:   ['種子', '幼芽', '樹苗', '小樹', '大樹'],
  zhCN: ['种子', '幼芽', '树苗', '小树', '大树'],
  en:   ['Seed', 'Sprout', 'Sapling', 'Young Tree', 'Full Tree'],
  es:   ['Semilla', 'Brote', 'Plántula', 'Árbol Joven', 'Árbol Pleno'],
};
function stageName(progress, language) {
  const labels = STAGE_LABELS[language] ?? STAGE_LABELS.en;
  if (progress >= 80) return labels[4];
  if (progress >= 50) return labels[3];
  if (progress >= 30) return labels[2];
  if (progress >= 10) return labels[1];
  return labels[0];
}

function SlotRow({ slot, index, language, unlockDrops, t }) {
  if (slot.locked) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg"
          style={{ background: 'rgba(168,196,212,0.18)' }}
        >
          🔒
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-[var(--color-subtext)] uppercase tracking-wide">
            Plot {index + 1}
          </div>
          <div className="mt-0.5 text-xs text-[var(--color-subtext)]">
            {t.islandNextUnlock.replace('{{n}}', String(unlockDrops))}
          </div>
        </div>
        <div
          className="rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{
            background: 'rgba(93,168,232,0.12)',
            color: '#2a6a9e',
            border: '1px solid rgba(93,168,232,0.25)',
          }}
        >
          💧{unlockDrops}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xl"
        style={{ background: 'var(--icon-tile)' }}
      >
        {stageEmoji(slot.progress)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold text-[var(--color-text)]">
            {stageName(slot.progress, language)}
          </span>
          <span className="text-[11px] tabular-nums font-bold text-[var(--color-subtext)]">
            {Math.round(slot.progress)}%
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full"
          style={{ background: 'var(--ring-track)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${slot.progress}%`, background: '#5caf50' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function IslandScreen({ t, gardenSlots, waterDrops, language }) {
  const nextLocked   = gardenSlots.findIndex((s) => s.locked);
  const growingCount = gardenSlots.filter((s) => !s.locked).length;

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">{t.islandTitle}</h1>
          <p className="mt-1 text-sm text-[var(--color-subtext)]">{t.islandSubtitle}</p>
        </div>

        {/* Water drops + plant count */}
        <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold tabular-nums"
            style={{
              background: 'rgba(255,255,255,0.92)',
              color: '#1a6a9a',
              border: '1.5px solid rgba(93,168,232,0.28)',
              boxShadow: '0 2px 10px rgba(93,168,232,0.15)',
            }}
          >
            <svg viewBox="0 0 16 20" width={11} height={14} aria-hidden="true">
              <path d="M8 1C8 1,1.5 9.5,1.5 13.5C1.5 17,4.4 19,8 19C11.6 19,14.5 17,14.5 13.5C14.5 9.5,8 1,8 1Z" fill="#5da8e8" />
            </svg>
            {waterDrops}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{
              background: 'rgba(92,175,80,0.14)',
              color: '#2d8a42',
              border: '1px solid rgba(92,175,80,0.28)',
            }}
          >
            🌱 {growingCount} / {gardenSlots.length}
          </span>
        </div>
      </div>

      {/* Garden — floats against sky, no card wrapper */}
      <GardenIsland slots={gardenSlots} language={language} />

      {/* Unlock hint */}
      {nextLocked === -1 ? (
        <p className="text-center text-sm font-semibold" style={{ color: '#5caf50' }}>
          🌟 {t.islandAllUnlocked}
        </p>
      ) : (
        <p className="text-center text-xs text-[var(--color-subtext)]">
          {t.islandNextUnlock.replace('{{n}}', String(UNLOCK_THRESHOLDS[nextLocked] - waterDrops))}
        </p>
      )}

      {/* Slot progress cards */}
      <div
        className="rounded-[28px] border divide-y"
        style={{
          background: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          divideColor: 'var(--glass-border)',
        }}
      >
        {gardenSlots.map((slot, i) => (
          <div
            key={i}
            className="px-4 py-3.5"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <SlotRow
              slot={slot}
              index={i}
              language={language}
              unlockDrops={UNLOCK_THRESHOLDS[i]}
              t={t}
            />
          </div>
        ))}
      </div>

      {/* How-to tip */}
      <div
        className="rounded-[22px] border px-4 py-3 text-center text-xs leading-relaxed"
        style={{
          background: 'var(--glass-bg-muted)',
          borderColor: 'var(--glass-border)',
          color: 'var(--color-subtext)',
        }}
      >
        {t.islandHowTo}
      </div>
    </div>
  );
}
