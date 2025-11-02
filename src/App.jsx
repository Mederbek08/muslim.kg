import React, { useEffect, useState } from "react";
import Router from "./router";
import CartModal from "./components/CartModal";
import { CartProvider } from "./components/CartContext";
import CustomCursor from "./components/CustomCursor";
import { fetchData } from './api';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData().then(data => setProducts(data));
  }, []);

  return (
    <CartProvider>
      <Router />
      <CartModal />
      <CustomCursor />
    </CartProvider>
  );
};

export default App;
