import React from "react";
import { Phone, Mail, MapPin, Instagram, Send, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 to-blue-100">

      {/* Header */}
      <header className="py-6 bg-green-700 text-white shadow-lg flex items-center justify-center relative">
        <Link to="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="cursor-pointer flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-extrabold">M</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent tracking-wider">
              Muslim_kg
            </span>
          </motion.div>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl w-full text-center"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-green-900">Свяжитесь с нами</h1>
          <p className="text-gray-700 text-lg mb-12">
            Есть вопросы по товарам, доставке или оплате? Напишите нам — мы ответим максимально быстро.
          </p>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Phone />, title: "Телефон / WhatsApp", text: "+996 999 050 207", link: "https://wa.me/996999050207", color: "text-green-600" },
              { icon: <Mail />, title: "Email", text: "mederbekrahmatullaev7@gmail.com", link: "mailto:mederbekrahmatullaev7@gmail.com", color: "text-blue-600" },
              { icon: <MapPin />, title: "Адрес", text: "Бишкек, Кыргызстан", link: "https://www.google.com/maps?q=Bishkek", color: "text-green-700" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center block border-t-4 border-green-400 hover:border-blue-500 transform hover:-translate-y-1"
              >
                <div className={`mx-auto mb-4 ${item.color}`}>{item.icon}</div>
                <p className="font-semibold mb-1">{item.title}</p>
                <p className="text-gray-600">{item.text}</p>
              </a>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-400 hover:border-blue-500 transition"
            >
              <h2 className="text-3xl font-semibold mb-6 text-green-800">Напишите нам</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none transition"/>
                <input type="email" placeholder="Email или телефон" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"/>
                <textarea placeholder="Ваше сообщение" rows="4" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none transition"/>
                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg hover:from-blue-500 hover:to-green-500 transition text-lg font-semibold">
                  Отправить сообщение
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-lg border-t-4 border-green-400 hover:border-blue-500 transition"
            >
              <iframe title="map" src="https://www.google.com/maps?q=Bishkek&output=embed" className="w-full h-full border-0" loading="lazy"></iframe>
            </motion.div>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-6 mb-10">
            <a href="https://www.instagram.com/muslim.kgz_?igsh=ZHV1Y2tmdDU1Nzd1&utm_source=qr" target="_blank" className="p-5 bg-white rounded-full shadow-lg hover:text-pink-600 hover:scale-125 transition border-2 border-green-400 hover:border-blue-500"><Instagram className="w-6 h-6"/></a>
            <a href="https://t.me/mederbek_7" target="_blank" className="p-5 bg-white rounded-full shadow-lg hover:text-blue-500 hover:scale-125 transition border-2 border-green-400 hover:border-blue-500"><Send className="w-6 h-6"/></a>
            <a href="https://youtube.com/@Muslim7kg" target="_blank" className="p-5 bg-white rounded-full shadow-lg hover:text-red-600 hover:scale-125 transition border-2 border-green-400 hover:border-blue-500"><Youtube className="w-6 h-6"/></a>
          </div>
        </motion.div>
      </main>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/996999050207" target="_blank" className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-2xl flex items-center justify-center transition animate-bounce">
        <Phone className="w-6 h-6"/>
      </a>

      {/* Footer */}
      <footer className="py-8 bg-green-700 text-white text-center mt-auto shadow-inner">
        &copy; {new Date().getFullYear()} Muslim_kg. Все права защищены.
      </footer>
    </div>
  );
};

export default Contact;
