import React, { useState } from 'react';
import {
  Sparkles,
  Gamepad2,
  Search,
  Plus,
  Play,
  ExternalLink,
  Star,
  Users,
  Timer,
  BookMarked,
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import { EducationalGame, GameSubject, GradeLevel } from '../types';
import { soundManager } from '../utils/soundEffects';
import { MathSprintGame } from './games/MathSprintGame';
import { WordHunterGame } from './games/WordHunterGame';
import { TriviaQuizGame } from './games/TriviaQuizGame';
import { MemoryMatchGame } from './games/MemoryMatchGame';

interface GamesCenterProps {
  games: EducationalGame[];
  onOpenAddGameModal: () => void;
}

export const GamesCenter: React.FC<GamesCenterProps> = ({
  games,
  onOpenAddGameModal
}) => {
  const [selectedSubject, setSelectedSubject] = useState<GameSubject>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const subjectTabs: Array<{ id: GameSubject; label: string; icon: string }> = [
    { id: 'all', label: 'Tüm Oyunlar', icon: '✨' },
    { id: 'matematik', label: 'Matematik', icon: '📐' },
    { id: 'fen', label: 'Fen & Bilim', icon: '🔬' },
    { id: 'turkce', label: 'Türkçe & Dil', icon: '📚' },
    { id: 'mantik', label: 'Mantık & Zeka', icon: '🧩' },
    { id: 'kodlama', label: 'Kodlama', icon: '💻' },
    { id: 'sosyal', label: 'Sosyal & Çark', icon: '🌍' }
  ];

  const filteredGames = games.filter((game) => {
    const matchesSubject = selectedSubject === 'all' || game.subject === selectedSubject;
    const matchesGrade =
      selectedGrade === 'all' ||
      game.gradeLevels.some((g) => g.toLowerCase() === selectedGrade.toLowerCase());
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.skillsLearned.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesGrade && matchesSearch;
  });

  const handleLaunchGame = (game: EducationalGame) => {
    soundManager.playClick();
    if (game.isPlayableInApp && game.inAppGameId) {
      setActiveGameId(game.id);
    } else if (game.externalUrl) {
      window.open(game.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const activeGame = games.find((g) => g.id === activeGameId);

  return (
    <div className="flex flex-col gap-6">
      {/* If an in-app game is currently running, show it at full showcase height */}
      {activeGame && activeGame.isPlayableInApp ? (
        <div className="animate-fade-in">
          {activeGame.inAppGameId === 'math-sprint' && (
            <MathSprintGame onBack={() => setActiveGameId(null)} />
          )}
          {activeGame.inAppGameId === 'word-hunter' && (
            <WordHunterGame onBack={() => setActiveGameId(null)} />
          )}
          {activeGame.inAppGameId === 'trivia-quiz' && (
            <TriviaQuizGame onBack={() => setActiveGameId(null)} />
          )}
          {activeGame.inAppGameId === 'memory-match' && (
            <MemoryMatchGame onBack={() => setActiveGameId(null)} />
          )}
        </div>
      ) : (
        <>
          {/* Vibrant Eye-Catching Hero Section */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white p-7 md:p-9 shadow-lg">
            {/* Geometric glow blobs */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Eğitsel Oyun & Etkinlik Dünyası</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3">
                Öğrenmeyi Heyecana Dönüştüren Canlı Oyun Alanı
              </h1>

              <p className="text-sm md:text-base text-white/90 leading-relaxed font-normal mb-6">
                Öğrencilerin sınıf içinde ve bireysel olarak hem eğlenip hem de kavramları pekiştirebileceği etkileşimli oyunlar, zeka bulmacaları ve dijital etkinlikler.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const mathGame = games.find((g) => g.id === 'game-math-sprint');
                    if (mathGame) handleLaunchGame(mathGame);
                  }}
                  className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4 fill-slate-900" />
                  Hemen Matematik Yarışına Başla
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenAddGameModal();
                  }}
                  className="px-4 py-2.5 bg-black/25 hover:bg-black/40 text-white font-semibold text-xs md:text-sm rounded-xl backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Oyun Ekle
                </button>
              </div>
            </div>
          </div>

          {/* Search & Subject Tabs Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3.5">
            {/* Top row: search + grade filter */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Oyun adı, kavram veya beceri ara (ör: Dört işlem, Fotosentez, Scratch)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Grade level segmented control */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
                {(['all', 'ilkokul', 'ortaokul', 'lise'] as GradeLevel[]).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedGrade(grade);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize cursor-pointer ${
                      selectedGrade === grade
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {grade === 'all' ? 'Tüm Kademeler' : grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {subjectTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedSubject(tab.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    selectedSubject === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Games Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGames.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
                <Gamepad2 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <h4 className="text-base font-bold text-slate-700">Aranan kriterde oyun bulunamadı</h4>
                <p className="text-xs text-slate-500 mt-1">Farklı bir arama terimi deneyebilir veya yeni bir oyun ekleyebilirsiniz.</p>
              </div>
            ) : (
              filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header Banner */}
                  <div className={`p-4 bg-gradient-to-r ${game.colorGradient} text-white flex items-center justify-between`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg font-bold">
                        {game.subject === 'matematik' ? '📐' : game.subject === 'fen' ? '🔬' : game.subject === 'turkce' ? '📖' : game.subject === 'mantik' ? '🧩' : game.subject === 'kodlama' ? '💻' : '🎮'}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-wide leading-tight">
                          {game.title}
                        </h3>
                        <span className="text-[11px] text-white/80 font-medium">
                          {game.gradeLevels.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold bg-black/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      <Timer className="w-3.5 h-3.5 text-amber-300" />
                      <span>{game.durationMinutes} dk</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {game.shortDescription}
                      </p>

                      {/* Skills Learned Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {game.skillsLearned.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions & Stats */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <strong className="text-slate-700">{game.rating}</strong>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{game.playCount}+ oynandı</span>
                        </span>
                      </div>

                      <button
                        onClick={() => handleLaunchGame(game)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer ${
                          game.isPlayableInApp
                            ? 'bg-slate-900 hover:bg-slate-800 text-white'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80'
                        }`}
                      >
                        {game.isPlayableInApp ? (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{game.badgeText}</span>
                          </>
                        ) : (
                          <>
                            <span>{game.badgeText}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
