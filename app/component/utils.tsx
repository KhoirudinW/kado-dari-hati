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
export const IMAGES = {
  correct: 'img/gweh.jpg', // partner placeholder
  other1: 'img/bukan-gweh1.jpg',
  other2: 'img/bukan-gweh2.jpg',
  other3: 'img/bukan-gweh3.jpg',
  other4: 'img/img1.jpg',
  other5: 'img/img2.jpg',
  other6: 'img/img3.jpg',
  she: 'img/she.jpg',
};
/* ============================ */