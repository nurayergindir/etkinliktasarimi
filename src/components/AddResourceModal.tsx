import React, { useState } from 'react';
import { X, Plus, Link, FolderKanban } from 'lucide-react';
import { ResourceItem, TeacherCategory } from '../types';
import { soundManager } from '../utils/soundEffects';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ResourceItem, 'id' | 'dateAdded'>) => void;
  defaultCategory?: TeacherCategory;
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  defaultCategory = 'resources'
}) => {
  const [category, setCategory] = useState<TeacherCategory>(defaultCategory);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    soundManager.playCorrect();
    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAdd({
      category,
      title: title.trim(),
      url: url.trim(),
      description: description.trim() || 'Öğretmen özel bağlantısı',
      tags: tagArray.length > 0 ? tagArray : ['Bağlantı'],
      isPinned: false,
      isDriveFolder: url.includes('drive.google.com'),
      type: url.includes('drive.google.com') ? 'drive' : 'link'
    });

    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Yeni Öğretmen Bağlantısı Ekle
              </h3>
              <p className="text-xs text-slate-500">
                Sınav, kaynak, plan veya dosya linkinizi kaydedin
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
              Hangi Menüye Eklenecek? *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'exams', label: 'Sınavlarım' },
                { id: 'resources', label: 'Ders Kaynaklarım' },
                { id: 'plans', label: 'Ders Planlarım' },
                { id: 'documents', label: 'Öğretmen Dosyalarım' },
                { id: 'games', label: 'Oyunlarım' }
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCategory(item.id as TeacherCategory)}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    category === item.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Başlık *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 2024-2025 Zümre Tutanakları Drive Dosyası"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              İnternet Adresi (URL) *
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                placeholder="https://drive.google.com/... veya https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Açıklama veya Notlar
            </label>
            <textarea
              rows={2}
              placeholder="Bağlantı hakkında kısa hatırlatma notu..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Etiketler (Virgülle ayırın)
            </label>
            <input
              type="text"
              placeholder="Örn: Matematik, 8. Sınıf, LGS, Çalışma Kağıdı"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
              Bağlantıyı Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
