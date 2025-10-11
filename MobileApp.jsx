import React, { useState } from 'react';

// Мобильный Header
const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="header-mobile">
                <div className="header-top">
                    <div className="logo-mobile">
                        <svg viewBox="0 0 100 120" fill="currentColor" className="text-amber-600">
                            <path d="M50 10 C30 10, 15 25, 15 45 C15 55, 20 65, 30 70 C35 72, 40 73, 45 72 C50 71, 55 69, 58 65 C60 62, 62 58, 62 54 C62 50, 60 47, 57 45 C55 43, 52 42, 49 42 C46 42, 43 43, 41 45 C39 47, 38 49, 38 52 C38 54, 39 55, 41 56 C42 57, 44 57, 45 56 C46 55, 47 54, 47 53 C47 52, 46 51, 45 51 C44 51, 44 51, 44 52 L44 52 Z M50 110 C70 110, 85 95, 85 75 C85 65, 80 55, 70 50 C65 48, 60 47, 55 48 C50 49, 45 51, 42 55 C40 58, 38 62, 38 66 C38 70, 40 73, 43 75 C45 77, 48 78, 51 78 C54 78, 57 77, 59 75 C61 73, 62 71, 62 68 C62 66, 61 65, 59 64 C58 63, 56 63, 55 64 C54 65, 53 66, 53 67 C53 68, 54 69, 55 69 C56 69, 56 69, 56 68 L56 68 Z"/>
                        </svg>
                        <h1 className="text-amber-600">
                            <span>SAMARKAND</span><br/>
                            <span>CITY MALL</span>
                        </h1>
                    </div>
                    
                    <button
                        className="menu-button text-gray-700 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Открыть меню"
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                
                <div className="header-info-mobile">
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                        <img src="./svg/clock.svg" alt="Время" />
                        <span>До 00:00</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                        <img src="./svg/phone.svg" alt="Контакт" />
                        <span>Контакт</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                        <img src="./svg/map-pin.svg" alt="Карта" />
                        <span>Карта</span>
                    </div>
                </div>
                
                {isMenuOpen && (
                    <div className="bg-gray-50 p-4 border-t">
                        <div className="grid grid-cols-2 gap-3">
                            <a href="#" className="bg-amber-100 p-3 rounded-lg text-center">
                                <div className="text-2xl mb-1">🏪</div>
                                <div className="text-sm font-medium">Магазины</div>
                            </a>
                            <a href="#" className="bg-amber-100 p-3 rounded-lg text-center">
                                <div className="text-2xl mb-1">🍽️</div>
                                <div className="text-sm font-medium">Кафе</div>
                            </a>
                            <a href="#" className="bg-amber-100 p-3 rounded-lg text-center">
                                <div className="text-2xl mb-1">🎬</div>
                                <div className="text-sm font-medium">Развлечения</div>
                            </a>
                            <a href="#" className="bg-amber-100 p-3 rounded-lg text-center">
                                <div className="text-2xl mb-1">⚙️</div>
                                <div className="text-sm font-medium">Услуги</div>
                            </a>
                        </div>
                        <div className="mt-3">
                            <input 
                                type="text" 
                                placeholder="Поиск..." 
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

// Мобильный Hero
const MobileHero = () => (
    <section className="hero-mobile">
        <div>
            <h1>
                CITY<br/>
                MALL
            </h1>
            <p>SAMARKAND</p>
        </div>
    </section>
);

// Мобильные категории
const MobileCategories = () => {
    const categories = [
        { title: 'Магазины', icon: '🏪' },
        { title: 'Кафе и Рестораны', icon: '🍽️' },
        { title: 'Развлечения', icon: '🎬' },
        { title: 'Услуги', icon: '⚙️' }
    ];
    
    return (
        <section className="categories-mobile">
            <div className="categories-grid-mobile">
                {categories.map((category) => (
                    <a key={category.title} href="#" className="category-tile-mobile">
                        <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{category.icon}</div>
                        <span>{category.title}</span>
                    </a>
                ))}
            </div>
        </section>
    );
};

// Мобильные новости
const MobileNews = () => {
    const news = [
        { title: 'Покупки', image: 'https://placehold.co/400x200/D1B898/333333?text=Покупки' },
        { title: 'Мода', image: 'https://placehold.co/400x200/D1B898/333333?text=Мода' },
        { title: 'Стиль', image: 'https://placehold.co/400x200/D1B898/333333?text=Стиль' }
    ];
    
    return (
        <section className="news-mobile">
            <h2 className="news-title-mobile">Новости</h2>
            <div className="news-grid-mobile">
                {news.map((item, index) => (
                    <div key={index} className="news-item-mobile">
                        <img src={item.image} alt={item.title} />
                    </div>
                ))}
            </div>
        </section>
    );
};

// Мобильные бренды
const MobileBrands = () => {
    const brands = [
        { name: 'ZARA', logo: 'https://placehold.co/100x40/ffffff/333333?text=ZARA' },
        { name: 'BOSS', logo: 'https://placehold.co/100x40/ffffff/333333?text=BOSS' },
        { name: 'DIESEL', logo: 'https://placehold.co/100x40/ffffff/333333?text=DIESEL' },
        { name: 'LACOSTE', logo: 'https://placehold.co/100x40/ffffff/333333?text=LACOSTE' },
        { name: 'CK', logo: 'https://placehold.co/100x40/ffffff/333333?text=CK' },
        { name: 'COSTA', logo: 'https://placehold.co/100x40/ffffff/333333?text=COSTA' }
    ];
    
    return (
        <section className="brands-mobile">
            <h2 className="brands-title-mobile">Бренды</h2>
            <div className="brands-grid-mobile">
                {brands.map((brand) => (
                    <div key={brand.name} className="brand-card-mobile">
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                ))}
            </div>
            <button className="brands-button-mobile">
                Посмотреть все
            </button>
        </section>
    );
};

// Мобильный футер
const MobileFooter = () => (
    <footer className="footer-mobile">
        <div className="footer-content-mobile">
            <div className="footer-social-mobile">
                <a href="#">
                    <div className="icon">📷</div>
                    <span>Instagram</span>
                </a>
                <a href="#">
                    <div className="icon">🌐</div>
                    <span>Website</span>
                </a>
                <a href="#">
                    <div className="icon">📱</div>
                    <span>Telegram</span>
                </a>
            </div>
            
            <div className="footer-logo-mobile">
                <svg viewBox="0 0 100 120" fill="currentColor">
                    <path d="M50 10 C30 10, 15 25, 15 45 C15 55, 20 65, 30 70 C35 72, 40 73, 45 72 C50 71, 55 69, 58 65 C60 62, 62 58, 62 54 C62 50, 60 47, 57 45 C55 43, 52 42, 49 42 C46 42, 43 43, 41 45 C39 47, 38 49, 38 52 C38 54, 39 55, 41 56 C42 57, 44 57, 45 56 C46 55, 47 54, 47 53 C47 52, 46 51, 45 51 C44 51, 44 51, 44 52 L44 52 Z M50 110 C70 110, 85 95, 85 75 C85 65, 80 55, 70 50 C65 48, 60 47, 55 48 C50 49, 45 51, 42 55 C40 58, 38 62, 38 66 C38 70, 40 73, 43 75 C45 77, 48 78, 51 78 C54 78, 57 77, 59 75 C61 73, 62 71, 62 68 C62 66, 61 65, 59 64 C58 63, 56 63, 55 64 C54 65, 53 66, 53 67 C53 68, 54 69, 55 69 C56 69, 56 69, 56 68 L56 68 Z"/>
                </svg>
            </div>
            
            <div className="footer-contact-mobile">
                <p>г. Самарканд, ул. Амира Темура, дом 83В</p>
                <p>(+998) 98-000-22-00</p>
                <p>Звонки: 10:00 - 19:00</p>
            </div>
            
            <a href="/contact/" className="footer-feedback-mobile">
                ОБРАТНАЯ СВЯЗЬ
            </a>
            
            <div className="footer-nav-mobile">
                <a href="#">Вопросы и ответы</a>
                <a href="#">Контакты</a>
                <a href="#">Аренда</a>
                <a href="#">Магазины</a>
                <a href="#">Схема ТРЦ</a>
                <a href="#">Парковка</a>
                <a href="#">Рекламные возможности</a>
                <a href="#">Вакансии</a>
            </div>
            
            <div className="footer-copyright-mobile">
                <p>SAMARKAND CITY MALL, 2025</p>
                <a href="#">Политика конфиденциальности</a>
            </div>
        </div>
    </footer>
);

// Основное мобильное приложение
const MobileApp = () => {
    return (
        <div className="min-h-screen bg-white">
            <link rel="stylesheet" href="./mobile-responsive.css" />
            <MobileHeader />
            <MobileHero />
            <MobileCategories />
            <MobileNews />
            <MobileBrands />
            <MobileFooter />
        </div>
    );
};

export default MobileApp;
