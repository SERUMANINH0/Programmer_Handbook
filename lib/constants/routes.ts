import {
  BookMarked,
  Home,
  Keyboard,
  LayoutGrid,
  Info,
  Search,
  Settings,
  MonitorPlay,
  SquareStack,
  Brain,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  href: string
  labelKey: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/categorias", labelKey: "nav.categories", icon: LayoutGrid },
  { href: "/pesquisar", labelKey: "nav.search", icon: Search },
  { href: "/favoritos", labelKey: "nav.favorites", icon: BookMarked },
  { href: "/flashcards", labelKey: "nav.flashcards", icon: SquareStack },
  { href: "/quiz", labelKey: "nav.quiz", icon: Brain },
  { href: "/wallpaper", labelKey: "nav.wallpaper", icon: MonitorPlay },
  { href: "/atalhos", labelKey: "nav.shortcuts", icon: Keyboard },
  { href: "/configuracoes", labelKey: "nav.settings", icon: Settings },
  { href: "/sobre", labelKey: "nav.about", icon: Info },
]
