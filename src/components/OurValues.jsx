import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, HandRaisedIcon, StarIcon, TruckIcon } from '@heroicons/react/24/solid';

const values = [
  { 
    icon: ShieldCheckIcon, 
    title: "Честность и Прозрачность", 
    description: "Мы открыты и честны во всем — цены, условия и качество. Доверие клиентов для нас дороже всего." 
  },
  { 
    icon: StarIcon, 
    title: "Качество Продукции", 
    description: "Каждый товар проходит проверку, чтобы вы получали только лучшее. Мы выбираем то, что выбрали бы сами." 
  },
  { 
    icon: HandRaisedIcon, 
    title: "Уважение к Клиенту", 
    description: "Мы всегда рядом, чтобы помочь и подсказать. Ваш комфорт и доверие — наш приоритет." 
  },
  { 
    icon: TruckIcon, 
    title: "Надежность Доставки", 
    description: "Быстрая и аккуратная доставка по всему Кыргызстану. Мы выполняем обещания — без задержек." 
  },
];

const OurValues = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* 🌌 Фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-blue-800 to-black opacity-95"></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent"
        >
          Наши Ценности
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:border-green-400 transform hover:scale-[1.03] transition duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-200 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
