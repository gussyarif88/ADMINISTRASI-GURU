import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import GeneratorForm from "./components/GeneratorForm";
import DocEditor from "./components/DocEditor";
import HistoryList from "./components/HistoryList";
import ProfileView from "./components/ProfileView";
import SettingsView from "./components/SettingsView";

import { SavedDocument, RecentActivity, DocType, FormDataState } from "./types";
import { DEFAULT_FORM_STATE } from "./lib/constants";
import { Sparkles, BrainCircuit, RefreshCw, GraduationCap, Heart } from "lucide-react";

// Pre-populated Sample Documents for Premium out-of-the-box Experience
const SAMPLE_RPP: SavedDocument = {
  id: "sample-rpp",
  title: "RPP Al-Qur'an Hadis - Hukum Mad Jaiz Munfashil (Kelas VII)",
  docType: "rpp",
  subject: "Al-Qur'an Hadis",
  grade: "Kelas VII (MTs)",
  topic: "Hukum Mad Jaiz Munfashil",
  curriculum: "Kurikulum Merdeka",
  createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
  formSnapshot: DEFAULT_FORM_STATE,
  content: `
# RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
### MADRASAH TSANAWIYAH - KURIKULUM MERDEKA

---

## I. IDENTITAS DOKUMEN
* **Nama Guru:** Ahmad Syarif, S.Pd.I
* **NIP:** 198810122015031002
* **Madrasah:** MIN 1 Kota Malang
* **Mata Pelajaran:** Al-Qur'an Hadis
* **Kelas / Semester:** Kelas VII (MTs) / Ganjil
* **Materi Pokok:** Hukum Mad Jaiz Munfashil
* **Alokasi Waktu:** 2 JP x 40 Menit (1 Pertemuan)

---

## II. CAPAIAN PEMBELAJARAN & TUJUAN PEMBELAJARAN
### Capaian Pembelajaran (CP)
> Peserta didik mampu memahami, menganalisis, dan mempraktikkan hukum bacaan Mad Jaiz Munfashil secara benar dan konsisten dalam membaca Al-Qur'an sehari-hari.

### Tujuan Pembelajaran (TP)
1. Siswa mampu menjelaskan pengertian, syarat, dan cara membaca hukum bacaan Mad Jaiz Munfashil dengan tepat.
2. Siswa mampu mengidentifikasi serta menganalisis contoh-contoh Mad Jaiz Munfashil yang terdapat dalam Surat-surat pendek Al-Qur'an.
3. Siswa mampu mendemonstrasikan kelancaran membaca Al-Qur'an yang mengandung hukum Mad Jaiz Munfashil secara tartil secara konsisten.

---

## III. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
* **KKTP Utama:** Siswa dinilai mencapai ketuntasan jika mampu melafalkan minimal 3 contoh ayat yang mengandung hukum Mad Jaiz Munfashil dengan panjang harakat yang konsisten (4-5 harakat).
* **Skala Ketercapaian:**
  * **Baru Berkembang (0-60):** Belum mampu membedakan Mad Jaiz Munfashil dengan mad lainnya.
  * **Layak (61-75):** Mampu menjelaskan materi tetapi belum konsisten menerapkan panjang harakat.
  * **Cakap (76-90):** Mampu mengidentifikasi dan melafalkan hukum tajwid secara konsisten dengan bimbingan minim.
  * **Mahir (91-100):** Mampu membaca tartil dengan tajwid yang sempurna serta membantu melatih teman sebaya (Peer Teaching).

---

## IV. MATERI PEMBELAJARAN (RINGKASAN)
1. **Pengertian:** Mad Jaiz Munfashil terjadi apabila ada Mad Thabi'i (Mad Ashli) bertemu dengan huruf Hamzah di lain kalimat (munfashil = terpisah).
2. **Panjang Bacaan:** Dibaca sepanjang 2, 4, atau 5 harakat (ketukan). Namun untuk kehati-hatian dalam bacaan asy-Syatibiyyah, disarankan konsisten dibaca 4 atau 5 harakat.

---

## V. SKENARIO PEMBELAJARAN (MODEL DEEP LEARNING)
### A. Pendahuluan (15 Menit)
1. **Orientasi Spiritual:** Guru membuka kelas dengan mengucapkan salam hangat penuh kasih sayang, dilanjutkan berdoa bersama yang dipimpin oleh salah satu siswa.
2. **Motivasi Belajar:** Guru mengaitkan keutamaan mempelajari tajwid dengan hadis Nabi: *"Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengamalkannya"*.

### B. Kegiatan Inti (50 Menit)
1. **Eksplorasi Mendalam (Deep Exposure):**
   * Guru menayangkan video visual cara kerja organ suara melafalkan hukum Mad Jaiz Munfashil.
   * Siswa menyimak penjelasan visual dan melakukan imitasi suara secara klasikal.
2. **Koneksi Kritis (Deep Connection):**
   * Siswa dibentuk menjadi kelompok-kelompok kecil (diskusi kolaboratif) untuk mencari, menandai, dan memotong kartu lafal berisi Mad Jaiz Munfashil.
3. **Penerapan Nyata (Deep Application):**
   * Perwakilan kelompok mendemonstrasikan pelafalan ayat tersebut di depan kelas menggunakan teknik *Peer Teaching*.

### C. Penutup (15 Menit)
1. **Refleksi Bermakna:** Siswa mengevaluasi tingkat pemahaman mereka hari ini dengan menandai checklist refleksi pribadi.
2. **Kesimpulan Beradab:** Guru merangkum esensi tajwid hukum mad sebagai sarana menjaga kesucian Al-Qur'an.

---

## VI. ASESMEN PEMBELAJARAN
### 1. Asesmen Sikap (Observasi Karakter)
* **Kriteria:** Akhlakul Karimah, Kedisiplinan Beribadah, Rasa Hormat kepada Sesama Teman.

### 2. Asesmen Pengetahuan (Formatif)
* **Instruksi:** Tuliskan perbedaan mendasar antara Mad Wajib Muttashil dan Mad Jaiz Munfashil dalam bentuk tabel analisis disertai 2 contoh kalimat pendukung!

### 3. Asesmen Keterampilan (Unjuk Kerja)
* **Tugas:** Setor hafalan atau bacaan tartil QS. Al-Kafirun dengan melafalkan hukum mad secara konsisten sesuai aturan tajwid!
`
};

const SAMPLE_LKPD: SavedDocument = {
  id: "sample-lkpd",
  title: "LKPD Fikih - Ketentuan Shalat Jamak & Qashar (Kelas VIII)",
  docType: "lkpd",
  subject: "Fikih",
  grade: "Kelas VIII (MTs)",
  topic: "Ketentuan Shalat Jamak & Qashar",
  curriculum: "KMA 450",
  createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
  formSnapshot: {
    ...DEFAULT_FORM_STATE,
    subject: "Fikih",
    grade: "Kelas VIII (MTs)",
    topic: "Ketentuan Shalat Jamak & Qashar",
    curriculum: "KMA 450"
  },
  content: `
# LEMBAR KERJA PESERTA DIDIK (LKPD)
### MATA PELAJARAN: FIKIH MADRASAH TSANAWIYAH

---

## IDENTITAS SISWA / KELOMPOK
* **Nama Kelompok:** ....................................................
* **Anggota Kelompok:**
  1. ................................................................
  2. ................................................................
  3. ................................................................
* **Kelas / Semester:** Kelas VIII (MTs) / Ganjil

---

## I. TUJUAN PEMBELAJARAN
1. Mengidentifikasi sebab-sebab diperbolehkannya melakukan Shalat Jamak dan Qashar dalam perjalanan (musafir) sesuai syariat Islam.
2. Merancang simulasi urutan pelaksanaan Shalat Jamak Taqdim, Jamak Ta'khir, dan Qashar dengan runtut dan benar.
3. Menumbuhkan rasa syukur dan *Cinta kepada Sesama* melalui pemahaman rukhsah (keringanan) ibadah sebagai bentuk kasih sayang Allah SWT bagi hamba-Nya.

---

## II. AKTIVITAS 1: STUDI KASUS (BERPIKIR KRITIS)
Bacalah studi kasus berikut ini bersama anggota kelompokmu, kemudian jawablah pertanyaan analitis di bawahnya!

> **KASUS:**
> Pak Ridwan bersama keluarganya melakukan perjalanan mudik lebaran dari kota Surabaya menuju Jakarta (jarak sekitar 780 Km). Mereka berangkat menggunakan mobil pribadi pukul 09.00 WIB pagi. Pukul 12.30 WIB siang, rombongan berhenti di rest area tol untuk istirahat, makan, dan shalat.
> Pak Ridwan berniat menjamak shalat Zhuhur dan Ashar sekaligus meringkas rakaatnya.

### Pertanyaan Diskusi Kelompok:
1. Apakah perjalanan Pak Ridwan sudah memenuhi syarat sah untuk melaksanakan Shalat Jamak dan Qashar? Jelaskan alasannya berdasarkan syarat jarak minimal musafir!
   * **Jawaban Kelompok:** ................................................................................................................................
   * ..........................................................................................................................................................

2. Jika Pak Ridwan ingin menjamak shalat tersebut di waktu Zhuhur, apa nama jenis jamak tersebut? Tuliskan pula lafal niat shalat jamak qashar Zhuhur tersebut!
   * **Jawaban Kelompok:** ................................................................................................................................
   * ..........................................................................................................................................................
`
};

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [formData, setFormData] = useState<FormDataState>(DEFAULT_FORM_STATE);
  const [editDoc, setEditDoc] = useState<SavedDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [curriculumPreference, setCurriculumPreference] = useState<string>("Kurikulum Merdeka");
  const [loaderMessage, setLoaderMessage] = useState("SIPRIMA AI sedang mempersiapkan sambungan model...");

  const loaderMessages = [
    "SIPRIMA AI sedang mempersiapkan sambungan model...",
    "Merumuskan Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran...",
    "Menyusun skenario Kegiatan Inti menggunakan sintaks model mengajar...",
    "Mengintegrasikan karakter akhlakul karimah Panca Cinta Madrasah...",
    "Merancang rubrik asesmen kualitatif diagnostik, formatif, dan sumatif...",
    "Menyusun naskah ringkasan materi, LKPD eksploratif, dan soal-soal HOTS..."
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const storedDocs = localStorage.getItem("siprima_docs");
    const storedActivities = localStorage.getItem("siprima_activities");

    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    } else {
      const seeds = [SAMPLE_RPP, SAMPLE_LKPD];
      setDocuments(seeds);
      localStorage.setItem("siprima_docs", JSON.stringify(seeds));
    }

    if (storedActivities) {
      setRecentActivities(JSON.parse(storedActivities));
    } else {
      const initialActivities: RecentActivity[] = [
        {
          id: "act-1",
          type: "create",
          docTitle: SAMPLE_RPP.title,
          docType: "rpp",
          timestamp: SAMPLE_RPP.createdAt
        },
        {
          id: "act-2",
          type: "create",
          docTitle: SAMPLE_LKPD.title,
          docType: "lkpd",
          timestamp: SAMPLE_LKPD.createdAt
        }
      ];
      setRecentActivities(initialActivities);
      localStorage.setItem("siprima_activities", JSON.stringify(initialActivities));
    }
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      curriculum: curriculumPreference
    }));
  }, [curriculumPreference]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % loaderMessages.length;
        setLoaderMessage(loaderMessages[idx]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const saveDocument = (updatedDoc: SavedDocument) => {
    setDocuments(prev => {
      const index = prev.findIndex(d => d.id === updatedDoc.id);
      let updatedList = [];
      if (index >= 0) {
        updatedList = [...prev];
        updatedList[index] = updatedDoc;
      } else {
        updatedList = [updatedDoc, ...prev];
      }
      localStorage.setItem("siprima_docs", JSON.stringify(updatedList));
      return updatedList;
    });

    addActivity("edit", updatedDoc.title, updatedDoc.docType);
    setEditDoc(updatedDoc);
  };

  const deleteDocument = (id: string) => {
    const docToDelete = documents.find(d => d.id === id);
    if (!docToDelete) return;

    setDocuments(prev => {
      const filtered = prev.filter(d => d.id !== id);
      localStorage.setItem("siprima_docs", JSON.stringify(filtered));
      return filtered;
    });

    addActivity("delete", docToDelete.title, docToDelete.docType);
    setEditDoc(null);
    setCurrentView("history");
  };

  const handleDuplicateDoc = (doc: SavedDocument) => {
    const duplicated: SavedDocument = {
      ...doc,
      id: Math.random().toString(),
      title: `${doc.title} (Salinan)`,
      createdAt: new Date().toISOString()
    };

    setDocuments(prev => {
      const newList = [duplicated, ...prev];
      localStorage.setItem("siprima_docs", JSON.stringify(newList));
      return newList;
    });

    addActivity("create", duplicated.title, duplicated.docType);
  };

  const addActivity = (type: "create" | "edit" | "delete" | "export", docTitle: string, docType: DocType) => {
    const newAct: RecentActivity = {
      id: Math.random().toString(),
      type,
      docTitle,
      docType,
      timestamp: new Date().toISOString()
    };

    setRecentActivities(prev => {
      const updated = [newAct, ...prev].slice(0, 30);
      localStorage.setItem("siprima_activities", JSON.stringify(updated));
      return updated;
    });
  };

  const clearLocalData = () => {
    localStorage.removeItem("siprima_docs");
    localStorage.removeItem("siprima_activities");
    setDocuments([SAMPLE_RPP, SAMPLE_LKPD]);
    setRecentActivities([]);
    setEditDoc(null);
    setCurrentView("dashboard");
    alert("Semua data lokal berhasil dibersihkan!");
  };

  const handleGenerateDocument = async (type: DocType, customForm?: FormDataState) => {
    setIsGenerating(true);
    setLoaderMessage(loaderMessages[0]);

    try {
      const activeForm = customForm || formData;
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docType: type,
          formData: activeForm
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        const typeLabel = type.replace("_", " ").toUpperCase();
        const docTitle = `${typeLabel} ${activeForm.subject} - ${activeForm.topic} (${activeForm.grade})`;
        
        const newDoc: SavedDocument = {
          id: Math.random().toString(),
          title: docTitle,
          docType: type,
          subject: activeForm.subject,
          grade: activeForm.grade,
          topic: activeForm.topic,
          curriculum: activeForm.curriculum,
          createdAt: new Date().toISOString(),
          content: data.text,
          formSnapshot: activeForm
        };

        setDocuments(prev => {
          const updated = [newDoc, ...prev];
          localStorage.setItem("siprima_docs", JSON.stringify(updated));
          return updated;
        });

        addActivity("create", docTitle, type);
        setEditDoc(newDoc);
        setCurrentView("edit_screen");
      } else {
        alert(data.error || "Gagal menghasilkan dokumen dari AI. Coba periksa koneksi atau API Key Anda.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan sistem saat menghubungi model Gemini.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderMainContent = () => {
    if (editDoc && currentView === "edit_screen") {
      return (
        <DocEditor 
          document={editDoc}
          onSave={saveDocument}
          onClose={() => {
            setEditDoc(null);
            setCurrentView("history");
          }}
          onDelete={deleteDocument}
        />
      );
    }

    if (currentView === "dashboard") {
      return (
        <Dashboard 
          documents={documents}
          recentActivities={recentActivities}
          setCurrentView={setCurrentView}
          setEditDoc={setEditDoc}
          teacherName={formData.teacherName}
        />
      );
    }

    if (currentView.startsWith("gen_")) {
      const resolvedDocType = currentView.substring(4) as DocType;
      return (
        <GeneratorForm 
          docType={resolvedDocType}
          formData={formData}
          setFormData={setFormData}
          onGenerate={handleGenerateDocument}
          isGenerating={isGenerating}
        />
      );
    }

    if (currentView === "history") {
      return (
        <HistoryList 
          documents={documents}
          onSelect={(doc) => {
            setEditDoc(doc);
            setCurrentView("edit_screen");
          }}
          onDelete={deleteDocument}
          onDuplicate={handleDuplicateDoc}
        />
      );
    }

    if (currentView === "profile") {
      return (
        <ProfileView 
          formData={formData}
          setFormData={setFormData}
        />
      );
    }

    if (currentView === "settings") {
      return (
        <SettingsView 
          onClearStorage={clearLocalData}
          curriculumPreference={curriculumPreference}
          setCurriculumPreference={setCurriculumPreference}
        />
      );
    }

    return null;
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#080d1a] text-slate-800 dark:text-slate-100 flex transition-colors duration-300 font-sans antialiased`}>
      
      <div className="print:hidden">
        <Sidebar 
          currentView={currentView}
          setCurrentView={(v) => {
            setEditDoc(null);
            setCurrentView(v);
          }}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          teacherName={formData.teacherName}
          madrasahName={formData.madrasahName}
        />
      </div>

      <main className="flex-1 min-w-0 p-4 lg:p-8 pt-20 lg:pt-8 lg:pl-72 print:p-0 print:pl-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10 print:hidden"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-3xl pointer-events-none -z-10 print:hidden"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10 print:hidden"></div>

        {renderMainContent()}
      </main>

      {isGenerating && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-center z-50 p-6 print:hidden">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-6 rounded-3xl shadow-xl flex items-center justify-center relative border border-blue-400/25">
              <BrainCircuit className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin duration-3000" />
            </div>
          </div>

          <h3 className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
            SIPRIMA <span className="text-sm bg-blue-500/10 text-blue-400 py-0.5 px-2 rounded-full border border-blue-500/20">AI</span>
          </h3>
          <p className="text-xs text-blue-400 font-semibold tracking-widest uppercase mt-1 mb-8">Dokumen Sedang Dirancang</p>
          
          <div className="max-w-md space-y-4">
            <div className="flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-xs font-semibold text-slate-300">
              <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
              <span>{loaderMessage}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
