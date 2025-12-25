
import React from 'react';
import { motion } from 'framer-motion';

const AboutUsHero = () => {
  return (
    <section className="relative py-16 overflow-hidden">


      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-blue-800 to-black opacity-95"></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-white"
      >
        <div className="text-center md:text-left mb-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-extrabold">M</span>
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent tracking-wider">
              Muslim_kg
            </span>
          </motion.div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 text-center md:text-left"
        >
          О нас
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl max-w-4xl text-gray-200 leading-relaxed text-center md:text-left"
        >
          <strong>Muslim_kg</strong> — это команда, которая ежедневно работает над тем, чтобы лучшие товары из Китая были доступны каждому в Кыргызстане. 
          Мы тщательно выбираем продукцию, проверяем качество и доставляем быстро и безопасно.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-lg sm:text-xl max-w-4xl text-gray-200 leading-relaxed font-semibold text-center md:text-left"
        >
          Да, мы продаем самые разные товары — от бытовых мелочей до современных гаджетов. 
          Но главное — <strong>наше отношение к делу</strong>. Каждый заказ мы воспринимаем как доверие, и оправдываем его на 100%.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 text-lg sm:text-xl max-w-4xl text-gray-200 leading-relaxed font-semibold text-center md:text-left"
        >
          Мы работаем напрямую с проверенными поставщиками из Китая, поэтому вы получаете <strong>качественные товары по лучшим ценам</strong>. 
          Без переплат, без сомнений — только честность и надежность.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-6 text-xl sm:text-2xl text-center md:text-left font-extrabold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent"
        >
          Заказывайте с уверенностью — с нами всегда надёжно 💪
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutUsHero;
