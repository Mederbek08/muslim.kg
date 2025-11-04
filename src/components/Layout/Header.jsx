import React, { useState, useEffect } from "react";
import { RiMenu5Fill, RiCloseLine } from "react-icons/ri";
import { BsBarChartLine } from "react-icons/bs";
import { User, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../CartContext";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = ({ onSearch, onCategorySelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { toggleCart, getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  // AOS инициализация
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      mirror: true,
      easing: "ease-in-out",
      offset: 50,
    });
  }, []);

  // Скролл фон өзгөртүү
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Мобилдик меню ачылганда body scroll токтотуу
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleSearchSubmit = (text) => {
    const trimmed = text.trim();
    if (onSearch) onSearch(trimmed);
    setSearchText("");
    setSearchOpen(false);
  };

  const handleKeyDown = (e) =>
    e.key === "Enter" && handleSearchSubmit(searchText);

  return (
    <>
      {/* === HEADER === */}
      <header
  className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 backdrop-blur-md shadow-md ${
    scrolled ? "bg-white/90" : "bg-white"
  }`}
  data-aos="fade-down"
>

        <div
          className="max-w-[1800px] mx-auto flex justify-between items-center px-4 sm:px-6 py-3 md:py-4"
          data-aos="fade-down"
          data-aos-delay="150"
        >
          {/* === ЛОГО + БУРГЕР === */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="md:hidden text-gray-800 hover:text-green-600 active:scale-95 transition-all"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSearchOpen(false);
              }}
            >
              {menuOpen ? (
                <RiCloseLine className="w-6 h-6" />
              ) : (
                <RiMenu5Fill className="w-6 h-6" />
              )}
            </button>

            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-600 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-base sm:text-lg font-bold">
                  M
                </span>
              </div>
              <NavLink
                to="/"
                onClick={() => onCategorySelect("")}
                className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent tracking-wide"
              >
                Muslim_kg
              </NavLink>
            </div>
          </div>

          {/* === НАВИГАЦИЯ (ПК) === */}
          <nav className="hidden md:flex gap-5 lg:gap-8 font-semibold text-gray-700 text-sm sm:text-base lg:text-lg">
            {["Все", "Одежда", "Техника", "Спорт", "Аксессуары", "Обувь"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => onCategorySelect(item === "Все" ? "" : item)}
                  className="hover:text-green-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-green-600 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item}
                </button>
              )
            )}
          </nav>

          {/* === ИКОНКАЛАР === */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* ПК издөө */}
            <div className="hidden lg:flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 focus-within:ring-2 ring-green-400">
              <Search
                className="text-gray-500 w-4 h-4 cursor-pointer hover:text-green-600"
                onClick={() => handleSearchSubmit(searchText)}
              />
              <input
                type="text"
                placeholder="Поиск..."
                className="outline-none px-2 text-sm bg-transparent w-36"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Мобилдик издөө */}
            <button
              className="lg:hidden text-gray-700 hover:text-green-600 transition"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <NavLink
              to="/login"
              className="text-gray-800 hover:text-green-600 hover:scale-110 transition-transform"
            >
              <BsBarChartLine className="w-5 h-5" />
            </NavLink>

            <button
              onClick={toggleCart}
              className="text-gray-800 hover:text-green-600 relative hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* === Мобилдик издөө === */}
        {searchOpen && (
          <div className="lg:hidden bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 ring-green-400">
              <Search
                className="text-gray-500 w-5 h-5 cursor-pointer hover:text-green-600"
                onClick={() => handleSearchSubmit(searchText)}
              />
              <input
                type="text"
                placeholder="Поиск..."
                className="outline-none px-2 text-sm bg-transparent w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* === Мобилдик меню === */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden fixed inset-0 w-full h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl overflow-y-auto z-[201]">
            <div className="bg-gradient-to-br from-green-600 to-blue-500 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-green-600 text-lg font-bold">M</span>
                  </div>
                  <span className="text-xl font-bold text-white tracking-wide">
                    Muslim_kg
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2"
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/90 text-sm font-medium">
                Добро пожаловать в наш магазин!
              </p>
            </div>

            <nav className="flex flex-col px-4 gap-1 mt-4">
              {[
                "Все товары",
                "Одежда",
                "Техника",
                "Спорт",
                "Аксессуары",
                "Обувь",
              ].map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    onCategorySelect(item === "Все товары" ? "" : item);
                    setMenuOpen(false);
                  }}
                  className="group flex items-center gap-3 py-3.5 px-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all border border-transparent hover:border-green-200 hover:shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-base font-semibold text-gray-800 group-hover:text-green-600">
                    {item}
                  </span>
                </button>
              ))}
            </nav>

            <div className="p-4 bg-gradient-to-t from-gray-100 to-transparent mt-4">
              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-600 shadow-md text-center"
                >
                  Управление
                </NavLink>
                <button
                  onClick={() => {
                    toggleCart();
                    setMenuOpen(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-600 shadow-md text-center"
                >
                  Корзина
                  {cartItemsCount > 0 && (
                    <span className="ml-1 bg-black-600 text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
