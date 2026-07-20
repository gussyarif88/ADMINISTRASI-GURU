export type DocType =
  | "rpp"
  | "modul_ajar"
  | "lkpd"
  | "atp"
  | "tp"
  | "kktp"
  | "soal"
  | "rubrik"
  | "ppt"
  | "media"
  | "prompt_ai";

export interface FormDataState {
  teacherName: string;
  nip: string;
  madrasahName: string;
  subject: string;
  grade: string;
  semester: string;
  phase: string;
  academicYear: string;
  timeAllocation: string;
  topic: string;
  cp: string;
  tp: string;
  atp: string;
  kktp: string;
  learningModel: string;
  method: string;
  media: string;
  approach: string;
  meetingsCount: number;
  studentCharacteristics: string;
  curriculum: string;
  pancaCinta: string[];
  dpl: string[];
}

export interface SavedDocument {
  id: string;
  title: string;
  docType: DocType;
  subject: string;
  grade: string;
  topic: string;
  curriculum: string;
  createdAt: string;
  content: string;
  formSnapshot: FormDataState;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface RecentActivity {
  id: string;
  type: "create" | "edit" | "delete" | "export";
  docTitle: string;
  docType: DocType;
  timestamp: string;
}
