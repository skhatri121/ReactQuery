import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";

// interface Product {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
//   description: string;
// }

const ProductList = () => {
  const [productList, setProductList] = useState([]);

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

  return (
    <>
      <Navbar />
      <SimpleGrid columns={[2, null, 3]}>
        {productList.map((product, index) => (
          <Box maxW="1300px" m="0 auto">
            <Box key={index} maxW="200px">
              <Image src={product.image} h="150px" />
              <Heading noOfLines={3} size="md">
                {product.title}
              </Heading>
              <Text>{product.price}</Text>
              <Text noOfLines={2}>{product.description}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProductList;
