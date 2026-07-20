import React from "react";
import { 
  Settings, 
  Trash2, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  FileCheck,
  ShieldAlert,
  Heart
} from "lucide-react";

interface SettingsViewProps {
  onClearStorage: () => void;
  curriculumPreference: string;
  setCurriculumPreference: (cur: string) => void;
}

export default function SettingsView({
  onClearStorage,
  curriculumPreference,
  setCurriculumPreference
}: SettingsViewProps) {

  const handleClear = () => {
    if (confirm("PERINGATAN! Tindakan ini akan menghapus semua dokumen RPP, modul, dan aktivitas yang tersimpan secara lokal. Apakah Anda yakin ingin membersihkan penyimpanan?")) {
      onClearStorage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Intro Header */}
      <div>
        <h2 className="font-sans font-bold text-slate-800 dark:text-white text-2xl">Pengaturan SIPRIMA</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Konfigurasi preferensi sistem cerdas, hapus cache lokal, dan baca panduan kurikulum</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Settings column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* System preferences */}
          <div className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4.5 h-4.5 text-blue-500" />
              Preferensi Utama RPP AI
            </h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Default Acuan Kurikulum Guru</label>
                <select
                  value={curriculumPreference}
                  onChange={(e) => setCurriculumPreference(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="Kurikulum Merdeka">Kurikulum Merdeka (Kemenag)</option>
                  <option value="KMA 183">KMA 183 (Pendidikan Agama Islam & B. Arab)</option>
                  <option value="KMA 450">KMA 450 (Pedoman Implementasi Kurikulum Madrasah)</option>
                  <option value="KMA 1503 Tahun 2025">KMA 1503 Tahun 2025 (Pembaruan Kurikulum)</option>
                  <option value="Kurikulum Berbasis Cinta">Kurikulum Berbasis Cinta (Panca Cinta)</option>
                </select>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                  Sistem AI SIPRIMA secara otomatis memprioritaskan kurikulum acuan ini pada setiap generator dokumen baru Anda.
                </p>
              </div>
            </div>
          </div>

          {/* Danger zone / cleanup */}
          <div className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4.5 h-4.5 text-red-500" />
              Zona Bahaya (Danger Zone)
            </h4>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Bersihkan Penyimpanan Lokal</h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-sm leading-tight">
                  Tindakan ini menghapus semua dokumen RPP, modul, dan riwayat di browser Anda secara permanen.
                </p>
              </div>

              <button
                id="clear-cache-btn"
                onClick={handleClear}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-sm shadow-red-600/10 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                <span>Bersihkan Data</span>
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Info guide: Madrasah Curriculum explanations */}
        <div className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-5">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Panduan Kurikulum Madrasah
          </h4>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/40 dark:border-slate-800/40">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Kurikulum Merdeka Madrasah</h5>
              <p className="text-[10px] leading-relaxed text-slate-500">
                Penerapan Kurikulum Merdeka di madrasah menekankan kebebasan mengajar guru, pembelajaran berbasis proyek, serta integrasi karakter Profil Pelajar Rahmatan Lil Alamin (P2RA).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/40 dark:border-slate-800/40">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1">KMA 450 & KMA 1503</h5>
              <p className="text-[10px] leading-relaxed text-slate-500">
                Keputusan Menteri Agama (KMA) mengatur implementasi struktur kurikulum, beban mengajar, mata pelajaran keagamaan (Qur'an Hadis, Akidah Akhlak, Fikih, SKI, B. Arab) khas madrasah Indonesia.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/40 dark:border-slate-800/40">
              <h5 className="font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" /> Kurikulum Berbasis Cinta
              </h5>
              <p className="text-[10px] leading-relaxed text-slate-500">
                Metodologi pendidikan holistik madrasah yang mengedepankan pendekatan kasih sayang spiritual, membangun empati, kepedulian sosial, serta kecintaan mendalam pada kelestarian alam ciptaan Allah SWT.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
