import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  

  const slides = [
    {
      id: 1,
      title: "Новая коллекция 2025",
      subtitle: "Эксклюзивные товары для вас",
      description: "Откройте для себя уникальный стиль",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      badge: "Новинка"
    },
    {
      id: 2,
      title: "Премиум качество",
      subtitle: "Только лучшие бренды",
      description: "Гарантия качества на все товары",
      icon: Star,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      badge: "Хит продаж"
    },
    {
      id: 3,
      title: "Специальные предложения",
      subtitle: "Скидки до 50%",
      description: "Не упустите выгодные цены",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      badge: "Акция"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 mt-0 ">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Slides Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center transition-all duration-500 ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-12 sm:py-16 lg:py-20">
              {/* Text Content */}
              <div className="text-white space-y-4 sm:space-y-6 z-10 text-center lg:text-left px-2">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <slide.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-semibold">{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  {slide.title.split(' ').map((word, i) => (
                    <span
                      key={i}
                      className="inline-block animate-fadeInUp"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90">
                  {slide.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-lg mx-auto lg:mx-0">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                  <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-purple-600 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    Купить сейчас
                  </button>
                  <NavLink to='/about' className="px-6 py-3 sm:px-8 sm:py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border-2 border-white/50">
                    Узнать больше
                  </NavLink>
                </div>
              </div>

              {/* Image Content - Visible on all devices */}
              <div className="relative w-full lg:w-auto">
                <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Mobile overlay content */}
                  <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                    <div className="flex items-center gap-2 text-white">
                      <slide.icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">{slide.badge}</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements - Hidden on mobile */}
                <div className="hidden sm:flex absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30 animate-bounce">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-300 fill-yellow-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30 group z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30 group z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-16 sm:bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 sm:w-10 md:w-12 h-2 sm:h-2.5 md:h-3 bg-white'
                : 'w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);a

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Slider;