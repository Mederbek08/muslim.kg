// src/components/CartModal.jsx
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Package } from 'lucide-react';
import { useCart } from './CartContext';

const YOUR_WHATSAPP_NUMBER = '996999050207';

const CartModal = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalPrice
  } = useCart();

  if (!isCartOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'KGS', 
      minimumFractionDigits: 0 
    }).format(amount).replace('KGS', 'сом');
  };

  // WhatsAppка жөнөтүүчү функция
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const itemsList = cartItems.map((item, index) => {
      const title = item.title;
      const category = item.category || 'Без категории';
      const quantity = item.quantity;
      const priceTotal = formatPrice(item.price * item.quantity);

      return `🛒 ${index + 1}. ${title} | 📦 ${category} | 🔢 ${quantity} шт | 💰 ${priceTotal}`;
    }).join('%0A');

    const fullMessage = `📝 Новый заказ с сайта:%0A${itemsList}%0A%0A💳 Итого к оплате: ${formatPrice(getTotalPrice())}%0A✅ Прошу подтвердить наличие и детали заказа.`;

    const whatsappLink = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${fullMessage}`;
    window.open(whatsappLink, '_blank');
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[301] animate-slideInRight flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-500 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Корзина</h2>
              <p className="text-white/90 text-sm">
                {cartItems.length} {cartItems.length === 1 ? 'товар' : 'товаров'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Package className="w-20 h-20 mb-4" />
              <p className="text-xl font-semibold">Корзина пуста</p>
              <p className="text-sm mt-2">Добавьте товары для покупки</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center hover:shadow-md transition-shadow relative"
              >
                {/* Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col ">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{item.category || 'Без категории'}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-0.5">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold text-sm min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors sm:static sm:p-2 sm:rounded-lg sm:self-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
            <button
              onClick={clearCart}
              className="w-full text-red-600 hover:bg-red-50 py-2 rounded-lg font-semibold transition-colors border border-pink-500 hover:border-red-600 hover:text-red-600"
            >
              Очистить корзину
            </button>

            <div className="flex justify-between items-center py-3 border-t border-gray-300">
              <span className="text-lg font-semibold text-gray-700">Итого:</span>
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(getTotalPrice())}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
            >
              Оформить заказ (в WhatsApp)
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </>
  );
};

export default CartModal;
