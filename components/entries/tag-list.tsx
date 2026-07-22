import { Badge } from "@/components/ui/badge"

export function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" className="font-normal">
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
