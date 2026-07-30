# @graphens/rag-types

Définitions de types TypeScript et schémas de validation Zod pour l'écosystème RAG (Retrieval-Augmented Generation).

Ce paquet fournit les interfaces et DTOs réutilisables pour interconnecter les microservices de données, d'indexation vectorielle et d'API de recherche RAG.

---

## 📦 Installation

Pour installer ce package dans votre projet :

```bash
npm install @graphens/rag-types
```

*Note : `zod` est une dépendance paire (peerDependency). Si elle n'est pas installée dans votre projet :*

```bash
npm install zod
```

---

## 🚀 Utilisation

### Imports des Interfaces TypeScript

```typescript
import type { 
  Page, 
  Course, 
  GraphData, 
  ChunkResultat, 
  ContextResult 
} from '@graphens/rag-types';
```

### Imports des Schémas et Types Zod (DTO)

```typescript
import { 
  AskRequestSchema, 
  AskResponseSchema, 
  AddDocumentRequestSchema,
  UpdateDocumentRequestSchema,
  type AskRequest,
  type AskResponse 
} from '@graphens/rag-types';

// Validation d'une requête entrante
const body = {
  question: "Qu'est-ce qu'un graphe ?",
  nbResultats: 5
};

const parsed = AskRequestSchema.parse(body);
```

---

## 🛠️ Développement Local & Contribution

### Préréquis
- Node.js (v18+)
- npm

### Installation des dépendances
```bash
npm install
```

### Compilation
Compiler les fichiers TypeScript vers JavaScript (ESM) et générer les définitions `.d.ts` dans le dossier `dist/` :

```bash
npm run build
```

---

## 🚀 Publication sur NPM

Pour publier ce package sur le registre public NPM :

1. Se connecter à son compte NPM :
   ```bash
   npm login
   ```

2. Publier la nouvelle version :
   ```bash
   npm publish --access public
   ```

*(Le script `prepublishOnly` exécutera automatiquement `npm run build` avant la publication).*

---

## 📄 Licence

[ISC](LICENSE)
