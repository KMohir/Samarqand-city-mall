import React, { useState } from 'react';

// Имитация данных для компонентов
const NAV_ITEMS = [
  { name: 'Магазины', icon: './svg/shopping-bag.svg' },
  { name: 'Кафе и Рестораны', icon: './svg/utensils.svg' },
  { name: 'Развлечения', icon: './svg/film.svg' },
  { name: 'Услуги', icon: './svg/hand.svg' },
  { name: 'Новости', icon: './svg/briefcase.svg' },
  { name: 'Бренды', icon: './svg/grid.svg' },
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
    { title: 'Магазины', icon: './svg/shopping-bag.svg' },
    { title: 'Кафе и Рестораны', icon: './svg/utensils.svg' },
    { title: 'Развлечения', icon: './svg/film.svg' },
    { title: 'Услуги', icon: './svg/hand.svg' },
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
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const ACCENT_COLOR_HEADER = 'text-amber-600'; 
  const ACCENT_BG = 'bg-amber-600'; 
  const ACCENT_LOGO_TEXT = 'CITY MALL'; 

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
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

          <div className="hidden md:flex items-center space-x-3">
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

        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <SamarkandLogoSVG className="w-6 h-10" /> 
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

      <nav 
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <ul className="bg-gray-50 border-t border-gray-200 p-4 space-y-2">
            <div className="search-input flex items-center p-1 transition-all">
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
            {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                    <a 
                        href="#" 
                        className={`flex items-center space-x-2 p-2 text-gray-700 font-medium hover:bg-amber-50 transition-colors rounded-lg`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img src={item.icon} alt={item.name} className="w-4 h-4" />
                        <span>{item.name}</span>
                    </a>
                </li>
            ))}
        </ul>
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
            className="w-full hero flex items-center justify-center p-4 relative overflow-hidden"
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
                <h2 className="text-6xl sm:text-8xl font-extrabold text-white tracking-widest uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    CITY MALL
                </h2>
                <p className="text-xl sm:text-3xl font-medium text-white mt-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    SAMARKAND
                </p>
            </div>
        </div>
    );
};

const CategoryGrid = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 pattern-bg">
            <div className="container mx-auto max-w-6xl">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {CATEGORIES.map((category) => (
                        <a key={category.title} href="#" className="p-6 category-tile text-center shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="p-4 rounded-xl bg-transparent flex items-center justify-center">
                                <img src={category.icon} alt={category.title} className="w-10 h-10 mb-3 invert" />
                            </div>
                            <span className="text-white font-medium text-sm sm:text-base">{category.title}</span>
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 pattern-bg">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Новости</h2>
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {NEWS_ITEMS.map((item, index) => (
                        <div key={index} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-white">
                            <img src={item.imageUrl} alt={item.alt} className="w-full h-96 object-cover object-top p-4" style={{ borderRadius: '12px' }} />
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
        <section className="py-12 px-4 sm:px-6 lg:px-8 pattern-bg">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Бренды</h2>
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {brands.map((brand) => (
                        <div key={brand.name} className="brand-card shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer p-2">
                            <BrandLogo logo={brand.logo} />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors shadow-lg">Посмотреть все</button>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className={`footer pt-12 pb-6 px-4 sm:px-6 lg:px-8 mt-12`}>
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-8 mb-8 text-lg font-medium border-b border-gray-600/30 pb-4">
                    <a href="#" aria-label="Instagram" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <img src="./svg/instagram.svg" alt="Instagram" className="w-5 h-5" />
                        <span>samarkandcitymall</span>
                    </a>
                    <a href="#" aria-label="Telegram" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <img src="./svg/send.svg" alt="Telegram" className="w-5 h-5" />
                        <span>samall</span>
                    </a>
                    <a href="#" aria-label="Telegram Channel" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <img src="./svg/send.svg" alt="Telegram Channel" className="w-5 h-5" />
                        <span>samarkandcitymall</span>
                    </a>
                </div>
                <div className="flex flex-col sm:flex-row justify-between pt-8">
                    <div className="w-full sm:w-1/3 mb-8 sm:mb-0 flex space-x-4 items-start">
                        <img src="./svg/logo-compact.svg" alt="City Mall" className="w-8 h-12" />
                        <div className="text-sm">
                            <h3 className="text-xl font-bold tracking-wider mb-2 text-gray-800">CITY MALL</h3>
                            <p className="mb-1">г. Самарканд, ул. Амира Темура, 40М 838</p>
                            <p className="mb-1">📞 +998 98-000-22-00</p>
                            <p className="text-xs">Время звонков: 12:00 - 19:00</p>
                        </div>
                    </div>
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
                <div className="text-center text-xs text-gray-800 pt-8 mt-8 border-t border-gray-800/30">&copy; {new Date().getFullYear()} SAMARTAND DRY. Все права защищены.</div>
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                    body { font-family: 'Inter', sans-serif; }
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

if (typeof ReactDOM !== 'undefined') {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        ReactDOM.createRoot(rootElement).render(React.createElement(App));
    }
}
