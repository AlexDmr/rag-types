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

export interface MarkdownMetadata /*extends Record<string, string>*/ {
  readonly course_title: string;
  readonly source: string;
  readonly titre: string;
  readonly ue_id: string;
  readonly sha: string;
  readonly originalDocumentData: string;
  readonly chunkNumber: number;
  readonly bloc: number;
  readonly section: number;
  readonly page?: number | undefined;
}

export interface ChunkResultat {
  readonly source: string;
  readonly titre: string;
  readonly pertinence: string;
  readonly texte: string;
  readonly ue_id: string;
  readonly sha: string;
  readonly course_title: string;
  readonly nomAlgo: string;
  readonly metadata: MarkdownMetadata;
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

export interface AskResponse {
    readonly question: string;
    readonly resultats: {
        readonly resultatsVectoriel: readonly ChunkResultat[];
        readonly resultatsBM25: readonly ChunkResultat[];
    };
}
