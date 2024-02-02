import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        gap="15px"
        fontSize="24px"
        fontWeight="bold"
      >
        <Link to="/products">Products</Link>
        <Link to="/">Product List</Link>
      </Box>
    </>
  );
};

export default Navbar;
