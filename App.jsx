const { useState, useEffect } = React;

// Константы путей к SVG иконкам
const SVG_ICONS = {
  search: '/svg/poisk.svg',
  location: '/svg/locatsa.svg',
  clock: '/svg/soat.svg',
  phone: '/svg/phone.svg',
  web: '/svg/web.svg',
  bag: '/svg/bag.svg',
  food: '/svg/food.svg',
  popCorn: '/svg/pop corn.svg',
  service: '/svg/tex usluga.svg',
  menu: '/svg/menu.svg',
  logo: '/svg/City Mall logo.svg'
};

// Компонент для отображения SVG иконок
const SvgIcon = ({ src, className = "", size = 24, alt = "", white = false }) => (
  <img 
    src={src} 
    className={className} 
    width={size} 
    height={size} 
    alt={alt}
    style={{ 
      display: 'inline-block', 
      verticalAlign: 'middle',
      filter: white ? 'brightness(0) invert(1)' : 'none'
    }}
  />
);

// Навигационные элементы
const NAV_ITEMS = [
  { name: 'Магазины', icon: SVG_ICONS.bag },
  { name: 'Кафе и Рестораны', icon: SVG_ICONS.food },
  { name: 'Развлечения', icon: SVG_ICONS.popCorn },
  { name: 'Услуги', icon: SVG_ICONS.service },
  { name: 'Новости', icon: SVG_ICONS.web },
  { name: 'Бренды', icon: SVG_ICONS.bag },
];

// Данные для брендов (с поддержкой SVG-логотипов)
const BRANDS = [
  { name: 'ZARA', color: 'bg-white', logo: 'ZARA' },
  { name: 'LACOSTE', color: 'bg-white', logo: 'LACOSTE' },
  { name: 'BOSS', color: 'bg-white', logo: 'BOSS' },
  { name: 'DIESEL', color: 'bg-white', logo: 'DIESEL' },
  { name: 'Massimo Dutti', color: 'bg-white', logo: 'Massimo Dutti' },
  { name: 'Calvin Klein', color: 'bg-white', logo: 'ck' },
  {
    name: 'Nike',
    color: 'bg-white',
    logo: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" aria-label="Nike">
        <path fill="#000" d="M30 65l10-15-20-5c-5-2-10-8-10-15s5-13 15-15l45-10c15-3 25 5 20 20l-10 40c-2 10-10 15-20 15l-40 5c-10 1-20-4-20-15z"/>
      </svg>
    ),
  },
  {
    name: 'Adidas',
    color: 'bg-white',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="Adidas">
        <path fill="#000" d="M12 2l-7 19h4l1.5-4h7l1.5 4h4zM16 14l-2.5-7-2.5 7h5z"/>
      </svg>
    ),
  },
  {
    name: 'Starbucks',
    color: 'bg-white',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="Starbucks">
        <circle cx="12" cy="12" r="10" fill="rgb(0, 107, 73)"/>
        <path fill="#fff" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      </svg>
    ),
  },
  { name: 'COSTA COFFEE', color: 'bg-white', logo: 'COSTA' },
];

// Категории
const CATEGORIES = [
    { title: 'Магазины', icon: SVG_ICONS.bag },
    { title: 'Кафе и Рестораны', icon: SVG_ICONS.food },
    { title: 'Развлечения', icon: SVG_ICONS.popCorn },
    { title: 'Услуги', icon: SVG_ICONS.service },
];

/**
 * Компонент Header
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const ACCENT_COLOR_HEADER = 'text-amber-600';
  const ACCENT_BG = 'bg-amber-600';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Верхняя строка */}
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <SvgIcon src={SVG_ICONS.clock} size={16} className={ACCENT_COLOR_HEADER} alt="Часы" />
              <span className="text-gray-700">Сегодня до 00:00</span>
            </div>
            <a href="#" className={`flex items-center space-x-1 text-gray-700 hover:${ACCENT_COLOR_HEADER} transition-colors`}>
              <SvgIcon src={SVG_ICONS.location} size={16} className={ACCENT_COLOR_HEADER} alt="Локация" />
              <span>Контакт & как добраться</span>
            </a>
          </div>

          {/* Поиск */}
          <div className="hidden md:flex items-center space-x-3">
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
                  className="text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => console.log('Searching for:', searchTerm)}
                  aria-label="Искать"
                >
                  <SvgIcon src={SVG_ICONS.search} size={18} alt="Поиск" />
                </button>
            </div>

            <button className="text-white bg-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">Меню</button>
          </div>

          {/* Мобильная кнопка */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <SvgIcon src={SVG_ICONS.menu} size={24} alt="Меню" />
          </button>
        </div>

        {/* Логотип и меню */}
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <SvgIcon src={SVG_ICONS.logo} className="w-auto h-10" alt="Samarkand City Mall Logo" />
            </div>

            <nav className="hidden md:block">
                <ul className="flex space-x-6 lg:space-x-8">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.name}>
                            <a
                                href="#"
                                className={`text-gray-700 font-medium hover:${ACCENT_COLOR_HEADER} transition-colors text-sm uppercase tracking-wide flex items-center space-x-1`}
                            >
                                <SvgIcon src={item.icon} size={16} alt={item.name} />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
      </div>

      {/* Мобильное меню */}
      <nav className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="bg-gray-50 border-t border-gray-200 p-4 space-y-2">
            <div className="flex items-center border border-gray-300 rounded-full p-1 focus-within:border-amber-500 transition-all">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-transparent outline-none px-3 text-sm"
                />
                <button
                    className={`${ACCENT_BG} text-white p-2 rounded-full hover:opacity-90 transition-colors`}
                    onClick={() => console.log('Searching for:', searchTerm)}
                    aria-label="Искать"
                >
                    <SvgIcon src={SVG_ICONS.search} size={18} alt="Поиск" />
                </button>
            </div>
            {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                    <a
                        href="#"
                        className="flex items-center space-x-2 p-2 text-gray-700 font-medium hover:bg-amber-50 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <SvgIcon src={item.icon} size={18} className={ACCENT_COLOR_HEADER} alt={item.name} />
                        <span>{item.name}</span>
                    </a>
                </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};

/**
 * Hero Section
 */
const HeroSection = () => {
    const backgroundStyle = {
        backgroundColor: '#D1B898',
        backgroundImage: 'linear-gradient(135deg, rgba(209, 184, 152, 0.9) 0%, rgba(209, 184, 152, 0.7) 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: 'cover, 60px 60px',
        backgroundPosition: 'center',
    };

    return (
        <div
            className="w-full h-[45vh] md:h-[60vh] flex items-center justify-center p-4 relative overflow-hidden"
            style={backgroundStyle}
        >
            <div className="text-center z-10">
                <h2 className="text-6xl sm:text-8xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg">
                    CITY MALL
                </h2>
                <p className="text-xl sm:text-3xl font-medium text-white mt-2 drop-shadow-md">
                    SAMARKAND
                </p>
            </div>
        </div>
    );
};

/**
 * Сетка категорий
 */
const CategoryGrid = () => {
    const backgroundStyle = {
        backgroundColor: 'white',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h40v40H0zM40 40h40v40H40z\' fill-opacity=\'0.03\'/%3E%3Cpath d=\'M10 10h20v20H10zM50 50h20v20H50z\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '40px 40px',
    };

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8" style={backgroundStyle}>
            <div className="container mx-auto max-w-6xl">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {CATEGORIES.map((category) => (
                        <a
                            key={category.title}
                            href="#"
                            className="p-6 h-40 bg-[#D1B898] rounded-2xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="mb-3">
                                <SvgIcon 
                                    src={category.icon} 
                                    size={48} 
                                    className="mb-2" 
                                    alt={category.title}
                                    white={true}
                                />
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-base">
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
 * Секция акций
 */
const PromotionsSection = () => {
    const backgroundStyle = {
        backgroundColor: 'white',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h40v40H0zM40 40h40v40H40z\' fill-opacity=\'0.03\'/%3E%3Cpath d=\'M10 10h20v20H10zM50 50h20v20H50z\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '40px 40px',
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={backgroundStyle}>
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 text-center md:text-left">Акции и События</h2>
                    <a href="#" className="mt-4 md:mt-0 flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                        Смотреть все <span className="ml-1">→</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Главная акция */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg overflow-hidden group relative h-96">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end">
                            <span className="bg-white text-amber-600 text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-2">Распродажа</span>
                            <h3 className="text-white text-3xl font-bold">MID SEASON SALE до -50%</h3>
                            <p className="text-white/90 mt-2">Лучшее время для обновления гардероба! Скидки в ваших любимых магазинах.</p>
                        </div>
                    </div>

                    {/* Дополнительные акции */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg overflow-hidden group relative h-44">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                                <span className="bg-white text-green-600 text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-2">Рестораны</span>
                                <h3 className="text-white text-xl font-bold">Новое сезонное меню</h3>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden group relative h-44">
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                                <span className="bg-white text-blue-600 text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-2">Развлечения</span>
                                <h3 className="text-white text-xl font-bold">Главные премьеры месяца</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * Секция новостей
 */
const NewsSection = () => {
    const NEWS_ITEMS = [
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Покупки", alt: "Женщина с покупками" },
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Мода", alt: "Мужчина в деловом стиле" },
        { imageUrl: "https://placehold.co/300x400/D1B898/333333?text=Стиль", alt: "Женщина в юбке" },
    ];

    const backgroundStyle = {
        backgroundColor: 'white',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h40v40H0zM40 40h40v40H40z\' fill-opacity=\'0.03\'/%3E%3Cpath d=\'M10 10h20v20H10zM50 50h20v20H50z\'/%3E%3C/g%3E%3C/svg%3E")',
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
 * Сетка брендов
 */
const BrandGrid = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

    const backgroundStyle = {
        backgroundColor: 'white',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h40v40H0zM40 40h40v40H40z\' fill-opacity=\'0.03\'/%3E%3Cpath d=\'M10 10h20v20H10zM50 50h20v20H50z\'/%3E%3C/g%3E%3C/svg%3E")',
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
                            className="w-full h-24 sm:h-28 rounded-md flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white hover:scale-105 p-2"
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
 * Карта и местоположение
 */
const LocationMap = () => {
    const backgroundStyle = {
        backgroundColor: '#f8f9fa',
    };

    const mapImageUrl = `https://placehold.co/1200x400/e2e8f0/333333?text=Карта+Samarkand+City+Mall`;

    return (
        <section className="py-16" style={backgroundStyle}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:grid md:grid-cols-2">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Как до нас добраться</h2>
                        <div className="flex items-start space-x-3 text-gray-600 mb-4">
                            <SvgIcon src={SVG_ICONS.location} size={24} className="text-amber-600 mt-1 flex-shrink-0" alt="Локация" />
                            <div>
                                <p className="font-semibold text-gray-800">г. Самарканд, ул. Амира Темура, 40М 838</p>
                                <p className="text-sm">Напротив ледового дворца</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 text-gray-600 mb-6">
                            <SvgIcon src={SVG_ICONS.clock} size={24} className="text-amber-600 mt-1 flex-shrink-0" alt="Часы" />
                            <div>
                                <p className="font-semibold text-gray-800">Часы работы</p>
                                <p className="text-sm">Ежедневно: 10:00 - 00:00</p>
                            </div>
                        </div>
                        <a 
                            href="https://yandex.com/maps/?text=Samarkand City Mall" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors shadow-lg"
                        >
                            <span className="mr-2">📍</span>
                            Построить маршрут
                        </a>
                    </div>
                    <div className="h-64 md:h-auto">
                        <img src={mapImageUrl} alt="Карта местоположения Samarkand City Mall" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * Footer
 */
const Footer = () => {
    const FOOTER_BG_COLOR = '#D1B898';
    const FOOTER_TEXT_COLOR = 'text-[#4A4A4A]';

    const backgroundStyle = {
        backgroundColor: FOOTER_BG_COLOR,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '30px 30px',
    };

    return (
        <footer style={backgroundStyle} className={`pt-12 pb-6 px-4 sm:px-6 lg:px-8 mt-12 ${FOOTER_TEXT_COLOR}`}>
            <div className="container mx-auto max-w-6xl">

                {/* Социальные сети */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-8 mb-8 text-lg font-medium border-b border-gray-600/30 pb-4">
                    <a href="#" aria-label="Instagram" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <SvgIcon src={SVG_ICONS.web} size={20} alt="Instagram" />
                        <span>samarkandcitymall</span>
                    </a>
                    <a href="#" aria-label="Telegram" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <SvgIcon src={SVG_ICONS.web} size={20} alt="Telegram" />
                        <span>samall</span>
                    </a>
                    <a href="#" aria-label="Telegram Channel" className="flex items-center space-x-2 hover:text-white transition-colors">
                        <SvgIcon src={SVG_ICONS.web} size={20} alt="Telegram" />
                        <span>samarkandcitymall</span>
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row justify-between pt-8">
                    {/* Контактный блок */}
                    <div className="w-full sm:w-1/3 mb-8 sm:mb-0 flex space-x-4 items-start">
                        <SvgIcon src={SVG_ICONS.logo} className="w-auto h-12" alt="Logo" />
                        <div className="text-sm">
                            <h3 className="text-xl font-bold tracking-wider mb-2 text-gray-800">SAMARKAND CITY MALL</h3>
                            <p className="mb-1 flex items-center">
                                <SvgIcon src={SVG_ICONS.location} size={14} className="mr-1" alt="Адрес" />
                                г. Самарканд, ул. Амира Темура, 40М 838
                            </p>
                            <p className="mb-1 flex items-center">
                                <SvgIcon src={SVG_ICONS.phone} size={14} className="mr-1" alt="Телефон" />
                                +998 98-000-22-00
                            </p>
                            <p className="text-xs flex items-center">
                                <SvgIcon src={SVG_ICONS.clock} size={14} className="mr-1" alt="Время" />
                                Время звонков: 12:00 - 19:00
                            </p>
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
                    &copy; {new Date().getFullYear()} SAMARKAND CITY MALL. Все права защищены.
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
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                `}
            </style>
            <Header />
            <main>
                <HeroSection />
                <CategoryGrid />
                <PromotionsSection />
                <NewsSection />
                <BrandGrid />
                <LocationMap />
            </main>
            <Footer />
        </div>
    );
};

// Монтирование приложения в DOM (React 18)
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(React.createElement(App));
}
