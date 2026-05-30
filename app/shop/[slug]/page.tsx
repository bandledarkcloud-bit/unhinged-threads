import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import ProductClient from './components/ProductClient';
import ProductImageGallery from './components/ProductImageGallery';
import Header from '@/components/Header';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.metaTitle || `${product.title} | Unhinged Threads`,
    description: product.metaDescription,
    openGraph: {
      title: product.metaTitle || product.title,
      description: product.metaDescription,
      images: [{ url: `/products/${slug}/roxy.png` }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": `/products/${slug}/roxy.png`,
    "description": product.metaDescription,
    "brand": {
      "@type": "Brand",
      "name": "Unhinged Threads"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://threadglitch.com/shop/${slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header />

      <div className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-16 md:pb-20">
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-start lg:items-center">
          {/* Left Column - Images + Size Selector (on mobile) */}
          <div>
            <ProductImageGallery slug={slug} title={product.title} />
            
            {/* Size selector - visible on mobile, hidden on lg+ */}
            <div className="mt-4 lg:hidden">
              <SizeSelector 
                sizes={product.sizes} 
                selectedSize="L" 
                onSizeChange={() => {}} 
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col pt-2">
            <div>
              <div className="text-[#ff0088] text-xs tracking-[4px] mb-2">{product.flavor}</div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-[-3px] leading-none mb-4">{product.title}</h1>
              <div className="text-2xl md:text-4xl font-black tracking-tight mb-8">${product.price}</div>
            </div>

            <div className="text-base md:text-lg text-white mb-8 pr-4">
              {product.metaDescription}
            </div>

            <div className="mb-8">
              <div className="text-sm tracking-[3px] text-white mb-3">DETAILS</div>
              <ul className="space-y-1 text-sm text-white">
                {product.bullets.map((bullet, i) => (
                  <li key={i}>{bullet.icon} {bullet.text}</li>
                ))}
              </ul>
            </div>

            <ProductClient 
              product={product} 
              selectedSize="L" 
              onSizeChange={() => {}} 
            />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
