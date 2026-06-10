'use client';

export default function CarouselSandbox() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-black mb-4 text-[#ff0088]">CAROUSEL SANDBOX</h1>
        <p className="text-[#39ff14] mb-12">Safe test page - Homepage untouched</p>

        {/* Simple Reliable Marquee Carousel */}
        <div className="overflow-hidden py-8 border-y border-white/10">
          <div className="flex gap-6 animate-marquee">
            {[1,2,3,4,5,1,2,3,4,5].map((num, i) => (
              <div key={i} className="flex-shrink-0">
                <img 
                  src={`/customer-photos/photo${num}.jpg`} 
                  alt={`Customer ${num}`}
                  className="h-[380px] w-auto object-cover rounded-xl border border-white/10" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/" className="text-[#39ff14] hover:underline text-xl">← Back to Homepage</a>
        </div>
      </div>
    </div>
  );
}
