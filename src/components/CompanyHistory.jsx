import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, GlobeAltIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid';

const historyEvents = [
  { 
    year: "2018", 
    icon: CalendarDaysIcon, 
    title: "Начало Пути", 
    description: "Muslim_kg начал как небольшой магазин в Бишкеке, доставляя товары из Китая по честным ценам и с искренним сервисом." 
  },
  { 
    year: "2020", 
    icon: GlobeAltIcon,
    title: "Выход в Онлайн", 
    description: "Мы запустили наш интернет-магазин и стали доступны для клиентов по всему Кыргызстану. Надежность — наш приоритет." 
  },
  { 
    year: "2023", 
    icon: ShoppingBagIcon, 
    title: "Расширение Ассортимента", 
    description: "Каталог вырос в десятки раз — теперь у нас есть всё: от аксессуаров и техники до товаров для дома и стиля." 
  },
  { 
    year: "Сегодня", 
    icon: StarIcon, 
    title: "Движение Вперёд", 
    description : "Мы продолжаем расти, улучшая сервис, логистику и подход к каждому клиенту. Ваше доверие — наша главная награда." 
  },
];

const CompanyHistory = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-blue-800 to-black opacity-95"></div>
      <div className="absolute -top-20 left-0 w-96 h-96 bg-green-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent"
        >
          Наша История
        </motion.h2>
        
        <div className="relative border-l-4 border-blue-400 ml-6 md:ml-12">
          {historyEvents.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-10 pl-10 relative"
            >
              <div className="absolute w-8 h-8 -left-4 top-1 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                <event.icon className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:bg-white/20 transition duration-300">
                <span className="text-sm font-semibold text-green-300 uppercase block mb-2">{event.year}</span>
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-200">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
