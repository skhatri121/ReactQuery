// AddProduct.tsx
import { Heading } from "@chakra-ui/react";
import Form from "./Form";
import { useMutation, useQueryClient } from "react-query";

interface AddProductProps {
  onProductAdded: (data: any) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
  const queryClient = useQueryClient();

  const addProductDetails = async (newProduct: any) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        // Log the response status and text
        console.error("Response error:", response.status, response.statusText);
        throw new Error("Failed to add new product");
      }

      const data = await response.json();
      console.log(data);

      // Retrieve existing products from local storage
      const storedProducts =
        JSON.parse(localStorage.getItem("addedProducts")) || [];

      // Update local storage with the newly added product
      localStorage.setItem(
        "addedProducts",
        JSON.stringify([...storedProducts, data])
      );

      // Invalidate and refetch the product list query after successful addition
      queryClient.invalidateQueries("products");

      // Pass the added product data to the parent component
      onProductAdded(data);

      return data; // Return the newly created product data
    } catch (error) {
      console.error("Error adding new product:", error);

      // Log the error message if available
      if (error.message) {
        console.error("Error message:", error.message);
      }

      throw new Error("Failed to add new product");
    }
  };

  const createProductMutation = useMutation(addProductDetails, {
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleAddProduct = async (product: any) => {
    try {
      const result = await createProductMutation.mutateAsync(product);
      console.log("Product added successfully:", result);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Heading>Add New Product</Heading>
      <Form onSubmit={handleAddProduct} initialValue={{}} />
    </>
  );
};

export default AddProduct;
