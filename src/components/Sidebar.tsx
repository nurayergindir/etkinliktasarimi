import React from 'react';
import {
  FileCheck2,
  FolderOpen,
  FolderKanban,
  FileText,
  Gamepad2,
  ExternalLink,
  Plus,
  FolderSymlink,
  GraduationCap
} from 'lucide-react';
import { ResourceItem, TeacherCategory } from '../types';
import { soundManager } from '../utils/soundEffects';

interface SidebarProps {
  activeCategory: TeacherCategory | null;
  onSelectCategory: (cat: TeacherCategory) => void;
  resources: ResourceItem[];
  onOpenAddModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
  resources,
  onOpenAddModal
}) => {
  const getCount = (cat: TeacherCategory) => {
    return resources.filter((r) => r.category === cat).length;
  };

  const menuItems: Array<{
    id: TeacherCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    colorClasses: string;
    badgeColor: string;
    hasDriveLink?: boolean;
  }> = [
    {
      id: 'exams',
      title: 'Sınavlarım',
      description: 'Yazılı soruları, testler & rubrikler',
      icon: <FileCheck2 className="w-5 h-5 text-rose-600" />,
      colorClasses: 'hover:border-rose-300 hover:bg-rose-50/60',
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'resources',
      title: 'Ders Kaynaklarım',
      description: 'EBA, dijital kitaplar & sunumlar',
      icon: <FolderOpen className="w-5 h-5 text-emerald-600" />,
      colorClasses: 'hover:border-emerald-300 hover:bg-emerald-50/60',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'plans',
      title: 'Ders Planlarım',
      description: 'Yıllık & günlük planlar, takvim',
      icon: <FolderKanban className="w-5 h-5 text-indigo-600" />,
      colorClasses: 'hover:border-indigo-300 hover:bg-indigo-50/60',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      hasDriveLink: true
    },
    {
      id: 'documents',
      title: 'Öğretmen Dosyalarım',
      description: 'Zümre, kulüp & rehberlik evrakları',
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      colorClasses: 'hover:border-amber-300 hover:bg-amber-50/60',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'games',
      title: 'Oyunlarım',
      description: 'Kutu oyunları & sınıf içi etkinlikler',
      icon: <Gamepad2 className="w-5 h-5 text-purple-600" />,
      colorClasses: 'hover:border-purple-300 hover:bg-purple-50/60',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const drivePlan = resources.find((r) => r.category === 'plans' && r.isDriveFolder);

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* Teacher Profile / Menu Header */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              Öğretmen Alanı
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Ders & Yönetim Masası</p>
          </div>
        </div>

        {/* Menu Items List */}
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const count = getCount(item.id);
            const isSelected = activeCategory === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectCategory(item.id);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                    : `bg-slate-50/70 border-slate-200/80 text-slate-800 ${item.colorClasses}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-all ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-white shadow-xs'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className={`text-sm font-bold block ${
                        isSelected ? 'text-white' : 'text-slate-800 group-hover:text-slate-950'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`text-[11px] block ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-lg font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : item.badgeColor
                    }`}
                  >
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Add Resource Button */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAddModal();
            }}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>Yeni Bağlantı / Dosya Ekle</span>
          </button>
        </div>
      </div>

      {/* Prominent Drive Plan Quick-Card */}
      {drivePlan && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50/80 border border-indigo-200/90 rounded-3xl p-5 shadow-xs">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
              <FolderSymlink className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md inline-block mb-1">
                Yıllık Planlarım
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                Google Drive Klasörü
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                Tanımladığınız Drive klasörüne doğrudan erişin ve planlarınızı yönetin.
              </p>
            </div>
          </div>

          <a
            href={drivePlan.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Drive Klasörünü Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Quick Help Tip */}
      <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
        <strong className="text-slate-700 block mb-0.5">💡 İpucu:</strong>
        Menülere tıklayarak mevcut bağlantıları inceleyebilir, &quot;Yeni Bağlantı Ekle&quot; ile kendi sınav veya ders linklerinizi kaydedebilirsiniz.
      </div>
    </aside>
  );
};
