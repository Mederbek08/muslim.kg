import React, { useState, useEffect } from "react";
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  // scrollY state is not used in rendering, keeping it for original useEffect logic
  const [scrollY, setScrollY] = useState(0); 

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Какие данные мы собираем",
      content: "Мы собираем информацию, которую вы предоставляете при регистрации: имя, адрес электронной почты, номер телефона. Автоматически собираемые данные включают IP-адрес, тип браузера, операционную систему, данные о взаимодействии с сайтом и cookies. Мы также можем собирать геолокационные данные с вашего согласия для улучшения предоставляемых услуг."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Как мы используем ваши данные",
      content: "Ваши данные используются для предоставления и улучшения наших услуг, персонализации вашего опыта, обработки транзакций и отправки важных уведомлений. Мы анализируем данные для улучшения функциональности платформы, предотвращения мошенничества и обеспечения безопасности. Маркетинговые коммуникации отправляются только с вашего явного согласия."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Защита ваших данных",
      content: "Мы применяем современные технологии шифрования для защиты ваших данных при передаче и хранении. Используются SSL/TLS протоколы, многофакторная аутентификация, регулярные аудиты безопасности и резервное копирование данных. Доступ к персональным данным имеют только авторизованные сотрудники, прошедшие обучение по защите информации. Мы соблюдаем международные стандарты безопасности данных."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Ваши права",
      content: "Вы имеете право на доступ к своим персональным данным, их исправление или удаление. Вы можете запросить копию всех данных, которые мы храним о вас, ограничить обработку или возразить против определенных видов обработки. Вы имеете право на портативность данных и право отозвать согласие в любое время. Для реализации этих прав свяжитесь с нами по указанным контактам."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Cookies и отслеживание",
      content: "Мы используем cookies для улучшения вашего опыта, анализа трафика и персонализации контента. Обязательные cookies необходимы для работы сайта, аналитические помогают понять, как вы используете наш сервис, а маркетинговые используются для показа релевантной рекламы. Вы можете управлять настройками cookies в своем браузере, однако отключение некоторых cookies может повлиять на функциональность сайта."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Передача данных третьим лицам",
      content: "Мы не продаем ваши персональные данные третьим лицам. Данные могут передаваться только нашим доверенным партнерам, которые помогают нам предоставлять услуги: платежные системы, службы доставки, аналитические сервисы. Все партнеры обязаны соблюдать конфиденциальность и использовать данные только для оговоренных целей. При передаче данных за пределы вашей страны мы обеспечиваем соответствующий уровень защиты."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-4 md:p-8 relative overflow-hidden">
      
      {/* Анимированный фоновый паттерн - Уменьшены размеры для лучшей адаптивности на мобильных */}
      <div className="absolute inset-0 opacity-10">
        {/* Уменьшил w-72/h-72 до w-40/h-40 на sm, оставил w-72/h-72 на md */}
        <div className="absolute top-10 left-5 w-40 h-40 md:w-72 md:h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        {/* Уменьшил w-96/h-96 до w-64/h-64 на sm, оставил w-96/h-96 на md */}
        <div className="absolute bottom-10 right-5 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Заголовок с анимацией появления - Адаптация шрифта */}
        <div className={`text-center mb-8 md:mb-12 pt-4 md:pt-8 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full mb-4 md:mb-6 backdrop-blur-sm animate-bounce">
            <Shield className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 md:mb-4 animate-fadeIn">
            Политика Конфиденциальности
          </h1>
          <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto animate-fadeIn delay-200 px-2">
            Мы ценим ваше доверие и серьезно относимся к защите ваших персональных данных
          </p>
          <div className="mt-4 md:mt-6 text-white/80 text-xs md:text-sm animate-fadeIn delay-300">
            Последнее обновление: 21 октября 2024 года
          </div>
        </div>

        {/* Основной контент */}
        <div className={`bg-white rounded-xl md:rounded-3xl shadow-2xl overflow-hidden mb-8 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '400ms' }}>
          
          {/* Введение - Адаптация padding и шрифта */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 md:w-40 md:h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 relative z-10">Введение</h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed relative z-10">
              Настоящая Политика конфиденциальности описывает, как Muslim_Kg собирает, использует, 
              хранит и защищает вашу персональную информацию. Используя наши услуги, вы соглашаетесь 
              с условиями данной политики. Мы обязуемся обеспечивать прозрачность всех процессов 
              обработки данных и предоставлять вам полный контроль над вашей информацией.
            </p>
          </div>

          {/* Аккордеон секций - Адаптация padding и отступов */}
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="transition-all duration-300"
                style={{ 
                  animationDelay: `${600 + index * 100}ms`,
                  animation: isVisible ? 'slideInRight 0.6s ease-out forwards' : 'none'
                }}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg flex-shrink-0">
                      {section.icon}
                    </div>
                    <h3 className="text-base md:text-xl font-bold text-gray-800 text-left group-hover:text-purple-600 transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-purple-600 transform transition-transform duration-300 group-hover:scale-125 flex-shrink-0 ml-2">
                    {expandedSection === index ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                </button>
                
                {expandedSection === index && (
                  <div className="px-4 pb-4 md:px-6 md:pb-6 animate-slideDown">
                    {/* Адаптивный отступ и padding для контента аккордеона */}
                    <div className="ml-0 md:ml-16 p-4 md:p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg md:rounded-xl transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01] md:hover:scale-[1.02]">
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Дополнительная информация - Адаптация padding и шрифта */}
          <div className="p-6 md:p-8 bg-gray-50">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Дополнительная информация</h3>
            <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
              <p className="leading-relaxed">
                <span className="font-semibold text-purple-600">Срок хранения данных:</span> Мы храним ваши персональные данные 
                только в течение необходимого периода для выполнения целей, указанных в данной политике, 
                или в соответствии с требованиями законодательства.
              </p>
              <p className="leading-relaxed">
                <span className="font-semibold text-blue-600">Дети:</span> Наши услуги не предназначены для лиц младше 18 лет. 
                Мы сознательно не собираем персональную информацию от детей. Если вы узнали, что ребенок 
                предоставил нам персональные данные, пожалуйста, свяжитесь с нами.
              </p>
              <p className="leading-relaxed">
                <span className="font-semibold text-purple-600">Изменения в политике:</span> Мы можем обновлять данную политику 
                конфиденциальности время от времени. Существенные изменения будут доведены до вашего сведения 
                через уведомления на сайте или по электронной почте.
              </p>
            </div>
          </div>
        </div>

        {/* Контактная информация - Адаптация padding и шрифта */}
        <div className={`bg-white rounded-xl md:rounded-3xl shadow-2xl p-6 md:p-8 mb-8 transition-all duration-1000 transform hover:scale-[1.02] hover:shadow-purple-500/50 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center text-white flex-shrink-0 animate-pulse">
              <FileText className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Свяжитесь с нами</h3>
              <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
                Если у вас есть вопросы о данной Политике конфиденциальности или о том, как мы обрабатываем 
                ваши персональные данные, пожалуйста, свяжитесь с нами:
              </p>
              <div className="space-y-2 text-gray-700 text-sm md:text-base">
                <p className="hover:text-purple-600 transition-colors duration-300"><span className="font-semibold">Email:</span> privacy@muslim-kg.com</p>
                <p className="hover:text-purple-600 transition-colors duration-300"><span className="font-semibold">Телефон:</span> +996 XXX XXX XXX</p>
                <p className="hover:text-purple-600 transition-colors duration-300"><span className="font-semibold">Адрес:</span> Кыргызская Республика, г. Бишкек</p>
              </div>
            </div>
          </div>
        </div>

        {/* Согласие - Адаптация padding и шрифта */}
        <div className={`bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center transform transition-all duration-1000 hover:bg-white/30 hover:scale-[1.02] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1400ms' }}>
          <p className="text-white text-xs md:text-sm">
            Используя наш сервис, вы подтверждаете, что прочитали и поняли настоящую Политику конфиденциальности 
            и соглашаетесь на обработку ваших персональных данных в соответствии с ней.
          </p>
          <p className="text-white/80 text-xs mt-3">
            &copy; 2024 Muslim_Kg. Все права защищены.
          </p>
        </div>

      </div>

      <style jsx>{`
        /* Анимации оставлены без изменений, так как они декларативны */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            /* Установлено разумное максимальное значение для плавного раскрытия */
            max-height: 500px; 
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        /* Задержки анимации также оставлены без изменений */
        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;