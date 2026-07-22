import { Badge } from "@/components/ui/badge"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { Difficulty } from "@/types/entry"

const DIFFICULTY_DOT: Record<Difficulty, string> = {
  iniciante: "bg-difficulty-iniciante",
  intermediario: "bg-difficulty-intermediario",
  avancado: "bg-difficulty-avancado",
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge variant="outline" className="gap-1.5 font-normal">
      <span className={cn("size-1.5 rounded-full", DIFFICULTY_DOT[difficulty])} />
      {t(`common.difficultyLevels.${difficulty}`)}
    </Badge>
  )
}
