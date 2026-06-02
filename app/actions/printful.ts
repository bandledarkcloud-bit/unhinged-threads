"use server";

import { products } from "@/lib/products";
import { buildPrintfulOrderPayload, createPrintfulOrder } from "@/lib/printful";

interface Recipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  email?: string;
}

interface Item {
  variant_id: number;
  quantity: number;
  retail_price: string;
}

// ============================================
// SHIPPING RATES (used by cart page)
// ============================================
export async function getShippingRates(
  recipient: Recipient,
  items: Item[],
  storeId: number = 18250831
) {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    console.error("[Printful] No API key configured");
    return { success: false, error: "API key missing" };
  }

  try {
    const response = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store_id: storeId,
        recipient: {
          name: recipient.name,
          address1: recipient.address1,
          address2: recipient.address2 || "",
          city: recipient.city,
          state_code: recipient.state_code || "",
          country_code: recipient.country_code,
          zip: recipient.zip,
          email: recipient.email || "",
        },
        items: items.map((item) => ({
          variant_id: item.variant_id,
          quantity: item.quantity,
          retail_price: item.retail_price,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Printful] Shipping rates error:", data);
      return { success: false, error: data.error || "Printful rejected request" };
    }

    return { success: true, rates: data.result };
  } catch (error: any) {
    console.error("[Printful] Shipping rates exception:", error);
    return { success: false, error: error.message || "Failed to fetch shipping rates" };
  }
}

// ============================================
// CREATE PRINTFUL ORDER (called after PayPal)
// ============================================
export async function createPrintfulOrderAction(payload: {
  cart: any[];
  recipient: any;
}) {
  console.log("=== SERVER ACTION DEBUG ===");
  console.log("Cart items received:", payload?.cart);
  console.log("Recipient:", payload?.recipient);
  console.log("===========================");

  if (!payload?.cart || payload.cart.length === 0) {
    return { success: false, error: "Cart is empty" };
  }

  // Build payload using LONG variant IDs (printfulVariants)
  const printfulPayload = buildPrintfulOrderPayload(payload.cart, payload.recipient);

  console.log("=== FINAL PRINTFUL PAYLOAD ===");
  console.log(JSON.stringify(printfulPayload, null, 2));
  console.log("==============================");

  if (printfulPayload.items.length === 0) {
    console.error("🚨 No valid items after filtering!");
    return { success: false, error: "No valid Printful items could be created" };
  }

  // This will respect ENABLE_REAL_ORDERS = false for now
  const result = await createPrintfulOrder(printfulPayload);

  return result;
}