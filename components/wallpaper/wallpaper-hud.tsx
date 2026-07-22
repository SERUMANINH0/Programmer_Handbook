import { getGroupMeta } from "@/lib/categories/registry"
import { t } from "@/lib/i18n"

export function WallpaperHUD({ group, paused }: { group?: string; paused: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 p-6 text-center text-white/60">
      <p className="text-xs font-medium tracking-widest uppercase">
        {group ? getGroupMeta(group).label : ""}{" "}
        {paused ? `· ${t("study.pomodoro.pause")}` : ""}
      </p>
      <p className="text-[11px]">
        {t("wallpaper.navigationHint")} · {t("wallpaper.pauseHint")} ·{" "}
        {t("wallpaper.exitHint")}
      </p>
    </div>
  )
}
