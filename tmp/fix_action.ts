export async function createPrintfulOrderAction(payload: any) {
  "use server";

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
