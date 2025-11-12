'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DUMMY_IMAGES } from '../utils';

export function Game3_DragHeart({ onSuccess }: { onSuccess: () => void }) {
  const [progress, setProgress] = useState(0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setProgress(value);
    if (value >= 100) {
      setTimeout(() => onSuccess(), 800);
    }
  }

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-700 font-medium">Geser hatinya ke pasangan 💖</p>

      <div className="relative flex items-center justify-between w-full max-w-md mx-auto mt-6">
        {/* Kamu */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-pink-200 flex items-center justify-center text-3xl select-none">
            🫶
          </div>
          <span className="text-xs text-gray-600">Kamu</span>
        </div>

        {/* Hati yang bergerak */}
        <div className="relative flex-1 h-10 z-10 mx-4">
          <motion.div
            className="absolute text-4xl"
            animate={{ x: `${progress * 2.2}px`, rotate: progress * 2 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            💖
          </motion.div>
        </div>

        {/* Pasangan */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 overflow-hidden transition-all ${
              progress >= 100
                ? 'border-rose-400 scale-105 shadow-lg'
                : 'border-gray-200'
            }`}
          >
            <img
              src={DUMMY_IMAGES.correct}
              alt="partner"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-600">Pasangan</span>
        </div>
      </div>

      {/* Slider */}
      <div className="w-full max-w-md mx-auto mt-8">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleChange}
          className="custom-slider w-full"
        />
      </div>

      {/* Feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: progress >= 100 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-rose-600 font-semibold"
      >
        {progress >= 100 ? 'Yeay! Hati sampai 💞' : ''}
      </motion.div>

      {/* Slider Style */}
      <style jsx>{`
        .custom-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 10px;
          border-radius: 9999px;
          background: linear-gradient(to right, #f9c6d1, #f28fb1);
          outline: none;
          transition: background 0.3s ease;
        }

        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #ffb6c1 0%, #ff69b4 80%);
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 12px rgba(255, 105, 180, 0.8);
        }

        .custom-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #ffb6c1 0%, #ff69b4 80%);
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
