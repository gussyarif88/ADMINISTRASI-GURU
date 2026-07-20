import { FormDataState } from "../types";

export const CURRICULUM_OPTIONS = [
  "Kurikulum Merdeka",
  "KMA 183",
  "KMA 450",
  "KMA 1503 Tahun 2025",
  "Kurikulum Berbasis Cinta"
];

export const MODEL_PEMBELAJARAN_OPTIONS = [
  "Deep Learning (Belajar Mendalam)",
  "Problem Based Learning (PBL)",
  "Project Based Learning (PjBL)",
  "Discovery Learning",
  "Inquiry Learning",
  "Cooperative Learning",
  "Blended Learning",
  "Contextual Teaching Learning (CTL)",
  "STEAM (Science, Tech, Eng, Art, Math)",
  "Differentiated Learning (Pembelajaran Berdiferensiasi)"
];

export const PANCA_CINTA_OPTIONS = [
  "Cinta kepada Allah SWT",
  "Cinta kepada Rasulullah SAW",
  "Cinta kepada Orang Tua",
  "Cinta kepada Sesama",
  "Cinta kepada Lingkungan"
];

export const DPL_OPTIONS = [
  "Keimanan dan Ketakwaan kepada Allah SWT",
  "Akhlakul Karimah (Karakter Mulia)",
  "Berpikir Kritis (Critical Thinking)",
  "Kreatif & Inovatif",
  "Kemandirian",
  "Gotong Royong & Kolaboratif",
  "Berkebinekaan Global",
  "Literasi Digital & Teknologi",
  "Kepemimpinan & Keteladanan",
  "Tanggung Jawab Pribadi & Sosial",
  "Komunikatif",
  "Adaptif & Tangguh"
];

export const SUBJECT_OPTIONS = [
  "Al-Qur'an Hadis",
  "Akidah Akhlak",
  "Fikih",
  "Sejarah Kebudayaan Islam (SKI)",
  "Bahasa Arab",
  "Pendidikan Pancasila",
  "Bahasa Indonesia",
  "Matematika",
  "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
  "Ilmu Pengetahuan Alam (IPA)",
  "Ilmu Pengetahuan Sosial (IPS)",
  "Bahasa Inggris",
  "Seni Budaya",
  "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)"
];

export const CLASS_OPTIONS = [
  "Kelas I (MI)",
  "Kelas II (MI)",
  "Kelas III (MI)",
  "Kelas IV (MI)",
  "Kelas V (MI)",
  "Kelas VI (MI)",
  "Kelas VII (MTs)",
  "Kelas VIII (MTs)",
  "Kelas IX (MTs)",
  "Kelas X (MA/MAK)",
  "Kelas XI (MA/MAK)",
  "Kelas XII (MA/MAK)"
];

export const DEFAULT_FORM_STATE: FormDataState = {
  teacherName: "Ahmad Syarif, S.Pd.I",
  nip: "198810122015031002",
  madrasahName: "MIN 1 Kota Malang",
  subject: "Al-Qur'an Hadis",
  grade: "Kelas VII (MTs)",
  semester: "Ganjil (I)",
  phase: "D",
  academicYear: "2026/2027",
  timeAllocation: "2 JP x 40 Menit",
  topic: "Hukum Mad Jaiz Munfashil",
  cp: "Peserta didik mampu memahami, menganalisis, dan mempraktikkan hukum bacaan Mad Jaiz Munfashil secara benar dan konsisten.",
  tp: "Menganalisis ketentuan hukum bacaan Mad Jaiz Munfashil dalam Al-Qur'an serta mendemonstrasikannya dengan mahir.",
  atp: "Mengidentifikasi lafal, menganalisis syarat-syarat mad, hingga mempraktikkannya dalam tadarus harian.",
  kktp: "Siswa dinilai tuntas jika mampu melafalkan contoh Mad Jaiz Munfashil dengan panjang harakat yang tepat (4-5 harakat).",
  learningModel: "Deep Learning (Belajar Mendalam)",
  method: "Tanya Jawab, Drill (Latihan), Diskusi Kelompok, Peer Teaching",
  media: "Al-Qur'an Mushaf, PPT Interaktif, Video Tutorial Tajwid, Kartu Lafal (Card Sort)",
  approach: "Saintifik terintegrasi TPACK dan Moderasi Beragama",
  meetingsCount: 1,
  studentCharacteristics: "Siswa memiliki minat tinggi pada membaca Al-Qur'an, beberapa siswa masih memerlukan bimbingan panjang mad.",
  curriculum: "Kurikulum Merdeka",
  pancaCinta: ["Cinta kepada Allah SWT", "Cinta kepada Rasulullah SAW"],
  dpl: ["Keimanan dan Ketakwaan kepada Allah SWT", "Akhlakul Karimah (Karakter Mulia)", "Berpikir Kritis (Critical Thinking)"]
};
