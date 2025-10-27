// src/components/OurValues.jsx

import React from 'react';
import { ShieldCheckIcon, HandRaisedIcon, StarIcon, TruckIcon } from '@heroicons/react/24/solid';

const values = [
  { 
    icon: ShieldCheckIcon, 
    title: "Честность и Прозрачность", 
    description: "Мы ведем бизнес с абсолютной честностью. Все цены, характеристики и условия сделок открыты и понятны." 
  },
  { 
    icon: StarIcon, 
    title: "Качество Продукции", 
    description: "Мы тщательно отбираем поставщиков и товары, чтобы гарантировать высочайшее качество каждого продукта в нашем ассортименте." 
  },
  { 
    icon: HandRaisedIcon, 
    title: "Уважение к Клиенту", 
    description: "Каждый клиент для нас важен. Мы стремимся к идеальному обслуживанию и готовы помочь в любой ситуации." 
  },
  { 
    icon: TruckIcon, 
    title: "Надежность Доставки", 
    description: "Мы понимаем важность своевременности. Ваша посылка будет доставлена быстро и в целости." 
  },
];

const OurValues = () => {
  return (
    <section className="pt-12 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
        Наши Ключевые Ценности
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl border-t-4 border-purple-500 hover:border-blue-400 transition duration-300 transform hover:scale-[1.02]"
          >
            <value.icon className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
            <p className="text-white/80">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;