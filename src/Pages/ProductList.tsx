import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../Components/AddProduct";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const handleAddProduct = (addedProduct: any) => {
    // Update the product list state with the added product
    setProductList((prevList) => [...prevList, addedProduct]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Filter out the deleted product from the product list
        const updatedProductList = productList.filter(
          (product) => product.id !== productId
        );
        setProductList(updatedProductList);
      } else {
        console.error(
          "Failed to delete product:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <AddProduct onProductAdded={handleAddProduct} />
      <SimpleGrid columns={[2, null, 3]}>
        {productList.map((product, index) => (
          <Box key={index} maxW="200px">
            <Box
              cursor="pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <Image src={product.image} h="150px" />
              <Heading noOfLines={3} size="md">
                {product.title}
              </Heading>
            </Box>
            <Text>{product.price}</Text>
            <Text noOfLines={2}>{product.description}</Text>
            <Button onClick={() => navigate(`/products/${product.id}/edit`)}>
              Edit
            </Button>
            <Button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProductList;
