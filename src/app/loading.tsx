import { Skeleton } from "@/components/ui/skeleton"

function CardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-none border border-border bg-card shadow-none flex flex-col">
      {/* Image placeholder */}
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      {/* Content */}
      <div className="flex flex-col p-4 sm:p-5 gap-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4 rounded-none" />
          <Skeleton className="h-5 w-1/3 rounded-none" />
        </div>
        <Skeleton className="h-4 w-full rounded-none" />
        <Skeleton className="h-4 w-5/6 rounded-none" />
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Skeleton className="h-12 rounded-none" />
          <Skeleton className="h-12 rounded-none" />
        </div>
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-none mt-1" />
      </div>
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-5 w-full p-5">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Skeleton className="size-9 rounded-none" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-16 rounded-none" />
          <Skeleton className="h-3 w-28 rounded-none" />
        </div>
      </div>
      {/* City filter */}
      <div className="space-y-2 border-b border-border pb-5">
        <Skeleton className="h-3 w-40 rounded-none" />
        <Skeleton className="h-10 w-full rounded-none" />
      </div>
      {/* Area label */}
      <Skeleton className="h-3 w-36 rounded-none" />
      <Skeleton className="h-8 w-full rounded-none" />
      {/* Group pills */}
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-none" />
        ))}
      </div>
      {/* Area list items */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-12 w-full rounded-none"
            style={{ opacity: 1 - i * 0.06 }}
          />
        ))}
      </div>
    </div>
  )
}

function HeaderBarSkeleton() {
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-5 mb-8">
      {/* Title row */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-6 w-48 rounded-none" />
        <Skeleton className="h-8 w-full max-w-lg rounded-none" />
        <Skeleton className="h-4 w-72 rounded-none" />
      </div>
      {/* Controls row */}
      <div className="flex items-center justify-between gap-3 w-full border-t border-border/40 pt-3">
        <Skeleton className="h-10 w-24 rounded-none lg:hidden" />
        <div className="flex items-center gap-2 ml-auto">
          <Skeleton className="h-10 w-20 rounded-none" />
          <Skeleton className="h-10 w-[4.4rem] rounded-none" />
          <Skeleton className="h-10 w-[11.2rem] rounded-none" />
          <Skeleton className="h-10 w-36 rounded-none" />
          <Skeleton className="h-10 w-24 rounded-none" />
        </div>
      </div>
      {/* Search bar */}
      <Skeleton className="h-11 w-full rounded-none mt-1" />
    </div>
  )
}

export default function HomeLoading() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar skeleton (desktop only) */}
          <div className="hidden lg:block lg:sticky lg:top-6 self-start shrink-0 w-[300px]">
            <div className="border-none bg-background shadow-sm">
              <SidebarSkeleton />
            </div>
          </div>

          {/* Main content skeleton */}
          <main className="flex-1 min-w-0 w-full">
            <HeaderBarSkeleton />

            {/* Cards grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-in fade-in fill-mode-backwards duration-300"
                  style={{ animationDelay: `${Math.min(i, 6) * 50}ms` }}
                >
                  <CardSkeleton />
                </div>
              ))}
            </div>

            {/* Pagination skeleton */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70 pt-6">
              <Skeleton className="h-5 w-56 rounded-none" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24 rounded-none" />
                <Skeleton className="size-9 rounded-none" />
                <Skeleton className="size-9 rounded-none" />
                <Skeleton className="size-9 rounded-none" />
                <Skeleton className="h-9 w-24 rounded-none" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
