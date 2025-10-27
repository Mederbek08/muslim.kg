import React from "react";
import Router from "./router";
import CartModal from "./components/CartModal";
import { CartProvider } from "./components/CartContext";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  return (
    <>
      <CartProvider>
        <Router /> <CartModal /> <CustomCursor />
      </CartProvider>
    </>
  );
};

export default App;
