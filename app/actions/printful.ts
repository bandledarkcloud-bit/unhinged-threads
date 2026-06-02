"use server";

import { buildPrintfulOrderPayload, createPrintfulOrder } from "@/lib/printful";

export async function createPrintfulOrderAction(payload: any) {
  console.log("=== SERVER ACTION DEBUG ===");
  console.log("Cart items received:", payload?.cart);
  console.log("Recipient:", payload?.recipient);
  console.log("===========================");

  if (!payload?.cart || payload.cart.length === 0) {
    return { success: false, error: "Cart is empty" };
  }

  // Build the payload using LONG variant IDs
  const printfulPayload = buildPrintfulOrderPayload(payload.cart, payload.recipient);

  console.log("=== FINAL PRINTFUL PAYLOAD ===");
  console.log(JSON.stringify(printfulPayload, null, 2));
  console.log("==============================");

  if (printfulPayload.items.length === 0) {
    console.error("🚨 No valid items after filtering. Order will fail.");
    return { success: false, error: "No valid Printful items could be created" };
  }

  // Actually create the order (respects ENABLE_REAL_ORDERS safety flag)
  const result = await createPrintfulOrder(printfulPayload);

  return result;
}