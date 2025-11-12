/* -------------------------
Utilities
------------------------- */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ========== Config ========== */
export const EXPECTED_NAME = 'Khoirudin widiyansa'; // used in Game1 (case-insensitive)
export const DUMMY_IMAGES = {
  correct: 'https://picsum.photos/id/1011/600/600', // partner placeholder
  other1: 'https://picsum.photos/id/1005/600/600',
  other2: 'https://picsum.photos/id/1012/600/600',
  other3: 'https://picsum.photos/id/1025/600/600',
};
/* ============================ */