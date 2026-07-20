import React, { useState, useRef } from "react";
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  UploadCloud, 
  Trash2, 
  BrainCircuit, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  School, 
  FileCheck, 
  CheckSquare, 
  Zap, 
  ArrowRight,
  Send,
  RefreshCw,
  Eye,
  Heart
} from "lucide-react";
import { DocType, FormDataState, ChatMessage } from "../types";
import { 
  CURRICULUM_OPTIONS, 
  MODEL_PEMBELAJARAN_OPTIONS, 
  PANCA_CINTA_OPTIONS, 
  DPL_OPTIONS, 
  SUBJECT_OPTIONS, 
  CLASS_OPTIONS 
} from "../lib/constants";

interface GeneratorFormProps {
  docType: DocType;
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  onGenerate: (type: DocType, customForm?: FormDataState) => Promise<void>;
  isGenerating: boolean;
}

export default function GeneratorForm({
  docType,
  formData,
  setFormData,
  onGenerate,
  isGenerating
}: GeneratorFormProps) {
  const [activeTab, setActiveTab] = useState<"identitas" | "kurikulum" | "metode" | "upload">("identitas");
  
  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Saya adalah Asisten Kurikulum SIPRIMA AI. Anda bisa mengobrol dengan saya untuk merencanakan RPP, mendapatkan ide metode mengajar, atau menyuruh saya mengisi seluruh formulir di samping secara otomatis!\n\nTulis sesuatu seperti: *'Isi form untuk RPP Akidah Akhlak kelas VII materi Menghormati Orang Tua'*.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Get readable Doc Type
  const getDocTypeTitle = (type: DocType) => {
    return type.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  // Stepper helper
  const nextTab = () => {
    if (activeTab === "identitas") setActiveTab("kurikulum");
    else if (activeTab === "kurikulum") setActiveTab("metode");
    else if (activeTab === "metode") setActiveTab("upload");
  };

  const prevTab = () => {
    if (activeTab === "upload") setActiveTab("metode");
    else if (activeTab === "metode") setActiveTab("kurikulum");
    else if (activeTab === "kurikulum") setActiveTab("identitas");
  };

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (option: string, type: "pancaCinta" | "dpl") => {
    setFormData(prev => {
      const current = prev[type] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return {
        ...prev,
        [type]: updated
      };
    });
  };

  // Drag-and-Drop handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError(null);
    setUploadSuccessMsg(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    setUploadSuccessMsg(null);
    if (e.target.files && e.target.files[0]) {
      await processUploadedFile(e.target.files[0]);
    }
  };

  // Process File and Send to Parser Endpoint
  const processUploadedFile = async (file: File) => {
    setUploadingFile(true);
    setUploadedFileName(file.name);

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result as string;
        
        // Call parser API
        const response = await fetch("/api/parse-document", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileBase64: base64Data,
            fileName: file.name,
            fileType: file.type
          })
        });

        const resData = await response.json();
        if (resData.success && resData.data) {
          const parsed = resData.data;
          
          // Apply parsed data to form
          setFormData(prev => ({
            ...prev,
            subject: parsed.subject || prev.subject,
            grade: parsed.grade || prev.grade,
            semester: parsed.semester || prev.semester,
            phase: parsed.phase || prev.phase,
            topic: parsed.topic || prev.topic,
            timeAllocation: parsed.timeAllocation || prev.timeAllocation,
            cp: parsed.cp || prev.cp,
            tp: parsed.tp || prev.tp,
            learningModel: parsed.learningModel || prev.learningModel,
            method: parsed.method || prev.method
          }));

          setUploadSuccessMsg(`Berhasil menganalisis "${file.name}". Data form telah diisi otomatis oleh AI!`);
          setActiveTab("identitas"); // Redirect to review fields
        } else {
          setUploadError(resData.error || "AI gagal menganalisis struktur file ini. Pastikan konten teks file dapat terbaca.");
        }
        setUploadingFile(false);
      };
      reader.onerror = () => {
        setUploadError("Gagal membaca file lokal.");
        setUploadingFile(false);
      };
    } catch (err: any) {
      setUploadError(err.message || "Gagal mengunggah file.");
      setUploadingFile(false);
    }
  };

  // Chat API Integration
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    // Scroll chat
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          currentFormValues: formData
        })
      });

      const data = await response.json();
      if (data.success) {
        const botMsg: ChatMessage = {
          id: Math.random().toString(),
          role: "assistant",
          content: data.text,
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, botMsg]);
      } else {
        setChatMessages(prev => [...prev, {
          id: Math.random().toString(),
          role: "assistant",
          content: "Mohon maaf, terjadi gangguan komunikasi dengan server AI. Silakan ulangi kembali pertanyaan Anda.",
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: "assistant",
        content: "Gagal mengirim pesan. Silakan pastikan server Anda berjalan normal.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsChatLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  // Auto-Fill Form from specific Chat Message JSON block
  const handleAutoFillFromMsg = (content: string) => {
    try {
      const match = content.match(/```json-autofill([\s\S]*?)```/);
      if (match && match[1]) {
        const parsed = JSON.parse(match[1].trim());
        setFormData(prev => ({
          ...prev,
          ...parsed
        }));
        setUploadSuccessMsg("Formulir berhasil diisi otomatis dari chat AI! Silakan tinjau data Anda.");
        setActiveTab("identitas");
      } else {
        // Fallback: search for loose JSON inside text
        const jsonMatch = content.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0].trim());
          setFormData(prev => ({
            ...prev,
            ...parsed
          }));
          setUploadSuccessMsg("Formulir berhasil diisi otomatis dari chat AI!");
          setActiveTab("identitas");
        }
      }
    } catch (err) {
      alert("Gagal mem-parsing data autofill dari chat.");
    }
  };

  // Check if chat has autofill capability
  const hasAutofill = (content: string) => {
    return content.includes("```json-autofill") || (content.includes("{") && content.includes("}"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 relative">
      <div className="bg-glow top-0 right-0 opacity-15 dark:opacity-30 pointer-events-none"></div>

      {/* LEFT: Tabbed Input Form */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        
        {/* Tab Header Navigation */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5 backdrop-blur-md">
          {[
            { id: "identitas", label: "1. Identitas & Mapel", icon: User },
            { id: "kurikulum", label: "2. Nilai & Kurikulum", icon: Heart },
            { id: "metode", label: "3. Model & Media", icon: FileCheck },
            { id: "upload", label: "4. Unggah File", icon: UploadCloud },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm font-bold border border-slate-200/10"
                    : "text-slate-500 hover:text-slate-700 dark:text-white/40 dark:hover:text-white/80"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline font-display">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Panel container */}
        <div className="p-6 rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-md flex-1 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Feedback Notifications */}
            {uploadSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-start gap-2.5 animate-fadeIn">
                <Zap className="w-4.5 h-4.5 flex-shrink-0 animate-bounce" />
                <div className="flex-1">
                  <p>{uploadSuccessMsg}</p>
                  <button 
                    onClick={() => setUploadSuccessMsg(null)}
                    className="underline text-[10px] mt-1 hover:text-emerald-500"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {/* TAB 1: IDENTITAS GURU & MAPEL */}
            {activeTab === "identitas" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200/40 dark:border-white/5 pb-3 mb-1">
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">Identitas Guru & Lembaga Madrasah</h3>
                  <p className="text-xs text-slate-400 dark:text-white/40">Sesuaikan data profil mengajar untuk dicetak pada kop/identitas dokumen</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Nama Guru Pengampu</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="teacherName"
                        value={formData.teacherName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: Ahmad Syarif, S.Pd.I"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">NIP Guru</label>
                    <input 
                      type="text" 
                      name="nip"
                      value={formData.nip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="NIP atau '-' jika non-PNS"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Nama Madrasah / Sekolah</label>
                    <input 
                      type="text" 
                      name="madrasahName"
                      value={formData.madrasahName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: MIN 1 Kota Malang"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mata Pelajaran (Mapel)</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {SUBJECT_OPTIONS.map((sub, i) => (
                        <option key={i} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tingkat Kelas</label>
                    <select 
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CLASS_OPTIONS.map((cls, i) => (
                        <option key={i} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Semester</label>
                    <select 
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Ganjil (I)">Semester Ganjil (I)</option>
                      <option value="Genap (II)">Semester Genap (II)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fase Kurikulum</label>
                    <select 
                      name="phase"
                      value={formData.phase}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A">Fase A (Kelas 1-2 MI)</option>
                      <option value="B">Fase B (Kelas 3-4 MI)</option>
                      <option value="C">Fase C (Kelas 5-6 MI)</option>
                      <option value="D">Fase D (Kelas 7-9 MTs)</option>
                      <option value="E">Fase E (Kelas 10 MA/MAK)</option>
                      <option value="F">Fase F (Kelas 11-12 MA/MAK)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tahun Pelajaran</label>
                    <input 
                      type="text" 
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: 2026/2027"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Alokasi Waktu</label>
                    <input 
                      type="text" 
                      name="timeAllocation"
                      value={formData.timeAllocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: 2 JP x 40 Menit"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Materi Pokok / Bahasan Utama</label>
                    <input 
                      type="text" 
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      placeholder="Contoh: Hukum Mad Jaiz Munfashil"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KURIKULUM & NILAI MADRASAH */}
            {activeTab === "kurikulum" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200/40 dark:border-white/5 pb-3 mb-1">
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">Kurikulum & Integrasi Nilai Madrasah</h3>
                  <p className="text-xs text-slate-400 dark:text-white/40">Semua dokumen SIPRIMA akan bernafaskan kearifan Islami yang dipilih berikut</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Acuan Kurikulum Madrasah</label>
                    <select 
                      name="curriculum"
                      value={formData.curriculum}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CURRICULUM_OPTIONS.map((cur, i) => (
                        <option key={i} value={cur}>{cur}</option>
                      ))}
                    </select>
                  </div>

                  {/* Checklist Panca Cinta */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 space-y-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-rose-500 text-sm">❤</span>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300"> Checklist Panca Cinta</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">Bisa pilih lebih dari satu untuk diintegrasikan</p>
                    
                    <div className="space-y-2.5">
                      {PANCA_CINTA_OPTIONS.map((item, i) => {
                        const isChecked = formData.pancaCinta?.includes(item);
                        return (
                          <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(item, "pancaCinta")}
                              className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Checklist Dimensi Profil Lulusan Berbasis Cinta (DPL) */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Dimensi Profil Lulusan Berbasis Cinta (DPL)</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 mb-3">Tandai pencapaian nilai karakter penunjang RPP</p>
                    </div>

                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {DPL_OPTIONS.map((item, i) => {
                        const isChecked = formData.dpl?.includes(item);
                        return (
                          <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(item, "dpl")}
                              className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: MODEL & MEDIA PEMBELAJARAN */}
            {activeTab === "metode" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200/40 dark:border-white/5 pb-3 mb-1">
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">Model, Media & Indikator Belajar</h3>
                  <p className="text-xs text-slate-400 dark:text-white/40">Definisikan elemen metodologi agar RPP AI dirancang interaktif</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Model Pembelajaran Utama</label>
                    <select 
                      name="learningModel"
                      value={formData.learningModel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {MODEL_PEMBELAJARAN_OPTIONS.map((model, i) => (
                        <option key={i} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Metode Mengajar Pendukung</label>
                    <input 
                      type="text" 
                      name="method"
                      value={formData.method}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: Tanya Jawab, Latihan, Diskusi, Peer Teaching"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pendekatan</label>
                    <input 
                      type="text" 
                      name="approach"
                      value={formData.approach}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: Saintifik Terintegrasi TPACK"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rencana Jumlah Pertemuan</label>
                    <input 
                      type="number" 
                      name="meetingsCount"
                      value={formData.meetingsCount}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Media Pembelajaran yang Digunakan</label>
                    <input 
                      type="text" 
                      name="media"
                      value={formData.media}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: Al-Qur'an Mushaf, PPT Interaktif, Video Tutorial, Card Sort"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Capaian Pembelajaran (CP) / Target Kompetensi Dasar</label>
                    <textarea 
                      name="cp"
                      value={formData.cp}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                      placeholder="Tulis CP di sini atau biarkan AI merumuskannya..."
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tujuan Pembelajaran (TP) Khusus</label>
                    <textarea 
                      name="tp"
                      value={formData.tp}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tulis TP yang dicapai atau biarkan AI menurunkan dari CP di atas..."
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Karakteristik & Profil Peserta Didik</label>
                    <input 
                      type="text" 
                      name="studentCharacteristics"
                      value={formData.studentCharacteristics}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: Mayoritas siswa berminat tinggi membaca Qur'an, beberapa butuh bimbingan tajwid"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: UNGGAH DOKUMEN (PDF, WORD, EXCEL) */}
            {activeTab === "upload" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-200/40 dark:border-white/5 pb-3 mb-1">
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">Unggah Silabus, Bab Materi, atau Buku Guru</h3>
                  <p className="text-xs text-slate-400 dark:text-white/40">Unggah file kurikulum lokal Anda. AI akan membaca isinya lalu mengisi seluruh form secara instan!</p>
                </div>

                <div 
                  id="drop-zone"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full p-8 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] ${
                    dragActive 
                      ? "border-blue-500 bg-blue-500/5" 
                      : "border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 bg-slate-50/50 dark:bg-white/5"
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                    className="hidden"
                  />
                  
                  <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-md text-white mb-4 animate-bounce duration-1000">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {uploadingFile ? "Sedang Menganalisis File oleh AI..." : "Tarik & Lepas File ke Sini"}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-sm leading-relaxed">
                    {uploadingFile 
                      ? "Harap tunggu, mesin SIPRIMA AI sedang mengekstrak teks, capaian pembelajaran, dan kompetensi dari dokumen Anda..." 
                      : "Mendukung dokumen PDF, Word (.doc/.docx), Excel (.xls/.xlsx), atau teks. Maksimal 15 MB."
                    }
                  </p>

                  {uploadedFileName && (
                    <div className="mt-4 py-1.5 px-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold font-mono flex items-center gap-2">
                      <FileCheck className="w-3.5 h-3.5 text-blue-500" />
                      <span>{uploadedFileName}</span>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-start gap-2 animate-fadeIn">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Stepper Buttons and Generation Actions */}
          <div className="mt-8 pt-5 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {activeTab !== "identitas" && (
                <button
                  onClick={prevTab}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
              )}
              {activeTab !== "upload" && (
                <button
                  onClick={nextTab}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 rounded-xl shadow"
                >
                  Lanjut <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              id="generate-document-btn"
              onClick={() => onGenerate(docType)}
              disabled={isGenerating}
              className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all shadow-lg ${
                isGenerating 
                  ? "bg-slate-400 dark:bg-slate-800 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/10 hover:shadow-blue-500/20"
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>Sedang Merancang via AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4.5 h-4.5 animate-pulse text-yellow-300" />
                  <span>Hasilkan {getDocTypeTitle(docType)} AI</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT: AI Chat Assistant with Autofill */}
      <div className="lg:col-span-4 flex flex-col h-[650px] lg:h-auto rounded-xl bg-white/45 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 shadow-md overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/40 dark:border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-inner">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-display text-slate-800 dark:text-white">Asisten Kurikulum AI</h4>
            <p className="text-[9px] text-slate-400 dark:text-white/40 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Online & Siap Membantu
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => {
            const isBot = msg.role === "assistant";
            const showAutofill = isBot && hasAutofill(msg.content);

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col space-y-1.5 ${isBot ? "items-start" : "items-end"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                    isBot 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none" 
                      : "bg-blue-600 text-white rounded-tr-none"
                  }`}
                >
                  {/* Render content cleanly (supporting simple list breaks) */}
                  <div className="whitespace-pre-line">
                    {msg.content.split("```json-autofill")[0].trim()}
                  </div>
                  
                  {showAutofill && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200/30">
                      <button
                        onClick={() => handleAutoFillFromMsg(msg.content)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-[10px] shadow transition-all duration-200 hover:scale-[1.02] active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Isi Form Otomatis Sekarang</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[8px] text-slate-400 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            );
          })}
          {isChatLoading && (
            <div className="flex items-start gap-2.5">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI sedang menganalisis & menyusun...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input form */}
        <form 
          onSubmit={handleSendChatMessage}
          className="p-3 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center gap-2"
        >
          <input 
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Tulis pesan atau instruksi..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/20 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1.5 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isChatLoading}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
