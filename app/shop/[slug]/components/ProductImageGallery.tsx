"use client";

import { useState } from 'react';

interface ProductImageGalleryProps {
  slug: string;
  title: string;
}

export default function ProductImageGallery({ slug, title }: ProductImageGalleryProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      {/* 2 Images + 1 Video - Square */}
      <div className="flex flex-col gap-3 max-w-[256px] lg:ml-auto">
        {/* Image 1 - Click to zoom */}
        <div 
          className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden cursor-zoom-in hover:border-[#ff0088] transition-colors"
          onClick={() => setZoomedImage(`/products/${slug}/roxy.png`)}
        >
          <img 
            src={`/products/${slug}/roxy.png`} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Image 2 - Click to zoom */}
        <div 
          className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden cursor-zoom-in hover:border-[#ff0088] transition-colors"
          onClick={() => setZoomedImage(`/products/${slug}/shirt.png`)}
        >
          <img 
            src={`/products/${slug}/shirt.png`} 
            alt={`${title} shirt detail`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Video */}
        <div className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden">
          <video 
            src={`/products/${slug}/video.mp4`} 
            controls 
            className="w-full h-full object-cover"
            muted
            loop
          />
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <img 
              src={zoomedImage} 
              alt="Zoomed product image"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
              className="absolute -top-3 -right-3 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center text-2xl font-black hover:bg-[#ff0088] hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
