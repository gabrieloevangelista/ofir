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

export default function CotacaoLoading() {
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
            <div className="w-full flex flex-col gap-8 pb-16">
              {/* Header controls */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36 rounded-none" />
                  <Skeleton className="h-8 w-80 rounded-none" />
                  <Skeleton className="h-4 w-72 rounded-none" />
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Skeleton className="h-9 w-32 rounded-none" />
                  <Skeleton className="h-9 w-24 rounded-none" />
                  <Skeleton className="h-9 w-28 rounded-none" />
                </div>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-none border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-32 rounded-none" />
                      <Skeleton className="size-4 rounded-none" />
                    </div>
                    <Skeleton className="h-9 w-40 rounded-none" />
                    <Skeleton className="h-3 w-48 rounded-none" />
                  </div>
                ))}
              </div>

              {/* Simulator bar */}
              <div className="rounded-none border border-border bg-card p-4 sm:p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-none" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-52 rounded-none" />
                      <Skeleton className="h-3 w-72 rounded-none" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-10 w-28 rounded-none" />
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-12 rounded-none" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis section */}
              <div className="border border-border bg-card p-5 sm:p-6 rounded-none space-y-4">
                <div className="flex items-center gap-2.5 border-b border-border/70 pb-4">
                  <Skeleton className="size-9 rounded-none" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-6 w-80 rounded-none" />
                    <Skeleton className="h-3 w-64 rounded-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="border border-border/80 bg-background/50 p-4 space-y-3 rounded-none">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-28 rounded-none" />
                        <Skeleton className="h-5 w-16 rounded-none" />
                      </div>
                      <Skeleton className="h-1.5 w-full rounded-none" />
                      <Skeleton className="h-3 w-20 rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-3/4 rounded-none" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Supplier items list */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-64 rounded-none" />
                  <Skeleton className="h-4 w-36 rounded-none" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-none border border-border bg-card p-4 sm:p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <div className="flex items-start gap-4">
                          <Skeleton className="size-16 sm:size-20 rounded-none shrink-0" />
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex gap-2">
                              <Skeleton className="h-5 w-20 rounded-none" />
                              <Skeleton className="h-5 w-32 rounded-none" />
                            </div>
                            <Skeleton className="h-6 w-48 rounded-none" />
                            <Skeleton className="h-3 w-40 rounded-none" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6">
                          <div className="space-y-1">
                            <Skeleton className="h-3 w-20 rounded-none" />
                            <Skeleton className="h-5 w-32 rounded-none" />
                            <Skeleton className="h-3 w-36 rounded-none" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-24 rounded-none" />
                            <Skeleton className="size-8 rounded-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
