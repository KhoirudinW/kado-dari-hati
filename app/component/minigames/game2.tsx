'use client';

import { useState, useMemo } from 'react';
import { shuffleArray } from '../utils';
/* -------------------------
   Game 2: Choose photo
------------------------- */
export function Game2_ChoosePhoto({ correct, others, onSuccess }: { correct: string; others: string[]; onSuccess: () => void }) {
  const options = useMemo(() => shuffleArray([correct, ...others]), [correct, others]);
  const [msg, setMsg] = useState<string>('');
  function choose(url: string) {
    if (url === correct) {
      setMsg('Benar dong! Kamu peka 💞');
      setTimeout(() => onSuccess(), 700);
    } else {
      setMsg('Waduh, bukan itu. Yuk coba lagi 😅');
      setTimeout(() => setMsg(''), 900);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-gray-700">Pilih foto yang paling benar dari pasanganmu</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((u) => (
          <button key={u} onClick={() => choose(u)} className="rounded-lg overflow-hidden border">
            <img src={u} alt="option" className="w-full h-36 object-cover" />
          </button>
        ))}
      </div>
      <div className="text-sm text-rose-600 min-h-[28px]">{msg}</div>
    </div>
  );
}