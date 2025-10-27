import React, { useState, useEffect } from 'react';
import { Package, Loader2, AlertTriangle, ShoppingCart, CheckCircle, Box, Image, X, Plus, Minus } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from './CartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================================
// --- Вспомогательные Компоненты / Функции ---
// =============================================================

const Alert = ({ message, type, onClose }) => {
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
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
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-3 rounded-lg text-white font-medium flex items-center shadow-xl ${bgColor}`}
        >
            <Icon className="w-5 h-5 mr-2" />
            <span>{message}</span>
        </motion.div>
    );
};

const formatSom = (amount) => {
    return new Intl.NumberFormat('ru-RU', { 
        style: 'currency', 
        currency: 'KGS', 
        minimumFractionDigits: 0 
    }).format(amount).replace('KGS', 'Сом');
};

// =============================================================
// --- Модальное окно для детального просмотра товара ---
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
                type: 'success'
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
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                            {alert && (
                                <Alert 
                                    message={alert.message} 
                                    type={alert.type} 
                                    onClose={() => setAlert(null)} 
                                />
                            )}

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>

                            <div className="grid md:grid-cols-2 gap-8 p-8">
                                {/* Image Section */}
                                <motion.div 
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-bold z-10">
                                        {category}
                                    </div>
                                    <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden">
                                        {imageUrl ? (
                                            <img 
                                                src={imageUrl} 
                                                alt={title} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Image className="w-24 h-24 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Info Section */}
                                <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col justify-between"
                                >
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
                                        
                                        <div className="mb-6">
                                            <p className="text-gray-600 text-sm mb-2">Описание:</p>
                                            <p className="text-gray-700 leading-relaxed">
                                                {description || 'Качественный товар по отличной цене. Успейте заказать!'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-purple-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-600 mb-1">Цена</p>
                                                <p className="text-2xl font-bold text-purple-600">
                                                    {formatSom(parseFloat(price || 0))}
                                                </p>
                                            </div>
                                            <div className="bg-green-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-600 mb-1">В наличии</p>
                                                <p className={`text-2xl font-bold ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {stock} шт
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity Selector */}
                                        {stock > 0 && (
                                            <div className="mb-6">
                                                <p className="text-sm text-gray-600 mb-2">Количество:</p>
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={decrementQuantity}
                                                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition"
                                                    >
                                                        <Minus className="w-5 h-5 text-gray-700" />
                                                    </button>
                                                    <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={incrementQuantity}
                                                        disabled={quantity >= stock}
                                                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Plus className="w-5 h-5 text-gray-700" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Total Price */}
                                        {stock > 0 && (
                                            <div className="bg-blue-50 rounded-xl p-4 mb-6">
                                                <p className="text-sm text-gray-600 mb-1">Итого:</p>
                                                <p className="text-3xl font-bold text-blue-600">
                                                    {formatSom(parseFloat(price || 0) * quantity)}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={stock === 0}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                    >
                                        <ShoppingCart className="w-6 h-6" />
                                        <span>{stock > 0 ? 'Добавить в корзину' : 'Нет в наличии'}</span>
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
// --- 1. ProductCard (Дочерний компонент: Рендерит одну карточку) ---
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
                message: `${title} добавлен в корзину!`,
                type: 'success'
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                }}
                whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="relative w-full rounded-2xl shadow-xl bg-gradient-to-r from-purple-600 to-blue-500 p-0.5 cursor-pointer"
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

                <div className="p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg flex flex-col space-y-4 h-full text-white">
                    
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="absolute top-8 right-8 backdrop-blur-sm px-3 py-1 rounded-full bg-white bg-opacity-20"
                    >
                        <span className="text-xs font-bold text-white">{category}</span>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-full h-40 md:h-48 bg-gray-200 rounded-lg overflow-hidden mb-2 relative"
                    >
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={title} 
                                className="w-full h-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <Image className="w-12 h-12"/>
                            </div>
                        )}
                    </motion.div>

                    <div className="flex items-start space-x-3">
                        <Package className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                        <h2 className="text-xl font-bold text-blue-500 flex-grow">
                            {title}
                        </h2>
                    </div>

                    <div className="flex items-end justify-between border-t border-white border-opacity-30 pt-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 opacity-70">Цена:</span>
                            <p className="text-2xl sm:text-3xl font-bold text-yellow-300">
                                {formattedPrice}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm text-gray-500 opacity-70">В наличии:</span>
                            <p className={`text-lg font-bold ${inStock ? 'text-green-300' : 'text-red-300'}`}>
                                {stock} шт
                            </p>
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 mt-4 bg-white text-purple-600 font-bold text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleQuickAdd}
                        disabled={!inStock}
                    >
                        <ShoppingCart className="w-5 h-5"/>
                        <span>{inStock ? 'Быстрая покупка' : 'Нет в наличии'}</span>
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
// --- 2. Cards (Родительский компонент: Загрузка и Фильтрация) ---
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
                
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setProducts(productsData);
            } catch (err) {
                console.error('Ошибка загрузки товаров:', err);
                setError(err.message || 'Не удалось загрузить товары');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    
    // --- ЛОГИКА ФИЛЬТРАЦИИ И ПОИСКА ---
    
    // 1. Фильтрация по категории
    const filteredByCategory = categoryFilter === '' || categoryFilter === 'Все товары'
        ? products 
        : products.filter(p => p.category === categoryFilter);

    // 2. Фильтрация по поисковому запросу
    const finalFilteredProducts = filteredByCategory.filter(p => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        
        const titleMatch = p.title && String(p.title).toLowerCase().includes(searchLower);
        const categoryMatch = p.category && String(p.category).toLowerCase().includes(searchLower);
        
        return titleMatch || categoryMatch;
    });

    // Получаем уникальные категории для кнопок
    const categories = ['Все товары', ...new Set(products.map(p => p.category))];
    
    // --- Отображение состояний (Loader, Error) ---

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
                <p className="ml-3 text-red-700 font-bold">Ошибка: {error}</p>
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
                <p className="text-xl text-gray-600 font-semibold">Отсутствует подключение к интернету</p>
                <p className="text-sm text-gray-500 mt-2">КОД ОШИБКИ: 404</p>
            </motion.div>
        );
    }
    
    // --- Основной Рендер ---
    return (
        <div className="min-h-screen p-4 sm:p-8 bg-gray-100">
            <motion.h1 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center"
            >
                {searchTerm || categoryFilter ? "Результаты поиска и фильтрации" : "Наши Товары"}
            </motion.h1>
            
            {/* Фильтр по категориям */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
            >
                {categories.map((cat, index) => (
                    <motion.button
                        key={cat}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCategorySelect(cat === 'Все товары' ? '' : cat)}
                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            (categoryFilter === cat || (categoryFilter === '' && cat === 'Все товары'))
                                ? 'bg-purple-600 text-white shadow-lg' 
                                : 'bg-white text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {cat} ({cat === 'Все товары' ? products.length : products.filter(p => p.category === cat).length})
                    </motion.button>
                ))}
            </motion.div>

            {/* Статистика */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-4 text-center"
                >
                    <p className="text-gray-600 text-sm mb-1">Найдено товаров</p>
                    <p className="text-2xl font-bold text-purple-600">{finalFilteredProducts.length}</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-4 text-center"
                >
                    <p className="text-gray-600 text-sm mb-1">В наличии</p>
                    <p className="text-2xl font-bold text-green-600">
                        {finalFilteredProducts.filter(p => p.stock > 0).length}
                    </p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-4 text-center"
                >
                    <p className="text-gray-600 text-sm mb-1">Средняя цена</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {finalFilteredProducts.length > 0 
                            ? formatSom(finalFilteredProducts.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0) / finalFilteredProducts.length)
                            : '0 ₽'
                        }
                    </p>
                </motion.div>
            </motion.div>
            
            {/* Сетка товаров */}
            {finalFilteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {finalFilteredProducts.map((product, index) => (
                        <ProductCard 
                            key={product.id} 
                            product={product}
                            index={index}
                        />
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-xl text-gray-600">
                        Ничего не найдено по запросу 
                        <span className="font-bold text-purple-600 ml-1">
                            "{searchTerm || categoryFilter || 'Все товары'}"
                        </span>
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Cards;