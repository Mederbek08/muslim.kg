import React, { useEffect } from "react";
import Router from "./router";
import CartModal from "./components/CartModal";
import { CartProvider } from "./components/CartContext";
import CustomCursor from "./components/CustomCursor";
import { fetchData } from './api';

const App = () => {
  useEffect(() => {
    fetchData().then(data => console.log(data));
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
