'use client';

import { useState, useEffect } from 'react';

interface DailyItem {
  id: number;
  term: string;
  category: string;
  definition: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface DailyMaritimeProps {
  data: DailyItem[];
}

export default function DailyMaritime({ data }: DailyMaritimeProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // Güne göre otomatik seçim (günlük sabit döngü)
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (data && data.length > 0) {
      setCurrentIndex(dayOfYear % data.length);
    }
  }, [data]);

  const currentItem = data[currentIndex] || data[0];

  if (!currentItem) return null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption === currentItem.correctIndex;

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
            Günün Denizcilik Pusu & Akademi
          </span>
          <h3 className="text-2xl font-black text-white mt-2 tracking-tight">
            Günün Terimi: <span className="text-cyan-400">{currentItem.term}</span>
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
          Kategori: {currentItem.category}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sol Kolon: Terim Açıklaması */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Kısa Teknik Özet
          </h4>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed bg-slate-950/50 border border-slate-800/80 p-5 rounded-2xl">
            {currentItem.definition}
          </p>
        </div>

        {/* Sağ Kolon: Günlük Mini Quiz */}
        <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800/80 p-5 md:p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Günün Quizi
            </span>
            <span className="text-xs text-slate-500">1 Soru, Tek Cevap</span>
          </div>

          <p className="text-sm font-medium text-slate-100 leading-snug">
            {currentItem.question}
          </p>

          <div className="space-y-2.5">
            {currentItem.options.map((option, idx) => {
              let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
              if (isAnswered) {
                if (idx === currentItem.correctIndex) {
                  btnStyle = "bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-950/80 border-rose-600 text-rose-200";
                } else {
                  btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs md:text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentItem.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓</span>
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentItem.correctIndex && (
                    <span className="text-rose-400 font-bold ml-2">✕</span>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div
              className={`p-4 rounded-xl text-xs leading-relaxed border animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
              }`}
            >
              <span className="font-bold block mb-1">
                {isCorrect ? 'Tebrikler, Doğru Cevap!' : 'Yanlış Seçenek!'}
              </span>
              {currentItem.explanation}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}