import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box>
        <Image src={product.image} h="150px" />
        <Heading size="md">{product.title}</Heading>
      </Box>
      <Text>{product.price}</Text>
      <Text>{product.description}</Text>
      <Button onClick={() => navigate("/")}>Back to Product List</Button>
    </>
  );
};

export default Products;
