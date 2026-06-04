/** Demo build: all island plots and both islands visible without unlocking. */
export const ISLAND_DEMO = true;

/** Enough drops to satisfy island unlock thresholds in the HUD. */
export const DEMO_WATER_DROPS = 200;

/** Varied growth % so each plot shows a distinct plant stage. */
const DEMO_PROGRESS = [95, 78, 62, 45, 88, 70, 55];

export function demoGardenSlots() {
  return DEMO_PROGRESS.map((progress) => ({ locked: false, progress }));
}
