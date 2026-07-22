import type { MetadataRoute } from "next"

import {
  getAllEntriesFlat,
  getCategoriesForGroup,
  getGroups,
} from "@/lib/data/repository"

const BASE_URL = "https://programmer-handbook.vercel.app"

const STATIC_ROUTES = [
  "",
  "/categorias",
  "/pesquisar",
  "/favoritos",
  "/quiz",
  "/flashcards",
  "/atalhos",
  "/configuracoes",
  "/sobre",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.6,
  }))

  const groupEntries: MetadataRoute.Sitemap = getGroups().flatMap((group) => [
    {
      url: `${BASE_URL}/categorias/${group}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...getCategoriesForGroup(group).map((slug) => ({
      url: `${BASE_URL}/categorias/${group}/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ])

  const itemEntries: MetadataRoute.Sitemap = getAllEntriesFlat().map((entry) => ({
    url: `${BASE_URL}/entrada/${entry.group}/${entry.slug}/${entry.id}`,
    lastModified: entry.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  return [...staticEntries, ...groupEntries, ...itemEntries]
}
