

import React from 'react';
import { CalendarDaysIcon, GlobeAltIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid';

const historyEvents = [
  { 
    year: "2018", 
    icon: CalendarDaysIcon, 
    title: "Основание Компании", 
    description: "Muslim_kg начинает свою работу как небольшой локальный магазин в Бишкеке, сосредоточенный на определенных нишевых товарах." 
  },
  { 
    year: "2020", 
    icon: GlobeAltIcon,
    title: "Выход в Онлайн", 
    description: "Запуск первой версии нашего интернет-магазина. Это открыло нам двери к обслуживанию клиентов по всему Кыргызстану." 
  },
  { 
    year: "2023", 
    icon: ShoppingBagIcon, 
    title: "Расширение Ассортимента", 
    description: "Произошло масштабное расширение каталога. Мы стали продавать всякие товары, от электроники до домашнего декора." 
  },
  { 
    year: "Сегодня", 
    icon: StarIcon, 
    title: "Вектор Будущего", 
    description : "Мы продолжаем расти, фокусируясь на улучшении логистики и персонализации предложений для каждого покупателя."
  },
];

const CompanyHistory = () => {
  return (
    <section className="pt-12 text-black">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
        Наша История в Датах
      </h2>
      
      <div className="relative border-l-4 border-blue-400 ml-4 md:ml-12 lg:ml-20">
        {historyEvents.map((event, index) => (
          <div key={index} className="mb-8 pl-8 relative">
            
            {/* Круглый Маркер */}
            <div className="absolute w-8 h-8 -left-4 top-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transform translate-x-[-50%] border-4 border-white/20">
              <event.icon className="w-4 h-4 text-black" />
            </div>
            
            {/* Содержание */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl transition duration-300 hover:bg-white/20">
              <span className="text-sm font-semibold text-blue-300 uppercase block mb-1">{event.year}</span>
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-black/80">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyHistory;