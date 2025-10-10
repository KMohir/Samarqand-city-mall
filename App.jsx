import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// SVG иконки как компоненты
const ShoppingBagIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
    <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
  </svg>
);

const UtensilsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 2V22H5V14H7V22H9V2H7V12H5V2H3Z"/>
    <path d="M11 2V8C11 9.1 11.9 10 13 10H15V22H17V2H15V8H13V2H11Z"/>
    <path d="M19 2V8C19 9.1 19.9 10 21 10V12C19.9 12 19 12.9 19 14V22H21V2H19Z"/>
  </svg>
);

const PopcornIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
    <path d="M8 8C8.55 8 9 8.45 9 9V15C9 15.55 8.55 16 8 16C7.45 16 7 15.55 7 15V9C7 8.45 7.45 8 8 8Z"/>
    <path d="M16 8C16.55 8 17 8.45 17 9V15C17 15.55 16.55 16 16 16C15.45 16 15 15.55 15 15V9C15 8.45 15.45 8 16 8Z"/>
    <path d="M12 8C12.55 8 13 8.45 13 9V15C13 15.55 12.55 16 12 16C11.45 16 11 15.55 11 15V9C11 8.45 11.45 8 12 8Z"/>
    <path d="M6 18H18C18.55 18 19 18.45 19 19V21C19 21.55 18.55 22 18 22H6C5.45 22 5 21.55 5 21V19C5 18.45 5.45 18 6 18Z"/>
  </svg>
);

const ServicesIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
    <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8Z"/>
    <path d="M12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z"/>
    <path d="M8 10C8.55 10 9 10.45 9 11V13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13V11C7 10.45 7.45 10 8 10Z"/>
    <path d="M16 10C16.55 10 17 10.45 17 11V13C17 13.55 16.55 14 16 14C15.45 14 15 13.55 15 13V11C15 10.45 15.45 10 16 10Z"/>
    <path d="M10 20H14C14.55 20 15 20.45 15 21V22C15 22.55 14.55 23 14 23H10C9.45 23 9 22.55 9 22V21C9 20.45 9.45 20 10 20Z"/>
  </svg>
);

// Имитация данных для компонентов
const NAV_ITEMS = [
  { name: 'Магазины', icon: ShoppingBagIcon },
  { name: 'Кафе и Рестораны', icon: UtensilsIcon },
  { name: 'Развлечения', icon: PopcornIcon },
  { name: 'Услуги', icon: ServicesIcon },
];

const BRANDS = [
  { name: 'ZARA', color: 'bg-white', logo: 'ZARA' },
  { name: 'LACOSTE', color: 'bg-white', logo: './svg/lacoste-logo.svg' },
  { name: 'BOSS', color: 'bg-white', logo: 'BOSS' },
  { name: 'DIESEL', color: 'bg-white', logo: 'DIESEL' },
  { name: 'Massimo Dutti', color: 'bg-white', logo: 'Massimo Dutti' },
  { name: 'Calvin Klein', color: 'bg-white', logo: 'ck' }, 
  { name: 'Nike', color: 'bg-white', logo: './svg/nike-logo.svg' },
  { name: 'Adidas', color: 'bg-white', logo: './svg/adidas-logo.svg' },
  { name: 'Starbucks', color: 'bg-white', logo: './svg/starbucks-logo.svg' },
  { name: 'COSTA COFFEE', color: 'bg-white', logo: 'COSTA' },
];

const CATEGORIES = [
    { title: 'Магазины', icon: ShoppingBagIcon },
    { title: 'Кафе и Рестораны', icon: UtensilsIcon },
    { title: 'Развлечения', icon: PopcornIcon },
    { title: 'Услуги', icon: ServicesIcon },
];

/**
 * SVG логотип Samarkand City Mall (имитация)
 */
const SamarkandLogoSVG = ({ className = "w-6 h-6" }) => (
  <img src="./svg/samarkand-city-mall-logo.svg" alt="Samarkand City Mall" className={className} />
);

/**
 * Компонент верхнего навигационного меню и шапки
 */
const Header = ({ onLogoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const ACCENT_COLOR_HEADER = 'text-amber-600'; 
  const ACCENT_BG = 'bg-amber-600'; 
  const ACCENT_LOGO_TEXT = 'CITY MALL'; 

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-3">
        {/* Мобильная версия - компактный header */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-2">
            <div 
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onLogoClick}
            >
                <SamarkandLogoSVG className="w-5 h-8" /> 
                <h1 className="text-lg font-extrabold tracking-wider text-gray-800">
                    <span className={ACCENT_COLOR_HEADER}>{ACCENT_LOGO_TEXT}</span>
                </h1>
            </div>
            
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
          
          {/* Компактная информационная строка для мобильных */}
          <div className="flex justify-between items-center text-xs text-gray-600 border-b pb-2">
            <div className="flex items-center space-x-1">
              <img src="./svg/clock.svg" alt="Время" className="w-3 h-3" />
              <span>До 00:00</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src="./svg/phone.svg" alt="Контакт" className="w-3 h-3" />
              <span>Контакт</span>
            </div>
            <a href="#" className={`flex items-center space-x-1 text-gray-600 hover:${ACCENT_COLOR_HEADER} transition-colors`}>
              <img src="./svg/map-pin.svg" alt="Как добраться" className="w-3 h-3" />
              <span>Как добраться</span>
            </a>
          </div>
        </div>

        {/* Десктопная версия */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="header-info">
              <div className="flex items-center space-x-1">
                <img src="./svg/clock.svg" alt="Время" className="w-4 h-4 inline-block" />
                <span className="text-gray-700">Сегодня до 00:00</span>
              </div>
              <div className="flex items-center space-x-1">
                <img src="./svg/phone.svg" alt="Контакт" className="w-4 h-4 inline-block" />
                <span className="text-gray-700">Контакт</span>
              </div>
              <a href="#" className={`flex items-center space-x-1 text-gray-700 hover:${ACCENT_COLOR_HEADER} transition-colors`}>
                <img src="./svg/map-pin.svg" alt="Как добраться" className="w-4 h-4 inline-block" />
                <span>Как добраться</span>
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button className="btn-beige text-white">RUS</button>

              <div className="search-input flex items-center p-1 w-80 focus-within:border-amber-500 transition-all">
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
                  <img src="./svg/search.svg" alt="Поиск" className="w-4 h-4" />
                  </button>
              </div>
              
              <button className="btn-beige--dark px-3 py-1 rounded-full text-sm font-medium hover:opacity-90 transition-colors flex items-center space-x-2">
                <img src="./svg/menu.svg" alt="Меню" className="w-4 h-4" />
                <span>Меню</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
              <div 
                  className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={onLogoClick}
              >
                  <SamarkandLogoSVG className="w-6 h-10" /> 
                  <h1 className="text-xl font-extrabold tracking-wider text-gray-800">
                      <span className={ACCENT_COLOR_HEADER}>{ACCENT_LOGO_TEXT}</span>
                  </h1>
              </div>
              
              <nav className="hidden md:block">
                  <ul className="flex space-x-4">
                      {NAV_ITEMS.map((item) => (
                          <li key={item.name}>
                              <a 
                                  href="#" 
                                  className="flex flex-col items-center p-4 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors text-center min-w-[120px]"
                              >
                                  <item.icon className="w-6 h-6 mb-2 text-gray-700" />
                                  <span className="text-gray-700 font-medium text-sm">{item.name}</span>
                              </a>
                          </li>
                      ))}
                  </ul>
              </nav>
          </div>
        </div>
      </div>

      <nav 
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="bg-gray-50 border-t border-gray-200 p-4">
            <div className="search-input flex items-center p-1 transition-all mb-4">
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
                    <img src="./svg/search.svg" alt="Поиск" className="w-4 h-4" />
                </button>
            </div>
            <ul className="grid grid-cols-2 gap-4">
                {NAV_ITEMS.map((item) => (
                    <li key={item.name}>
                        <a 
                            href="#" 
                            className={`flex flex-col items-center p-4 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors text-center`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <item.icon className="w-6 h-6 mb-2 text-gray-700" />
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

const HeroSection = () => {
    const TEXTURE_URL = "/images/orange_wood.png";
    // В реальном приложении это изображение будет загружаться через API
    const [heroImage, setHeroImage] = React.useState(null);

    React.useEffect(() => {
        // Здесь будет API запрос для получения активного изображения
        // fetch('/api/hero-image/')
        //   .then(response => response.json())
        //   .then(data => setHeroImage(data))
        //   .catch(error => console.error('Error fetching hero image:', error));
    }, []);

    return (
        <div 
            className="w-full hero flex items-center justify-center p-2 md:p-4 relative overflow-hidden"
        >
            {heroImage ? (
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImage.url} 
                        alt={heroImage.title || 'Hero Image'} 
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="absolute inset-0 z-0" style={{ backgroundColor: '#FF6600' }}></div>
            )}
            
            <div className="text-center z-10 relative">
                <h2 className="text-3xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-widest uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    CITY MALL
                </h2>
                <p className="text-lg sm:text-xl md:text-3xl font-medium text-white mt-1 md:mt-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    SAMARKAND
                </p>
            </div>
        </div>
    );
};

const CategoryGrid = () => {
    return (
        <section className="py-6 md:py-12 px-3 sm:px-6 lg:px-8 pattern-bg">
            <div className="container mx-auto max-w-6xl">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                    {CATEGORIES.map((category) => (
                        <a key={category.title} href="#" className="p-3 md:p-6 category-tile text-center shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="p-2 md:p-4 rounded-xl bg-transparent flex items-center justify-center">
                                <category.icon className="w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-3 text-gray-700" />
                            </div>
                            <span className="text-white font-medium text-xs md:text-sm lg:text-base">{category.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

const NewsSection = () => {
    const NEWS_ITEMS = [
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Покупки", alt: "Женщина с покупками" },
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Мода", alt: "Мужчина в деловом стиле" },
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Стиль", alt: "Женщина в юбке" },
    ];

    return (
        <section className="py-8 md:py-16 px-3 sm:px-6 lg:px-8 pattern-bg">
            <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-6 md:mb-10 text-gray-800">Новости</h2>
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {NEWS_ITEMS.map((item, index) => (
                        <div key={index} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-white">
                            <img src={item.imageUrl} alt={item.alt} className="w-full h-48 md:h-96 object-cover object-top p-2 md:p-4" style={{ borderRadius: '12px' }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BrandGrid = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            {typeof logo === 'string' && logo.endsWith('.svg') ? (
                <img src={logo} alt="brand" className="max-h-10" />
            ) : typeof logo === 'string' ? (
                <span className="text-xl font-bold text-gray-800">{logo}</span>
            ) : (
                logo
            )}
        </div>
    );

    return (
        <section className="py-6 md:py-12 px-3 sm:px-6 lg:px-8 pattern-bg">
            <h2 className="text-xl md:text-4xl font-extrabold text-center mb-4 md:mb-10 text-gray-800">Бренды</h2>
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
                    {brands.map((brand) => (
                        <div key={brand.name} className="brand-card shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer p-1 md:p-2">
                            <BrandLogo logo={brand.logo} />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6 md:mt-12">
                    <button className="bg-gray-800 text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors shadow-lg text-xs md:text-base">Посмотреть все</button>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-[#D1B898] text-[#4A4A4A] border border-gray-800">
            <div className="max-w-6xl mx-auto px-3 md:px-6 py-4 md:py-8">
                
                {/* Мобильная версия футера */}
                <div className="md:hidden">
                    {/* Социальные сети - компактно */}
                    <div className="flex justify-center space-x-6 mb-4 pb-3 border-b border-[#D1B898]/30">
                        <a href="#" className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
                            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                                <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </div>
                            <span className="text-sm font-medium">samarkandcitymall</span>
                        </a>
                        
                        <a href="#" className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </div>
                            <span className="text-sm font-medium">scmall</span>
                        </a>
                        
                        <a href="#" className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                </svg>
                            </div>
                            <span className="text-sm font-medium">samarkandcitymall</span>
                        </a>
                    </div>

                    {/* Контакты - компактно */}
                    <div className="text-center mb-4 pb-3 border-b border-[#D1B898]/30">
                        <div className="text-[#4A4A4A] text-xs mb-2">
                            <p>г. Самарканд, ул. Амира Темура, дом 83В</p>
                            <p>(+998) 98-000-22-00</p>
                            <p>Звонки: 10:00 - 19:00</p>
                        </div>
                        <a href="/contact/" className="inline-block bg-[#D1B898] text-[#4A4A4A] px-4 py-1 rounded-full text-xs font-medium border border-[#4A4A4A]/30 hover:bg-[#4A4A4A] hover:text-[#D1B898] transition-colors">
                            ОБРАТНАЯ СВЯЗЬ
                        </a>
                    </div>

                    {/* Навигация - компактно */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4 pb-3 border-b border-[#D1B898]/30">
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Вопросы и ответы</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Контакты</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Аренда</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Магазины</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Схема ТРЦ</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Парковка</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Рекламные возможности</a>
                        <a href="#" className="text-[#4A4A4A] hover:text-white transition-colors">Вакансии</a>
                    </div>

                    {/* Копирайт - компактно */}
                    <div className="text-center text-xs text-[#4A4A4A]">
                        <p>SAMARKAND CITY MALL, 2025</p>
                        <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                    </div>
                </div>

                {/* Десктопная версия футера */}
                <div className="hidden md:block">
                    {/* Верхняя секция: Социальные сети */}
                    <div className="flex justify-center space-x-16 mb-6 pb-4 border-b border-[#D1B898]/30">
                        {/* Instagram */}
                        <a href="#" className="flex items-center space-x-3 text-white hover:opacity-80 transition-opacity">
                            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </div>
                            <span className="text-lg font-medium">samarkandcitymall</span>
                        </a>
                        
                        {/* Web */}
                        <a href="#" className="flex items-center space-x-3 text-white hover:opacity-80 transition-opacity">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </div>
                            <span className="text-lg font-medium">scmall</span>
                        </a>
                        
                        {/* Telegram */}
                        <a href="#" className="flex items-center space-x-3 text-white hover:opacity-80 transition-opacity">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                </svg>
                            </div>
                            <span className="text-lg font-medium">samarkandcitymall</span>
                        </a>
                    </div>

                    {/* Средняя секция: Логотип + Контакты + Навигация */}
                    <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#D1B898]/30">
                        {/* Левая часть: Логотип S + Контакты */}
                        <div className="flex items-start space-x-6">
                            {/* Логотип S */}
                            <div className="flex-shrink-0">
                                <svg className="w-16 h-20 text-white" viewBox="0 0 100 120" fill="currentColor">
                                    <path d="M50 10 C30 10, 15 25, 15 45 C15 55, 20 65, 30 70 C35 72, 40 73, 45 72 C50 71, 55 69, 58 65 C60 62, 62 58, 62 54 C62 50, 60 47, 57 45 C55 43, 52 42, 49 42 C46 42, 43 43, 41 45 C39 47, 38 49, 38 52 C38 54, 39 55, 41 56 C42 57, 44 57, 45 56 C46 55, 47 54, 47 53 C47 52, 46 51, 45 51 C44 51, 44 51, 44 52 L44 52 Z M50 110 C70 110, 85 95, 85 75 C85 65, 80 55, 70 50 C65 48, 60 47, 55 48 C50 49, 45 51, 42 55 C40 58, 38 62, 38 66 C38 70, 40 73, 43 75 C45 77, 48 78, 51 78 C54 78, 57 77, 59 75 C61 73, 62 71, 62 68 C62 66, 61 65, 59 64 C58 63, 56 63, 55 64 C54 65, 53 66, 53 67 C53 68, 54 69, 55 69 C56 69, 56 69, 56 68 L56 68 Z"/>
                                </svg>
                            </div>
                            
                            {/* Контактная информация */}
                            <div className="text-[#4A4A4A] text-sm">
                                <p className="mb-1">г. Самарканд, ул. Амира Темура,</p>
                                <p className="mb-1">дом 83В</p>
                                <p className="mb-1">(+998) 98-000-22-00</p>
                                <p className="mb-4">Звонки: 10:00 - 19:00</p>
                                
                                {/* Кнопка обратной связи */}
                                <a href="/contact/" className="inline-block bg-[#D1B898] text-[#4A4A4A] px-6 py-2 rounded-full text-sm font-medium border border-[#4A4A4A]/30 hover:bg-[#4A4A4A] hover:text-[#D1B898] transition-colors">
                                    ОБРАТНАЯ СВЯЗЬ
                                </a>
                            </div>
                        </div>

                        {/* Правая часть: Навигационные ссылки (3 колонки) */}
                        <div className="flex space-x-12">
                            {/* Колонка 1 */}
                            <div className="space-y-2 text-sm">
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Вопросы и ответы</a>
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Контакты</a>
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Аренда</a>
                            </div>
                            
                            {/* Колонка 2 */}
                            <div className="space-y-2 text-sm">
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Магазины</a>
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Схема ТРЦ</a>
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Парковка</a>
                            </div>
                            
                            {/* Колонка 3 */}
                            <div className="space-y-2 text-sm">
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Рекламные возможности</a>
                                <a href="#" className="block text-[#4A4A4A] hover:text-white transition-colors">Вакансии</a>
                            </div>
                        </div>
                    </div>

                    {/* Нижняя секция: Копирайт */}
                    <div className="flex justify-between items-center text-sm text-[#4A4A4A]">
                        <span>SAMARKAND CITY MALL, 2025</span>
                        <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const App = () => {
    const [currentView, setCurrentView] = useState('home');

    const handleLogoClick = () => {
        setCurrentView('home');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <>
                        <HeroSection />
                        <CategoryGrid />
                        <NewsSection />
                        <BrandGrid />
                    </>
                );
            default:
                return (
                    <>
                        <HeroSection />
                        <CategoryGrid />
                        <NewsSection />
                        <BrandGrid />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                    body { font-family: 'Inter', sans-serif; }
                `}
            </style>
            <Header onLogoClick={handleLogoClick} />
            <main>
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default App;

// Инициализация React приложения
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
}
