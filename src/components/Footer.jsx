import React from 'react';
import { Instagram, Send, Youtube, Mail, Phone, MapPin, Facebook, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Muslim_kg
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Качественные товары для вашего комфорта и стиля. Доставка по всему Кыргызстану.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Бишкек, Кыргызстан</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-white">Разработчики</h3>
            <ul className="space-y-2">
              {[ 'Mederbek08',].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm inline-block hover:translate-x-1 transform"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-white">Информация</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm inline-block hover:translate-x-1 transform">
                  О нас
                </NavLink>
              </li>
              <li>
                <NavLink to="/policy" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm inline-block hover:translate-x-1 transform">
                  Политика конфиденциальности
                </NavLink>
              </li>
              <li>
                <a href="#contacts" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm inline-block hover:translate-x-1 transform">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-white">Связаться с нами</h3>
            <div className="space-y-3 mb-6">
              <a href="tel:+996050207" className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+996 999 050 207</span>
              </a>
              <a href="mailto:info@muslim.kg" className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>info@muslim.kg</span>
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Карта */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4">Наше местоположение</h4>
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.2159989707107!2d74.60598931549396!3d42.87462900915447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dc91b4e6c7%3A0x2f4a6f5c5f3c1c3a!2sBishkek%2C%20Kyrgyzstan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта местоположения магазина"
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © 2025 Muslim_kg. Все права защищены.
          </p>
   
        </div>
      </div>
    </footer>
  );
}

export default Footer;