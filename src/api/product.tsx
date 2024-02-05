export async function updatedProduct(updatedProduct: { id: any }) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${updatedProduct.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    }
  );
  return response.json();
}
