import React from "react";
import { 
  FileText, 
  BookOpen, 
  ClipboardList, 
  HelpCircle, 
  Layers, 
  ArrowRight, 
  Plus, 
  Calendar, 
  Database, 
  Clock, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Heart
} from "lucide-react";
import { SavedDocument, RecentActivity, DocType } from "../types";

interface DashboardProps {
  documents: SavedDocument[];
  recentActivities: RecentActivity[];
  setCurrentView: (view: string) => void;
  setEditDoc: (doc: SavedDocument | null) => void;
  teacherName: string;
}

export default function Dashboard({
  documents = [],
  recentActivities = [],
  setCurrentView,
  setEditDoc,
  teacherName
}: DashboardProps) {
  // Compute Stats
  const rppCount = documents.filter(doc => doc.docType === "rpp").length;
  const modulCount = documents.filter(doc => doc.docType === "modul_ajar").length;
  const lkpdCount = documents.filter(doc => doc.docType === "lkpd").length;
  const soalCount = documents.filter(doc => doc.docType === "soal").length;
  const totalCount = documents.length;

  const storageUsed = (totalCount * 0.12).toFixed(2); // approximate KB/MB
  const storagePercentage = Math.min((parseFloat(storageUsed) / 10) * 100, 100).toFixed(0);

  // Quick action function
  const handleQuickAction = (viewId: string) => {
    setEditDoc(null);
    setCurrentView(viewId);
  };

  const getDocTypeColor = (type: DocType) => {
    switch (type) {
      case "rpp": return "from-blue-500 to-indigo-600 bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "modul_ajar": return "from-violet-500 to-purple-600 bg-violet-500/10 text-violet-600 dark:text-violet-400";
      case "lkpd": return "from-emerald-500 to-teal-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "soal": return "from-amber-500 to-orange-600 bg-amber-500/10 text-amber-600 dark:text-amber-400";
      default: return "from-slate-500 to-slate-600 bg-slate-500/10 text-slate-600 dark:text-slate-400";
    }
  };

  // Static chart data (weekly activity)
  const chartData = [
    { day: "Sen", value: 4 },
    { day: "Sel", value: 7 },
    { day: "Rab", value: 5 },
    { day: "Kam", value: totalCount + 2 },
    { day: "Jum", value: Math.max(3, totalCount) },
    { day: "Sab", value: 2 },
    { day: "Ahd", value: 0 },
  ];
  const maxChartValue = Math.max(...chartData.map(d => d.value), 8);

  // Simple calendar generator
  const today = new Date();
  const currentMonthYear = today.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  const currentDay = today.getDate();

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Absolute Geometric Glow spheres */}
      <div className="bg-glow top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-30 dark:opacity-60"></div>
      <div className="bg-glow-2 bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-30 dark:opacity-50"></div>

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-8 text-white border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-600/15 to-teal-500/15 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Sistem AI Kurikulum Kemenag Aktif
            </div>
            <h2 className="text-3.5xl font-bold font-display tracking-tight leading-tight">
              Selamat Datang kembali, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-amber-400">{teacherName}</span>!
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Siap membuat rancangan pembelajaran berkualitas hari ini? SIPRIMA AI telah dioptimalkan sesuai keputusan KMA terbaru, lengkap dengan dimensi Profil Pelajar Pancasila Rahmatan Lil Alamin, dan Integrasi Panca Cinta Madrasah.
            </p>
          </div>
          <button 
            id="quick-start-rpp"
            onClick={() => handleQuickAction("gen_rpp")}
            className="flex-shrink-0 group flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 font-semibold text-sm transition-all duration-300 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 text-white"
          >
            <span className="font-display">Mulai Buat RPP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Grid Statistik - Geometric Balance Theme */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        {[
          { id: "stat-rpp", label: "RPP", count: rppCount, icon: BookOpen, color: "text-blue-500 bg-blue-500/10 border-blue-500/15" },
          { id: "stat-modul", label: "Modul", count: modulCount, icon: FileText, color: "text-violet-500 bg-violet-500/10 border-violet-500/15" },
          { id: "stat-lkpd", label: "LKPD", count: lkpdCount, icon: ClipboardList, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/15" },
          { id: "stat-soal", label: "Soal", count: soalCount, icon: HelpCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/15" },
          { id: "stat-total", label: "Total Dokumen", count: totalCount, icon: Layers, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/15" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.id} 
              id={stat.id}
              className="p-5 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-slate-300 dark:hover:border-white/10 transition-all duration-200"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-white/40 tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold font-display text-slate-800 dark:text-white">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} border flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bento Column 1: Weekly Progress Chart & Storage */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="p-6 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-sm flex-1 flex flex-col justify-between min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-teal-500" />
                  Aktivitas Generator RPP Mingguan
                </h3>
                <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">Statistik dokumen yang berhasil digenerasikan oleh AI</p>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 py-1 px-2.5 rounded-full font-bold">Minggu Ini</span>
            </div>

            {/* Custom Modern SVG Chart */}
            <div className="h-40 flex items-end justify-between px-2 pt-6 pb-2 gap-4">
              {chartData.map((data, idx) => {
                const heightPercentage = Math.max((data.value / maxChartValue) * 100, 5);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="relative w-full flex justify-center items-end h-full">
                      {/* Tooltip on Hover */}
                      <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-850 text-white text-[10px] py-1 px-2 rounded font-mono shadow z-20 pointer-events-none">
                        {data.value} Dokumen
                      </span>
                      {/* Bar */}
                      <div 
                        style={{ height: `${heightPercentage}%` }}
                        className={`w-8 rounded-t-md transition-all duration-500 ease-out shadow-inner ${
                          data.value > 0 
                            ? "bg-gradient-to-t from-blue-600 to-teal-500 group-hover:from-blue-500 group-hover:to-teal-400" 
                            : "bg-slate-200/50 dark:bg-slate-800/50"
                        }`}
                      ></div>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-white/40">{data.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "qa-rpp", label: "Generator RPP", action: () => handleQuickAction("gen_rpp"), desc: "Modul lengkap 13 Elemen", icon: BookOpen, color: "hover:border-blue-500/30" },
              { id: "qa-modul", label: "Modul Ajar", action: () => handleQuickAction("gen_modul_ajar"), desc: "Kurikulum Merdeka Madrasah", icon: FileText, color: "hover:border-violet-500/30" },
              { id: "qa-lkpd", label: "Lembar LKPD", action: () => handleQuickAction("gen_lkpd"), desc: "Kreatif & Eksploratif", icon: ClipboardList, color: "hover:border-emerald-500/30" },
              { id: "qa-soal", label: "Bank Soal", action: () => handleQuickAction("gen_soal"), desc: "HOTS, LOTS & Kunci Jawaban", icon: HelpCircle, color: "hover:border-amber-500/30" },
            ].map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.id}
                  id={qa.id}
                  onClick={qa.action}
                  className={`p-4 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 text-left shadow-sm transition-all duration-200 hover:shadow-md ${qa.color} group hover:translate-y-[-2px]`}
                >
                  <div className="p-2 w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-white/60 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 mb-3">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-xs font-bold font-display text-slate-800 dark:text-white">{qa.label}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-white/40 mt-1 leading-tight">{qa.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Column 2: Storage & Calendar */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Storage & Cloud Status */}
          <div className="p-6 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                Penyimpanan Dokumen
              </h3>
              <span className="text-[10px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider">Lokal & Sync</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-white/40">Kapasitas Cloud Terpakai</span>
                <span className="text-slate-800 dark:text-white font-mono">{storageUsed} MB / 10 MB</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                <div 
                  style={{ width: `${storagePercentage}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full transition-all duration-300"
                ></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-white/40 leading-tight">
              Aplikasi menyimpan salinan lokal secara offline dan otomatis melakukan sinkronisasi aman ketika server terhubung.
            </p>
          </div>

          {/* Calendar Widget */}
          <div className="p-6 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-sm flex-1 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Kalender Madrasah
              </h3>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{currentMonthYear}</span>
            </div>

            {/* Simple Grid Calendar representation */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {["M", "S", "S", "R", "K", "J", "S"].map((d, i) => (
                <span key={i} className="text-[10px] font-bold text-slate-400 dark:text-slate-600 py-1">{d}</span>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const dayNum = i + 1;
                const isToday = dayNum === currentDay;
                return (
                  <div 
                    key={i} 
                    className={`text-xs font-mono py-1 rounded-lg flex items-center justify-center font-semibold ${
                      isToday 
                        ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-lg shadow-blue-500/10" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Bank Dokumen Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activities List */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/30 dark:border-white/5">
            <h3 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-500" />
              Aktivitas Terakhir
            </h3>
            <button 
              id="view-all-history-btn"
              onClick={() => setCurrentView("history")}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Lihat Riwayat <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {recentActivities.length === 0 ? (
              <div className="text-center py-6 text-slate-400 dark:text-slate-500">
                <Clock className="w-8 h-8 mx-auto stroke-[1.5] mb-2 text-slate-400" />
                <p className="text-xs">Belum ada aktivitas. Silakan generasikan dokumen pertama Anda!</p>
              </div>
            ) : (
              recentActivities.slice(0, 4).map((activity) => {
                return (
                  <div key={activity.id} className="flex items-start gap-3.5 p-2 rounded-lg hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all">
                    <div className={`p-2 rounded-lg bg-gradient-to-tr ${getDocTypeColor(activity.docType)} flex items-center justify-center`}>
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{activity.docTitle}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-white/40 mt-1 flex items-center gap-2">
                        <span className="uppercase font-semibold text-[9px] py-0.5 px-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60">
                          {activity.docType.replace("_", " ")}
                        </span>
                        • {new Date(activity.timestamp).toLocaleDateString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Kurikulum Berbasis Cinta Promotion */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border border-white/5 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold">
              <Heart className="w-3 h-3 animate-pulse" />
              Inspirasi Edukasi Madrasah
            </div>
            <h3 className="font-display font-bold text-lg leading-snug">
              Mengenal Kurikulum Berbasis Cinta & Panca Cinta
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Integrasi khusus yang ditanamkan dalam SIPRIMA AI bertujuan mendukung pembentukan karakter guru dan santri yang berakar pada Cinta kepada Allah SWT, Rasulullah SAW, Orang Tua, Sesama, dan Lingkungan demi mencetak lulusan Akhlakul Karimah yang Adaptif dan Mandiri.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center font-bold text-xs text-rose-400">
                ❤
              </div>
              <div>
                <p className="text-[10px] text-rose-300 font-semibold font-display">Fitur Spesial SIPRIMA AI</p>
                <p className="text-[9px] text-slate-400">Hasilkan modul bernafaskan Panca Cinta sekarang.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
