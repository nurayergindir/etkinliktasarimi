import React, { useState, useEffect } from 'react';
import {
  Quote,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Heart,
  Share2,
  X
} from 'lucide-react';
import { EducationalQuote } from '../types';
import { soundManager } from '../utils/soundEffects';

interface QuoteSectionProps {
  quotes: EducationalQuote[];
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ quotes }) => {
  // On every page refresh, pick a random quote
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return Math.floor(Math.random() * quotes.length);
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('ogretmen_quote_favs');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const current = quotes[currentIndex] || quotes[0];

  const handleNextQuote = () => {
    soundManager.playClick();
    setIsRotating(true);
    let nextIdx = Math.floor(Math.random() * quotes.length);
    if (nextIdx === currentIndex && quotes.length > 1) {
      nextIdx = (currentIndex + 1) % quotes.length;
    }
    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setIsRotating(false);
    }, 200);
  };

  const handleCopyQuote = () => {
    soundManager.playClick();
    const textToCopy = `"${current.quote}" — ${current.author} (${current.title})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = (id: string) => {
    soundManager.playClick();
    const next = new Set(favoriteIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setFavoriteIds(next);
    try {
      localStorage.setItem('ogretmen_quote_favs', JSON.stringify(Array.from(next)));
    } catch {
      // ignore
    }
  };

  const filteredQuotes = activeCategoryFilter === 'all'
    ? quotes
    : quotes.filter((q) => q.category === activeCategoryFilter);

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* Main Quote Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/20 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
        {/* Decorative backdrop graphics */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300/90 block">
                  Günün İlhamı
                </span>
                <span className="text-xs text-slate-300">İz Bırakan Eğitim Düşünceleri</span>
              </div>
            </div>

            <button
              onClick={handleNextQuote}
              title="Yeni Söz Getir (Rastgele Değiştir)"
              className="p-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl transition-all border border-white/15 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Quote Icon & Content */}
          <div className="mb-6">
            <Quote className="w-8 h-8 text-amber-400/70 mb-3 rotate-180" />
            <blockquote className="text-base lg:text-lg font-serif italic font-medium leading-relaxed text-slate-100">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Card Footer: Author and Actions */}
        <div className="relative z-10 pt-4 border-t border-white/10">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                {current.author}
              </h4>
              <p className="text-xs text-indigo-200/80 mt-0.5 font-sans">
                {current.title}
              </p>
              {current.era && (
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {current.era}
                </span>
              )}
            </div>

            <button
              onClick={() => toggleFavorite(current.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                favoriteIds.has(current.id)
                  ? 'bg-rose-500/20 border-rose-400 text-rose-400'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Favorilere Ekle"
            >
              <Heart
                className={`w-4 h-4 ${
                  favoriteIds.has(current.id) ? 'fill-rose-400' : ''
                }`}
              />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-2 text-xs pt-1">
            <button
              onClick={handleCopyQuote}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sözü Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowAllModal(true);
              }}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tümünü Gör ({quotes.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inspirational Tip / Pedagogical Note */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl">
        <div className="flex items-start gap-3">
          <span className="text-xl">🌱</span>
          <div>
            <h5 className="text-xs font-bold text-amber-900 mb-0.5">
              Öğretmene Not
            </h5>
            <p className="text-xs text-amber-800/90 leading-relaxed">
              Her öğrenci kendi hızında ve kendi renginde büyür. Sabırla ekilen tohumlar geleceğin ufkunu aydınlatır.
            </p>
          </div>
        </div>
      </div>

      {/* All Quotes Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Eğitim & Düşünce Kütüphanesi
                  </h3>
                  <p className="text-xs text-slate-500">
                    Öncü eğitimcilerin ve düşünürlerin ilham verici sözleri
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowAllModal(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto bg-white text-xs">
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'öğretmenlik', label: 'Öğretmenlik' },
                { id: 'öğrenme', label: 'Öğrenme & Çocuk' },
                { id: 'vizyon', label: 'Gelecek & Vizyon' },
                { id: 'çaba', label: 'Emek & Azim' },
                { id: 'rehberlik', label: 'Rehberlik' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {filteredQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/50 transition-all flex flex-col justify-between"
                >
                  <blockquote className="text-sm font-serif italic text-slate-800 leading-relaxed mb-3">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <strong className="text-slate-900 block">{q.author}</strong>
                      <span className="text-slate-500 text-[11px]">{q.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`"${q.quote}" — ${q.author}`);
                          soundManager.playCorrect();
                        }}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                        title="Sözü Kopyala"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(q.id)}
                        className={`p-1.5 rounded-lg cursor-pointer ${
                          favoriteIds.has(q.id)
                            ? 'text-rose-500 bg-rose-50'
                            : 'text-slate-400 hover:text-rose-500'
                        }`}
                        title="Favori"
                      >
                        <Heart
                          className={`w-4 h-4 ${favoriteIds.has(q.id) ? 'fill-rose-500' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowAllModal(false)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
