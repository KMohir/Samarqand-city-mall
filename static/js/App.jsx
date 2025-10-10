import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'; // Added missing import
import { Search, MapPin, Clock, Instagram, Send, Home, Coffee, Smile, Grid, Briefcase, ShoppingBag, Utensils, Film, Hand, TrendingUp } from 'lucide-react';

// Имитация данных для компонентов
const NAV_ITEMS = [
  { name: 'Магазины', icon: Home },
  { name: 'Кафе и Рестораны', icon: Coffee },
  { name: 'Развлечения', icon: Smile },
  { name: 'Услуги', icon: Hand }, // Используем Hand для Услуг
  { name: 'Новости', icon: Briefcase },
  { name: 'Бренды', icon: Grid },
];

const BRANDS = [
  { name: 'ZARA', color: 'bg-white', logo: 'ZARA' },
  { name: 'LACOSTE', color: 'bg-white', logo: 
    <svg width="24" height="24" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M37 0C16.561 0 0 16.561 0 37C0 57.439 16.561 74 37 74C57.439 74 74 57.439 74 37C74 16.561 57.439 0 37 0ZM45.895 24.364C45.399 23.372 44.407 22.38 42.924 21.884L37.712 20.399L35.728 21.391C35.232 21.884 34.24 22.876 33.744 23.868L31.76 25.852L32.256 26.348C33.248 26.844 34.731 27.836 35.723 28.828L37.707 30.311L39.19 30.807C39.686 31.303 40.678 31.799 42.161 32.295L44.145 33.778L45.895 34.77C46.887 35.266 47.879 36.258 48.375 37.741L49.367 40.221L50.85 43.195L51.346 45.179C51.842 46.171 52.834 47.654 53.33 49.638L53.826 51.622L54.322 53.606C54.818 55.089 55.314 56.081 55.81 57.564L56.794 60.538L57.29 62.522C57.786 64.005 58.778 64.997 60.261 66.48L61.744 68.96C62.24 70.443 62.736 71.926 63.232 73.409L64.224 76.881C64.72 78.364 64.72 79.847 64.224 81.33L63.232 83.314C62.736 84.797 61.744 85.789 60.261 87.272L58.778 89.256C58.282 90.739 57.786 91.731 57.29 93.214L56.306 95.198C55.81 96.681 55.314 98.164 54.818 99.647L54.322 101.631C53.826 103.114 52.834 104.597 51.346 106.08L49.362 107.563C47.879 108.555 46.396 109.051 44.412 109.051L41.932 108.555C40.449 108.059 39.457 107.067 38.465 106.075L36.481 104.592L34.998 103.6C34.502 103.104 33.51 102.112 32.027 101.12L30.043 99.637C29.051 98.645 27.568 97.653 26.576 96.661L25.093 95.178C24.101 94.186 23.109 93.194 22.117 92.202L20.133 90.719C19.141 89.727 18.149 88.735 17.157 87.743L15.674 86.26C14.682 85.268 13.69 84.276 12.7 83.284L11.217 81.791C10.225 80.8 9.233 79.808 8.241 78.816L6.758 77.333C5.766 76.341 4.774 75.349 3.782 74.357L2.299 72.874C1.307 71.882 0.315 70.89 0.315 70.89Z" fill="#000000" transform="scale(0.3)"/>
    </svg>
  },
  { name: 'BOSS', color: 'bg-white', logo: 'BOSS' },
  { name: 'DIESEL', color: 'bg-white', logo: 'DIESEL' },
  { name: 'Massimo Dutti', color: 'bg-white', logo: 'Massimo Dutti' },
  { name: 'Calvin Klein', color: 'bg-white', logo: 'ck' }, 
  // Имитация логотипов SVG (Nike, Adidas)
  { name: 'Nike', color: 'bg-white', logo: <svg viewBox="0 0 100 100" className="w-8 h-8"><path fill="#000" d="M30 65l10-15-20-5c-5-2-10-8-10-15s5-13 15-15l45-10c15-3 25 5 20 20l-10 40c-2 10-10 15-20 15l-40 5c-10 1-20-4-20-15z"/></svg> },
  { name: 'Adidas', color: 'bg-white', logo: <svg viewBox="0 0 24 24" className="w-8 h-8"><path fill="#000" d="M12 2l-7 19h4l1.5-4h7l1.5 4h4zM16 14l-2.5-7-2.5 7h5z"/></svg> },
  { name: 'Starbucks', color: 'bg-white', logo: <svg viewBox="0 0 24 24" className="w-8 h-8"><circle cx="12" cy="12" r="10" fill="rgb(0, 107, 73)"/><path fill="#fff" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg> },
  { name: 'COSTA COFFEE', color: 'bg-white', logo: 'COSTA' },
];

const CATEGORIES = [
    { title: 'Магазины', icon: ShoppingBag },
    { title: 'Кафе и Рестораны', icon: Utensils },
    { title: 'Развлечения', icon: Film },
    { title: 'Услуги', icon: Hand },
];

/**
 * SVG логотип Samarkand City Mall (имитация)
 */
const SamarkandLogoSVG = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg width="25" height="40" viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.967 0.932007C11.967 0.932007 24.225 -0.803993 24.225 15.658C24.225 32.12 11.967 39.049 11.967 39.049C11.967 39.049 -0.291001 36.814 -0.291001 20.352C-0.291001 3.89001 11.967 0.932007 11.967 0.932007ZM11.967 3.32101C11.967 3.32101 22.043 4.31301 22.043 16.591C22.043 28.869 11.967 34.721 11.967 34.721C11.967 34.721 1.89099 31.745 1.89099 19.467C1.89099 7.18901 11.967 3.32101 11.967 3.32101Z" fill={color}/>
  </svg>
);


/**
 * Вспомогательная функция для имитации задержки API
 */
const simulateApiCall = (data) => new Promise(resolve => setTimeout(() => resolve(data), 500));

/**
 * Компонент верхнего навигационного меню и шапки
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Цвет акцента (только для логотипа, часов и контактов)
  const ACCENT_COLOR_HEADER = 'text-amber-600'; 
  const ACCENT_BG = 'bg-amber-600'; 
  const ACCENT_LOGO_TEXT = 'CITY MALL'; 

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Верхняя строка - Инфо и Поиск */}
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock size={16} className={ACCENT_COLOR_HEADER} />
              <span className="text-gray-700">Сегодня до 00:00</span>
            </div>
            <a href="#" className={`flex items-center space-x-1 text-gray-700 hover:${ACCENT_COLOR_HEADER} transition-colors`}>
              <MapPin size={16} className={ACCENT_COLOR_HEADER} />
              <span>Контакт & как добраться</span>
            </a>
          </div>

          {/* Поиск и кнопки меню/языка */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Кнопка RUS для смены языка */}
            <button className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">RUS</button>

            <div className="flex items-center border border-gray-300 rounded-full p-1 w-80 focus-within:border-amber-500 transition-all">
                <input
                type="text"
                placeholder="Поиск" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-transparent outline-none px-3 text-sm"
                />
                <button
                className={`text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors`}
                onClick={() => console.log('Searching for:', searchTerm)}
                aria-label="Искать"
                >
                <Search size={18} />
                </button>
            </div>
            
            <button className="text-white bg-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">Меню</button>
          </div>

           {/* Мобильная кнопка меню */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Заголовок и Основное меню */}
        <div className="flex justify-between items-center">
            {/* SVG Логотип + SAMARKAND CITY MALL */}
            <div className="flex items-center space-x-3">
                <SamarkandLogoSVG className="w-6 h-10" color="#D1B898" /> 
                <h1 className="text-xl font-extrabold tracking-wider text-gray-800">
                    <span className={ACCENT_COLOR_HEADER}>{ACCENT_LOGO_TEXT}</span>
                </h1>
            </div>
            
            <nav className="hidden md:block">
                <ul className="flex space-x-6 lg:space-x-8">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.name}>
                            <a 
                                href="#" 
                                className={`text-gray-700 font-medium hover:${ACCENT_COLOR_HEADER} transition-colors text-sm uppercase tracking-wide`}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
      </div>

      {/* Мобильное меню (Выезжающее) */}
      <nav 
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="bg-gray-50 border-t border-gray-200 p-4">
            {/* Поиск в мобильном меню */}
            <div className="flex items-center border border-gray-300 rounded-full p-1 focus-within:border-amber-500 transition-all mb-4">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-transparent outline-none px-3 text-sm"
                />
                <button
                    className={`${ACCENT_BG} text-white p-2 rounded-full hover:${ACCENT_BG}/90 transition-colors`}
                    onClick={() => console.log('Searching for:', searchTerm)}
                    aria-label="Искать"
                >
                    <Search size={18} />
                </button>
            </div>
            {/* Навигационные элементы в виде плиток */}
            <ul className="grid grid-cols-2 gap-4">
                {NAV_ITEMS.map((item) => (
                    <li key={item.name}>
                        <a 
                            href="#" 
                            className={`flex flex-col items-center p-4 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors text-center`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <item.icon size={24} className="mb-2 text-gray-700" />
                            <span className="text-gray-700 font-medium text-sm">{item.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      </nav>
    </header>
  );
};

/**
 * Компонент Главного баннера (Hero Section) - Оранжевый фон с текстурой
 */
const HeroSection = () => {
    // Используем URL последней загруженной текстуры
    const TEXTURE_URL = "uploaded:images.png-2709e13e-f244-4f05-895c-ec82e0cdf2a0";

    const backgroundStyle = {
        backgroundColor: '#FF6600', 
        // Используем загруженный файл как фон
        backgroundImage: `url(${TEXTURE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Убрали оверлей, чтобы текстура была видна
    };

    return (
        <div 
            className="w-full h-[45vh] md:h-[60vh] flex items-center justify-center p-4 relative overflow-hidden"
            style={backgroundStyle}
        >
            
            <div className="text-center z-10">
                <h2 className="text-6xl sm:text-8xl font-extrabold text-white tracking-widest uppercase"
                    // Добавляем тень к тексту, чтобы он лучше читался на текстурном фоне
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                    CITY MALL
                </h2>
                <p className="text-xl sm:text-3xl font-medium text-white mt-2"
                    style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
                >
                    SAMARKAND
                </p>
            </div>
        </div>
    );
};

/**
 * Компонент сетки категорий (Магазины, Кафе, Развлечения, Услуги)
 */
const CategoryGrid = () => {
    // Бежевый фон и паттерн, как на втором скриншоте
    const BACKGROUND_COLOR = '#D1B898'; 

    const backgroundStyle = {
        backgroundColor: 'white', // На скриншоте фон у плиток белый, а общий фон страницы белый или очень светлый
        // Имитация паттерна SAMARKAND DRY на общем фоне
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H40z' fill-opacity='0.05'/%3E%3Cpath d='M10 10h20v20H10zM50 50h20v20H50z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
    };

    return (
        // Используем чистый белый фон, чтобы плитки выделялись
        <section className="py-12 px-4 sm:px-6 lg:px-8" style={backgroundStyle}>
            <div className="container mx-auto max-w-6xl">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {CATEGORIES.map((category) => (
                        <a 
                            key={category.title}
                            href="#"
                            // Используем бежевый фон из PDF #D1B898 для самой плитки
                            className="p-6 h-40 bg-[#D1B898] rounded-2xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Иконка и текст белого цвета, как на скриншоте */}
                            <div className="p-4 rounded-xl bg-transparent">
                                <category.icon size={40} strokeWidth={1.5} className="text-white mb-3" />
                            </div>
                            <span className="text-white font-medium text-sm sm:text-base">
                                {category.title}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * Компонент новостного блока
 */
const NewsSection = () => {
    // Имитация данных для новостей
    const NEWS_ITEMS = [
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Покупки", alt: "Женщина с покупками" },
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Мода", alt: "Мужчина в деловом стиле" },
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Стиль", alt: "Женщина в юбке" },
    ];
    
    // Бежевый паттерн для фона, как на скриншоте с новостями
    const backgroundStyle = {
        backgroundColor: 'white', 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H40z' fill-opacity='0.05'/%3E%3Cpath d='M10 10h20v20H10zM50 50h20v20H50z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={backgroundStyle}>
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Новости</h2>
            
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {NEWS_ITEMS.map((item, index) => (
                        <div 
                            key={index}
                            className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-white"
                        >
                            <img 
                                src={item.imageUrl} 
                                alt={item.alt}
                                className="w-full h-96 object-cover object-top p-4" 
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


/**
 * Компонент сетки брендов
 */
const BrandGrid = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    // Временно отключим simulateApiCall, чтобы не замедлять отклик
    useState(() => {
        setBrands(BRANDS);
        setIsLoading(false);
    }, []);


    if (isLoading) {
        return (
            <div className="text-center p-12 text-gray-500">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full"></div>
                <p className="mt-2">Загрузка брендов...</p>
            </div>
        );
    }

    const BrandLogo = ({ logo }) => (
        <div className="h-full w-full flex items-center justify-center p-2">
            {typeof logo === 'string' ? (
                <span className="text-xl font-bold text-gray-800">{logo}</span>
            ) : (
                logo
            )}
        </div>
    );

    // Бежевый паттерн для фона, как на скриншоте с брендами
    const backgroundStyle = {
        backgroundColor: 'white', 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H40z' fill-opacity='0.05'/%3E%3Cpath d='M10 10h20v20H10zM50 50h20v20H50z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px',
    };


    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8" style={backgroundStyle}>
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Бренды</h2>
            
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {brands.map((brand) => (
                        <div 
                            key={brand.name} 
                            className={`w-full h-24 sm:h-28 rounded-md flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white p-2`}
                            style={{ 
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        >
                            <BrandLogo logo={brand.logo} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors shadow-lg">
                        Посмотреть все
                    </button>
                </div>
            </div>
        </section>
    );
};

/**
 * Компонент подвала (Футер)
 */
const Footer = () => {
    // Бежевый цвет из PDF: #D1B898
    const FOOTER_BG_COLOR = '#D1B898'; 
    // Цвет текста для лучшей читаемости: #4A4A4A (темно-серый)
    const FOOTER_TEXT_COLOR = 'text-[#4A4A4A]'; 

    // Градиентный фон с текстурой
    const backgroundStyle = {
        backgroundColor: FOOTER_BG_COLOR,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
    };

    return (
        <footer style={backgroundStyle} className={`pt-12 pb-6 px-4 sm:px-6 lg:px-8 mt-12 ${FOOTER_TEXT_COLOR}`}>
            <div className="container mx-auto max-w-6xl">
                
                {/* Социальные сети */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-8 mb-8 text-lg font-medium border-b border-gray-600/30 pb-4">
                    <a href="#" aria-label="Instagram" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <Instagram size={20} />
                        <span>samarkandcitymall</span>
                    </a>
                    <a href="#" aria-label="Telegram" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <Send size={20} />
                        <span>samall</span>
                    </a>
                    <a href="#" aria-label="Telegram Channel" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <Send size={20} />
                        <span>samarkandcitymall</span>
                    </a>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between pt-8">
                    {/* Контактный блок (Лого и адрес) */}
                    <div className="w-full sm:w-1/3 mb-8 sm:mb-0 flex space-x-4 items-start">
                         {/* SVG Логотип в футере */}
                        <SamarkandLogoSVG className="w-8 h-12" color="currentColor" />
                        <div className="text-sm">
                            <h3 className="text-xl font-bold tracking-wider mb-2 text-gray-800">CITY MALL</h3>
                            <p className="mb-1">г. Самарканд, ул. Амира Темура, 40М 838</p>
                            <p className="mb-1">📞 +998 98-000-22-00</p>
                            <p className="text-xs">Время звонков: 12:00 - 19:00</p>
                        </div>
                    </div>

                    {/* Навигационные ссылки */}
                    <div className="w-full sm:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
                        <a href="#" className="hover:text-white transition-colors">Вопросы и ответы</a>
                        <a href="#" className="hover:text-white transition-colors">Магазин</a>
                        <a href="#" className="hover:text-white transition-colors">Рекламные возможности</a>
                        <a href="#" className="hover:text-white transition-colors">Контакты</a>
                        <a href="#" className="hover:text-white transition-colors">Схема ТРЦ</a>
                        <a href="#" className="hover:text-white transition-colors">Вакансии</a>
                        <a href="#" className="hover:text-white transition-colors">Аренда</a>
                        <a href="#" className="hover:text-white transition-colors">Парковка</a>
                    </div>
                </div>

                {/* Копирайт */}
                <div className="text-center text-xs text-gray-800 pt-8 mt-8 border-t border-gray-800/30">
                    &copy; {new Date().getFullYear()} SAMARTAND DRY. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

/**
 * Основное приложение
 */
const App = () => {
    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Настраиваем шрифт Inter (если не указан другой) */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                `}
            </style>
            <Header />
            <main>
                <HeroSection /> 
                <CategoryGrid /> 
                <NewsSection /> 
                <BrandGrid />
            </main>
            <Footer />
        </div>
    );
};

export default App;

// Монтирование приложения в DOM (React 18)
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(React.createElement(App));
}
