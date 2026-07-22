# Programmer Handbook

A maior biblioteca **gratuita** de referência rápida para programadores: cheat sheet,
base de conhecimento, flashcards, quiz e modo wallpaper — tudo em uma Progressive Web App
que funciona offline, sem backend e sem banco de dados.

Todo o conteúdo vive em arquivos **JSON** versionados dentro de `data/`. Não há servidor,
API ou banco de dados: o app lê os arquivos em build-time/request-time e o resto acontece
no navegador (busca, favoritos, histórico, progresso de estudo).

---

## Sumário

- [Stack](#stack)
- [Instalação](#instalação)
- [Execução](#execução)
- [Testes](#testes)
- [Deploy](#deploy-na-vercel)
- [Estrutura do projeto](#estrutura-do-projeto)
- [O padrão de dados (Entry)](#o-padrão-de-dados-entry)
- [Como adicionar novos itens a um JSON existente](#como-adicionar-novos-itens-a-um-json-existente)
- [Como criar uma nova categoria (arquivo JSON)](#como-criar-uma-nova-categoria-arquivo-json)
- [Como criar um novo grupo](#como-criar-um-novo-grupo)
- [Como contribuir](#como-contribuir)
- [Licença](#licença)

---

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui ·
Framer Motion · Lucide React · Fuse.js · Zustand · React Hook Form + Zod · PWA (manifest +
service worker nativos) · ESLint · Prettier · Husky + lint-staged · Vitest · Playwright ·
deploy na Vercel.

Nenhum banco de dados, Firebase, Supabase ou backend de qualquer tipo é usado — de propósito.

## Instalação

Pré-requisitos: Node.js 20+ e npm.

```bash
git clone <url-do-repositorio>
cd programmer-handbook
npm install
```

## Execução

```bash
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000). O script `predev` gera automaticamente
`public/search-index.json` a partir de `data/**/*.json` antes de subir o servidor — rode
`npm run build:search-index` manualmente sempre que editar um JSON e quiser ver a busca
atualizada sem reiniciar o `dev`.

Outros scripts úteis:

```bash
npm run lint           # ESLint
npm run lint:fix       # ESLint com --fix
npm run format         # Prettier --write
npm run typecheck      # tsc --noEmit
npm run validate:data  # valida todo data/**/*.json contra o schema Zod
npm run build          # build de produção (roda validate:data + build:search-index antes)
```

Husky + lint-staged rodam automaticamente no `pre-commit`: ESLint/Prettier nos arquivos
staged e validação de schema em qualquer `data/**/*.json` alterado.

## Testes

```bash
npm run test         # Vitest (unitários: lib/data, lib/search, stores, schemas)
npm run test:watch   # Vitest em modo watch
npm run test:e2e     # Playwright (builda em produção e sobe em :3100 automaticamente)
```

Os testes e2e rodam contra um **build de produção** (`next build && next start`), não contra
`next dev` — em modo dev, a compilação sob demanda de cada rota pode deixar a primeira
navegação lenta o suficiente para gerar falsos negativos.

## Deploy na Vercel

O projeto é um app Next.js padrão (SSR/ISR, sem `output: "export"`), pronto para importar
diretamente na Vercel:

1. Suba o repositório para o GitHub/GitLab/Bitbucket.
2. Na Vercel, "Add New Project" → selecione o repositório → framework detectado
   automaticamente como Next.js.
3. Nenhuma variável de ambiente é necessária (não há backend/API keys).
4. Deploy.

O `npm run build` já roda `validate:data` e `build:search-index` antes do `next build`
(via `prebuild`), então um JSON inválido **quebra o build** — isso é intencional, para
nunca publicar dados fora do schema.

## Estrutura do projeto

```
app/                        Rotas (App Router)
  (app)/                     Grupo de rotas com header/nav (a maior parte do site)
    page.tsx                 Home
    categorias/               Listagem de grupos → categorias → itens
    pesquisar/                 Busca global
    favoritos/                 Favoritos, recentes, mais acessados, mais pesquisados
    quiz/ flashcards/           Modo estudo
    atalhos/ configuracoes/ sobre/
    entrada/[group]/[slug]/[id]/  Detalhe de um item
  wallpaper/                 Rota SEM header/nav (fullscreen, seu próprio layout.tsx)
  layout.tsx                 Layout raiz: fontes, ThemeProvider, PWA, Command Palette
  manifest.ts sitemap.ts robots.ts opengraph-image.tsx   SEO/PWA (Metadata API nativa)

components/
  ui/          shadcn/ui (button, card, dialog, command, form...)
  layout/      Header, MainNav, MobileNav, ThemeToggle, CommandPalette (Cmd+K)
  entries/     EntryCard, EntryDetail, EntryGrid, CodeBlock, badges...
  search/      SearchBar, FilterBar, SearchView
  favorites/   FavoriteButton, FavoritesGrid, RecentEntries, MostAccessed/MostSearched
  study/       Flashcard, FlashcardDeck, QuizSession, PomodoroTimer, FocusModeToggle
  wallpaper/   WallpaperStage, WallpaperHUD
  shortcuts/   ShortcutTable, ShortcutGroupTabs
  settings/    SettingsForm (React Hook Form + Zod)
  common/      PageHeader, EmptyState, LoadingSkeletonGrid

hooks/         useFuseSearch, useSearchIndex, useDebouncedValue, useWallpaperRotation,
               usePomodoro, useKeyboardShortcuts...

lib/
  data/repository.ts         Camada de dados (server-only, lê data/**/*.json com fs + React.cache)
  categories/registry.ts     Metadados dos grupos (label, ícone, cor, descrição)
  search/fuseOptions.ts      Configuração do Fuse.js
  store/                     Zustand + persist (favoritos, histórico, stats, settings, estudo)
  i18n/                      Dicionário pt-BR + helper t() (arquitetura pronta p/ outros idiomas)
  validation/entry.schema.ts Schema Zod oficial de um item
  quiz/generateQuiz.ts       Gera perguntas de múltipla escolha a partir das entries

types/         Entry, CategoryGroupMeta, AppSettings, QuizQuestion, FlashcardProgress...

scripts/
  validate-data.ts           Valida todo data/**/*.json contra o schema (usado no build e pre-commit)
  build-search-index.ts      Gera public/search-index.json a partir de data/**/*.json
  generate-icons.mjs         Gera os PNGs de ícone da PWA (sem dependências externas)

data/            Todo o conteúdo, organizado em pastas por grupo (ver seções abaixo)
tests/e2e/       Testes Playwright
public/          Ícones, search-index.json (gerado), sw.js (service worker)
```

## O padrão de dados (Entry)

Cada arquivo em `data/<grupo>/<categoria>.json` é um **array de objetos** seguindo
exatamente este formato (ver `types/entry.ts` e `lib/validation/entry.schema.ts`):

```jsonc
{
  "id": "git-commit", // único no projeto inteiro
  "category": "Git", // nome de exibição da categoria
  "subcategory": "Comandos básicos", // opcional
  "title": "git commit",
  "description": "...",
  "syntax": "git commit -m \"<mensagem>\"",
  "example": "git commit -m \"feat: login\"",
  "result": "[main 1a2b3c4] feat: login",
  "shortcut": "Ctrl+Enter", // opcional — atalhos aparecem em /atalhos
  "aliases": ["git ci"],
  "parameters": [{ "name": "...", "description": "...", "required": false }],
  "flags": [{ "flag": "-m", "description": "..." }],
  "returns": "...",
  "notes": ["..."],
  "bestPractices": ["..."],
  "commonMistakes": ["..."],
  "relatedCommands": ["git-add", "git-status"], // ids de outros itens (qualquer grupo)
  "difficulty": "iniciante", // "iniciante" | "intermediario" | "avancado"
  "platform": ["linux", "windows", "macos"],
  "language": "javascript", // opcional
  "version": "2.0+", // opcional
  "officialDocumentation": "https://...",
  "externalReferences": [{ "label": "...", "url": "https://..." }],
  "tags": ["git", "vcs"],
  "keywords": ["commit", "salvar alteracoes"],
  "favorite": false, // valor semente opcional — favoritos reais ficam no localStorage do usuário
  "updatedAt": "2026-07-01",
}
```

Só `id`, `category`, `title`, `description`, `difficulty` e `updatedAt` são obrigatórios —
o resto é omitido quando não fizer sentido (ex: um conceito de arquitetura não tem `syntax`).

## Como adicionar novos itens a um JSON existente

1. Abra o arquivo, ex: `data/devops/git.json`.
2. Adicione um novo objeto ao array seguindo o padrão acima. `id` precisa ser único
   **em todo o projeto**, não só no arquivo.
3. Rode `npm run validate:data` para confirmar que o schema está correto.
4. `npm run build:search-index` (ou apenas `npm run dev` de novo) para a busca reconhecer o
   item novo.

Nada em código precisa mudar — a contagem de itens, a busca, os filtros e o quiz/flashcards
já enxergam o item automaticamente.

## Como criar uma nova categoria (arquivo JSON)

1. Escolha o grupo (pasta) correto em `data/` — ex: `data/devops/`.
2. Crie `data/devops/kubernetes.json` com um array de itens no formato acima.
3. Rode `npm run validate:data`.

Pronto: a categoria aparece automaticamente em `/categorias/devops`, na busca, nos filtros
e no quiz/flashcards — `lib/data/repository.ts` descobre os arquivos dinamicamente lendo o
diretório, não existe uma lista hardcoded de categorias para manter atualizada.

Use o prompt abaixo (adapte o nome do arquivo) para gerar o conteúdo de uma categoria nova
com qualidade e cobertura alta — o mesmo modelo usado para preencher `git.json`:

> Preencha apenas `<categoria>.json`. Objetivo: criar a referência mais completa possível
> sobre `<assunto>`. Inclua comandos/conceitos básicos, intermediários e avançados, aliases,
> flags, parâmetros, exemplos reais, explicações curtas, boas práticas, erros comuns, casos
> de uso, troubleshooting. Utilize exatamente o padrão JSON do projeto (`types/entry.ts`).
> Links apenas para documentação oficial. Gere o máximo de registros possível mantendo alta
> qualidade.

O guia completo de contribuição por categoria está em [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## Como criar um novo grupo

Um "grupo" é uma pasta de topo em `data/` (ex: `languages`, `devops`, `cloud`). Para criar um
grupo novo:

1. Crie a pasta, ex: `data/mobile/` com pelo menos um `.json` dentro.
2. (Opcional, recomendado) Adicione metadados em `lib/categories/registry.ts` — label em
   português, ícone do [Lucide](https://lucide.dev), descrição e cor. Sem isso o grupo ainda
   funciona, só usa um ícone/label genérico de fallback.

## Como contribuir

1. Abra uma branch a partir de `main`.
2. Se for conteúdo novo, siga as seções acima — o objetivo é qualidade e fidelidade técnica,
   não quantidade.
3. Rode `npm run validate:data`, `npm run lint`, `npm run typecheck` e `npm run test` antes
   de abrir o PR.
4. Descreva no PR **o que** foi adicionado/alterado e **por quê**.

Ideias de evolução já identificadas (fique à vontade para atacar qualquer uma):

- Suporte a i18n em inglês (a arquitetura em `lib/i18n/` já está pronta para isso).
- Export estático dedicado da rota `/wallpaper` para empacotar como projeto do Wallpaper
  Engine (hoje ela só roda como tela fullscreen dentro do próprio app/PWA).
- Virtualização de listas quando alguma categoria passar de milhares de itens.

## Licença

MIT.
