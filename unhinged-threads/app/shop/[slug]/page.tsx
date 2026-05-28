import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import ProductClient from './components/ProductClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Unhinged Threads',
    };
  }

  return {
    title: product.metaTitle || `${product.title} | Unhinged Threads`,
    description: product.metaDescription || `Shop ${product.title} at Unhinged Threads.`,
    openGraph: {
      images: [`/products/${slug}/roxy.png`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-[-1px] text-[#ff0088]">UNHINGED THREADS</Link>
          <div className="flex items-center gap-8 text-lg">
            <Link href="/" className="hover:text-[#ff0088] transition-colors">HOME</Link>
            <Link href="/shop" className="hover:text-[#ff0088] transition-colors">SHOP</Link>
            <Link href="/cart" className="hover:text-[#ff0088] transition-colors">CART</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Visuals */}
          <div className="max-w-[80%]">
            <div className="space-y-4">
              {/* Roxy / Main Image */}
              <div className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden">
                <img 
                  src={`/products/${slug}/roxy.png`} 
                  alt={`${product.title} on Roxy`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Shirt Design */}
              <div className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden">
                <img 
                  src={`/products/${slug}/shirt.png`} 
                  alt={`${product.title} design`}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Video */}
              <div className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster={`/products/${slug}/roxy.png`}
                >
                  <source src={`/products/${slug}/video.mp4`} type="video/mp4" />
                  <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
                    Video coming soon
                  </div>
                </video>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div>
              <div className="text-[#ff0088] text-sm tracking-[4px] font-black mb-2">{product.flavor}</div>
              <h1 className="text-6xl font-black tracking-[-3px] leading-none mb-6 text-[#ff0088]">
                {product.title}
              </h1>
              <div className="text-6xl font-black mb-8">${product.price}</div>
            </div>

            <ProductClient product={product} />

            {/* Why You Need This Shirt */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 tracking-wider">WHY YOU NEED THIS SHIRT</h3>
              
              <ul className="space-y-4 text-lg">
                {product.bullets.map((bullet, index) => {
                  const parts = bullet.text.split(' — ');
                  const boldPart = parts[0];
                  const rest = parts[1] || '';
                  
                  const isColorLine = bullet.text.includes('Hot pink and acid green');
                  
                  return (
                    <li key={index} className="flex items-start gap-3 text-white">
                      <span className="text-[#39ff14] text-2xl leading-none mt-1">{bullet.icon}</span>
                      <span>
                        <strong>{boldPart}</strong>
                        {rest && (
                          <>
                            {' — '}
                            {isColorLine ? (
                              <>
                                <span className="text-[#ff0088]">Hot pink</span> and <span className="text-[#39ff14]">acid green</span> that actually glows
                              </>
                            ) : (
                              rest
                            )}
                          </>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
