'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Game1_Name } from './component/minigames/game1';
import { Game2_ChoosePhoto } from './component/minigames/game2';
import { Game3_DragHeart } from './component/minigames/game3';
import { Game4_RevealParts } from './component/minigames/game4';
import { Game5_Puzzle } from './component/minigames/game5';
import { EXPECTED_NAME, IMAGES } from './component/utils';
import "./globals.css";

type FormState = {
  hobbies: string;
  favorite_food: string;
  favorite_color: string;
  favorite_song: string;
  bio: string;
};

export default function Page() {
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState<FormState>({
    hobbies: '',
    favorite_food: '',
    favorite_color: '',
    favorite_song: '',
    bio: '',
  });

  const [phase, setPhase] = useState<'form' | 'games' | 'result'>('form');
  const [gameStep, setGameStep] = useState<number>(1);
  const [gamesPassed, setGamesPassed] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  //MUSIC SECTION
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // inisialisasi audio sekali saja
    if (!audioRef.current) {
      const a = new Audio('/music/song.mp3');
      a.loop = true;
      a.volume = 0.15;
      audioRef.current = a;
    }
  }, []);

  // nyalakan / matikan musik
  useEffect(() => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.play().catch(() => {
        console.warn('Autoplay blocked');
      });
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  // Fungsi untuk mulai musik setelah user klik "Mulai Sekarang"
  const startMusic = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setMusicOn(true);
    } catch {
      console.warn('Autoplay prevented by browser');
    }
  };

  // ================= LOGIC LAINNYA =================

  useEffect(() => {
    const all = [1, 2, 3, 4, 5].every((n) => gamesPassed[n] === true);
    if (all) setPhase('result');
  }, [gamesPassed]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function startGames(e?: FormEvent) {
    e?.preventDefault();
    if (!form.bio.trim() || !form.favorite_food.trim() || !form.favorite_song.trim()) {
      alert('Isi bio, makanan favorit, dan lagu favorit dulu ya ❤️');
      return;
    }
    setPhase('games');
    setGameStep(1);
  }

  function markPassed(n: number) {
    setGamesPassed((s) => ({ ...s, [n]: true }));
  }

  function resetAll() {
    setForm({ hobbies: '', favorite_food: '', favorite_color: '', favorite_song: '', bio: '' });
    setPhase('form');
    setGameStep(1);
    setGamesPassed({ 1: false, 2: false, 3: false, 4: false, 5: false });
    setMusicOn(false);
    audioRef.current?.pause();
  }

  function finalSubmit() {
    console.log('Final submit form:', form);
    alert('Sukses! Sekarang lanjut ke kado 💞');

    // Trigger download
    const link = document.createElement('a');
    link.href = '/app/PAPin.zip';   // ganti dengan nama file kamu
    link.download = 'kado.zip';        // nama file saat di-download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //===============logika floating heart===============
  const [hearts, setHearts] = useState<
    { left: number; top: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    // buat posisi acak setelah client load
    const temp = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 16,
      delay: Math.random() * 3,
    }));
    setHearts(temp);
  }, []);

  const [showAndroidWarning, setShowAndroidWarning] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent || navigator.vendor;
      const isAndroid = /android/i.test(ua);
      if (!isAndroid) {
        setShowAndroidWarning(true);
      }
    }
  }, []);

  // ==================================================
  if (showAndroidWarning) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-rose-200 text-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 p-8 rounded-3xl shadow-xl max-w-sm"
        >
          <h1 className="text-3xl font-bold text-rose-600 mb-4">
            🌸 Gunakan Android 🌸
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            Hai cantik 💕<br />
            Website ini dibuat khusus agar tampil <b>super cute dan interaktif</b> di Android.
            Coba buka pakai HP Android ya 😚
          </p>
          <div className="text-sm text-rose-500 italic">
            Dibuat dengan cinta 💖
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-rose-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Love particles */}
      <LoveParticles active={phase !== 'form'} />

      {/* Tombol musik di pojok */}
      {started && (
        <div className="absolute top-6 right-6 z-30 flex gap-2 items-center">
          <button
            onClick={() => setMusicOn((s) => !s)}
            className="bg-white/80 px-3 py-1 rounded-lg shadow text-rose-600 text-sm"
          >
            {musicOn ? '🔊 Musik' : '🔇 Musik'}
          </button>
          {/* <button
            onClick={() => {
              setForm({
                hobbies: 'Nonton, Jalan, Masak',
                favorite_food: 'Soto ayam',
                favorite_color: 'Pastel Yellow',
                favorite_song: 'Lagu kenangan',
                bio: 'Kamu yang paling spesial 😘',
              });
            }}
            className="bg-white/80 px-3 py-1 rounded-lg shadow text-gray-600 text-sm"
          >
            Demo
          </button> */}
        </div>
      )}

      {/* HALAMAN START */}
      {!started ? (
        <motion.div
          key="start"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative overflow-hidden bg-pink-400 p-10 rounded-3xl shadow-2xl text-center max-w-md border border-rose-200"
        >
          {/* Floating love particles (background hearts) */}
          <div className="absolute inset-0 top-10 pointer-events-none">
          {hearts.map((h, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-400/60 select-none"
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                fontSize: `${h.size}px`,
              }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: [0, 20, 0], opacity: [0.3, 0.9, 0.3] }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: h.delay,
              }}
            >
              💖
            </motion.div>
          ))}
          </div>
        
          {/* Main content */}
          <motion.h1
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl font-bold text-rose-600 drop-shadow-sm mb-4"
          >
            💌 Kado Dari Hati 💌
          </motion.h1>
        
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-700 mb-6 text-sm leading-relaxed"
          >
            Hai my <b className="text-rose-500">Princess</b> 💕  
            Siap salting seharian karena kadoku?  
            i guess u love this gift entire life😚
          </motion.p>
        
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: 'spring' }}
          >
            <button
              onClick={() => {
                setStarted(true);
                startMusic(); // 🔊 musik mulai di sini
              }}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-12 py-3 rounded-full shadow-lg transition-all"
            >
              <span className="relative z-10">Mulai Sekarang 💖</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/10 blur-md"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </button>
          </motion.div>
        </motion.div>      
      ) : (
        <div className="w-full max-w-3xl relative z-20">
          <Header />
          <div className="mt-4">
            <ProgressBar step={phase === 'form' ? 0 : gameStep} />
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {phase === 'form' && (
                <motion.section
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow"
                >
                  <h2 className="text-2xl font-semibold text-rose-600 mb-2">apakah kamu benar pacarku? 💭</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Isi data dirimu dahulu. lalu selesaikan 5 tantangan buat buktiin kalo kamu beneran pacarku!!!!
                  </p>

                  <form onSubmit={startGames} className="space-y-3 text-left text-gray-600">
                    <label className="block">
                      <div className="text-xs text-rose-700">Hobbies (pisah pake koma)</div>
                      <input name="hobbies" value={form.hobbies} onChange={handleChange} className="w-full mt-1 p-2 rounded-lg border" />
                    </label>
                    <label className="block">
                      <div className="text-xs text-rose-700">Makanan Favorit</div>
                      <input name="favorite_food" value={form.favorite_food} onChange={handleChange} className="w-full mt-1 p-2 rounded-lg border" />
                    </label>
                    <label className="block">
                      <div className="text-xs text-rose-700">Lagu Favorit</div>
                      <input name="favorite_song" value={form.favorite_song} onChange={handleChange} className="w-full mt-1 p-2 rounded-lg border" />
                    </label>
                    <label className="block">
                      <div className="text-xs text-rose-700">Warna Favorit</div>
                      <input name="favorite_color" value={form.favorite_color} onChange={handleChange} className="w-full mt-1 p-2 rounded-lg border" />
                    </label>
                    <label className="block">
                      <div className="text-xs text-rose-700">Tentang Kamu (bio)</div>
                      <input name="bio" value={form.bio} onChange={handleChange} className="w-full mt-1 p-2 rounded-lg border" />
                    </label>

                    <div className="flex gap-3 mt-4">
                      <button type="submit" className="flex-1 bg-rose-500 text-white py-2 rounded-lg shadow hover:bg-rose-600">
                        Kirim & Mulai Buktiin 💌
                      </button>
                      <button type="button" onClick={() => resetAll()} className="px-4 py-2 border rounded-lg">
                        Reset
                      </button>
                    </div>
                  </form>
                </motion.section>
              )}

              {phase === 'games' && (
                <motion.section
                  key="games"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="bg-white/95 p-6 rounded-2xl shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-rose-600 font-semibold">Buktikan bahwa kamu pacarku 💞</div>
                      <div className="text-sm text-gray-500">Step {gameStep} / 5</div>
                    </div>

                    <AnimatePresence mode="wait">
                      {gameStep === 1 && (
                        <Game1_Name expected={EXPECTED_NAME} onSuccess={() => { markPassed(1); setTimeout(() => setGameStep(2), 350); }} />
                      )}
                      {gameStep === 2 && (
                        <Game2_ChoosePhoto
                          correct={IMAGES.correct}
                          others={[IMAGES.other1, IMAGES.other2, IMAGES.other3]}
                          onSuccess={() => { markPassed(2); setTimeout(() => setGameStep(3), 350); }}
                        />
                      )}
                      {gameStep === 3 && (
                        <Game3_DragHeart onSuccess={() => { markPassed(3); setTimeout(() => setGameStep(4), 350); }} />
                      )}
                      {gameStep === 4 && (
                        <Game4_RevealParts onSuccess={() => { markPassed(4); setTimeout(() => setGameStep(5), 350); }} />
                      )}
                      {gameStep === 5 && (
                        <Game5_Puzzle onSuccess={() => { markPassed(5); }} />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.section>
              )}

              {phase === 'result' && (
                <motion.section
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="bg-white/95 p-6 rounded-2xl shadow text-center"
                >
                  <motion.h3 initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-3xl font-bold text-rose-600 mb-3">
                    💖 Ohhh ini pacarku yang imut dan lucu itu 💖
                  </motion.h3>

                  <p className="text-gray-700 max-w-xl mx-auto">
                    Aku tahu dari hobimu <b>{form.hobbies || 'berpetualang'}</b>, makanan favorit <b>{form.favorite_food || 'soto'}</b>, warna <b>{form.favorite_color || 'manis'}</b>,
                    dan lagu <b>{form.favorite_song || 'spesial'}</b>. Kamu emang paling gemesin!
                  </p>

                  <div className="mt-6 flex justify-center gap-3">
                    <button onClick={finalSubmit} className="bg-rose-500 text-white px-5 py-2 rounded-lg shadow hover:bg-rose-600">
                      Lanjut ke Kadonya 🎁
                    </button>
                    <button onClick={resetAll} className="px-4 py-2 border text-gray-700 rounded-lg">Ulangi</button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}

/* ------------------------- */
function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-semibold text-rose-600">🎁 Kado Dari Hati</div>
      <div className="text-sm text-rose-700">Happy 2nd Anniversary</div>
    </div>
  );
}

function Footer() {
  return <div className="mt-6 text-center text-sm text-rose-600 opacity-80">Dibuat dengan cinta ❤️</div>;
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex justify-center mt-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`w-8 h-2 rounded-full ${n <= step ? 'bg-rose-500' : 'bg-rose-200'}`} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------- */
function LoveParticles({ active }: { active: boolean }) {
  if (!active) return null;
  const hearts = Array.from({ length: 12 }).map((_, i) => i);
  return (
    <>
      {hearts.map((i) => {
        const left = 5 + Math.random() * 90;
        const delay = Math.random() * 3;
        const size = 18 + Math.random() * 18;
        return (
          <motion.div
            key={i}
            initial={{ y: -50, opacity: 0, x: `${left}%`, scale: 0.8 }}
            animate={{ y: 900, opacity: [0.9, 0.6, 0], scale: 1 }}
            transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'fixed', left: `${left}%`, top: -10, fontSize: size, pointerEvents: 'none', zIndex: 10 }}
          >
            💕
          </motion.div>
        );
      })}
    </>
  );
}
