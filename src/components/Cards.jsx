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
// --- Вспомогательные Компоненты ---
// =============================================================

const Alert = ({ message, type, onClose }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-500" : "bg-red-500";
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
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
// --- Модальное окно - МОБИЛГЕ ОПТИМАЛДАШТЫРЫЛГАН ---
// =============================================================

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(null);
  const { addToCart, toggleCart } = useCart();
  const { title, price, stock, category, imageUrl, description } = product;

  const handleAddToCart = () => {
    if (stock > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAlert({
        message: `${title} (${quantity} шт.) добавлен в корзину!`,
        type: "success",
      });

      setTimeout(() => {
        toggleCart();
        onClose();
      }, 800);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

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
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          >
            <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto relative">
              {alert && (
                <Alert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(null)}
                />
              )}

              <button
                onClick={onClose}
                className="sticky top-2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition float-right m-2"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8 pt-12 md:pt-8">
                {/* Сүрөт бөлүмү */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full font-bold text-sm z-10 shadow-lg">
                    {category}
                  </div>
                  <div className="w-full h-64 md:h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden shadow-lg">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-16 md:w-24 h-16 md:h-24 text-gray-400" />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Маалымат бөлүмү */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                      {title}
                    </h2>

                    <div className="mb-4 md:mb-6">
                      <p className="text-gray-600 text-xs md:text-sm mb-2">
                        Описание:
                      </p>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {description ||
                          "Качественный товар по отличной цене. Успейте заказать!"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 md:p-4 shadow-md">
                        <p className="text-xs md:text-sm text-gray-600 mb-1">
                          Цена
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-purple-600">
                          {formatSom(parseFloat(price || 0))}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 md:p-4 shadow-md">
                        <p className="text-xs md:text-sm text-gray-600 mb-1">
                          В наличии
                        </p>
                        <p
                          className={`text-xl md:text-2xl font-bold ${
                            stock > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stock} шт
                        </p>
                      </div>
                    </div>

                    {stock > 0 && (
                      <div className="mb-4 md:mb-6">
                        <p className="text-xs md:text-sm text-gray-600 mb-2">
                          Количество:
                        </p>
                        <div className="flex items-center justify-center space-x-4 bg-gray-100 rounded-xl p-3">
                          <button
                            onClick={decrementQuantity}
                            className="bg-white hover:bg-gray-200 rounded-full p-2 md:p-3 transition shadow-md active:scale-95"
                          >
                            <Minus className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                          </button>
                          <span className="text-2xl md:text-3xl font-bold text-gray-800 min-w-[3rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={incrementQuantity}
                            disabled={quantity >= stock}
                            className="bg-white hover:bg-gray-200 rounded-full p-2 md:p-3 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                          >
                            <Plus className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    )}

                    {stock > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 mb-4 md:mb-6 shadow-md">
                        <p className="text-xs md:text-sm text-gray-600 mb-1">
                          Итого:
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-blue-600">
                          {formatSom(parseFloat(price || 0) * quantity)}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                    <span>
                      {stock > 0 ? "Добавить в корзину" : "Нет в наличии"}
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// =============================================================
// --- ProductCard - ТЕЛЕФОНГО ОПТИМАЛДАШТЫРЫЛГАН ---
// =============================================================

const ProductCard = ({ product, index }) => {
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, toggleCart } = useCart();
  const { id, title, price, stock, category, imageUrl } = product;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (stock > 0) {
      addToCart(product);
      setAlert({
        message: `${title} добавлен!`,
        type: "success",
      });

      setTimeout(() => {
        toggleCart();
      }, 500);
    }
  };

  const formattedPrice = formatSom(parseFloat(price || 0));
  const inStock = stock > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.05,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
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
          {/* Категория */}
          <div className="absolute top-4 right-4 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg z-10">
            <span className="text-xs font-bold text-white">{category}</span>
          </div>

          {/* Сүрөт */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="w-full h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-2 relative shadow-md"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Image className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            )}
          </motion.div>

          {/* Аталышы */}
          <div className="flex items-start space-x-2">
            <Package className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <h2 className="text-base md:text-lg font-bold text-gray-800 line-clamp-2 flex-grow">
              {title}
            </h2>
          </div>

          {/* Баасы жана саны */}
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

          {/* Кошуу баскычы */}
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
// --- Cards (Негизги компонент) ---
// =============================================================

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
    const titleMatch =
      p.title && String(p.title).toLowerCase().includes(searchLower);
    const categoryMatch =
      p.category && String(p.category).toLowerCase().includes(searchLower);
    return titleMatch || categoryMatch;
  });

  const categories = [
    "Все товары",
    ...new Set(products.map((p) => p.category)),
  ];

  if (isLoading) {
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
  }

  if (error) {
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
  }

  if (products.length === 0) {
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
  }

  return (
    <div className="min-h-screen p-3 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 text-center"
      >
        {searchTerm || categoryFilter ? "Результаты поиска" : "🛍️ Наши Товары"}
      </motion.h1>

      {/* Категориялар */}
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

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto mb-6 md:mb-8 grid grid-cols-3 gap-2 md:gap-4 px-2"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-lg md:rounded-xl shadow-md p-2 md:p-4 text-center"
        >
          <p className="text-gray-600 text-xs md:text-sm mb-1">Найдено</p>
          <p className="text-lg md:text-2xl font-bold text-green-600">
            {finalFilteredProducts.length}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-lg md:rounded-xl shadow-md p-2 md:p-4 text-center"
        >
          <p className="text-gray-600 text-xs md:text-sm mb-1">В наличии</p>
          <p className="text-lg md:text-2xl font-bold text-green-600">
            {finalFilteredProducts.filter((p) => p.stock > 0).length}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-lg md:rounded-xl shadow-md p-2 md:p-4 text-center"
        >
          <p className="text-gray-600 text-xs md:text-sm mb-1">Средняя</p>
          <p className="text-sm md:text-xl font-bold text-blue-600">
            {finalFilteredProducts.length > 0
              ? formatSom(
                  finalFilteredProducts.reduce(
                    (sum, p) => sum + (parseFloat(p.price) || 0),
                    0
                  ) / finalFilteredProducts.length
                ).replace(" Сом", "")
              : "0"}
          </p>
        </motion.div>
      </motion.div>

      {/* ТОВАРЛАР - ТЕЛЕФОНДО 2 КОЛОНКА */}
      {finalFilteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 px-2">
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
