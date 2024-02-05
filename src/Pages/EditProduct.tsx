import { Box } from "@chakra-ui/react";
import Form from "../Components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useMutation, useQueryClient } from "react-query";
import { updatedProduct } from "../api/product";
const EditProduct = () => {
  const queryClient = useQueryClient(); // Initialize useQueryClient

  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        // console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const updateProductMutation = useMutation({
    mutationFn: updatedProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      navigate("/");
    },
  });

  if (!product) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  const handleSubmit = (updatedProduct) => {
    updateProductMutation.mutate({ id, ...updatedProduct });
    console.log(updatedProduct);
  };

  return (
    <>
      <Box>
        <Form onSubmit={handleSubmit} initialValue={product} />
      </Box>
    </>
  );
};

export default EditProduct;
