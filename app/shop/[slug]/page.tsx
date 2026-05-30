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
          {/* Interactive Image Gallery (client component with zoom) */}
          <ProductImageGallery slug={slug} title={product.title} />

          {/* Details - vertically centered */}
          <div className="flex flex-col pt-2">
            <div>
              <div className="text-[#ff0088] text-xs tracking-[4px] mb-2">{product.flavor}</div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-[-3px] leading-none mb-4">{product.title}</h1>
              <div className="text-4xl font-black tracking-tight mb-8">${product.price}</div>
            </div>

            <div className="text-lg text-white mb-8 pr-4">
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

            <ProductClient product={product} />
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
