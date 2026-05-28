import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <div 
            className="glitch-text text-[100px] sm:text-[120px] leading-none font-black tracking-[-6px]"
            data-text="404"
          >
            404
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-[-2px] mb-4 text-[#39ff14]">
          YOU GLITCHED TOO HARD
        </h1>
        
        <p className="max-w-md text-lg text-white/80 mb-10">
          This page doesn&apos;t exist.<br />
          Just like your self-control after three drinks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="px-8 py-3 bg-white text-black border-2 border-[#ff0088] text-sm font-black tracking-[1px] active:bg-[#ff0088] active:text-white transition-all"
          >
            BACK TO THE CHAOS
          </Link>
          <Link 
            href="/shop" 
            className="px-8 py-3 bg-black text-white border-2 border-[#39ff14] text-sm font-black tracking-[1px] hover:bg-[#39ff14] hover:text-black transition-all"
          >
            BROWSE THE DEGENERACY
          </Link>
        </div>

        <div className="mt-16 text-xs text-white/40 tracking-[2px]">
          RESPECT THE GLITCH ⚡️
        </div>
      </div>
    </div>
  );
}
