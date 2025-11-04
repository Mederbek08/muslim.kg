// src/components/Slider.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "react-tsparticles";
import { motion, AnimatePresence } from "framer-motion";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [parallax, setParallax] = useState({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 1,
      title: "Новая коллекция 2025",
      subtitle: "Эксклюзивные товары для вас",
      description: "Откройте для себя уникальный стиль",
      icon: ShoppingBag,
      image:
        "https://www.cheggindia.com/wp-content/uploads/2025/07/gk-226301-importance-of-sports-v1.png",
      badge: "Новинка",
    },
    {
      id: 2,
      title: "Премиум качество",
      subtitle: "Только лучшие бренды",
      description: "Гарантия качества на все товары",
      icon: Star,
      image:
        "https://i.pinimg.com/474x/d7/7d/6b/d77d6b0f946a376ff3c5f6d13aabbccf.jpg",
      badge: "Хит продаж",
    },
    {
      id: 3,
      title: "Специальные предложения",
      subtitle: "Скидки до 50%",
      description: "Не упустите выгодные цены",
      icon: TrendingUp,
      image:
        "https://i.pinimg.com/736x/18/b2/5f/18b25f0915c946ca9cb7a8e65439410f.jpg",
      badge: "Акция",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1200, once: false, mirror: true });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => handleNext(), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) * 0.02;
      const y = (e.clientY - centerY) * 0.02;
      const rotateX = -(e.clientY - centerY) * 0.01;
      const rotateY = (e.clientX - centerX) * 0.01;
      setParallax({ x, y, rotateX, rotateY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) handleNext();
    if (touchStartX.current - touchEndX.current < -50) handlePrev();
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div
      className="relative w-full h-screen min-h-[600px] overflow-hidden mt-0 bg-gradient-to-br from-blue-600 via-green-500 to-green-400"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Particles */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false } },
          },
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.2 },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.5, outModes: "out" },
          },
          detectRetina: true,
        }}
      />

      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Text */}
                <div className="text-white space-y-5 sm:space-y-6 z-10 text-center lg:text-left px-2">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <slide.icon className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                    <span className="text-sm sm:text-base font-semibold">
                      {slide.badge}
                    </span>
                  </motion.div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    {slide.title.split(" ").join(" ")}
                  </h1>

                  <motion.p
                    className="text-xl sm:text-2xl md:text-3xl font-light text-white/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.p
                    className="text-base sm:text-lg lg:text-xl text-white/80 max-w-md mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    {slide.description}
                  </motion.p>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 pt-3 sm:pt-5 justify-center lg:justify-start items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 sm:px-10 sm:py-5 bg-white text-blue-600 rounded-full font-bold text-lg sm:text-xl shadow-2xl"
                    >
                      Купить сейчас
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink
                        to="/about"
                        className="px-8 py-4 sm:px-10 sm:py-5 bg-white/20 backdrop-blur-md text-white rounded-full font-bold text-lg sm:text-xl border-2 border-white/50"
                      >
                        Узнать больше
                      </NavLink>
                    </motion.div>
                  </div>
                </div>

                {/* Image + Floating icons */}
                <motion.div
                  className="relative w-full lg:w-auto"
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      transform: `translate(${parallax.x}px, ${parallax.y}px) rotateX(${parallax.rotateX}deg) rotateY(${parallax.rotateY}deg)`,
                    }}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover relative z-10"
                    />
                    <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none"></div>

                    {/* Floating icons */}
                    <motion.div
                      className="absolute top-5 left-5"
                      animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <ShoppingBag className="w-6 h-6 text-white/80 drop-shadow-lg" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-5 right-5"
                      animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 drop-shadow-xl" />
                    </motion.div>
                    <motion.div
                      className="absolute top-10 right-20"
                      animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    >
                      <TrendingUp className="w-6 h-6 text-green-400 drop-shadow-lg" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 border border-white/30 z-20"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 border border-white/30 z-20"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "w-10 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
          ></button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;
