export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
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

      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="mb-10">
          <div className="h-10 w-64 bg-white/10 rounded mb-3" />
          <div className="h-5 w-96 bg-white/10 rounded" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-white/10 bg-zinc-950">
              <div className="aspect-square bg-white/5 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-white/10 rounded" />
                <div className="h-4 w-16 bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
