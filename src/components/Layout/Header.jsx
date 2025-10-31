import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingCart, Search } from "lucide-react";
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

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [menuOpen]);

  const handleSearchSubmit = (text) => {
    const trimmedText = text.trim();
    if (onSearch) onSearch(trimmedText);
    setSearchText("");
    if (searchOpen) setSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit(searchText);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full transition-all duration-300 backdrop-blur-md shadow-lg`}
        style={{ zIndex: 100 }}
      >
        <div
          className="max-w-[1800px] mx-auto flex justify-between items-center px-4 sm:px-6 py-3 md:py-4"
          data-aos="fade-down"
        >
          {/* Сол жак логотип */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-aos="fade-right"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-base sm:text-lg font-bold">M</span>
            </div>
            <NavLink
              to="/"
              onClick={() => onCategorySelect("")}
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent tracking-wide"
            >
              Muslim_kg
            </NavLink>
          </div>

          {/* Меню */}
          <nav
            className="hidden md:flex gap-6 lg:gap-10 font-semibold text-gray-700 text-base lg:text-lg"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {["Все", "Одежда", "Техника", "Спорт", "Аксессуары", "Обувь"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => onCategorySelect(item === "Все" ? "" : item)}
                  className="hover:text-blue-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item}
                </button>
              )
            )}
          </nav>

          {/* Иконкалар */}
          <div
            className="flex items-center gap-3 sm:gap-4"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div className="hidden lg:flex items-center bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 transition focus-within:ring-2 ring-blue-400 focus-within:bg-white/90">
              <Search
                className="text-gray-500 w-4 h-4 cursor-pointer hover:text-blue-600 transition"
                onClick={() => handleSearchSubmit(searchText)}
              />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="outline-none px-2 text-sm bg-transparent w-36 text-gray-700 placeholder:text-gray-400"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <button
              className="lg:hidden text-gray-700 hover:text-blue-600 bg-transparent backdrop-blur-md transition-transform duration-200 active:scale-95"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <NavLink
              to="/login"
              className="text-gray-800 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
            </NavLink>

            <button
              onClick={toggleCart}
              className="text-gray-800 hover:text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95 relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold px-1 animate-bounce">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Мобайл издөө */}
        {searchOpen && (
          <div
            className="lg:hidden bg-transparent backdrop-blur-md  px-4 py-3 shadow-md"
            data-aos="fade-down"
          >
            <div className="flex items-center bg-transparent backdrop-blur-md rounded-full px-4 py-2.5 focus-within:ring-2 ring-blue-400 focus-within:bg-transparent transition-all">
              <Search
                className="text-gray-500 w-5 h-5 flex-shrink-0 cursor-pointer hover:text-blue-600 transition"
                onClick={() => handleSearchSubmit(searchText)}
              />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="outline-none px-3 text-base bg-transparent w-full text-gray-700  backdrop-blur-md placeholder:text-gray-400"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Мобайл меню */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            style={{ zIndex: 200 }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="md:hidden fixed top-0 left-0 w-[280px] sm:w-[320px] h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl overflow-y-auto"
            style={{ zIndex: 201 }}
            data-aos="fade-right"
          >
            <div className="bg-gradient-to-br from-blue-600 to-green-500 p-6 mb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-blue-600 text-xl font-bold">M</span>
                  </div>
                  <span className="text-2xl font-bold text-white tracking-wide">
                    Muslim_kg
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-white/95 text-sm font-medium">
                Добро пожаловать в наш магазин!
              </p>
            </div>

            <nav className="flex flex-col px-4 gap-1 mt-4">
              {["Все товары", "Одежда", "Техника", "Спорт", "Аксессуары", "Обувь"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => {
                      onCategorySelect(item === "Все товары" ? "" : item);
                      setMenuOpen(false);
                    }}
                    className="group flex items-center gap-3 py-3.5 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-purple-200 hover:shadow-sm animate-slideDown focus:outline-none text-left"
                    style={{ animationDelay: `${index * 50}ms` }}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <span className="text-blue-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item}
                    </span>
                  </button>
                )
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
