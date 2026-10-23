import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Award, Zap, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface MathSprintGameProps {
  onBack?: () => void;
}

type Difficulty = 'kolay' | 'orta' | 'ileri';

interface Question {
  num1: number;
  num2: number;
  op: '+' | '-' | '×' | '÷';
  answer: number;
  options: number[];
}

function generateQuestion(diff: Difficulty): Question {
  let num1 = 1;
  let num2 = 1;
  let op: '+' | '-' | '×' | '÷' = '+';
  let answer = 0;

  if (diff === 'kolay') {
    const ops: Array<'+' | '-'> = ['+', '-'];
    op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '+') {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 25) + 10;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
    }
  } else if (diff === 'orta') {
    const ops: Array<'+' | '-' | '×'> = ['+', '-', '×'];
    op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '×') {
      num1 = Math.floor(Math.random() * 10) + 2;
      num2 = Math.floor(Math.random() * 10) + 2;
      answer = num1 * num2;
    } else if (op === '+') {
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 50) + 10;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 60) + 20;
      num2 = Math.floor(Math.random() * 40) + 5;
      answer = num1 - num2;
    }
  } else {
    const ops: Array<'+' | '-' | '×' | '÷'> = ['+', '-', '×', '÷'];
    op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '×') {
      num1 = Math.floor(Math.random() * 12) + 3;
      num2 = Math.floor(Math.random() * 12) + 3;
      answer = num1 * num2;
    } else if (op === '÷') {
      num2 = Math.floor(Math.random() * 10) + 2;
      const multiplier = Math.floor(Math.random() * 10) + 2;
      num1 = num2 * multiplier;
      answer = multiplier;
    } else if (op === '+') {
      num1 = Math.floor(Math.random() * 90) + 20;
      num2 = Math.floor(Math.random() * 90) + 20;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 120) + 30;
      num2 = Math.floor(Math.random() * 70) + 10;
      answer = num1 - num2;
    }
  }

  // Generate 4 distinct options including the correct answer
  const optionsSet = new Set<number>([answer]);
  while (optionsSet.size < 4) {
    const delta = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = answer + delta;
    if (fake >= 0 && fake !== answer) {
      optionsSet.add(fake);
    }
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return { num1, num2, op, answer, options };
}

export const MathSprintGame: React.FC<MathSprintGameProps> = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('orta');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(35);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('ogretmen_math_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    soundManager.playClick();
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(35);
    setFeedback(null);
    setCurrentQuestion(generateQuestion(difficulty));
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        if (timeLeft <= 5) {
          soundManager.playTick();
        }
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
      soundManager.playVictory();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (score > highScore) {
        setHighScore(score);
        try {
          localStorage.setItem('ogretmen_math_highscore', score.toString());
        } catch {
          // ignore
        }
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft, score, highScore]);

  const handleAnswer = (selectedVal: number) => {
    if (!currentQuestion || !isPlaying) return;

    if (selectedVal === currentQuestion.answer) {
      soundManager.playCorrect();
      setFeedback('correct');
      const pointAddition = 10 + streak * 2;
      setScore((prev) => prev + pointAddition);
      setStreak((prev) => prev + 1);
    } else {
      soundManager.playWrong();
      setFeedback('wrong');
      setStreak(0);
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentQuestion(generateQuestion(difficulty));
    }, 280);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-md p-6 max-w-2xl mx-auto transition-all">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-100 mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
              title="Oyunlar Listesine Dön"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">⚡</span>
              Matematik Hız Yarışı
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Hızlı zihinden işlem reflexi ve kombo puanı</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200/60">
            <Award className="w-4 h-4 text-amber-600" />
            Rekor: <strong className="text-amber-900">{highScore}</strong>
          </span>
        </div>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-amber-500/20">
            🧮
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-2">35 Saniyede Kaç Soru Çözebilirsin?</h4>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Dört işlem becerini test et. Her doğru cevap kombo çarpanını yükseltir!
          </p>

          {/* Difficulty selector */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <span className="text-xs font-semibold text-slate-500 mr-2">Zorluk Seviyesi:</span>
            {(['kolay', 'orta', 'ileri'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  difficulty === level
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === 'kolay' ? 'Kolay (İlkokul)' : level === 'orta' ? 'Orta (5-8. Sınıf)' : 'İleri Seviye'}
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
          >
            <Play className="w-5 h-5 fill-white" />
            Yarışmayı Başlat
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-3 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold">
            🏆
          </div>
          <h4 className="text-2xl font-bold text-slate-800 mb-1">Süre Tamamlandı!</h4>
          <p className="text-slate-500 text-sm mb-6">Tebrikler, harika bir zihin egzersiziydi.</p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/70">
              <span className="text-xs text-amber-700 font-medium block">Toplam Puan</span>
              <span className="text-3xl font-extrabold text-amber-900">{score}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">En Yüksek Seri</span>
              <span className="text-3xl font-extrabold text-slate-800">{streak}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Tekrar Oyna
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
          {/* Active Game Stats */}
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Kalan Süre:</span>
              <span className={`text-xl font-bold font-mono px-2 py-0.5 rounded ${timeLeft <= 5 ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-800'}`}>
                {timeLeft}s
              </span>
            </div>

            <div className="flex items-center gap-3">
              {streak > 1 && (
                <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md animate-bounce">
                  <Zap className="w-3.5 h-3.5 fill-orange-500" />
                  {streak}x Kombo!
                </span>
              )}
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Puan</span>
                <span className="text-xl font-bold text-slate-900">{score}</span>
              </div>
            </div>
          </div>

          {/* Question Presentation Box */}
          {currentQuestion && (
            <div className="relative mb-6">
              <div className={`p-8 rounded-2xl border-2 text-center transition-all ${
                feedback === 'correct'
                  ? 'bg-emerald-50 border-emerald-400'
                  : feedback === 'wrong'
                  ? 'bg-rose-50 border-rose-400'
                  : 'bg-gradient-to-b from-amber-50/60 to-white border-amber-200/80 shadow-sm'
              }`}>
                <div className="text-4xl md:text-5xl font-black text-slate-800 tracking-wider font-mono">
                  {currentQuestion.num1} {currentQuestion.op} {currentQuestion.num2} = ?
                </div>

                {feedback === 'correct' && (
                  <div className="absolute top-3 right-4 flex items-center gap-1 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" /> Doğru!
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="absolute top-3 right-4 flex items-center gap-1 text-rose-600 font-bold text-sm">
                    <XCircle className="w-5 h-5" /> Yanlış
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {currentQuestion?.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="py-4 px-6 text-2xl font-bold rounded-xl border border-slate-200 bg-white hover:bg-amber-500 hover:text-white hover:border-amber-500 text-slate-800 shadow-sm hover:shadow transition-all transform active:scale-95 cursor-pointer font-mono"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
