import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
const Form = ({ onSubmit, initialValue }) => {
  const [product, setProduct] = useState({
    title: initialValue?.title || " ",
    description: initialValue?.description || " ",
    price: initialValue?.price || " ",
  });

  const handleChangeInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const renderField = (label: String) => (
    <Box>
      <Text>{label}</Text>
      <Input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={product[label.toLowerCase()]}
      />
    </Box>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({
      title: "",
      description: "",
      price: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {renderField("Title")}
        {renderField("Description")}
        {renderField("Price")}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default Form;
