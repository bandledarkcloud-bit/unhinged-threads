'use client';

import { useState } from 'react';
import { getPrintfulProducts, getPrintfulProduct } from '@/app/actions/printful-admin';

interface CleanVariant {
  size: string;
  color: string;
  catalogId: number;
  syncId: number;
}

export default function PrintfulAdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [variants, setVariants] = useState<CleanVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPrintfulProducts();
      setProducts(data);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const loadProduct = async (productId: number, productName: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await getPrintfulProduct(productId);
      
      const cleanVariants: CleanVariant[] = (data.sync_variants || []).map((v: any) => ({
        size: v.size,
        color: v.color,
        catalogId: v.variant_id,
        syncId: v.id,
      }));

      setSelectedProduct({ id: productId, name: productName });
      setVariants(cleanVariants);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">Printful Admin</h1>
            <p className="text-zinc-400 mt-1">Local only • Clean variant IDs</p>
          </div>
          <button
            onClick={loadProducts}
            disabled={loading}
            className="px-8 py-3 bg-[#ff0088] hover:bg-white hover:text-black font-bold rounded-2xl transition-all disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load Products'}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-950/70 border border-red-900 px-5 py-4 text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Products List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-xl">Products</h2>
              <div className="text-xs px-3 py-1 bg-zinc-950 rounded-full text-zinc-400">
                {products.length}
              </div>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                Click "Load Products" to fetch from Printful
              </div>
            ) : (
              <div className="space-y-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => loadProduct(product.id, product.name)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex justify-between items-center ${
                      selectedProduct?.id === product.id 
                        ? 'bg-[#ff0088] text-black border-[#ff0088]' 
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="font-mono text-xs opacity-60">#{product.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Variants View */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="font-bold text-xl mb-5">Variants</h2>
            
            {!selectedProduct ? (
              <div className="text-center py-12 text-zinc-500">
                Select a product to see clean variant IDs
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="text-sm text-[#ff0088] font-medium">SELECTED</div>
                  <div className="text-2xl font-bold tracking-tight mt-1">{selectedProduct.name}</div>
                </div>

                {variants.length > 0 ? (
                  <div className="space-y-3">
                    {variants.map((v, index) => (
                      <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                        <div className="flex items-baseline gap-3 mb-4">
                          <div className="text-2xl font-bold">{v.size}</div>
                          <div className="text-sm text-zinc-400">{v.color}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5">Catalog ID</div>
                            <div className="font-mono bg-black px-4 py-3 rounded-xl text-[#c084fc] text-sm font-medium">
                              {v.catalogId}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5">Sync ID</div>
                            <div className="font-mono bg-black px-4 py-3 rounded-xl text-[#39ff14] text-sm font-medium">
                              {v.syncId}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-zinc-500">No variants found</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
