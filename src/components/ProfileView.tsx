import React, { useState } from "react";
import { User, School, Award, Hash, Save, ShieldAlert, Sparkles } from "lucide-react";
import { FormDataState } from "../types";

interface ProfileViewProps {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
}

export default function ProfileView({
  formData,
  setFormData
}: ProfileViewProps) {
  const [teacherName, setTeacherName] = useState(formData.teacherName);
  const [nip, setNip] = useState(formData.nip);
  const [madrasahName, setMadrasahName] = useState(formData.madrasahName);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      teacherName,
      nip,
      madrasahName
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Intro header */}
      <div>
        <h2 className="font-sans font-bold text-slate-800 dark:text-white text-2xl">Profil Pendidik Madrasah</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kelola data kepegawaian dan nama lembaga madrasah Anda di sini</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Card: Summary Profile Avatar */}
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 flex items-center justify-center shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-2xl text-white">
              {teacherName ? teacherName.charAt(0) : "G"}
            </div>
          </div>
          <div>
            <h3 className="font-sans font-bold text-slate-800 dark:text-white text-sm">{teacherName || "Guru Madrasah"}</h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-1">Kemenag RI • Pendidik</p>
          </div>
          <div className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
            Data profil ini disinkronisasikan otomatis untuk melengkapi isian RPP, modul, dan lembar kerja baru Anda.
          </div>
        </div>

        {/* Right Card: Fields Edit form */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md">
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Identitas Pengampu</h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Nama Lengkap & Gelar Akademik
                </label>
                <input 
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-indigo-500" />
                  Nomor Induk Pegawai (NIP)
                </label>
                <input 
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <School className="w-4 h-4 text-emerald-500" />
                  Instansi / Nama Madrasah
                </label>
                <input 
                  type="text"
                  value={madrasahName}
                  onChange={(e) => setMadrasahName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <Sparkles className="w-4 h-4 animate-bounce" />
                <span>Profil guru berhasil diperbarui secara lokal!</span>
              </div>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow shadow-blue-500/10"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
