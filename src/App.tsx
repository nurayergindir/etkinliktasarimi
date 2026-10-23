import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  FolderSymlink,
  ExternalLink,
  Plus,
  BookOpenCheck,
  Compass,
  Menu,
  X
} from 'lucide-react';
import { INITIAL_GAMES, INITIAL_RESOURCES, EDUCATIONAL_QUOTES } from './data/initialData';
import { EducationalGame, ResourceItem, TeacherCategory } from './types';
import { soundManager } from './utils/soundEffects';
import { HeaderClockCalendar } from './components/HeaderClockCalendar';
import { Sidebar } from './components/Sidebar';
import { QuoteSection } from './components/QuoteSection';
import { GamesCenter } from './components/GamesCenter';
import { TeacherCategoryModal } from './components/TeacherCategoryModal';
import { AddResourceModal } from './components/AddResourceModal';
import { AddGameModal } from './components/AddGameModal';

export default function App() {
  // Initialize sound settings
  useEffect(() => {
    soundManager.initMuteFromStorage();
  }, []);

  // Persistent Resources (Teacher Links & Files)
  const [resources, setResources] = useState<ResourceItem[]>(() => {
    try {
      const stored = localStorage.getItem('ogretmen_portal_resources_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure the user's specific Drive link is always present even if local storage was seeded before
        const hasDrivePlan = parsed.some(
          (r: ResourceItem) =>
            r.category === 'plans' &&
            r.url === 'https://drive.google.com/drive/folders/1WyKNTHTRKQH4tGeYHbg_-WgG4qbm8Alo?usp=drive_link'
        );
        if (!hasDrivePlan) {
          const driveItem = INITIAL_RESOURCES.find((r) => r.id === 'plan-drive-1');
          if (driveItem) return [driveItem, ...parsed];
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_RESOURCES;
  });

  // Persistent Games
  const [games, setGames] = useState<EducationalGame[]>(() => {
    try {
      const stored = localStorage.getItem('ogretmen_portal_games_v1');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return INITIAL_GAMES;
  });

  // Category Modal State
  const [activeCategoryModal, setActiveCategoryModal] = useState<TeacherCategory | null>(null);

  // Add Resource Modal State
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [defaultAddCategory, setDefaultAddCategory] = useState<TeacherCategory>('resources');

  // Add Game Modal State
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

  // Mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save resources to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ogretmen_portal_resources_v1', JSON.stringify(resources));
    } catch {
      // ignore
    }
  }, [resources]);

  // Save games to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ogretmen_portal_games_v1', JSON.stringify(games));
    } catch {
      // ignore
    }
  }, [games]);

  const handleAddResource = (item: Omit<ResourceItem, 'id' | 'dateAdded'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newResource: ResourceItem = {
      ...item,
      id: `custom-res-${Date.now()}`,
      dateAdded: today
    };
    setResources((prev) => [newResource, ...prev]);
  };

  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddGame = (newGame: EducationalGame) => {
    setGames((prev) => [newGame, ...prev]);
  };

  const userDrivePlanUrl =
    'https://drive.google.com/drive/folders/1WyKNTHTRKQH4tGeYHbg_-WgG4qbm8Alo?usp=drive_link';

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    Öğretmen Portalı
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Eğitsel Oyun Dünyası
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Sınavlar · Kaynaklar · Yıllık Planlar · İlham Sözleri · Canlı Oyunlar
                </p>
              </div>
            </div>
          </div>

          {/* Center Shortcut for User's Google Drive Annual Plans */}
          <div className="hidden xl:flex items-center gap-2">
            <a
              href={userDrivePlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/90 rounded-xl text-xs font-bold transition-all shadow-xs"
              title="Kullanıcının paylaştığı Google Drive Yıllık Planlar klasörü"
            >
              <FolderSymlink className="w-4 h-4 text-indigo-600" />
              <span>Yıllık Planlarım (Google Drive)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Right Clock, Calendar & Sound Widget */}
          <div className="flex items-center gap-3">
            <HeaderClockCalendar />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 shadow-lg animate-fade-in">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Öğretmen Menüsü
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'exams', label: 'Sınavlarım' },
                { id: 'resources', label: 'Ders Kaynaklarım' },
                { id: 'plans', label: 'Ders Planlarım' },
                { id: 'documents', label: 'Öğretmen Dosyalarım' },
                { id: 'games', label: 'Oyunlarım' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveCategoryModal(m.id as TeacherCategory);
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href={userDrivePlanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <FolderSymlink className="w-4 h-4" />
            <span>Yıllık Planlarım (Google Drive)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Main 3-Column Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Teacher Navigation & Documents */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <Sidebar
              activeCategory={activeCategoryModal}
              onSelectCategory={(cat) => setActiveCategoryModal(cat)}
              resources={resources}
              onOpenAddModal={() => {
                setDefaultAddCategory('resources');
                setIsAddResourceModalOpen(true);
              }}
            />
          </div>

          {/* MIDDLE COLUMN: Educational Games & Interactive Playground */}
          <div className="lg:col-span-6 w-full">
            <GamesCenter
              games={games}
              onOpenAddGameModal={() => setIsAddGameModalOpen(true)}
            />
          </div>

          {/* RIGHT COLUMN: Educational Quotes & Teacher Reflections */}
          <div className="lg:col-span-3 w-full sticky top-24">
            <QuoteSection quotes={EDUCATIONAL_QUOTES} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {/* 1. Category Modal (Sınavlarım, Ders Kaynaklarım, Ders Planlarım, Öğretmen Dosyalarım, Oyunlarım) */}
      <TeacherCategoryModal
        category={activeCategoryModal}
        onClose={() => setActiveCategoryModal(null)}
        resources={resources}
        onAddResource={handleAddResource}
        onDeleteResource={handleDeleteResource}
      />

      {/* 2. Quick Add Resource Modal */}
      <AddResourceModal
        isOpen={isAddResourceModalOpen}
        onClose={() => setIsAddResourceModalOpen(false)}
        onAdd={handleAddResource}
        defaultCategory={defaultAddCategory}
      />

      {/* 3. Add Custom Educational Game Modal */}
      <AddGameModal
        isOpen={isAddGameModalOpen}
        onClose={() => setIsAddGameModalOpen(false)}
        onAddGame={handleAddGame}
      />

      {/* Bottom Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">Öğretmen Portalı &amp; Eğitsel Oyun Alanı</span>
            <span>·</span>
            <span>2024-2025 Eğitim-Öğretim Yılı</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Görsel, Estetik ve Canlı Öğrenme Platformu</span>
            <a
              href={userDrivePlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <span>Drive Yıllık Planlarım</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
