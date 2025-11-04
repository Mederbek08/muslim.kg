import React, { useEffect, useState } from "react";
import Router from "./router";
import CartModal from "./components/CartModal";
import { CartProvider } from "./components/CartContext";
import CustomCursor from "./components/CustomCursor";
import { fetchData } from "./api";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchData().then((data) => setProducts(data));
  }, []);

  return (
    <CartProvider>
      <Router />
      <CartModal />
      {!isMobile && <CustomCursor />}
    </CartProvider>
  );
};

export default App;
