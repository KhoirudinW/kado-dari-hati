'use client';

import { useState } from 'react';
import { IMAGES } from '../utils';

/* -------------------------
   Game 4: Reveal parts (3 photos)
   ------------------------- */
export function Game4_RevealParts({ onSuccess }: { onSuccess: () => void }) {
  const PARTS = 3;
  const [revealedParts, setRevealedParts] = useState<boolean[]>(Array(PARTS).fill(false));
  const revealedCount = revealedParts.filter(Boolean).length;

  const photos = [
    IMAGES.other4,
    IMAGES.other5,
    IMAGES.other6,
  ];

  function clickPart(i: number) {
    if (revealedParts[i]) return;
    const copy = [...revealedParts];
    copy[i] = true;
    setRevealedParts(copy);
    if (copy.filter(Boolean).length >= PARTS) {
      setTimeout(() => onSuccess(), 800);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-gray-700 font-medium">
        Ungkap semua bagian foto 💞 (klik 3 kali)
      </p>
      <div className="grid grid-cols-3 gap-2">
        {revealedParts.map((revealed, i) => (
          <button
            key={i}
            onClick={() => clickPart(i)}
            className="h-28 bg-gray-100 rounded-xl overflow-hidden border-2 border-pink-200 hover:border-pink-400 transition"
          >
            {revealed ? (
              <img
                src={photos[i]}
                alt={`part-${i}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-rose-300 font-semibold">
                💖 Klik aku 💖
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="text-sm text-rose-600 text-center">
        {revealedCount}/{PARTS} bagian sudah terbuka 💗
      </div>
    </div>
  );
}
