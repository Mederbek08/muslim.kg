import React, { useState, useEffect } from "react";
import {
  Package,
  Loader2,
  AlertTriangle,
  ShoppingCart,
  CheckCircle,
  Box,
  Image,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "./CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================
// --- Alert Component ---
const Alert = ({ message, type, onClose }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-500" : "bg-blue-500";
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-3 rounded-lg text-white font-medium flex items-center shadow-xl ${bgColor} max-w-[90vw]`}
    >
      <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
      <span className="text-sm md:text-base">{message}</span>
    </motion.div>
  );
};

// =============================================================
// --- Format Price ---
const formatSom = (amount) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KGS",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("KGS", "Сом");
};

// =============================================================
// --- Product Modal (адаптив) ---
const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(null);
  const { addToCart, toggleCart } = useCart();
  const { title, price, stock, category, imageUrl, description } = product;

  const handleAddToCart = () => {
    if (stock > 0) {
      for (let i = 0; i < quantity; i++) addToCart(product);
      setAlert({
        message: `${title} (${quantity} шт.) добавлен!`,
        type: "success",
      });
      setTimeout(() => {
        toggleCart();
        onClose();
      }, 800);
    }
  };

  const incrementQuantity = () => quantity < stock && setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
              {alert && (
                <Alert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(null)}
                />
              )}

              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="p-4 space-y-4">
                {/* Сүрөт бөлүгү */}
                <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                {/* Маалымат бөлүгү */}
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 text-sm">
                  {description || "Описание недоступно"}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    {formatSom(price)}
                  </span>
                  <span
                    className={`font-semibold ${
                      stock > 0 ? "text-green-600" : "text-blue-500"
                    }`}
                  >
                    {stock} шт
                  </span>
                </div>

                {/* Количество жана кнопка */}
                {stock > 0 && (
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-2">
                      <button
                        onClick={decrementQuantity}
                        className="bg-white rounded-full p-1 shadow-md"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="text-lg font-bold">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= stock}
                        className="bg-white rounded-full p-1 shadow-md disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={stock === 0}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:shadow-xl transition"
                    >
                      В корзину
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// =============================================================
// --- ProductCard ---
const ProductCard = ({ product, index }) => {
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, toggleCart } = useCart();
  const { title, price, stock, category, imageUrl } = product;
  const formattedPrice = formatSom(parseFloat(price || 0));
  const inStock = stock > 0;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!inStock) return;
    addToCart(product);
    setAlert({ message: `${title} добавлен!`, type: "success" });
    setTimeout(toggleCart, 500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className="relative w-full rounded-2xl shadow-xl bg-gradient-to-br from-green-500 to-blue-500 p-0.5 cursor-pointer overflow-hidden"
      >
        <AnimatePresence>
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}
        </AnimatePresence>

        <div className="p-3 md:p-5 rounded-2xl bg-white flex flex-col space-y-3 h-full">
          <div className="absolute top-4 right-4 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg z-10">
            <span className="text-xs font-bold text-white">{category}</span>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-2 relative shadow-md flex items-center justify-center"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <Image className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
            )}
          </motion.div>

          <div className="flex items-start space-x-2">
            <Package className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <h2 className="text-base md:text-lg font-bold text-gray-800 line-clamp-2 flex-grow">
              {title}
            </h2>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Цена:</span>
              <p className="text-lg md:text-xl font-bold text-green-600">
                {formattedPrice}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">Наличие:</span>
              <p
                className={`text-sm md:text-base font-bold ${
                  inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {stock} шт
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 md:py-3 mt-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-sm md:text-base rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleQuickAdd}
            disabled={!inStock}
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            <span>{inStock ? "В корзину" : "Нет в наличии"}</span>
          </motion.button>
        </div>
      </motion.div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// =============================================================
// --- Cards Component ---
const Cards = ({ searchTerm, categoryFilter, onCategorySelect }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
        setError(err.message || "Не удалось загрузить товары");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredByCategory =
    categoryFilter === "" || categoryFilter === "Все товары"
      ? products
      : products.filter((p) => p.category === categoryFilter);
  const finalFilteredProducts = filteredByCategory.filter((p) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (p.title && p.title.toLowerCase().includes(searchLower)) ||
      (p.category && p.category.toLowerCase().includes(searchLower))
    );
  });
  const categories = [
    "Все товары",
    ...new Set(products.map((p) => p.category)),
  ];

  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen p-4"
      >
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="ml-3 text-gray-700 font-semibold">Загрузка...</p>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen p-4"
      >
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <p className="ml-3 text-red-700 font-bold text-sm md:text-base">
          Ошибка: {error}
        </p>
      </motion.div>
    );

  if (products.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-4"
      >
        <Box className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-lg md:text-xl text-gray-600 font-semibold text-center">
          Отсутствует подключение к интернету
        </p>
        <p className="text-sm text-gray-500 mt-2">КОД ОШИБКИ: 404</p>
      </motion.div>
    );

  return (
    <div className="min-h-screen p-3 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 text-center"
      >
        {searchTerm || categoryFilter ? "Результаты поиска" : "Наши Товары"}
      </motion.h1>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8 px-2"
      >
        {categories.map((cat, index) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategorySelect(cat === "Все товары" ? "" : cat)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm transition-all duration-200 shadow-md ${
              categoryFilter === cat ||
              (categoryFilter === "" && cat === "Все товары")
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat} (
            {cat === "Все товары"
              ? products.length
              : products.filter((p) => p.category === cat).length}
            )
          </motion.button>
        ))}
      </motion.div>

      {/* Products Grid */}
      {finalFilteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 px-2">
          {finalFilteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 px-4"
        >
          <p className="text-base md:text-xl text-gray-600">
            Ничего не найдено по запросу
            <span className="font-bold text-green-600 ml-1 block md:inline mt-1 md:mt-0">
              "{searchTerm || categoryFilter || "Все товары"}"
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Cards;
