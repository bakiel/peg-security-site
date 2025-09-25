// About Page JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeStatCounters();
    initializeInteractiveElements();
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
    // Animate elements on load
    const animatedElements = document.querySelectorAll('.fact-item, .value-card, .cert-badge, .tech-feature, .contact-detail');
    animatedElements.forEach((element, index) => {
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
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: [0, 0.1, 0.5],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different element types
                if (entry.target.classList.contains('fact-item')) {
                    animateFactItems(entry.target.parentNode);
                } else if (entry.target.classList.contains('value-card')) {
                    animateValueCards(entry.target.parentNode);
                } else if (entry.target.classList.contains('cert-badge')) {
                    animateCertBadges(entry.target.parentNode);
                } else if (entry.target.classList.contains('tech-feature')) {
                    animateTechFeatures(entry.target.parentNode);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.fact-item, .value-card, .cert-badge, .tech-feature, .contact-detail');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateFactItems(container) {
    const items = container.querySelectorAll('.fact-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

function animateValueCards(container) {
    const cards = container.querySelectorAll('.value-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

function animateCertBadges(container) {
    const badges = container.querySelectorAll('.cert-badge');
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 250);
    });
}

function animateTechFeatures(container) {
    const features = container.querySelectorAll('.tech-feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, index * 180);
    });
}

// ========================================
// STAT COUNTERS
// ========================================

function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = element.getAttribute('data-target');
    const number = parseInt(target);
    
    if (isNaN(number)) return;
    
    const duration = 2500;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (target.includes('+')) displayValue += '+';
        
        element.textContent = displayValue;
    }, 16);
}

// ========================================
// INTERACTIVE ELEMENTS
// ========================================

function initializeInteractiveElements() {
    // Enhanced hover effects for cards
    const interactiveCards = document.querySelectorAll('.fact-item, .value-card, .cert-badge, .tech-feature, .contact-detail');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createHoverEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            removeHoverEffect(card);
        });
    });
    
    // Mission card special effects
    const missionCard = document.querySelector('.mission-card');
    if (missionCard) {
        missionCard.addEventListener('mouseenter', () => {
            const icon = missionCard.querySelector('.mission-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotateY(180deg)';
            }
        });
        
        missionCard.addEventListener('mouseleave', () => {
            const icon = missionCard.querySelector('.mission-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    }
    
    // Certificate badges rotation effect
    const certBadges = document.querySelectorAll('.cert-badge');
    certBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const icon = badge.querySelector('.badge-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
            }
        });
        
        badge.addEventListener('mouseleave', () => {
            const icon = badge.querySelector('.badge-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(e, button);
        });
    });
    
    // Visual card tilt effect
    const visualCards = document.querySelectorAll('.visual-card, .professional-image');
    visualCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = (e.clientY - centerY) / 10;
            const rotateY = (centerX - e.clientX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

function createHoverEffect(element) {
    // Add shimmer effect
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(208, 185, 109, 0.2), transparent);
        animation: shimmer 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shimmer);
    
    setTimeout(() => {
        shimmer.remove();
    }, 600);
}

function removeHoverEffect(element) {
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
        background: radial-gradient(circle, rgba(208, 185, 109, 0.6) 0%, rgba(208, 185, 109, 0.2) 50%, transparent 100%);
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
        
        // Hero background parallax
        const heroBgImage = document.querySelector('.hero-bg-image');
        if (heroBgImage) {
            const rate = scrollY * 0.3;
            heroBgImage.style.transform = `translateY(${rate}px) scale(1.1)`;
        }
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.cert-badge, .tech-badge');
        floatingElements.forEach((element, index) => {
            const rate = Math.sin(scrollY * 0.01 + index) * 5;
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // Tech image parallax
        const techImage = document.querySelector('.tech-image');
        if (techImage) {
            const techSection = document.querySelector('.technology-innovation');
            if (techSection) {
                const rect = techSection.getBoundingClientRect();
                const rate = (rect.top - window.innerHeight) * 0.1;
                techImage.style.transform = `translateY(${rate}px)`;
            }
        }
        
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
    .fact-item,
    .value-card,
    .cert-badge,
    .tech-feature,
    .contact-detail {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Animated states */
    .fact-item.animate-in,
    .value-card.animate-in,
    .cert-badge.animate-in,
    .tech-feature.animate-in,
    .contact-detail.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Special animations */
    .mission-icon {
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .badge-icon {
        transition: all 0.3s ease;
    }
    
    .visual-card,
    .professional-image {
        transition: transform 0.3s ease;
    }
    
    /* Hover states */
    .fact-item:hover,
    .value-card:hover,
    .tech-feature:hover,
    .contact-detail:hover {
        transform: translateY(-5px);
    }
    
    .cert-badge:hover {
        transform: translateY(-10px) scale(1.05);
    }
`;
document.head.appendChild(style);

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('About page error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`About page loaded in ${Math.round(loadTime)}ms`);
    
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
                    console.log('All images loaded successfully');
                }
            });
            
            img.addEventListener('error', () => {
                console.warn('Failed to load image:', img.src);
            });
        }
    });
});

// Export functions for potential external use
window.AboutPage = {
    initializeNavigation,
    initializeScrollAnimations,
    initializeStatCounters,
    initializeInteractiveElements,
    throttle,
    debounce
};