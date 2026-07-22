import type { Metadata } from "next"

import { WallpaperStage } from "@/components/wallpaper/wallpaper-stage"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("wallpaper.title") }

export default function WallpaperPage() {
  return <WallpaperStage />
}
