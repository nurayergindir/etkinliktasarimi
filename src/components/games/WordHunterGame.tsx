import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lightbulb, RotateCcw, ArrowLeft, Trophy, Heart } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface WordHunterGameProps {
  onBack?: () => void;
}

interface WordChallenge {
  word: string;
  category: string;
  clue: string;
  extraHint: string;
}

const WORDS_DATABASE: WordChallenge[] = [
  {
    word: 'FOTOSENTEZ',
    category: 'Fen Bilimleri',
    clue: 'Yeşil bitkilerin güneş ışığı yardımıyla besin ve oksijen üretme süreci.',
    extraHint: 'Klorofil pigmenti bu olayda kilit rol oynar.'
  },
  {
    word: 'MECAZ',
    category: 'Türkçe',
    clue: 'Bir sözcüğün gerçek anlamından tamamen uzaklaşarak kazandığı yeni anlam.',
    extraHint: '"Koyu bir sohbete daldık" cümlesindeki koyu sözcüğü gibi.'
  },
  {
    word: 'EKVATOR',
    category: 'Coğrafya',
    clue: 'Dünyayı kuzey ve güney olarak iki eşit yarım küreye böldüğü varsayılan enlem çizgisi.',
    extraHint: 'Enlemi 0 derece olarak kabul edilir.'
  },
  {
    word: 'KUVVET',
    category: 'Fen & Fizik',
    clue: 'Duran bir cismi hareket ettiren, hareket halindekini durduran veya şeklini değiştiren etki.',
    extraHint: 'Birimi Newton (N) olarak adlandırılır.'
  },
  {
    word: 'CUMHURİYET',
    category: 'Tarih & Vatandaşlık',
    clue: 'Milletin egemenliği kendi elinde tuttuğu ve yöneticilerini seçtiği yönetim biçimi.',
    extraHint: '29 Ekim 1923’te ilan edilmiştir.'
  },
  {
    word: 'ASAL',
    category: 'Matematik',
    clue: 'Sadece 1’e ve kendisine tam bölünebilen 1’den büyük doğal sayılara verilen ad.',
    extraHint: 'En küçük çift olanı 2’dir.'
  },
  {
    word: 'ATMOSFER',
    category: 'Doğa & Coğrafya',
    clue: 'Dünyayı çepeçevre saran, yaşamsal gazları barındıran hava katmanı.',
    extraHint: 'Ozon tabakası bu katmanın içinde yer alır.'
  },
  {
    word: 'MİMAR',
    category: 'Meslekler & Sanat',
    clue: 'Binaları ve yapıları estetik ve fonksiyonel olarak tasarlayan uzman.',
    extraHint: 'Mimar Sinan, bu alanın dünya çapındaki en büyük dehalarındandır.'
  }
];

const TURKISH_ALPHABET = [
  'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M',
  'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'
];

export const WordHunterGame: React.FC<WordHunterGameProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [showExtraHint, setShowExtraHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const maxLives = 6;
  const current = WORDS_DATABASE[currentIndex];
  const wordLetters = current.word.split('');
  const isWon = wordLetters.every((char) => guessedLetters.has(char));
  const isLost = wrongGuesses >= maxLives;

  const handleGuess = (letter: string) => {
    if (guessedLetters.has(letter) || isWon || isLost) return;

    soundManager.playClick();
    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (current.word.includes(letter)) {
      soundManager.playCorrect();
      // Check if won
      const wonAfterThis = wordLetters.every((c) => newGuessed.has(c));
      if (wonAfterThis) {
        soundManager.playVictory();
        confetti({ particleCount: 70, spread: 60 });
        setScore((prev) => prev + (showExtraHint ? 50 : 100));
      }
    } else {
      soundManager.playWrong();
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const handleNextWord = () => {
    soundManager.playClick();
    if (currentIndex + 1 < WORDS_DATABASE.length) {
      setCurrentIndex((prev) => prev + 1);
      setGuessedLetters(new Set());
      setWrongGuesses(0);
      setShowExtraHint(false);
    } else {
      setCompleted(true);
      confetti({ particleCount: 120, spread: 90 });
    }
  };

  const resetGame = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setShowExtraHint(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-teal-200/80 shadow-md p-6 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-teal-100 mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
              title="Geri Dön"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-teal-100 text-teal-700 rounded-lg">🔍</span>
              Kelime & Kavram Avcısı
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">İpuçlarından kavramı çöz, harfleri keşfet</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-teal-600" />
            Puan: <strong className="text-teal-900">{score}</strong>
          </span>
        </div>
      </div>

      {completed ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-3 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-3xl">
            🎉
          </div>
          <h4 className="text-2xl font-bold text-slate-800 mb-2">Tüm Kavramlar Tamamlandı!</h4>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Harika bir kelime ve kavram hakimiyeti sergiledin.
          </p>
          <div className="p-4 bg-teal-50 rounded-xl max-w-xs mx-auto mb-6 border border-teal-200 text-center">
            <span className="text-xs text-teal-700 font-semibold block">Kazanılan Toplam Puan</span>
            <span className="text-3xl font-extrabold text-teal-900">{score}</span>
          </div>
          <button
            onClick={resetGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Yeniden Başla
          </button>
        </div>
      ) : (
        <div>
          {/* Header Progress & Lives */}
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Kategori:</span>
              <span className="text-xs font-bold text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded-md">
                {current.category}
              </span>
              <span className="text-xs text-slate-400">({currentIndex + 1} / {WORDS_DATABASE.length})</span>
            </div>

            {/* Lives */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500 mr-1.5 font-medium">Kalan Can:</span>
              {Array.from({ length: maxLives }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-colors ${
                    i < maxLives - wrongGuesses ? 'text-rose-500 fill-rose-500' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Clue Box */}
          <div className="p-5 bg-gradient-to-r from-teal-50/70 to-emerald-50/40 rounded-xl border border-teal-200/70 mb-6">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
              💡 Ana İpucu:
            </span>
            <p className="text-slate-800 font-medium text-sm md:text-base leading-relaxed">
              {current.clue}
            </p>

            {showExtraHint ? (
              <div className="mt-3 pt-3 border-t border-teal-200/60 text-xs text-teal-900 bg-white/70 p-2.5 rounded-lg">
                <strong>Ek İpucu:</strong> {current.extraHint}
              </div>
            ) : (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowExtraHint(true);
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Ek İpucu Göster (-50 puan)
              </button>
            )}
          </div>

          {/* Mystery Word Display */}
          <div className="flex justify-center items-center gap-2 md:gap-3 my-8 flex-wrap">
            {wordLetters.map((letter, idx) => {
              const isRevealed = guessedLetters.has(letter) || isLost;
              return (
                <div
                  key={idx}
                  className={`w-10 h-12 md:w-12 md:h-14 rounded-xl border-2 flex items-center justify-center font-mono text-xl md:text-2xl font-black transition-all ${
                    isRevealed
                      ? isLost && !guessedLetters.has(letter)
                        ? 'border-rose-400 bg-rose-50 text-rose-600'
                        : 'border-teal-500 bg-teal-500 text-white shadow-sm'
                      : 'border-slate-300 bg-slate-50 text-transparent'
                  }`}
                >
                  {isRevealed ? letter : '_'}
                </div>
              );
            })}
          </div>

          {/* Outcome Alert */}
          {isWon && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center mb-6 animate-fade-in">
              <span className="text-emerald-800 font-bold block text-sm mb-2">
                🎉 Harika! Doğru Kelime: <u>{current.word}</u> (+{showExtraHint ? 50 : 100} Puan)
              </span>
              <button
                onClick={handleNextWord}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Sonraki Kavrama Geç →
              </button>
            </div>
          )}

          {isLost && (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-center mb-6">
              <span className="text-rose-800 font-bold block text-sm mb-2">
                Haklarınız bitti! Doğru Kelime: <u>{current.word}</u>
              </span>
              <button
                onClick={handleNextWord}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Sonraki Soruya Geç →
              </button>
            </div>
          )}

          {/* Turkish Keyboard */}
          <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 pt-2 border-t border-slate-100">
            {TURKISH_ALPHABET.map((letter) => {
              const isUsed = guessedLetters.has(letter);
              return (
                <button
                  key={letter}
                  disabled={isUsed || isWon || isLost}
                  onClick={() => handleGuess(letter)}
                  className={`h-9 rounded-lg font-bold text-xs md:text-sm transition-all cursor-pointer ${
                    isUsed
                      ? 'bg-slate-200 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-white border border-slate-200 hover:bg-teal-50 hover:border-teal-400 hover:text-teal-700 text-slate-700 shadow-xs active:scale-95'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
