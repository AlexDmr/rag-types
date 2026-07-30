export interface Page {
  id: number;
  title: string;
  type: string;
  URL: string;
}

export interface Section {
  id: number;
  title: string;
  type: string;
  URL: string;
  pages: Page[];
  pageIdCounter: number;
}

export interface Course {
  id: number;
  title: string;
  sections: Section[];
  visibleForStudents?: boolean;
}

export interface GraphData {
  title: string
  courses: Course[];
}

export interface MarkdownDoc {
  url: string;
  metadata: MarkdownMetadata;
}

export interface MarkdownMetadata extends Record<string, string> {
  course_title: string;
  source: string;
  titre: string;
  ue_id: string;
  sha: string;
}

export interface ChunkResultat {
  source: string;
  titre: string;
  pertinence: string;
  texte: string;
  ue_id: string;
  sha: string;
  course_title?: string;
  nomAlgo?: string;
  metadata?: Record<string, string>;
}


export interface ContextResult {
  question?: string;
  resultatsVectoriel: ChunkResultat[];
  resultatsBM25: ChunkResultat[];
}

export interface FileState {
  path: string;
  sha: string;
}

export interface DeltaResult {
  aAjouter: FileState[];
  aMettrAJour: FileState[];
  aSupprimer: FileState[];
}
