import React, { useState } from 'react';
import { X, Gamepad2, Plus, Link, Clock } from 'lucide-react';
import { EducationalGame, GameSubject } from '../types';
import { soundManager } from '../utils/soundEffects';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: EducationalGame) => void;
}

export const AddGameModal: React.FC<AddGameModalProps> = ({
  isOpen,
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [subject, setSubject] = useState<Exclude<GameSubject, 'all'>>('matematik');
  const [grades, setGrades] = useState<string>('Ortaokul');
  const [duration, setDuration] = useState<number>(10);
  const [externalUrl, setExternalUrl] = useState('');
  const [skills, setSkills] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !externalUrl.trim()) return;

    soundManager.playCorrect();

    const gradientMap: Record<Exclude<GameSubject, 'all'>, string> = {
      matematik: 'from-amber-500 via-orange-500 to-rose-500',
      fen: 'from-cyan-500 via-teal-500 to-emerald-600',
      turkce: 'from-rose-500 via-pink-600 to-purple-600',
      sosyal: 'from-emerald-500 via-teal-600 to-cyan-700',
      mantik: 'from-blue-600 via-indigo-600 to-violet-700',
      kodlama: 'from-purple-600 via-fuchsia-600 to-pink-600'
    };

    const newGame: EducationalGame = {
      id: `custom-game-${Date.now()}`,
      title: title.trim(),
      shortDescription: shortDesc.trim() || 'Öğretmen tarafından eklenen özel eğitsel etkinlik.',
      longDescription: shortDesc.trim() || 'Özel eğitsel oyun.',
      subject,
      gradeLevels: grades.split(',').map((g) => g.trim()).filter(Boolean),
      durationMinutes: duration || 10,
      colorGradient: gradientMap[subject],
      accentColor: 'text-indigo-600',
      iconName: 'Gamepad2',
      badgeText: 'Oyunu Başlat',
      isPlayableInApp: false,
      externalUrl: externalUrl.trim(),
      skillsLearned: skills
        ? skills.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Eğitsel Pekiştirme', 'Kavram Öğrenimi'],
      rating: 5.0,
      playCount: 1
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Yeni Eğitsel Oyun Ekle
              </h3>
              <p className="text-xs text-slate-500">
                Wordwall, Kahoot, Quizizz veya kendi eğitsel oyun bağlantınızı vitrine ekleyin
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Oyun Başlığı *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 7. Sınıf Rasyonel Sayılar Çarkıfeleği"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Ders / Alan *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Exclude<GameSubject, 'all'>)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
              >
                <option value="matematik">Matematik</option>
                <option value="fen">Fen & Bilim</option>
                <option value="turkce">Türkçe & Dil</option>
                <option value="sosyal">Sosyal Bilgiler</option>
                <option value="mantik">Mantık & Zeka</option>
                <option value="kodlama">Kodlama</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Ortalama Süre (dk)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10) || 5)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Oyun Bağlantısı (URL) *
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                placeholder="https://wordwall.net/play/... veya https://..."
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Kısa Açıklama / Nasıl Oynanır?
            </label>
            <textarea
              rows={2}
              placeholder="Öğrenciler gruplara ayrılarak çarkı çevirir ve soruya cevap verir..."
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Kademeler
              </label>
              <input
                type="text"
                placeholder="Örn: 6. Sınıf, 7. Sınıf"
                value={grades}
                onChange={(e) => setGrades(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Geliştirilen Beceriler
              </label>
              <input
                type="text"
                placeholder="Örn: Kesirler, Hız, Dikkat"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Oyunu Vitrine Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
