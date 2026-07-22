import type { IFuseOptions } from "fuse.js"

import type { IndexedEntry } from "@/types/entry"

export const fuseOptions: IFuseOptions<IndexedEntry> = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.35 },
    { name: "shortcut", weight: 0.2 },
    { name: "syntax", weight: 0.15 },
    { name: "aliases", weight: 0.15 },
    { name: "description", weight: 0.1 },
    { name: "tags", weight: 0.15 },
    { name: "keywords", weight: 0.15 },
    { name: "category", weight: 0.1 },
    { name: "subcategory", weight: 0.05 },
  ],
}
