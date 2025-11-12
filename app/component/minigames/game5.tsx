'use client';

import { useState, useEffect, useMemo } from 'react';
import { shuffleArray, DUMMY_IMAGES } from '../utils';
/* -------------------------
   Game 5: Puzzle 3x3 (click-two-swap)
   ------------------------- */
export function Game5_Puzzle({ onSuccess }: { onSuccess: () => void }) {
  const initial = useMemo(() => shuffleArray(Array.from({ length: 9 }).map((_, i) => i)), []);
  const [tiles, setTiles] = useState<number[]>(initial);
  const [first, setFirst] = useState<number | null>(null);
  const [solved, setSolved] = useState<boolean>(false);

  useEffect(() => {
    const ok = tiles.every((val, idx) => val === idx);
    if (ok) {
      setSolved(true);
      setTimeout(() => onSuccess(), 700);
    }
  }, [tiles, onSuccess]);

  function clickTile(idx: number) {
    if (first === null) {
      setFirst(idx);
      return;
    }
    // swap
    const copy = [...tiles];
    const tmp = copy[first];
    copy[first] = copy[idx];
    copy[idx] = tmp;
    setTiles(copy);
    setFirst(null);
  }

  return (
    <div className="space-y-3 text-center">
      <p className="text-gray-700">Susun puzzle sampai rapi (klik 2 tile untuk tukar)</p>
      <div className="grid grid-cols-3 gap-1 w-64 mx-auto">
        {tiles.map((tileVal, idx) => (
          <button key={idx} onClick={() => clickTile(idx)} className={`w-20 h-20 overflow-hidden ${first === idx ? 'ring-2 ring-rose-300' : ''}`}>
            <TileImage tileIndex={tileVal} />
          </button>
        ))}
      </div>
      <div className="text-sm text-rose-600">{solved ? 'Sempurna! 🎉' : 'Belum rapi'}</div>
    </div>
  );
}


/* render a slice of the image by background-position. assumes 3x3 */
function TileImage({ tileIndex }: { tileIndex: number }) {
    const row = Math.floor(tileIndex / 3);
    const col = tileIndex % 3;
    // background-position (0%, 50%, 100%) per column/row
    const posX = col * 50;
    const posY = row * 50;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url('${DUMMY_IMAGES.correct}')`,
          backgroundSize: '300% 300%',
          backgroundPosition: `${posX}% ${posY}%`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    );
  }