import { getPrintfulProducts, getPrintfulProduct } from '@/app/actions/printful-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('id');

  try {
    if (productId) {
      // Fetch FULL product with variants
      const product = await getPrintfulProduct(parseInt(productId));
      return Response.json(product);
    } else {
      // Fetch basic product list
      const products = await getPrintfulProducts();
      return Response.json(products);
    }
  } catch (error: any) {
    console.error("Printful API Error:", error);
    return Response.json({ 
      error: error.message || "Failed to fetch from Printful" 
    }, { status: 500 });
  }
}
