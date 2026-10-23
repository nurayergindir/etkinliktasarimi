import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface TriviaQuizGameProps {
  onBack?: () => void;
}

interface TriviaQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    subject: 'Fen Bilimleri',
    question: 'Güneş sistemindeki en büyük gezegen aşağıdakilerden hangisidir?',
    options: ['Mars', 'Satürn', 'Jüpiter', 'Neptün'],
    correctIndex: 2,
    explanation: 'Jüpiter, Güneş Sistemi’nin kütlece ve hacimce en büyük gezegenidir. İçine yaklaşık 1.300 tane Dünya sığabilir.'
  },
  {
    id: 2,
    subject: 'Matematik',
    question: 'Bir üçgenin iç açılarının ölçüleri toplamı kaç derecedir?',
    options: ['90°', '180°', '270°', '360°'],
    correctIndex: 1,
    explanation: 'Öklid geometrisinde tüm düzlemsel üçgenlerin iç açıları toplamı her zaman 180 derecedir.'
  },
  {
    id: 3,
    subject: 'Tarih',
    question: 'Türkiye Cumhuriyeti’nin ilk Başbakanı kimdir?',
    options: ['İsmet İnönü', 'Fevzi Çakmak', 'Kazım Karabekir', 'Celal Bayar'],
    correctIndex: 0,
    explanation: 'Cumhuriyetin ilanından sonra kurulan ilk hükümetin başbakanlığını İsmet İnönü üstlenmiştir.'
  },
  {
    id: 4,
    subject: 'Türkçe & Edebiyat',
    question: 'İstiklâl Marşımızın yazarı kimdir?',
    options: ['Tevfik Fikret', 'Mehmet Âkif Ersoy', 'Ziya Gökalp', 'Yahya Kemal Beyatlı'],
    correctIndex: 1,
    explanation: 'Mehmet Âkif Ersoy, 1921 yılında düzenlenen yarışmada milli marşımızı yazmış ve kazandığı para ödülünü Darülmesai vakfına bağışlamıştır.'
  },
  {
    id: 5,
    subject: 'Coğrafya',
    question: 'Türkiye’nin en yüksek dağı hangisidir?',
    options: ['Erciyes Dağı', 'Kaçkar Dağı', 'Süphan Dağı', 'Ağrı Dağı'],
    correctIndex: 3,
    explanation: 'Ağrı Dağı, 5.137 metre yüksekliği ile Türkiye’nin ve Ermenistan platosunun en yüksek zirvesidir.'
  },
  {
    id: 6,
    subject: 'Bilim & Keşif',
    question: 'DNA’nın çift sarmal yapısını keşfederek Nobel Ödülü kazanan bilim insanları kimlerdir?',
    options: ['Watson ve Crick', 'Marie ve Pierre Curie', 'Newton ve Galileo', 'Edison ve Tesla'],
    correctIndex: 0,
    explanation: 'James Watson ve Francis Crick, 1953 yılında Rosalind Franklin’in X-ışını verilerinden yararlanarak DNA’nın çift sarmal modelini keşfetmiştir.'
  }
];

export const TriviaQuizGame: React.FC<TriviaQuizGameProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const current = TRIVIA_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === current.correctIndex) {
      soundManager.playCorrect();
      setScore((prev) => prev + 20);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundManager.playVictory();
      confetti({ particleCount: 90, spread: 70 });
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-200/80 shadow-md p-6 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-indigo-100 mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
              title="Geri Dön"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">🎯</span>
              Genel Kültür & Bilim Çarkı
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Müfredat ve genel kültür bilgi testi</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            Puan: <strong className="text-indigo-900">{score}</strong>
          </span>
        </div>
      </div>

      {isFinished ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-3 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl font-bold">
            🎓
          </div>
          <h4 className="text-2xl font-bold text-slate-800 mb-2">Testi Tamamladınız!</h4>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Öğrenmeye ve bilgilerinizi tazelemeye her zaman devam edin.
          </p>
          <div className="p-4 bg-indigo-50 rounded-xl max-w-xs mx-auto mb-6 border border-indigo-200 text-center">
            <span className="text-xs text-indigo-700 font-semibold block">Toplam Başarı Puanı</span>
            <span className="text-3xl font-extrabold text-indigo-900">{score} / {TRIVIA_QUESTIONS.length * 20}</span>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-sm cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Yeniden Çöz
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
          {/* Question Category & Progress */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md border border-indigo-100">
              {current.subject}
            </span>
            <span className="font-medium">
              Soru {currentIndex + 1} / {TRIVIA_QUESTIONS.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="p-6 bg-gradient-to-br from-indigo-50/60 to-purple-50/40 rounded-xl border border-indigo-200/70 mb-5">
            <h4 className="text-base md:text-lg font-bold text-slate-800 leading-snug">
              {current.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {current.options.map((option, idx) => {
              let btnClass = 'border-slate-200 bg-white hover:bg-indigo-50/70 hover:border-indigo-300 text-slate-800';

              if (isAnswered) {
                if (idx === current.correctIndex) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                } else if (idx === selectedOption) {
                  btnClass = 'border-rose-400 bg-rose-50 text-rose-800 font-semibold';
                } else {
                  btnClass = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm md:text-base font-medium flex items-center justify-between transition-all cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && idx === current.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== current.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-5 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 block mb-1">📖 Açıklama:</strong>
              {current.explanation}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer text-sm"
              >
                {currentIndex + 1 < TRIVIA_QUESTIONS.length ? 'Sonraki Soru →' : 'Sonuçları Gör'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
