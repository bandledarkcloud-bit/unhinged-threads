import Link from 'next/link';
import Header from '@/components/Header';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header />

      <div className="max-w-2xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="text-6xl mb-6">🖤</div>

        <h1 className="text-4xl md:text-6xl font-black tracking-[-3px] mb-3">
          ORDER PLACED.
        </h1>

        <p className="text-[#ff0088] text-xl tracking-tight mb-1">
          You&apos;ve made a terrible mistake.
        </p>
        <p className="text-[#39ff14] text-xl tracking-tight mb-8">
          We&apos;ll ship it anyways.
        </p>

        <div className="max-w-md mx-auto border border-white/10 bg-zinc-950 p-6 mb-10 text-left">
          <div className="text-sm tracking-[2px] text-white/50 mb-3">WHAT HAPPENS NEXT</div>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>• Printful will send you a confirmation email</li>
            <li>• You&apos;ll get tracking when it ships</li>
            <li>• Expect it in 5–12 business days</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-10 py-4 bg-[#ff0088] text-white font-black text-lg tracking-[1px] active:bg-white active:text-black transition-all"
          >
            BROWSE MORE CHAOS
          </Link>
          <Link
            href="/"
            className="px-10 py-4 border-2 border-white/30 hover:border-white font-black text-lg tracking-[1px] transition-all"
          >
            HOME
          </Link>
        </div>

        <p className="mt-12 text-xs text-[#ff0088] tracking-[3px]">
          RESPECT THE GLITCH ⚡️
        </p>
      </div>
    </div>
  );
}
