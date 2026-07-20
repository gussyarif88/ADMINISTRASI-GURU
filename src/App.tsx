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
### BERBASIS PEMBELAJARAN MENDALAM (DEEP LEARNING) - KMA 1503

---

## A. Spesifikasi
1. **Madrasah:** MIN 1 Kota Malang
2. **Mata Pelajaran:** Al-Qur'an Hadis
3. **Fase / Kelas / Semester:** Fase D / Kelas VII (MTs) / Ganjil
4. **Alokasi Waktu:** 2 JP x 40 Menit (1 Pertemuan)
5. **Topik / Sub Topik:** Hukum Mad Jaiz Munfashil

## B. Identifikasi
1. **Kesiapan Murid (opsional):** Siswa memiliki minat tinggi dalam melafalkan ayat-ayat Al-Qur'an. Berdasarkan asesmen awal, 70% siswa sudah mengenal tajwid dasar, namun 30% siswa masih memerlukan bimbingan intensif dalam mengidentifikasi panjang ketukan mad.
2. **Dimensi Profil Lulusan (DPL):**
   * **Keimanan dan Ketakwaan terhadap Tuhan YME:** Siswa meyakini pentingnya membaca Al-Qur'an secara tartil sebagai perwujudan ibadah yang sah dan adab yang mulia terhadap wahyu-Nya.
   * **Penalaran Kritis:** Siswa mampu menganalisis letak perbedaan hukum tajwid Mad Jaiz Munfashil dan Mad Wajib Muttashil dalam teks ayat-ayat Al-Qur'an.
3. **Topik Panca Cinta KBC:**
   * **Cinta Allah dan Rasul-Nya:** Terwujud lewat keinginan melafalkan kalam-Nya sesempurna mungkin.
   * **Cinta Ilmu:** Tercermin dari semangat mendalami kaidah ilmu tajwid.
4. **Materi Integrasi KBC:** Mensyukuri anugerah kesempurnaan lisan dan akal untuk membaca firman Allah secara tartil serta membiasakan adab kesantunan saat melafalkan Al-Qur'an.

## C. Desain Pembelajaran
1. **Tujuan Pembelajaran (TP):**
   * Melalui model Pembelajaran Mendalam, murid mampu menjelaskan pengertian dan syarat Mad Jaiz Munfashil secara kritis, serta mempraktikkan pelafalan ayat yang mengandung hukum tersebut dengan panjang 4-5 harakat secara tepat dan konsisten sebagai wujud cinta Allah dan Rasul-Nya.
2. **Kerangka Pembelajaran:**
   * **Praktik Pedagogis:** Pembelajaran Kontekstual (CTL) terintegrasi teknik *Peer Teaching*.
   * **Kemitraan Pembelajaran:** Melibatkan kolaborasi dengan guru mapel Tahfidz untuk sinkronisasi target bacaan harian murid.
   * **Lingkungan Pembelajaran:** Ruang kelas yang inklusif dengan pengaturan tempat duduk melingkar (U-Shape) untuk memfasilitasi kenyamanan diskusi kelompok kecil yang saling menghormati.
   * **Pemanfaatan Digital:** Penggunaan visualisasi audio digital berupa video tutorial lafal hamzah di YouTube serta lembar pencatatan digital di Google Docs.

## D. Pengalaman Belajar (Langkah-Langkah Pembelajaran)
### 1. Kegiatan Awal (15 Menit) - *Berkesadaran, Bermakna, Menggembirakan*
* **Orientasi Spiritual (Berkesadaran):** Guru membuka kelas dengan salam hangat penuh kasih sayang, dilanjutkan dengan doa dan teknik penarikan napas dalam-dalam sejenak agar murid hadir seutuhnya lahir batin.
* **Apersepsi & Motivasi (Bermakna):** Guru menanyakan, *"Mengapa panjang pendek suara kita saat memanggil seseorang harus tepat? Bagaimana dengan membaca firman Allah?"* Guru mengaitkan keutamaan tajwid dengan kecintaan kita terhadap kalam-Nya.

### 2. Kegiatan Inti (50 Menit)
* **Memahami (Berkesadaran, Bermakna):**
  * Guru menayangkan video peragaan pelafalan huruf Mad Thabi'i bertemu Hamzah di lain kalimat.
  * Murid mengamati secara visual pergerakan organ suara dan berlatih menirukan suara hamzah secara bergantian dengan bimbingan guru.
* **Mengaplikasi (Bermakna, Menggembirakan):**
  * Murid berkelompok kecil (3-4 orang) berdiskusi untuk mencari, menandai, dan memotong kartu lafal yang mengandung Mad Jaiz Munfashil dari surat pendek pilihan.
  * Setiap kelompok mendemonstrasikan pelafalan ayat tersebut di depan kelompok lain secara tartil dengan bimbingan tutor sebaya (*Peer Teaching*).
* **Merefleksi (Berkesadaran, Menggembirakan):**
  * Murid mengevaluasi kemajuan bacanya sendiri, mendiskusikan apa saja tantangan dalam mengendalikan ketukan mad, serta merumuskan cara melatih kelancaran di rumah secara mandiri.

### 3. Kegiatan Penutup (15 Menit) - *Berkesadaran, Bermakna, Menggembirakan*
* **Refleksi & Umpan Balik:** Guru memandu kesimpulan bersama. Murid menempelkan sticky notes (*Exit Ticket*) yang menjawab pertanyaan, *"Satu hal berharga apa yang kamu syukuri setelah belajar tajwid hari ini?"*
* **Doa Kontekstual:** Berdoa memohon agar dijadikan generasi yang mencintai Al-Qur'an, dan diakhiri dengan salam penutup yang khidmat.

## E. Asesmen Pembelajaran
1. **Asesmen Proses / Formatif:**
   * **Asesmen Kesiapan:** Tanya jawab singkat di awal pembelajaran untuk memetakan pemahaman dasar.
   * **Asesmen Sikap & Kemajuan (Formative as Learning):** Menggunakan lembar penilaian diri (*Self-Assessment*) dan lembar observasi ketekunan serta adab kesantunan selama diskusi kelompok.
2. **Asesmen Akhir / Sumatif:**
   * **Asesmen Kinerja:** Praktik melafalkan 3 baris ayat pilihan yang mengandung hukum Mad Jaiz Munfashil dengan ketukan panjang yang stabil (4-5 harakat).

## F. Lampiran-Lampiran
1. **Bahan Bacaan:** Mad Jaiz Munfashil (Jaiz = boleh; Munfashil = terpisah) terjadi apabila huruf Mad Thabi'i berada di akhir kata bertemu Hamzah berharakat yang berada di awal kata berikutnya. Contoh: *Innaa a'thainaaka* dan *Laa a'budu*.
2. **Rubrik Penilaian Ketuntasan (KKTP):**
   * **Baru Berkembang (0-60):** Belum lancar membedakan letak Mad Jaiz Munfashil.
   * **Layak (61-75):** Mampu menjelaskan materi tetapi ketukan panjang mad belum stabil.
   * **Cakap (76-90):** Melafalkan hukum tajwid secara stabil dan konsisten dengan bimbingan minim.
   * **Mahir (91-100):** Membaca tartil sempurna secara mandiri dan mampu membimbing teman sebaya.
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

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = "Terjadi kesalahan server saat menghubungi model Gemini.";
        try {
          const parsed = JSON.parse(text);
          errorMessage = parsed.error || errorMessage;
        } catch {
          // It's likely HTML or generic text, extract first 200 chars or use a user friendly message
          if (text.trim().startsWith("<!DOCTYPE") || text.includes("<html") || text.includes("The page c")) {
            errorMessage = "Server mengembalikan halaman error (HTML). Kemungkinan server sedang restart atau tidak dapat merespons permintaan saat ini.";
          } else {
            errorMessage = text.substring(0, 200) || `Error ${response.status}: ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Format respons dari server tidak valid (bukan JSON). Silakan hubungi admin.");
      }

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
