import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Save, 
  Copy, 
  FileEdit, 
  Eye, 
  Download, 
  Printer, 
  ClipboardCheck, 
  Sparkles, 
  Trash2,
  FileText,
  Bookmark
} from "lucide-react";
import { SavedDocument } from "../types";

interface DocEditorProps {
  document: SavedDocument;
  onSave: (doc: SavedDocument) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function DocEditor({
  document,
  onSave,
  onClose,
  onDelete
}: DocEditorProps) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("preview");
  const [isSaved, setIsSaved] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTitle(document.title);
    setContent(document.content);
    setIsSaved(true);
  }, [document]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    const updatedDoc: SavedDocument = {
      ...document,
      title,
      content,
    };
    onSave(updatedDoc);
    setIsSaved(true);
  };

  const handleDuplicate = () => {
    const duplicatedDoc: SavedDocument = {
      ...document,
      id: Math.random().toString(),
      title: `${title} (Salinan)`,
      content,
      createdAt: new Date().toISOString()
    };
    onSave(duplicatedDoc);
    alert("Dokumen berhasil diduplikasi!");
  };

  // 1. Export as Microsoft Word (.doc)
  const exportToWord = () => {
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <title>${title}</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          h1 { color: #0F172A; border-bottom: 2px solid #2563EB; padding-bottom: 8px; font-size: 20pt; }
          h2 { color: #1E293B; font-size: 16pt; margin-top: 24px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; }
          h3 { color: #334155; font-size: 13pt; margin-top: 18px; }
          p, li { font-size: 11pt; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
          th { background-color: #F1F5F9; border: 1px solid #CBD5E1; padding: 8px; font-weight: bold; text-align: left; }
          td { border: 1px solid #CBD5E1; padding: 8px; }
          blockquote { border-left: 4px solid #3B82F6; background-color: #EFF6FF; padding: 10px 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        ${renderMarkdownToHtml(content)}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + htmlContent], {
      type: "application/msword"
    });
    
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.doc`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 2. Export as PDF / Print
  const triggerPrint = () => {
    // We add clean print CSS which is handled natively by the browser
    window.print();
  };

  // 3. Copy clean HTML to Clipboard (Google Docs compatible)
  const copyForGoogleDocs = async () => {
    try {
      const htmlString = `
        <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333;">
          ${renderMarkdownToHtml(content)}
        </div>
      `;

      // Copy both as rich text (HTML) and plain text
      const blobHtml = new Blob([htmlString], { type: "text/html" });
      const blobText = new Blob([content], { type: "text/plain" });
      
      const clipboardItem = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText
      });

      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback simple copy
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper markdown parser to beautiful styled HTML output
  function renderMarkdownToHtml(mdText: string): string {
    if (!mdText) return "";

    let html = mdText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headings
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold & Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");

    // Horizontal Rule
    html = html.replace(/^\-\-\-$|^\*\*\*/gim, "<hr style='border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;' />");

    // Lists (unordered and ordered)
    // First, process ul lists
    html = html.replace(/^\s*\-\s+(.*$)/gim, "<li>$1</li>");
    html = html.replace(/^\s*\*\s+(.*$)/gim, "<li>$1</li>");
    // Group adjacent <li> items into <ul>
    html = html.replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>");
    html = html.replace(/<\/ul>\s*<ul>/g, "");

    // Process table structures
    const lines = html.split("\n");
    let inTable = false;
    let tableHtml = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        if (!inTable) {
          inTable = true;
          tableHtml = "<table style='width:100%; border-collapse:collapse; margin:15px 0;'><thead><tr>";
          cells.forEach(cell => {
            tableHtml += `<th style='background-color:#F8FAFC; border:1px solid #E2E8F0; padding:10px; font-weight:bold; text-align:left;'>${cell}</th>`;
          });
          tableHtml += "</tr></thead><tbody>";
        } else {
          // Check if this is a separator line (contains only hyphens and pipes)
          if (line.includes("---")) {
            continue; // skip separator
          }
          tableHtml += "<tr>";
          cells.forEach(cell => {
            tableHtml += `<td style='border:1px solid #E2E8F0; padding:10px;'>${cell}</td>`;
          });
          tableHtml += "</tr>";
        }
      } else {
        if (inTable) {
          inTable = false;
          tableHtml += "</tbody></table>";
          lines[i - 1] = tableHtml;
        }
      }
    }
    
    // Join back
    html = lines.join("\n");

    // Paragraph breaks (replace double newlines with p tags)
    html = html.split(/\n\n+/).map(p => {
      p = p.trim();
      if (!p) return "";
      if (p.startsWith("<h") || p.startsWith("<ul") || p.startsWith("<li") || p.startsWith("<table") || p.startsWith("<blockquote") || p.startsWith("<hr")) {
        return p;
      }
      return `<p style='margin-bottom: 12px; font-size: 11.5pt; color: #334155;'>${p.replace(/\n/g, "<br/>")}</p>`;
    }).join("");

    return html;
  }

  return (
    <div className="space-y-6 pb-12 print:p-0">
      
      {/* Editor Header Bar (Hidden during Native Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm print:hidden">
        
        {/* Title and Back button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="space-y-1">
            <input 
              type="text" 
              value={title}
              onChange={handleTitleChange}
              className="font-sans font-bold text-lg text-slate-800 dark:text-white bg-transparent border-b border-dashed border-slate-300 hover:border-blue-500 focus:border-blue-600 focus:outline-none transition-colors max-w-sm sm:max-w-md md:max-w-xl"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <span className="uppercase font-semibold text-[9px] py-0.5 px-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/15">
                {document.docType.replace("_", " ")}
              </span>
              • Kurikulum: {document.curriculum}
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
              isSaved 
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200/10" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 active:scale-95"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Tersimpan" : "Simpan Perubahan"}</span>
          </button>

          {onDelete && (
            <button
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
                  onDelete(document.id);
                }
              }}
              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
              title="Hapus Dokumen"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

      </div>

      {/* Editor Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Editor Main Board (Markdown Textarea OR rendered HTML) */}
        <div className="lg:col-span-9 flex flex-col space-y-4 print:col-span-12">
          
          {/* Workspace Tabs (Hidden during Native Print) */}
          <div className="flex items-center justify-between p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 backdrop-blur-md print:hidden">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setEditorMode("preview")}
                className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs font-bold transition-all ${
                  editorMode === "preview"
                    ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Pratinjau Cetak</span>
              </button>
              <button
                onClick={() => setEditorMode("edit")}
                className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs font-bold transition-all ${
                  editorMode === "edit"
                    ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                }`}
              >
                <FileEdit className="w-4 h-4" />
                <span>Editor Teks (Markdown)</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium px-3 hidden sm:block">
              {content.length} karakter
            </div>
          </div>

          {/* EDITOR CANVAS */}
          <div className="rounded-3xl bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md p-8 min-h-[550px] flex flex-col print:border-none print:shadow-none print:p-0 print:bg-transparent">
            {editorMode === "edit" ? (
              <textarea
                value={content}
                onChange={handleContentChange}
                className="flex-1 w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y leading-relaxed min-h-[500px]"
                placeholder="Tulis materi atau RPP di sini dalam format markdown..."
              />
            ) : (
              /* Beautifully rendered school paper layout */
              <div className="prose prose-slate dark:prose-invert max-w-none flex-1">
                {/* Header Kop Surat Madrasah */}
                <div className="text-center border-b-4 border-double border-slate-800 dark:border-slate-400 pb-5 mb-8 flex flex-col items-center">
                  <div className="bg-emerald-600 text-white py-1 px-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                    SIPRIMA AI • Dokumen Resmi Madrasah
                  </div>
                  <h2 className="font-sans font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-xl sm:text-2xl leading-tight">
                    {document.formSnapshot?.madrasahName || "MADRASAH INDONESIA"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide mt-1">
                    Mata Pelajaran: {document.subject} • Kelas/Semester: {document.grade} / {document.formSnapshot?.semester || "-"}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-0.5">
                    Tahun Pelajaran: {document.formSnapshot?.academicYear || "-"} • Rujukan Kurikulum: {document.curriculum}
                  </p>
                </div>

                {/* Rendered Markdown to HTML wrapper */}
                <div 
                  className="document-view space-y-4"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(content) }}
                />

                {/* Footer Signature area */}
                <div className="mt-16 pt-8 border-t border-slate-200/40 dark:border-slate-800/40 grid grid-cols-2 gap-8 text-center text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="font-bold mt-16 text-slate-800 dark:text-white">Kepala Madrasah</p>
                    <p className="text-[10px] text-slate-400 mt-1">NIP. .............................</p>
                  </div>
                  <div>
                    <p>Malang, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                    <p className="font-bold mt-16 text-slate-800 dark:text-white">{document.formSnapshot?.teacherName || "Guru Pengampu"}</p>
                    <p className="text-[10px] text-slate-400 mt-1">NIP. {document.formSnapshot?.nip || "-"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* SIDE: Export Suite Sidebar (Hidden during Native Print) */}
        <div className="lg:col-span-3 space-y-6 print:hidden">
          
          {/* Quick Export Tools */}
          <div className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-500" />
              Alat Ekspor & Cetak
            </h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
              Unduh atau cetak dokumen ini dengan kompatibilitas format Microsoft Word dan Google Docs yang sempurna.
            </p>

            <div className="space-y-2 pt-2">
              <button
                id="export-word-btn"
                onClick={exportToWord}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs transition-colors"
              >
                <Download className="w-4.5 h-4.5 text-blue-500" />
                <span>Unduh Microsoft Word (.doc)</span>
              </button>

              <button
                id="export-pdf-btn"
                onClick={triggerPrint}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-900/20 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs transition-colors"
              >
                <Printer className="w-4.5 h-4.5 text-indigo-500" />
                <span>Cetak / Ekspor PDF</span>
              </button>

              <button
                id="copy-gdocs-btn"
                onClick={copyForGoogleDocs}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                  copied 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : "bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                <ClipboardCheck className={`w-4.5 h-4.5 ${copied ? "text-emerald-500" : "text-emerald-500"}`} />
                <span>{copied ? "Berhasil Disalin!" : "Salin ke Google Docs"}</span>
              </button>
            </div>
          </div>

          {/* Quick Document Actions */}
          <div className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-md space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Tindakan Dokumen</h4>
            
            <div className="space-y-2">
              <button
                onClick={handleDuplicate}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
              >
                <Copy className="w-4 h-4" />
                <span>Duplikat Dokumen</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
