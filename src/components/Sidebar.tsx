import React from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  ClipboardList, 
  Sliders, 
  Layers, 
  HelpCircle, 
  Award, 
  Presentation, 
  Tv, 
  Terminal, 
  Archive, 
  User, 
  Settings, 
  Sun, 
  Moon, 
  GraduationCap,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { DocType } from "../types";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  teacherName: string;
  madrasahName: string;
}

export default function Sidebar({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  teacherName,
  madrasahName
}: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const mainMenus = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  const generatorMenus = [
    { id: "gen_rpp", label: "Generator RPP", icon: BookOpen, type: "rpp" as DocType },
    { id: "gen_modul_ajar", label: "Generator Modul Ajar", icon: FileText, type: "modul_ajar" as DocType },
    { id: "gen_lkpd", label: "Generator LKPD", icon: ClipboardList, type: "lkpd" as DocType },
    { id: "gen_atp", label: "Generator ATP", icon: Sliders, type: "atp" as DocType },
    { id: "gen_tp", label: "Generator TP", icon: Layers, type: "tp" as DocType },
    { id: "gen_kktp", label: "Generator KKTP", icon: Award, type: "kktp" as DocType },
    { id: "gen_soal", label: "Generator Soal (Asesmen)", icon: HelpCircle, type: "soal" as DocType },
    { id: "gen_rubrik", label: "Generator Rubrik", icon: Award, type: "rubrik" as DocType },
    { id: "gen_ppt", label: "Generator PPT Outline", icon: Presentation, type: "ppt" as DocType },
    { id: "gen_media", label: "Generator Media & Video AI", icon: Tv, type: "media" as DocType },
    { id: "gen_prompt_ai", label: "Generator Prompt AI", icon: Terminal, type: "prompt_ai" as DocType },
  ];

  const utilityMenus = [
    { id: "history", label: "Bank Dokumen & Riwayat", icon: Archive },
    { id: "profile", label: "Profil Guru", icon: User },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  const selectView = (viewId: string) => {
    setCurrentView(viewId);
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* App Logo & Header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-200/10">
        <div className="bg-gradient-to-tr from-emerald-500 via-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent flex items-center gap-1.5 leading-none">
            SIPRIMA <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-0.5 px-1.5 rounded-full font-semibold border border-emerald-500/20">AI</span>
          </h1>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium font-sans">RPP Madrasah Pintar</p>
        </div>
      </div>

      {/* Menus List */}
      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Main Section */}
        <div>
          <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Utama</p>
          <div className="space-y-1">
            {mainMenus.map((menu) => {
              const Icon = menu.icon;
              const isActive = currentView === menu.id;
              return (
                <button
                  key={menu.id}
                  id={`btn-${menu.id}`}
                  onClick={() => selectView(menu.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15" 
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{menu.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Generator Tools */}
        <div>
          <div className="px-3 flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">AI Generator</p>
            <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            {generatorMenus.map((menu) => {
              const Icon = menu.icon;
              const isActive = currentView === menu.id;
              return (
                <button
                  key={menu.id}
                  id={`btn-${menu.id}`}
                  onClick={() => selectView(menu.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10" 
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-left leading-tight">{menu.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Documents & Settings */}
        <div>
          <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Manajemen</p>
          <div className="space-y-1">
            {utilityMenus.map((menu) => {
              const Icon = menu.icon;
              const isActive = currentView === menu.id;
              return (
                <button
                  key={menu.id}
                  id={`btn-${menu.id}`}
                  onClick={() => selectView(menu.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/15" 
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{menu.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile and Theme Toggle */}
      <div className="p-4 border-t border-slate-200/10 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Mode Tampilan</span>
          <button
            id="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-yellow-400 transition-colors"
            title={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/40 dark:bg-slate-800/30 border border-slate-200/10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-inner flex-shrink-0">
            {teacherName ? teacherName.charAt(0) : "G"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{teacherName || "Guru Madrasah"}</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{madrasahName || "Kementerian Agama RI"}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/20 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-emerald-500 to-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-800 dark:text-white font-sans text-base">SIPRIMA AI</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-45"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 border-r border-slate-200/15 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300 z-50 lg:z-30 lg:translate-x-0 ${
          isOpen ? "translate-x-0 pt-0" : "-translate-x-full lg:translate-x-0"
        } ${isOpen ? "h-full" : "h-screen lg:h-full"}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
