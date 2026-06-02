"use server";

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

export async function getShippingRates(recipient: Recipient, items: Item[], storeId: number = 18250831) {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    console.error("[Printful] No API key configured");
    return { success: false, error: "API key missing" };
  }

  try {
    const response = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store_id: storeId,           // ← This fixes the error
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
export async function createPrintfulOrderAction(payload: any) {
  "use server";

  console.log("=== SERVER ACTION DEBUG ===");
  console.log("Cart items received:", payload);
  console.log("===========================");

  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    return { success: false, error: "PRINTFUL_API_KEY not configured" };
  }

  try {
    const response = await fetch("https://api.printful.com/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-PF-Store-Id": "18250831",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Printful] Order creation error:", data);
      return { success: false, error: data.error || "Printful rejected order" };
    }

    return { success: true, result: data.result };
  } catch (error: any) {
    console.error("[Printful] Order creation exception:", error);
    return { success: false, error: error.message || "Failed to create order" };
  }
}
