import { z } from "zod";
import type { AskResponse, ChunkResultat, MarkdownMetadata } from "./data.js";

/**
 * MetaDataSchema
 */
export const MarkdownMetadataSchema = z.object({
  course_title: z.string(),
  source: z.string(),
  titre: z.string(),
  ue_id: z.string(),
  sha: z.string(),
  originalDocumentData: z.string(),
  chunkNumber: z.number(),
  bloc: z.number(),
  section: z.number(),
  page: z.number().optional(),
}); // .readonly();

function _sameTypeMarkdownMetadata(a: MarkdownMetadata, b: z.infer<typeof MarkdownMetadataSchema>): void {
    a = b;
    b = a;
}

// ── Request ───────────────────────────────────────────────────────────
export const AskRequestSchema = z.object({
  question:    z.string(),
  nbResultats: z.number(),
});

export type AskRequest = z.infer<typeof AskRequestSchema>;

// ── Response 200 ──────────────────────────────────────────────────────
export const ChunkResultatSchema = z.object({
  source: z.string(),
  titre: z.string(),
  pertinence: z.string(),
  texte: z.string(),
  ue_id: z.string(),
  sha: z.string(),
  course_title: z.string(),
  nomAlgo: z.string(),
  metadata: MarkdownMetadataSchema, // z.record(z.string(), z.string()).optional(),
}).readonly();



function _sameTypeChunkResultat(a: ChunkResultat, b: z.infer<typeof ChunkResultatSchema>): void {
    a = b;
    b = a;
}

// ── Response ───────────────────────────────────────────────────────────
export const AskResponseSchema = z.object({
  question:  z.string(),
  resultats: z.object({
    resultatsVectoriel: z.array(ChunkResultatSchema).readonly(),
    resultatsBM25:      z.array(ChunkResultatSchema).readonly(),
  }).readonly(),
}).readonly();


function _sameTypeAskResponse(a: AskResponse, b: z.infer<typeof AskResponseSchema>): void {
    a = b;
    b = a;
}

// ── POST /:ueId/documents ─────────────────────────────────────
export const AddDocumentRequestSchema = z.object({
  path:     z.string().min(1, "Le champ 'path' est requis"),
  url:      z.url("Le champ 'url' doit être une URL valide").optional(),
  content:  z.string().optional(),
  sha:      z.string().min(1, "Le champ 'sha' est requis"),
  metadata: MarkdownMetadataSchema,
}).refine(data => data.url || data.content, {
  message: "Vous devez fournir soit 'url' soit 'content'",
  path: ["url", "content"]
});

export type AddDocumentRequest = z.infer<typeof AddDocumentRequestSchema>;


// ── PUT /:ueId/documents/:source ──────────────────────────────
export const UpdateDocumentRequestSchema = z.object({
  url:      z.string().url("Le champ 'url' doit être une URL valide").optional(),
  content:  z.string().optional(),
  sha:      z.string().min(1, "Le champ 'sha' est requis"),
  metadata: z.record(z.string(), z.string()).optional(),
}).refine(data => data.url || data.content, {
  message: "Vous devez fournir soit 'url' soit 'content'",
  path: ["url", "content"]
});

export type UpdateDocumentRequest = z.infer<typeof UpdateDocumentRequestSchema>;


// ── GET /:ueId/documents (réponse) ────────────────────────────
export const FileStateSchema = z.object({
  path: z.string(),
  sha:  z.string(),
});

export const BDDStateResponseSchema = z.array(FileStateSchema);

export type BDDStateResponse = z.infer<typeof BDDStateResponseSchema>;


// ── POST /:ueId/upload (réponse succès) ───────────────────────
export const UploadResponseSchema = z.object({
  message: z.string(),
});

export type UploadResponse = z.infer<typeof UploadResponseSchema>;


// ── Réponse générique message/erreur ─────────────────────────
export const MessageResponseSchema = z.object({
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
});