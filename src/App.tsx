import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import ProductList from "./Pages/ProductList";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
