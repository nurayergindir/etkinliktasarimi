import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Clock, Layers } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface MemoryMatchGameProps {
  onBack?: () => void;
}

interface CardItem {
  id: number;
  pairId: number;
  label: string;
  subText: string;
  category: string;
}

const RAW_PAIRS = [
  { pairId: 1, a: 'Au', aSub: 'Sembol', b: 'Altın', bSub: 'Element' },
  { pairId: 2, a: 'Fe', aSub: 'Sembol', b: 'Demir', bSub: 'Element' },
  { pairId: 3, a: '%50', aSub: 'Yüzde', b: '1 / 2', bSub: 'Kesir' },
  { pairId: 4, a: 'Türkiye', aSub: 'Ülke', b: 'Ankara', bSub: 'Başkent' },
  { pairId: 5, a: 'Cömert', aSub: 'Zıt Anlam', b: 'Cimri', bSub: 'Zıt Anlam' },
  { pairId: 6, a: 'H2O', aSub: 'Formül', b: 'Su', bSub: 'Bileşik' }
];

function createShuffledCards(): CardItem[] {
  const cards: CardItem[] = [];
  let id = 1;
  RAW_PAIRS.forEach((pair) => {
    cards.push({
      id: id++,
      pairId: pair.pairId,
      label: pair.a,
      subText: pair.aSub,
      category: 'Kavram'
    });
    cards.push({
      id: id++,
      pairId: pair.pairId,
      label: pair.b,
      subText: pair.bSub,
      category: 'Kavram'
    });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ onBack }) => {
  const [cards, setCards] = useState<CardItem[]>(createShuffledCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isWon, setIsWon] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isWon) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isWon]);

  const handleCardClick = (card: CardItem) => {
    if (flippedIds.length >= 2) return;
    if (flippedIds.includes(card.id)) return;
    if (matchedPairIds.has(card.pairId)) return;

    soundManager.playClick();
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const card1 = cards.find((c) => c.id === newFlipped[0])!;
      const card2 = cards.find((c) => c.id === newFlipped[1])!;

      if (card1.pairId === card2.pairId) {
        soundManager.playCorrect();
        const nextMatched = new Set(matchedPairIds);
        nextMatched.add(card1.pairId);
        setMatchedPairIds(nextMatched);
        setFlippedIds([]);

        if (nextMatched.size === RAW_PAIRS.length) {
          setIsWon(true);
          setIsActive(false);
          soundManager.playVictory();
          confetti({ particleCount: 100, spread: 80 });
        }
      } else {
        soundManager.playWrong();
        setTimeout(() => {
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setCards(createShuffledCards());
    setFlippedIds([]);
    setMatchedPairIds(new Set());
    setMoves(0);
    setSeconds(0);
    setIsActive(true);
    setIsWon(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-200/80 shadow-md p-6 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-100 mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="Geri Dön"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">🃏</span>
              Hafıza & Kavram Eşleştirme
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Semboller, kavramlar ve formülleri eşle</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-slate-500" />
            {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
            <Layers className="w-4 h-4 text-slate-500" />
            {moves} Hamle
          </span>
        </div>
      </div>

      {isWon ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-3 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl">
            🌟
          </div>
          <h4 className="text-2xl font-bold text-slate-800 mb-1">Tebrikler!</h4>
          <p className="text-slate-500 text-sm mb-6">
            Tüm eşleşmeleri {moves} hamlede ve {seconds} saniyede buldunuz.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Yeniden Oyna
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer text-sm"
              >
                Oyun Menüsüne Dön
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cards.map((card) => {
              const isFlipped = flippedIds.includes(card.id) || matchedPairIds.has(card.pairId);
              const isMatched = matchedPairIds.has(card.pairId);

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleCardClick(card)}
                  className={`h-24 sm:h-28 rounded-xl border-2 p-2 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-90'
                      : isFlipped
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm scale-102'
                      : 'bg-gradient-to-tr from-slate-100 to-slate-200 border-slate-300 hover:border-blue-400 hover:bg-blue-50/40 text-transparent shadow-xs'
                  }`}
                >
                  {isFlipped ? (
                    <>
                      <span className="text-sm sm:text-base font-extrabold text-slate-800 block line-clamp-1">
                        {card.label}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium mt-1">
                        {card.subText}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl text-slate-400 font-bold select-none">?</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-100">
            <span>Eşleşen: {matchedPairIds.size} / {RAW_PAIRS.length}</span>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Sıfırla
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
