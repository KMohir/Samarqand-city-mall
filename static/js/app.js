/**
 * JavaScript для интерактивности сайта Samarkand City Mall
 */

// ==========================================
// МОБИЛЬНОЕ МЕНЮ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
        
        // Закрытие меню при клике на ссылку
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
            });
        });
    }
});

// ==========================================
// ПЕРЕКЛЮЧЕНИЕ ВИДА КАТАЛОГА (СЕТКА/СПИСОК)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const viewToggle = document.getElementById('viewToggle');
    const tenantsContainer = document.getElementById('tenantsContainer');
    
    if (viewToggle && tenantsContainer) {
        viewToggle.addEventListener('click', function() {
            const currentView = this.getAttribute('data-view');
            const gridIcon = this.querySelector('.grid-icon');
            const listIcon = this.querySelector('.list-icon');
            
            if (currentView === 'grid') {
                // Переключаемся на список
                tenantsContainer.classList.add('list-view');
                this.setAttribute('data-view', 'list');
                gridIcon.classList.remove('active');
                listIcon.classList.add('active');
            } else {
                // Переключаемся на сетку
                tenantsContainer.classList.remove('list-view');
                this.setAttribute('data-view', 'grid');
                listIcon.classList.remove('active');
                gridIcon.classList.add('active');
            }
        });
    }
});

// ==========================================
// ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ==========================================
// ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ==========================================
// АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Добавляем анимацию к картам брендов, категорий и арендаторов
        const animatedElements = document.querySelectorAll('.brand-item, .category-card, .tenant-card, .news-card, .feature-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    }
});

// ==========================================
// ПОИСК С АВТОДОПОЛНЕНИЕМ (ОПЦИОНАЛЬНО)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            const query = this.value.trim();
            
            if (query.length >= 3) {
                searchTimeout = setTimeout(() => {
                    // Здесь можно добавить AJAX запрос для автодополнения
                    console.log('Поиск:', query);
                }, 300);
            }
        });
    }
});

// ==========================================
// УВЕДОМЛЕНИЯ (TOAST)
// ==========================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text-primary);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        toast.style.borderColor = 'var(--color-accent)';
    } else if (type === 'error') {
        toast.style.borderColor = '#ff5555';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// УТИЛИТЫ
// ==========================================

/**
 * Дебаунс функции
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Троттлинг функции
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// КНОПКА "ВВЕРХ"
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Создаем кнопку
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-accent);
        color: var(--color-bg-primary);
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Показываем/скрываем кнопку при прокрутке
    const toggleScrollButton = throttle(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }, 200);
    
    window.addEventListener('scroll', toggleScrollButton);
    
    // Прокрутка вверх при клике
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Эффект при наведении
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
    });
});

console.log('Samarkand City Mall - JavaScript загружен успешно');

