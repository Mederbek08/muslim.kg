import React from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, EyeIcon } from '@heroicons/react/24/solid';

const MissionVision = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* 🌌 Фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-blue-800 to-black opacity-95"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent"
        >
          Наша Миссия и Видение
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20 hover:border-green-400 transition duration-300"
          >
            <div className="flex items-center mb-4">
              <LightBulbIcon className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-2xl font-bold">Наша Миссия</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Доставлять качественные товары из Китая в каждый уголок Кыргызстана, обеспечивая честные цены, быструю доставку и полное доверие клиентов.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20 hover:border-blue-400 transition duration-300"
          >
            <div className="flex items-center mb-4">
              <EyeIcon className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">Наше Видение</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Стать ведущей онлайн-платформой Кыргызстана — символом надежности, сервиса и уважения к каждому клиенту.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
