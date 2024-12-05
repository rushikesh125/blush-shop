export const productsURL = "https://fakestoreapi.com/products";
export const productURL = `https://fakestoreapi.com/products/`;
export async function fetchProductInfo(id) {
  try {
    const response = await fetch(productURL + id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productInfo = await response.json();
    return { success: true, data: productInfo };
  } catch (error) {
    console.error("Error fetching product info:", error);
    return { success: false, error: error.message };
  }
}
