import { Route, Routes, BrowserRouter } from "react-router-dom";
import Products from "./Pages/Products";
import ProductList from "./Pages/ProductList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
