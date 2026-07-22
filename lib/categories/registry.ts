import {
  Boxes,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  Puzzle,
  Server,
  Shield,
  TerminalSquare,
  TestTube2,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import type { CategoryGroupMeta } from "@/types/category"

/**
 * Metadados dos grupos (pastas em data/). Um grupo sem entrada aqui ainda
 * funciona normalmente — recebe um ícone/cor padrão via getGroupMeta().
 * Para criar uma nova categoria dentro de um grupo já existente basta
 * adicionar o .json em data/<grupo>/; nenhuma mudança de código é necessária.
 */
export const CATEGORY_GROUPS: CategoryGroupMeta[] = [
  {
    id: "languages",
    label: "Linguagens",
    description: "Sintaxe, idiomas e referências de linguagens de programação.",
    icon: TerminalSquare,
    color: "amber",
  },
  {
    id: "frameworks",
    label: "Frameworks",
    description: "Bibliotecas e frameworks de front-end e back-end.",
    icon: Layers,
    color: "sky",
  },
  {
    id: "databases",
    label: "Bancos de Dados",
    description: "SQL, NoSQL e comandos de administração de dados.",
    icon: Database,
    color: "emerald",
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "AWS, Azure, GCP e infraestrutura em nuvem.",
    icon: Cloud,
    color: "blue",
  },
  {
    id: "security",
    label: "Segurança",
    description: "Autenticação, autorização e boas práticas de segurança.",
    icon: Shield,
    color: "red",
  },
  {
    id: "devops",
    label: "DevOps",
    description: "Git, containers, CI/CD e automação.",
    icon: GitBranch,
    color: "orange",
  },
  {
    id: "operating-systems",
    label: "Sistemas Operacionais",
    description: "Linux, Windows, terminais e shells.",
    icon: Cpu,
    color: "slate",
  },
  {
    id: "architecture",
    label: "Arquitetura",
    description: "Clean Architecture, SOLID e princípios de design de sistemas.",
    icon: Boxes,
    color: "violet",
  },
  {
    id: "design-patterns",
    label: "Design Patterns",
    description: "Padrões de projeto clássicos e boas práticas de código.",
    icon: Puzzle,
    color: "fuchsia",
  },
  {
    id: "algorithms",
    label: "Algoritmos",
    description: "Estruturas de dados, complexidade e algoritmos clássicos.",
    icon: Cpu,
    color: "cyan",
  },
  {
    id: "network",
    label: "Redes",
    description: "HTTP, DNS, protocolos e conceitos de rede.",
    icon: Network,
    color: "teal",
  },
  {
    id: "testing",
    label: "Testes",
    description: "Testes unitários, integração e ponta a ponta.",
    icon: TestTube2,
    color: "lime",
  },
  {
    id: "tools",
    label: "Ferramentas",
    description: "Editores, IDEs e ferramentas do dia a dia do desenvolvedor.",
    icon: Wrench,
    color: "indigo",
  },
]

const DEFAULT_GROUP_META: Omit<CategoryGroupMeta, "id" | "icon"> = {
  label: "Geral",
  description: "Referências diversas.",
  color: "neutral",
}

const FALLBACK_ICON: LucideIcon = Server

export function getGroupMeta(groupId: string): CategoryGroupMeta {
  const found = CATEGORY_GROUPS.find((group) => group.id === groupId)
  if (found) return found
  return { id: groupId, icon: FALLBACK_ICON, ...DEFAULT_GROUP_META }
}
