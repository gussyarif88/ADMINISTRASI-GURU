import React, { useState } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  Trash2, 
  Copy, 
  FileEdit, 
  Download, 
  FileText, 
  FolderOpen, 
  Grid, 
  List,
  Calendar,
  User,
  BookOpen
} from "lucide-react";
import { SavedDocument, DocType } from "../types";
import { SUBJECT_OPTIONS, CLASS_OPTIONS } from "../lib/constants";

interface HistoryListProps {
  documents: SavedDocument[];
  onSelect: (doc: SavedDocument) => void;
  onDelete: (id: string) => void;
  onDuplicate: (doc: SavedDocument) => void;
}

export default function HistoryList({
  documents = [],
  onSelect,
  onDelete,
  onDuplicate
}: HistoryListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterDocType, setFilterDocType] = useState("all");

  const getDocTypeColor = (type: DocType) => {
    switch (type) {
      case "rpp": return "from-blue-500 to-indigo-600 bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "modul_ajar": return "from-violet-500 to-purple-600 bg-violet-500/10 text-violet-600 dark:text-violet-400";
      case "lkpd": return "from-emerald-500 to-teal-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "soal": return "from-amber-500 to-orange-600 bg-amber-500/10 text-amber-600 dark:text-amber-400";
      default: return "from-slate-500 to-slate-600 bg-slate-500/10 text-slate-600 dark:text-slate-400";
    }
  };

  // Filter and search logic
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.formSnapshot?.teacherName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.topic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = filterSubject === "all" || doc.subject === filterSubject;
    const matchesClass = filterClass === "all" || doc.grade === filterClass;
    const matchesSemester = filterSemester === "all" || doc.formSnapshot?.semester === filterSemester;
    const matchesDocType = filterDocType === "all" || doc.docType === filterDocType;

    return matchesSearch && matchesSubject && matchesClass && matchesSemester && matchesDocType;
  });

  const handleDuplicate = (e: React.MouseEvent, doc: SavedDocument) => {
    e.stopPropagation();
    onDuplicate(doc);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
      onDelete(id);
    }
  };

  // Trigger Word Download directly from cards
  const handleWordDownload = (e: React.MouseEvent, doc: SavedDocument) => {
    e.stopPropagation();
    
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <title>${doc.title}</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          h1 { color: #0F172A; border-bottom: 2px solid #2563EB; padding-bottom: 8px; font-size: 20pt; }
          h2 { color: #1E293B; font-size: 16pt; margin-top: 24px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; }
          p, li { font-size: 11pt; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background-color: #F1F5F9; border: 1px solid #CBD5E1; padding: 8px; font-weight: bold; text-align: left; }
          td { border: 1px solid #CBD5E1; padding: 8px; }
        </style>
      </head>
      <body>
        <h1>${doc.title}</h1>
        <p><strong>Madrasah:</strong> ${doc.formSnapshot?.madrasahName || "-"}</p>
        <p><strong>Guru Pengampu:</strong> ${doc.formSnapshot?.teacherName || "-"}</p>
        <p><strong>Kurikulum:</strong> ${doc.curriculum}</p>
        <hr/>
        <div>${doc.content.replace(/\n/g, "<br/>")}</div>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${doc.title.replace(/\s+/g, "_")}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header and Views Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-slate-800 dark:text-white text-2xl">Bank Dokumen & Riwayat</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cari, saring, edit, duplikat, dan ekspor seluruh rancangan RPP Anda</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl border transition-all ${
              viewMode === "grid"
                ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border-slate-200 dark:border-slate-700"
                : "text-slate-400 hover:text-slate-600 border-transparent"
            }`}
            title="Grid View"
          >
            <Grid className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl border transition-all ${
              viewMode === "list"
                ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border-slate-200 dark:border-slate-700"
                : "text-slate-400 hover:text-slate-600 border-transparent"
            }`}
            title="List View"
          >
            <List className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Search & Filter Trigger Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan judul, nama guru, topik, atau mata pelajaran..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all text-xs font-bold ${
            showFilters || filterSubject !== "all" || filterClass !== "all" || filterSemester !== "all" || filterDocType !== "all"
              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-900/50"
              : "bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Saring Dokumen</span>
        </button>
      </div>

      {/* FILTER DRAWER PANEL */}
      {showFilters && (
        <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4 animate-fadeIn">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Jenis Dokumen</label>
            <select
              value={filterDocType}
              onChange={(e) => setFilterDocType(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Jenis</option>
              <option value="rpp">RPP</option>
              <option value="modul_ajar">Modul Ajar</option>
              <option value="lkpd">LKPD</option>
              <option value="atp">ATP</option>
              <option value="tp">TP</option>
              <option value="kktp">KKTP</option>
              <option value="soal">Soal (Asesmen)</option>
              <option value="rubrik">Rubrik</option>
              <option value="ppt">PPT Outline</option>
              <option value="media">Media & Video AI</option>
              <option value="prompt_ai">Prompt AI</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mata Pelajaran</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Mapel</option>
              {SUBJECT_OPTIONS.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kelas</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Kelas</option>
              {CLASS_OPTIONS.map((cls, i) => (
                <option key={i} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Semester</label>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Semester</option>
              <option value="Ganjil (I)">Semester Ganjil (I)</option>
              <option value="Genap (II)">Semester Genap (II)</option>
            </select>
          </div>

        </div>
      )}

      {/* DOCUMENT LIST PANEL */}
      {filteredDocuments.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white/40 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/50 p-8 space-y-4">
          <FolderOpen className="w-12 h-12 mx-auto stroke-[1.2] text-slate-300 dark:text-slate-600 animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Dokumen tidak ditemukan</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto leading-relaxed">
              Kami tidak menemukan dokumen dengan kriteria saringan tersebut. Coba kurangi filter atau buat dokumen baru terlebih dahulu!
            </p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        
        /* GRID VIEW LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            return (
              <div
                key={doc.id}
                onClick={() => onSelect(doc)}
                className="group relative flex flex-col justify-between p-5 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer hover:translate-y-[-2px]"
              >
                <div>
                  {/* Badge & Type indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-gradient-to-tr ${getDocTypeColor(doc.docType)}`}>
                      {doc.docType.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-semibold">
                      {new Date(doc.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-slate-800 dark:text-white text-sm line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.title}
                  </h3>

                  {/* Metas info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500/80" />
                      <span className="truncate">{doc.subject} • {doc.grade}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <User className="w-3.5 h-3.5 text-indigo-500/80" />
                      <span className="truncate">{doc.formSnapshot?.teacherName || "Guru Pengampu"}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Card Actions bar */}
                <div className="mt-6 pt-3.5 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleWordDownload(e, doc)}
                      className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/35 text-blue-600 dark:text-blue-400"
                      title="Download Word"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDuplicate(e, doc)}
                      className="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/35 text-indigo-600 dark:text-indigo-400"
                      title="Duplikat Dokumen"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, doc.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/35 text-rose-600 dark:text-rose-400"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* LIST VIEW LAYOUT */
        <div className="overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/30 dark:border-slate-800/30 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/40">
                  <th className="py-3 px-5">Nama Dokumen</th>
                  <th className="py-3 px-5">Mata Pelajaran</th>
                  <th className="py-3 px-5">Kelas</th>
                  <th className="py-3 px-5">Tanggal Dibuat</th>
                  <th className="py-3 px-5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/25 dark:divide-slate-800/25">
                {filteredDocuments.map((doc) => {
                  return (
                    <tr
                      key={doc.id}
                      onClick={() => onSelect(doc)}
                      className="group text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-gradient-to-tr ${getDocTypeColor(doc.docType)} flex-shrink-0`}>
                            {doc.docType.replace("_", " ")}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-xs">
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5 font-semibold text-slate-600 dark:text-slate-400">{doc.subject}</td>
                      <td className="py-4 px-5 font-semibold text-slate-600 dark:text-slate-400">{doc.grade}</td>
                      <td className="py-4 px-5 font-mono font-medium text-slate-400 dark:text-slate-500">
                        {new Date(doc.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </td>
                      <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelect(doc)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                            title="Edit"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleWordDownload(e, doc)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400"
                            title="Unduh Word"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDuplicate(e, doc)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                            title="Duplikat"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, doc.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
