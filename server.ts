import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for base64 file uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("Warning: GEMINI_API_KEY environment variable is not set.");
}

// Helper to check and return Gemini instance or throw clear error
function getAi(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Silakan konfigurasi API Key di tab Secrets.");
    }
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// 1. API: Generate Madrasah Curriculum Document
app.post("/api/generate", async (req, res) => {
  try {
    const client = getAi();
    const {
      docType, // rpp, modul_ajar, lkpd, atp, tp, kktp, soal, rubrik, ppt, media, prompt_ai
      formData,
    } = req.body;

    const {
      teacherName,
      nip,
      madrasahName,
      subject,
      grade,
      semester,
      phase,
      academicYear,
      timeAllocation,
      topic,
      cp,
      tp,
      atp,
      kktp,
      learningModel,
      method,
      media,
      approach,
      meetingsCount,
      studentCharacteristics,
      curriculum,
      pancaCinta = [],
      dpl = [],
    } = formData || {};

    const pancaCintaText = pancaCinta.length > 0 
      ? pancaCinta.map((item: string) => ` - ${item}`).join("\n") 
      : "Tidak dispesifikasikan secara eksplisit (gunakan pendekatan cinta secara umum)";
      
    const dplText = dpl.length > 0 
      ? dpl.map((item: string) => ` - ${item}`).join("\n") 
      : "Tidak dispesifikasikan secara eksplisit (integrasikan karakter akhlakul karimah secara umum)";

    let docSpecificInstructions = "";
    let systemRole = "Anda adalah Pakar Kurikulum Madrasah Indonesia (Kementerian Agama RI) dan AI Engineer yang ahli merancang modul/RPP pembelajaran bermutu tinggi berciri khas nilai-nilai keislaman dan madrasah.";

    switch (docType) {
      case "rpp":
        docSpecificInstructions = `
Buatkan RPP (Rencana Pelaksanaan Pembelajaran) yang komprehensif, terstruktur, dan sangat rinci.
RPP ini harus memuat struktur lengkap berikut dalam format Markdown berkualitas tinggi:
1. IDENTITAS RPP (Nama Guru: ${teacherName || "-"}, NIP: ${nip || "-"}, Madrasah: ${madrasahName || "-"}, Mapel: ${subject || "-"}, Kelas/Semester: ${grade || "-"}/${semester || "-"}, Fase: ${phase || "-"}, Tahun Pelajaran: ${academicYear || "-"}, Alokasi Waktu: ${timeAllocation || "-"}, Pertemuan: ${meetingsCount || "1"} JP)
2. CAPAIAN PEMBELAJARAN (CP) & TUJUAN PEMBELAJARAN (TP)
3. ALUR TUJUAN PEMBELAJARAN (ATP) & KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
4. INDIKATOR PENCAPAIAN TUJUAN PEMBELAJARAN
5. PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK
6. PERSIAPAN PEMBELAJARAN (Guru & Peserta Didik)
7. MEDIA, SARANA, DAN PRASARANA (Media: ${media || "-"}, Pendekatan: ${approach || "-"}, Model: ${learningModel || "-"}, Metode: ${method || "-"})
8. LANGKAH-LANGKAH PEMBELAJARAN (Sangat rinci untuk tiap pertemuan yang mencakup: Kegiatan Pendahuluan, Kegiatan Inti dengan sintaks model '${learningModel || "-"}', dan Kegiatan Penutup)
9. REFLEKSI (Refleksi Guru & Refleksi Peserta Didik)
10. RENCANA TINDAK LANJUT (Pengayaan & Remedial)
11. ASESMEN PEMBELAJARAN (Asesmen Diagnostik, Asesmen Formatif, dan Asesmen Sumatif lengkap dengan Rubrik Penilaian & Lembar Observasi Karakter)
12. LAMPIRAN (Materi/Ringkasan Singkat & Lembar Kerja)
13. DAFTAR PUSTAKA (Sesuai kaidah akademik)
        `;
        break;

      case "modul_ajar":
        docSpecificInstructions = `
Buatkan Modul Ajar (MA) Kurikulum Merdeka Madrasah lengkap yang sangat mendalam dan interaktif.
Modul Ajar harus memuat elemen:
1. INFORMASI UMUM (Identitas, Kompetensi Awal, Profil Pelajar Pancasila & Rahmatan Lil Alamin, Sarana & Prasarana, Target Peserta Didik, Model Pembelajaran: ${learningModel})
2. KOMPONEN INTI (Tujuan Pembelajaran, Pemahaman Bermakna, Pertanyaan Pemantik, Kegiatan Pembelajaran Rinci Berdasarkan Pertemuan, Asesmen Diagnostik/Formatif/Sumatif, Pengayaan & Remedial, Refleksi Guru & Siswa)
3. LAMPIRAN (Lembar Kerja Peserta Didik - LKPD, Bahan Bacaan Guru & Peserta Didik, Glosarium, Daftar Pustaka)
        `;
        break;

      case "lkpd":
        docSpecificInstructions = `
Buatkan Lembar Kerja Peserta Didik (LKPD) yang kreatif, interaktif, dan menantang untuk materi ${topic}.
LKPD harus memuat:
1. Identitas LKPD (Mapel, Kelas, Materi, Nama Kelompok/Siswa)
2. Petunjuk Belajar & Tujuan Pembelajaran yang ingin dicapai
3. Ringkasan Materi Singkat / Pemantik Konsep
4. Langkah-Langkah Aktivitas Eksploratif (sesuai Model: ${learningModel})
5. Pertanyaan Diskusi dan Tugas Mandiri/Kelompok (Gunakan variasi soal HOTS/analitis)
6. Lembar Kerja Kosong / Tempat Jawaban yang terstruktur
7. Kriteria Penilaian / Rubrik Penilaian Mandiri Siswa
        `;
        break;

      case "atp":
        docSpecificInstructions = `
Buatkan rancangan Alur Tujuan Pembelajaran (ATP) terstruktur untuk kelas ${grade} semester ${semester}.
ATP harus memuat tabel lengkap dengan kolom:
1. Alur (Urutan Pembelajaran)
2. Capaian Pembelajaran (CP) Elemen
3. Kompetensi yang dituju
4. Tujuan Pembelajaran (TP)
5. Materi Esensial / Topik Utama
6. Alokasi Waktu (JP)
7. Dimensi Profil Pelajar (termasuk nilai Panca Cinta & DPL Madrasah)
8. Glosarium Singkat materi terkait
        `;
        break;

      case "tp":
        docSpecificInstructions = `
Rancanglah Tujuan Pembelajaran (TP) yang diturunkan dari Capaian Pembelajaran (CP) ${subject} kelas ${grade}.
TP harus dirumuskan menggunakan prinsip SMART (Specific, Measurable, Achievable, Relevant, Time-bound) serta memuat aspek Kompetensi, Konten, dan Variasi berpikir tingkat tinggi (HOTS). Berikan penjelasan analitis untuk setiap TP yang dirumuskan.
        `;
        break;

      case "kktp":
        docSpecificInstructions = `
Buatkan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) yang objektif untuk materi ${topic}.
Sediakan KKTP menggunakan 3 pendekatan sekaligus agar guru dapat memilih:
1. Deskripsi Kriteria (Tabel interval kriteria kelulusan)
2. Rubrik Ketercapaian (Interval pencapaian Baru Berkembang, Layak, Cakap, Mahir)
3. Skala atau Interval Nilai (0-100 dengan tindak lanjut yang jelas untuk setiap interval)
Sertakan lembar penilaian KKTP untuk siswa.
        `;
        break;

      case "soal":
        docSpecificInstructions = `
Buatkan Bank Soal Komprehensif untuk materi ${topic} kelas ${grade}.
Bank soal harus berisi:
1. 5 Soal HOTS (Higher Order Thinking Skills) pilihan ganda dilengkapi dengan stimulus menarik (kasus, ayat Al-Qur'an/Hadis, data, atau gambar/diagram), kunci jawaban, dan pembahasan detail.
2. 5 Soal LOTS (Lower Order Thinking Skills) / MOTS pilihan ganda lengkap dengan kunci jawaban dan pembahasan.
3. 3 Soal Esai HOTS analitis lengkap dengan pedoman penskoran/rubrik penilaian yang jelas.
4. Panduan Penilaian & Kisi-kisi Soal.
        `;
        break;

      case "rubrik":
        docSpecificInstructions = `
Buatkan Rubrik Penilaian Pembelajaran lengkap untuk materi ${topic}.
Rubrik harus mencakup:
1. Rubrik Penilaian Sikap (Spiritual, Sosial, berorientasi Panca Cinta dan Akhlakul Karimah)
2. Rubrik Penilaian Pengetahuan (Tertulis, Lisan, atau Penugasan)
3. Rubrik Penilaian Keterampilan (Proyek, Unjuk Kerja, Portofolio, atau Produk)
Sajikan dalam bentuk tabel deskriptor yang sangat jelas dari tingkat Mahir, Cakap, Layak, hingga Baru Berkembang.
        `;
        break;

      case "ppt":
        docSpecificInstructions = `
Buatkan Rencana Presentasi Pembelajaran (PPT Outline) dan Prompt Canva AI yang siap pakai untuk materi ${topic}.
Berikan struktur slide demi slide (minimal 10 Slide) yang meliputi:
- Judul Slide & Subjudul
- Poin-Poin Inti Konten Slide yang ringkas dan padat
- Panduan Visual/Grafis yang disarankan untuk slide tersebut (layout, gambar yang cocok)
- Catatan Guru (apa yang harus disampaikan secara lisan)
- Di akhir, berikan 3 Prompt Canva AI / Magic Design Prompt dalam bahasa Indonesia dan Inggris untuk menghasilkan slide presentasi estetik tentang materi ini di Canva secara otomatis.
        `;
        break;

      case "media":
        docSpecificInstructions = `
Buatkan panduan Media Pembelajaran Kreatif, rancangan Ice Breaking, dan Prompt Video AI untuk materi ${topic}.
Dokumen harus mencakup:
1. Rekomendasi Media Pembelajaran Fisik & Digital interaktif (misal aplikasi, simulator, alat peraga)
2. 2 Skenario Ice Breaking menyenangkan yang relevan dengan materi ${topic} untuk menghidupkan suasana kelas
3. 3 Prompt Video AI (untuk Runway, Sora, atau Kling AI) guna menghasilkan video visualisasi materi pembelajaran yang menakjubkan
4. Panduan Google Form Quiz (Struktur quiz, format soal, dan panduan setting otomatis)
        `;
        break;

      case "prompt_ai":
        docSpecificInstructions = `
Buatkan panduan instan dan kumpulan prompt AI kustom (Prompt Engineering) untuk guru mengajar materi ${topic}.
Sediakan prompt siap pakai untuk:
- Menghasilkan ringkasan materi unik (berdasarkan analogi santri/madrasah)
- Menghasilkan naskah bermain peran (Roleplay) bagi siswa
- Menghasilkan soal kuis cepat (quizizz/kahoot format)
- Menghasilkan lembar refleksi diri siswa yang asyik
- Menghasilkan email komunikasi dengan wali murid terkait progres siswa
        `;
        break;

      default:
        docSpecificInstructions = `Buatkan RPP dan dokumen pembelajaran madrasah komprehensif berdasarkan input yang diberikan.`;
    }

    const fullPrompt = `
Buatkan dokumen pembelajaran bernilai premium untuk jenis dokumen: "${docType.toUpperCase()}".

INFORMASI IDENTITAS & CONTEXT MADRASAH:
- Guru: ${teacherName || "Guru Madrasah"}
- NIP: ${nip || "-"}
- Nama Madrasah: ${madrasahName || "Madrasah Indonesia"}
- Kurikulum: ${curriculum}
- Mata Pelajaran: ${subject}
- Kelas / Semester: ${grade} / ${semester}
- Fase: ${phase}
- Tahun Pelajaran: ${academicYear}
- Alokasi Waktu: ${timeAllocation}
- Tema / Topik Materi: ${topic}
- Alokasi Pertemuan: ${meetingsCount} Pertemuan
- Karakteristik Siswa: ${studentCharacteristics || "Heterogen, aktif, relijius"}

INTEGRASI NILAI KHAS MADRASAH:
1. PANCA CINTA (Harus diintegrasikan secara eksplisit dalam langkah pembelajaran, apersepsi, atau asesmen sikap):
${pancaCintaText}

2. DIMENSI PROFIL LULUSAN BERBASIS CINTA (DPL) (Harus terwujud dalam target karakter atau rubrik observasi):
${dplText}

MODEL DAN METODE PEMBELAJARAN:
- Model Pembelajaran: ${learningModel} (Terapkan sintaks model ini dengan sangat nyata dan rinci pada Kegiatan Inti!)
- Pendekatan: ${approach || "-"}
- Metode: ${method || "-"}
- Media Utama: ${media || "-"}

KOMPETENSI SPESIFIK JIKA ADA:
- Capaian Pembelajaran (CP) Input: ${cp || "Gunakan standar Kementerian Agama RI terbaru sesuai Kurikulum/KMA terpilih"}
- Tujuan Pembelajaran (TP) Input: ${tp || "Tingkatkan dan jabarkan secara operasional menggunakan taksonomi bloom / HOTS"}
- ATP Input: ${atp || "Turunkan dalam alur yang logis dan runtut"}
- KKTP Input: ${kktp || "Buatkan kriteria ketuntasan yang relevan"}

PETUNJUK FORMAT:
- Gunakan bahasa Indonesia yang baku, profesional, anggun, menyentuh, dan inspiratif.
- Gunakan Markdown yang sangat rapi (gunakan bold, italic, list, blockquote, dan tabel jika relevan).
- Berikan konten yang LUAR BIASA RINCI dan LENGKAP. Hindari singkatan atau teks placeholder seperti "[Isi sendiri oleh guru...]". Tuliskan materi secara nyata!
- Integrasikan nuansa Islam dan kearifan lokal madrasah dengan halus namun bermakna di setiap bagian yang relevan (misal mengaitkan ayat/hadis motivasi belajar, akhlak mulia, atau adab menuntut ilmu).

SPESIFIKASI DOKUMEN:
${docSpecificInstructions}
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemRole,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("Error generating document:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Gagal menghasilkan dokumen dari AI. Silakan periksa koneksi Anda.",
    });
  }
});

// 2. API: AI Chat Assistant (ChatGPT-like)
app.post("/api/chat", async (req, res) => {
  try {
    const client = getAi();
    const { messages, currentFormValues } = req.body;

    // Convert messages to Gemini API format
    // Gemini API chats expect historical turns. For simplicity, we can format them as contents or use a structured prompt
    const systemInstruction = `
Anda adalah SIPRIMA AI - Sistem Pintar RPP Madrasah Berbasis Artificial Intelligence.
Anda bertindak sebagai asisten pribadi guru madrasah (MI, MTs, MA, MAK) di Indonesia.
Tugas Anda adalah membantu guru menjawab pertanyaan seputar kurikulum madrasah (KMA 183, KMA 450, KMA 1503, Kurikulum Merdeka), membantu merancang RPP/Modul, memberikan ide ice breaking, media pembelajaran, atau kuis interaktif.

Informasi Form saat ini di aplikasi (jika relevan untuk membantu konteks):
- Guru: ${currentFormValues?.teacherName || "-"}
- Madrasah: ${currentFormValues?.madrasahName || "-"}
- Mapel: ${currentFormValues?.subject || "-"}
- Kelas/Materi: ${currentFormValues?.grade || "-"} / ${currentFormValues?.topic || "-"}
- Kurikulum: ${currentFormValues?.curriculum || "-"}

FITUR KHUSUS:
Jika user meminta Anda untuk membuat RPP atau mengisi formulir (misalnya: "Buatkan RPP Akidah Akhlak kelas VII materi Adab Shalat"), selain memberikan jawaban penjelasan di chat, di bagian paling akhir jawaban Anda, tambahkan sebuah blok JSON khusus terbungkus dalam tag \`\`\`json-autofill ... \`\`\` agar sistem dapat mendeteksi dan mengotomatisasi pengisian form di UI.
Contoh format blok JSON tersebut di akhir jawaban Anda (pastikan valid JSON):
\`\`\`json-autofill
{
  "subject": "Akidah Akhlak",
  "grade": "VII",
  "semester": "I",
  "phase": "D",
  "topic": "Adab Shalat dan Berdzikir",
  "learningModel": "Deep Learning",
  "meetingsCount": 2,
  "timeAllocation": "4 JP (2 Pertemuan)",
  "cp": "Peserta didik mampu menganalisis adab shalat dan berdzikir serta membiasakannya dalam kehidupan sehari-hari.",
  "tp": "Menganalisis adab shalat dan berdzikir secara benar serta menerapkannya sebagai bentuk cinta kepada Allah SWT."
}
\`\`\`

Selalu bersikap sopan, ramah, menggunakan bahasa Indonesia yang baik, dan berikan jawaban berkualitas tinggi penuh semangat Islami.
`;

    // Format historical messages for Gemini API
    const contents = messages.map((msg: any) => {
      return {
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      };
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("Error in AI Chat:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Gagal menghubungi AI Chat.",
    });
  }
});

// 3. API: Parse Documents (PDF, Word, Excel uploads)
app.post("/api/parse-document", async (req, res) => {
  try {
    const client = getAi();
    const { fileBase64, fileName, fileType } = req.body;

    if (!fileBase64) {
      return res.status(400).json({ success: false, error: "Tidak ada file yang diunggah." });
    }

    // Extract raw base64 data (remove data:uri prefix if present)
    const base64Data = fileBase64.replace(/^data:.*?;base64,/, "");

    const prompt = `
Anda adalah dokumen parser cerdas SIPRIMA AI.
Tugas Anda adalah membaca dokumen kurikulum, silabus, bab materi, atau bahan ajar madrasah yang dilampirkan, lalu mengekstrak data penting darinya ke dalam format JSON terstruktur agar bisa langsung digunakan guru untuk menggenerasi RPP.

Harap kembalikan respon Anda HANYA berupa objek JSON valid dengan struktur berikut, tanpa komentar atau markup markdown tambahan di luarnya:
{
  "teacherName": "",
  "madrasahName": "",
  "subject": "Nama mata pelajaran yang terdeteksi",
  "grade": "Kelas (misal: VII, VIII, IX, X, XI, XII, atau I - VI)",
  "semester": "I atau II",
  "phase": "A, B, C, D, E, atau F",
  "topic": "Topik atau bab utama materi pembelajaran",
  "timeAllocation": "Alokasi waktu (misal: 2 JP)",
  "cp": "Capaian Pembelajaran (CP) atau Kompetensi Dasar yang terdeteksi",
  "tp": "Tujuan Pembelajaran (TP) yang terdeteksi atau dirumuskan",
  "learningModel": "Rekomendasi model pembelajaran yang cocok (misal: Deep Learning, Problem Based Learning, dll)",
  "method": "Metode pembelajaran yang direkomendasikan",
  "summary": "Ringkasan isi dokumen dalam 2-3 kalimat"
}
    `;

    const filePart = {
      inlineData: {
        mimeType: fileType || "application/pdf",
        data: base64Data,
      },
    };

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [filePart, { text: prompt }],
      config: {
        responseMimeType: "application/json",
      },
    });

    let resultJson = {};
    try {
      resultJson = JSON.parse(response.text || "{}");
    } catch (parseErr) {
      console.error("Error parsing Gemini JSON output, attempting cleanup:", parseErr);
      // Fallback cleaner for code blocks
      const cleanText = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
      resultJson = JSON.parse(cleanText || "{}");
    }

    res.json({
      success: true,
      data: resultJson,
    });
  } catch (error: any) {
    console.error("Error parsing document:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Gagal menganalisis dokumen. Pastikan file Anda tidak rusak atau terlalu besar.",
    });
  }
});

// Serving Client-Side Files & Listening
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIPRIMA AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to bootstrap server:", err);
});
