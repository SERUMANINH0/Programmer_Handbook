import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-40 w-full rounded-lg" />
      ))}
    </div>
  )
}
