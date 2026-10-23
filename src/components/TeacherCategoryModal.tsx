import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  Check,
  FolderKanban,
  FileText,
  Search,
  FileCheck2,
  FolderOpen
} from 'lucide-react';
import { ResourceItem, TeacherCategory } from '../types';
import { soundManager } from '../utils/soundEffects';

interface TeacherCategoryModalProps {
  category: TeacherCategory | null;
  onClose: () => void;
  resources: ResourceItem[];
  onAddResource: (item: Omit<ResourceItem, 'id' | 'dateAdded'>) => void;
  onDeleteResource: (id: string) => void;
}

const CATEGORY_META: Record<
  TeacherCategory,
  { title: string; subtitle: string; icon: React.ReactNode; color: string; badgeColor: string }
> = {
  plans: {
    title: 'Ders Planlarım',
    subtitle: 'Yıllık ve günlük ders planları, müfredat kazanımları ve resmi çalışma takvimi',
    icon: <FolderKanban className="w-6 h-6 text-indigo-600" />,
    color: 'border-indigo-200 text-indigo-900',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  exams: {
    title: 'Sınavlarım',
    subtitle: 'Ortak yazılı soruları, test havuzları, cevap anahtarları ve başarı analizleri',
    icon: <FileCheck2 className="w-6 h-6 text-rose-600" />,
    color: 'border-rose-200 text-rose-900',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  resources: {
    title: 'Ders Kaynaklarım',
    subtitle: 'Etkileşimli tahta materyalleri, EBA içerikleri, dijital kitaplar ve sunumlar',
    icon: <FolderOpen className="w-6 h-6 text-emerald-600" />,
    color: 'border-emerald-200 text-emerald-900',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  documents: {
    title: 'Öğretmen Dosyalarım',
    subtitle: 'Zümre tutanakları, kulüp ve rehberlik evrakları, MEBBİS resmi belgeleri',
    icon: <FileText className="w-6 h-6 text-amber-600" />,
    color: 'border-amber-200 text-amber-900',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  games: {
    title: 'Oyunlarım',
    subtitle: 'Sınıf içi eğitsel oyun listeleri, Wordwall koleksiyonları ve grup etkinlikleri',
    icon: <FolderOpen className="w-6 h-6 text-purple-600" />,
    color: 'border-purple-200 text-purple-900',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
};

export const TeacherCategoryModal: React.FC<TeacherCategoryModalProps> = ({
  category,
  onClose,
  resources,
  onAddResource,
  onDeleteResource
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for new link
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');

  if (!category) return null;

  const meta = CATEGORY_META[category];
  const categoryResources = resources.filter((r) => r.category === category);
  const filtered = categoryResources.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopy = (id: string, url: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    soundManager.playCorrect();
    const tagArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddResource({
      category,
      title: newTitle.trim(),
      url: newUrl.trim(),
      description: newDesc.trim() || 'Öğretmen tarafından eklenen özel bağlantı',
      tags: tagArray.length > 0 ? tagArray : ['Özel Bağlantı'],
      isPinned: false,
      isDriveFolder: newUrl.includes('drive.google.com'),
      type: newUrl.includes('drive.google.com') ? 'drive' : 'link'
    });

    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
    setNewTags('');
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/80">
              {meta.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{meta.title}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${meta.badgeColor}`}>
                  {categoryResources.length} Öğe
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{meta.subtitle}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action / Search Bar */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`${meta.title} içinde ara...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
            />
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsAdding(!isAdding);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            {isAdding ? 'Formu Kapat' : 'Yeni Bağlantı Ekle'}
          </button>
        </div>

        {/* Add Form Collapse */}
        {isAdding && (
          <form
            onSubmit={handleCreateResource}
            className="p-5 bg-slate-50/90 border-b border-slate-200/80 animate-fade-in"
          >
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Yeni {meta.title} Bağlantısı Ekle
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Başlık *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2024-2025 Yıllık Planlar Klasörü"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Bağlantı Linki (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Kısa Açıklama
                </label>
                <input
                  type="text"
                  placeholder="Örn: Tüm zümrelerin ortak yıllık plan arşivi"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Yıllık Plan, Drive, 7. Sınıf"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
              >
                Kaydet ve Ekle
              </button>
            </div>
          </form>
        )}

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {category === 'plans' && (
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold tracking-wide uppercase text-indigo-700 block mb-0.5">
                  Özel Paylaşılan Google Drive Klasörü
                </span>
                <h4 className="text-sm font-bold text-slate-800">
                  Yıllık Planlarınız Başarıyla Tanımlandı
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Sağladığınız Google Drive bağlantısı bu kategoriye otomatik kaydedilmiştir. Dilediğiniz zaman tek tıkla doğrudan klasöre erişebilir veya düzenleyebilirsiniz.
                </p>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 stroke-1" />
              <p className="text-sm font-medium">Bu kategoride henüz aranan kriterde kayıt bulunmuyor.</p>
              <p className="text-xs mt-1">Yukarıdaki &quot;Yeni Bağlantı Ekle&quot; butonunu kullanarak dilediğiniz linki ekleyebilirsiniz.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  item.isDriveFolder
                    ? 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      {item.isDriveFolder && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-200">
                          <FolderOpen className="w-3 h-3 text-amber-600" />
                          Google Drive
                        </span>
                      )}
                      {item.isPinned && (
                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                          Öne Çıkan
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                      <span>Eklenme: {item.dateAdded}</span>
                      <span aria-hidden="true">·</span>
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-slate-500 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      title="Bağlantıyı Kopyala"
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-xs ${
                        item.isDriveFolder
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span>Aç</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onDeleteResource(item.id);
                      }}
                      title="Sil"
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tüm eklemeler tarayıcınızda güvenle saklanır.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
