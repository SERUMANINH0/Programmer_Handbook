import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Programmer Handbook",
    short_name: "Handbook",
    description:
      "A maior referência gratuita para programadores — offline, rápida e sempre à mão.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    orientation: "portrait-primary",
    lang: "pt-BR",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      { name: "Pesquisar", url: "/pesquisar" },
      { name: "Flashcards", url: "/flashcards" },
      { name: "Quiz", url: "/quiz" },
      { name: "Modo Wallpaper", url: "/wallpaper" },
    ],
  }
}
