export async function getProducts() {
  const response = await fetch(
    "https://dummyjson.com/products?skip=0&limit=100"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const products = await response.json();
  return products;
}
