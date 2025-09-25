// Technology Page JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeCounterAnimations();
    initializeParallaxEffects();
    initializeBackToTop();
    
    // Start page animations
    setTimeout(() => {
        startPageAnimations();
    }, 100);
});

// ========================================
// PAGE ANIMATIONS
// ========================================

function startPageAnimations() {
    // Animate tech features on load
    const techFeatures = document.querySelectorAll('.command-feature, .vehicle-card, .analytics-item');
    techFeatures.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: [0, 0.1, 0.3],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different sections
                if (entry.target.classList.contains('command-feature')) {
                    animateCommandFeatures(entry.target.parentNode);
                } else if (entry.target.classList.contains('vehicle-card')) {
                    animateVehicleCards(entry.target.parentNode);
                } else if (entry.target.classList.contains('system-item')) {
                    animateSystemItems(entry.target.parentNode);
                } else if (entry.target.classList.contains('analytics-item')) {
                    animateAnalyticsItems(entry.target.parentNode);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.command-feature, .vehicle-card, .system-item, .analytics-item, .infra-feature');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateCommandFeatures(container) {
    const features = container.querySelectorAll('.command-feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

function animateVehicleCards(container) {
    const cards = container.querySelectorAll('.vehicle-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 250);
    });
}

function animateSystemItems(container) {
    const items = container.querySelectorAll('.system-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 180);
    });
}

function animateAnalyticsItems(container) {
    const items = container.querySelectorAll('.analytics-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 220);
    });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .metric-value, .spec-value');
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const isDecimal = text.includes('.');
    
    // Extract number from text
    let target = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(target)) return;
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
        if (hasPercent) displayValue += '%';
        if (hasPlus) displayValue += '+';
        
        element.textContent = displayValue;
    }, 16);
}

// ========================================
// INTERACTIVE ELEMENTS
// ========================================

function initializeInteractiveElements() {
    // Enhanced hover effects for tech cards
    const techCards = document.querySelectorAll('.command-feature, .vehicle-card, .analytics-item');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createTechHoverEffect(card);
            addTechGlow(card);
        });
        
        card.addEventListener('mouseleave', () => {
            removeTechEffects(card);
        });
    });
    
    // System item interactions
    const systemItems = document.querySelectorAll('.system-item, .infra-feature');
    systemItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.color = '#D0B96D';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#4ECDC4';
            }
        });
    });
    
    // Feature icon animations
    const featureIcons = document.querySelectorAll('.feature-icon, .card-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.15) rotateY(180deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
    
    // Dashboard metrics interactions
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach(metric => {
        metric.addEventListener('mouseenter', () => {
            metric.style.transform = 'translateX(5px) scale(1.02)';
            metric.style.borderLeftWidth = '6px';
        });
        
        metric.addEventListener('mouseleave', () => {
            metric.style.transform = 'translateX(0) scale(1)';
            metric.style.borderLeftWidth = '4px';
        });
    });
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(e, button);
        });
    });
    
    // Hero visual interaction
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.addEventListener('mouseenter', () => {
            const badge = heroVisual.querySelector('.tech-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.background = 'rgba(208, 185, 109, 0.95)';
            }
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            const badge = heroVisual.querySelector('.tech-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
                badge.style.background = 'rgba(78, 205, 196, 0.9)';
            }
        });
    }
}

function createTechHoverEffect(element) {
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.2), transparent);
        animation: shimmer 0.8s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shimmer);
    
    setTimeout(() => {
        shimmer.remove();
    }, 800);
}

function addTechGlow(element) {
    element.style.boxShadow = '0 0 30px rgba(78, 205, 196, 0.3), 0 25px 60px rgba(41, 43, 43, 0.15)';
}

function removeTechEffects(element) {
    element.style.boxShadow = '';
    const shimmer = element.querySelector('div[style*="shimmer"]');
    if (shimmer) {
        shimmer.remove();
    }
}

function createRippleEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(78, 205, 196, 0.6) 0%, rgba(78, 205, 196, 0.2) 50%, transparent 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        // Floating background elements
        const floatingElements = document.querySelectorAll('.tech-hero::before, .vehicle-technology::before, .tech-cta::before');
        floatingElements.forEach((element, index) => {
            const rate = Math.sin(scrollY * 0.01 + index) * 8;
            if (element.style) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
        
        // Hero image parallax
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const heroSection = document.querySelector('.tech-hero');
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                const rate = (rect.top - window.innerHeight) * 0.1;
                heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
            }
        }
        
        // Tech icons floating
        const techIcons = document.querySelectorAll('.feature-icon, .card-icon');
        techIcons.forEach((icon, index) => {
            const rate = Math.sin(scrollY * 0.008 + index) * 3;
            icon.style.transform = `translateY(${rate}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

// ========================================
// BACK TO TOP FUNCTIONALITY
// ========================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        let ticking = false;
        
        function updateBackToTop() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        }, { passive: true });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            backToTopBtn.style.transform = 'translateY(-1px) scale(0.95)';
            setTimeout(() => {
                backToTopBtn.style.transform = '';
            }, 150);
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Keyboard accessibility
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backToTopBtn.click();
            }
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Throttle function for performance
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
    }
}

// Debounce function
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

// ========================================
// CSS ANIMATIONS (Added via JavaScript)
// ========================================

const style = document.createElement('style');
style.textContent = `
    /* Additional animations */
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Initial states for animations */
    .command-feature,
    .vehicle-card,
    .system-item,
    .analytics-item,
    .infra-feature {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Animated states */
    .command-feature.animate-in,
    .vehicle-card.animate-in,
    .system-item.animate-in,
    .analytics-item.animate-in,
    .infra-feature.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Special tech animations */
    .feature-icon,
    .card-icon {
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .metric {
        transition: all 0.3s ease;
    }
    
    /* Tech glow effects */
    .pulse-tech {
        animation: pulse-tech 3s ease-in-out infinite;
    }
    
    /* Hover states */
    .command-feature:hover,
    .vehicle-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    .system-item:hover,
    .infra-feature:hover,
    .analytics-item:hover {
        transform: translateX(10px);
    }
`;
document.head.appendChild(style);

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Technology page error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Technology page loaded in ${Math.round(loadTime)}ms`);
    
    // Check image loading
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    console.log('All technology images loaded successfully');
                }
            });
            
            img.addEventListener('error', () => {
                console.warn('Failed to load technology image:', img.src);
            });
        }
    });
});

// Export functions for potential external use
window.TechnologyPage = {
    initializeNavigation,
    initializeScrollAnimations,
    initializeInteractiveElements,
    initializeCounterAnimations,
    throttle,
    debounce
};