'use client';

import { useState } from 'react';
import { DUMMY_IMAGES } from '../utils';
/* -------------------------
   Game 4: Reveal parts (3 parts)
   ------------------------- */
export function Game4_RevealParts({ onSuccess }: { onSuccess: () => void }) {
  const PARTS = 3;
  const [revealedParts, setRevealedParts] = useState<boolean[]>(Array(PARTS).fill(false));
  const revealedCount = revealedParts.filter(Boolean).length;

  function clickPart(i: number) {
    if (revealedParts[i]) return;
    const copy = [...revealedParts];
    copy[i] = true;
    setRevealedParts(copy);
    if (copy.filter(Boolean).length >= PARTS) {
      setTimeout(() => onSuccess(), 600);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-gray-700">Klik bagian gambar yang kosong sampai lengkap (3 klik)</p>
      <div className="grid grid-cols-3 gap-2">
        {revealedParts.map((r, i) => (
          <button key={i} onClick={() => clickPart(i)} className="h-28 bg-gray-100 rounded-lg overflow-hidden border">
            {r ? <img src={DUMMY_IMAGES.correct} alt="part" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400">Klik aku</div>}
          </button>
        ))}
      </div>
      <div className="text-sm text-rose-600">{revealedCount}/{PARTS} bagian lengkap</div>
    </div>
  );
}