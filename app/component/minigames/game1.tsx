'use client';

import { useState } from 'react';
/* -------------------------
 Game 1: Name input match
------------------------- */
export function Game1_Name({ expected, onSuccess }: { expected: string; onSuccess: () => void }) {
  const [value, setValue] = useState<string>('');
  const [wrong, setWrong] = useState<boolean>(false);

  function trySubmit() {
    const a = (value || '').trim().toLowerCase();
    const b = (expected || '').trim().toLowerCase();
    if (a && a === b) {
      onSuccess();
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 900);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-gray-700">Tulis nama lengkap pacarmu untuk buktiin kamu inget namanya 💌</p>
      <div className="flex gap-2">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Tulis nama lengkap..." className="flex-1 p-2 border rounded-lg text-gray-700" />
        <button onClick={trySubmit} className={`px-4 py-2 rounded-lg ${wrong ? 'bg-red-400 text-white' : 'bg-rose-500 text-white'}`}>
          {wrong ? 'Eh salah 😅' : 'Cek'}
        </button>
      </div>
      <div className="text-xs text-gray-400">Hint: nama target sudah diset di kode (dev).</div>
    </div>
  );
}
  