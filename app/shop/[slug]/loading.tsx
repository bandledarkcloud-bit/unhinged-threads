export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* NAV skeleton */}
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="h-6 w-48 bg-white/10 rounded" />
          <div className="flex gap-8">
            <div className="h-5 w-12 bg-white/10 rounded" />
            <div className="h-5 w-12 bg-white/10 rounded" />
            <div className="h-5 w-12 bg-white/10 rounded" />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="aspect-square bg-zinc-950 border border-white/10 animate-pulse" />

          {/* Content skeleton */}
          <div className="flex flex-col gap-6 pt-2">
            <div className="h-5 w-24 bg-white/10 rounded" />
            <div className="h-14 w-3/4 bg-white/10 rounded" />
            <div className="h-6 w-20 bg-[#ff0088]/30 rounded" />

            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-4 w-5/6 bg-white/10 rounded" />
              <div className="h-4 w-4/6 bg-white/10 rounded" />
            </div>

            <div className="pt-6 space-y-3">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-4 w-28 bg-white/10 rounded" />
              <div className="h-4 w-36 bg-white/10 rounded" />
            </div>

            <div className="pt-8">
              <div className="h-12 w-full bg-white/10 border border-white/20 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16 mb-8">
        <div className="text-[#ff0088] text-xs tracking-[3px] animate-pulse">
          LOADING THE CHAOS...
        </div>
      </div>
    </div>
  );
}
