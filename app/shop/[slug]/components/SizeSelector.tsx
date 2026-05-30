'use client';

import { useState } from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="mb-4">
      <div className="text-sm tracking-[3px] text-white/70 mb-3">SIZE</div>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-1.5 border text-sm font-black transition-all ${
              selectedSize === size
                ? 'bg-white text-black border-white'
                : 'border-white/40 hover:border-white/80'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
