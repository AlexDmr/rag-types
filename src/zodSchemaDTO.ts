import { z } from "zod";

// ── Request ───────────────────────────────────────────────────────────
export const AskRequestSchema = z.object({
  question:    z.string(),
  nbResultats: z.number(),
});

export type AskRequest = z.infer<typeof AskRequestSchema>;

// ── Response 200 ──────────────────────────────────────────────────────
export const ChunkResultatSchema = z.object({
  source:       z.string(),
  titre:        z.string(),
  pertinence:   z.string(),
  texte:        z.string(),
  ue_id:        z.string(),
  sha:          z.string(),
  course_title: z.string().optional(),
  nomAlgo:      z.string().optional(),
  metadata:     z.record(z.string(), z.string()).optional(),
});

// ── Response ───────────────────────────────────────────────────────────
export const AskResponseSchema = z.object({
  question:  z.string(),
  resultats: z.object({
    resultatsVectoriel: z.array(ChunkResultatSchema),
    resultatsBM25:      z.array(ChunkResultatSchema),
  }),
});

export type AskResponse = z.infer<typeof AskResponseSchema>;

// ── POST /:ueId/documents ─────────────────────────────────────
export const AddDocumentRequestSchema = z.object({
  path:     z.string().min(1, "Le champ 'path' est requis"),
  url:      z.string().url("Le champ 'url' doit être une URL valide").optional(),
  content:  z.string().optional(),
  sha:      z.string().min(1, "Le champ 'sha' est requis"),
  metadata: z.record(z.string(), z.string()).optional(),
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