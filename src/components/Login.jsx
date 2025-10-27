// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Lock, User, Key, AlertTriangle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Оставляем для потенциальных будущих сообщений
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!email || !password) {
      setError("❌ Пожалуйста, введите Email и Пароль.");
      return;
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      // Улучшенная обработка ошибок Firebase
      if (err.code === "auth/invalid-email" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("❌ Неверный Email или Пароль.");
      } else if (err.code === "auth/network-request-failed") {
        setError("❌ Ошибка сети. Проверьте подключение к Интернету.");
      } else {
        setError("❌ Произошла ошибка. Повторите попытку.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-purple-500/50">
        
        {/* Шапка/Предупреждение */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 flex flex-col items-center">
          <Lock className="w-10 h-10 text-white mb-2" />
          <h2 className="text-3xl font-extrabold text-white">Вход для Администратора</h2>
          <p className="text-white/80 text-sm mt-1">Доступ разрешен только персоналу.</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-8 flex flex-col gap-5"
        >
          
          {/* Предупреждение о доступе */}
          <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="ml-3 text-sm font-medium">
              Внимание! Это служебная страница. Используйте учетные данные администратора.
            </p>
          </div>
          
          {/* Email Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Администратора"
              className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Пароль"
              className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Сообщения */}
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center font-medium">{success}</p>}
          
          {/* Кнопка входа */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                       text-white py-3 rounded-xl font-bold text-lg 
                       shadow-md shadow-purple-500/50 transition duration-300 
                       transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 ring-purple-300"
          >
            Войти в Панель
          </button>
          
          {/* Кнопка сброса пароля полностью удалена */}

        </form>
        
        <div className="p-4 bg-gray-50 border-t text-center text-xs text-gray-500">
          <p>&copy; 2024 Muslim_Kg. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;