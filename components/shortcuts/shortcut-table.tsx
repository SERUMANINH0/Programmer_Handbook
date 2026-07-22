import Link from "next/link"

import type { IndexedEntry } from "@/types/entry"

export function ShortcutTable({ entries }: { entries: IndexedEntry[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <tbody className="divide-y">
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-muted/40">
              <td className="w-1/2 p-3">
                <Link
                  href={`/entrada/${entry.group}/${entry.slug}/${entry.id}`}
                  className="font-medium hover:underline"
                >
                  {entry.title}
                </Link>
                <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                  {entry.description}
                </p>
              </td>
              <td className="p-3">
                <kbd className="bg-muted rounded border px-2 py-1 font-mono text-xs">
                  {entry.shortcut}
                </kbd>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
