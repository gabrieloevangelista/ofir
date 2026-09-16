import { Skeleton } from "@/components/ui/skeleton"

function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Skeleton className="size-9 rounded-none" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-16 rounded-none" />
          <Skeleton className="h-3 w-28 rounded-none" />
        </div>
      </div>
      <div className="space-y-2 border-b border-border pb-5">
        <Skeleton className="h-3 w-40 rounded-none" />
        <Skeleton className="h-10 w-full rounded-none" />
      </div>
      <Skeleton className="h-3 w-36 rounded-none" />
      <Skeleton className="h-8 w-full rounded-none" />
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-none" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-none" style={{ opacity: 1 - i * 0.06 }} />
        ))}
      </div>
    </div>
  )
}

export default function SupplierDetailLoading() {
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

          {/* Main content */}
          <main className="flex-1 min-w-0 w-full">
            <div className="w-full flex-1">
              {/* Back link + actions */}
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-5 w-36 rounded-none" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-20 rounded-none" />
                  <Skeleton className="h-9 w-28 rounded-none" />
                </div>
              </div>

              {/* Gallery skeleton */}
              <div className="mb-8">
                <Skeleton className="w-full aspect-[16/9] rounded-none" />
                <div className="flex gap-2 mt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-20 rounded-none shrink-0" />
                  ))}
                </div>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left column */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                  {/* Badges */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Skeleton className="h-6 w-24 rounded-none" />
                      <Skeleton className="h-6 w-20 rounded-none" />
                      <Skeleton className="h-6 w-28 rounded-none" />
                    </div>
                    {/* Title */}
                    <Skeleton className="h-10 w-3/4 mt-3 rounded-none" />
                    {/* Meta info */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <Skeleton className="h-4 w-40 rounded-none" />
                      <Skeleton className="h-4 w-48 rounded-none" />
                      <Skeleton className="h-4 w-32 rounded-none" />
                    </div>
                  </div>

                  {/* Separator */}
                  <Skeleton className="h-px w-full rounded-none" />

                  {/* Description */}
                  <div>
                    <Skeleton className="h-7 w-64 rounded-none" />
                    <div className="mt-3 space-y-2">
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-3/4 rounded-none" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Skeleton className="h-7 w-56 rounded-none" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-7 w-20 rounded-none" />
                      ))}
                    </div>
                  </div>

                  {/* Reviews section */}
                  <div className="mt-8">
                    <Skeleton className="h-px w-full rounded-none mb-8" />
                    <Skeleton className="h-7 w-52 rounded-none mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="rounded-none border border-border p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Skeleton key={j} className="size-3.5 rounded-none" />
                              ))}
                            </div>
                            <Skeleton className="h-3 w-16 rounded-none" />
                          </div>
                          <Skeleton className="h-4 w-full rounded-none" />
                          <Skeleton className="h-4 w-5/6 rounded-none" />
                          <div className="border-t border-border/50 pt-3 space-y-1">
                            <Skeleton className="h-4 w-32 rounded-none" />
                            <Skeleton className="h-3 w-24 rounded-none" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 border border-border rounded-none p-6 space-y-4">
                    <Skeleton className="h-3 w-28 rounded-none" />
                    <Skeleton className="h-8 w-40 rounded-none" />
                    <Skeleton className="h-11 w-full rounded-none" />
                    <Skeleton className="h-11 w-full rounded-none bg-emerald-600/20" />
                    <Skeleton className="h-10 w-full rounded-none" />
                    <Skeleton className="h-px w-full rounded-none" />
                    <Skeleton className="h-6 w-48 rounded-none" />
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-full rounded-none" />
                      <Skeleton className="h-10 w-full rounded-none" />
                      <Skeleton className="h-10 w-full rounded-none" />
                      <Skeleton className="h-24 w-full rounded-none" />
                      <Skeleton className="h-10 w-full rounded-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
