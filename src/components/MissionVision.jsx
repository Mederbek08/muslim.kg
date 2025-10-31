


import React from 'react';
import { LightBulbIcon, EyeIcon } from '@heroicons/react/24/solid'; 
// Предполагается, что у вас установлены heroicons

const MissionVision = () => {
  return (
    <section className="grid md:grid-cols-2 gap-8 text-black">
      
      {/* Карточка Миссии */}
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20 hover:border-green-300 transition duration-300">
        <div className="flex items-center mb-4">
          <LightBulbIcon className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-2xl font-bold">Наша Миссия</h3>
        </div>
        <p className="text-black/80 leading-relaxed">
          Предоставлять клиентам в Кыргызстане доступ к разнообразным, качественным и полезным товарам, облегчая повседневную жизнь и способствуя развитию честной торговли. Мы заботимся о каждой покупке.
        </p>
      </div>
      
      {/* Карточка Видения */}
      <div className="bg-black/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20 hover:border-blue-300 transition duration-300">
        <div className="flex items-center mb-4">
          <EyeIcon className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-2xl font-bold">Наше Видение</h3>
        </div>
        <p className="text-black/80 leading-relaxed">
          Стать ведущей онлайн-платформой в регионе, известной своим безупречным сервисом, широким ассортиментом и приверженностью высоким этическим стандартам в бизнесе.
        </p>
      </div>

    </section>
  );
};

export default MissionVision;