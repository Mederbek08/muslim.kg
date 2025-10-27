// src/components/AboutUsHero.jsx

import React from 'react';

const AboutUsHero = () => {
  return (
    <section className="text-white">
      <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl border border-white/20">
        
        {/* Блок Логотипа и Названия */}
        <div className="text-center md:text-left mb-6">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            
            {/* Логотип 'M' */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-extrabold">M</span>
            </div>
            
            {/* Название Компании */}
            <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-wider">
                Muslim_kg
            </span>
          </div>
        </div>
        
        {/* Основной Контент */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center md:text-left">
          О нас
        </h1>
        
        <p className="text-lg sm:text-xl max-w-4xl text-white/90 leading-relaxed text-center md:text-left">
          **Muslim\_kg** — это ваш надежный партнер в Кыргызстане, предлагающий широкий ассортимент высококачественных товаров. Мы стремимся предоставлять нашим клиентам только лучшие продукты, сочетая традиции и современные стандарты качества.
        </p>

        <p className="mt-4 text-lg sm:text-xl max-w-4xl text-white/90 leading-relaxed font-semibold text-center md:text-left">
          Да, **мы продаем всякие товары**, но делаем это с особым вниманием к деталям и потребностям нашей аудитории. Наша цель — стать вашим первым выбором!
        </p>
      </div>
    </section>
  );
};

export default AboutUsHero;