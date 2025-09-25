// Leadership Page JavaScript - Advanced Interactive Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality immediately
    initializeNavigation();
    initializeAdvancedScrollAnimations();
    initializeStatCounters();
    initializeAdvancedInteractions();
    initializeParallaxEffects();
    initializeBackToTop();
    
    // Start animations after a short delay
    setTimeout(() => {
        startPageAnimations();
    }, 100);
});

// ========================================
// ADVANCED PAGE ANIMATIONS
// ========================================

function startPageAnimations() {
    // Animate MD card on load
    const mdCard = document.querySelector('.md-card');
    if (mdCard) {
        setTimeout(() => {
            mdCard.classList.add('animate-in');
        }, 800);
    }
    
    // Staggered animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        setTimeout(() => {
            member.classList.add('animate-in');
        }, 1200 + (index * 200));
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
// ADVANCED SCROLL ANIMATIONS
// ========================================

function initializeAdvancedScrollAnimations() {
    // Enhanced intersection observer with multiple thresholds
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                entry.target.classList.add('animate-in');
                
                // Special handling for different element types
                if (entry.target.classList.contains('team-member')) {
                    // Add staggered animation for team members
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                if (entry.target.classList.contains('highlight-item')) {
                    // Add progressive reveal for highlight items
                    const items = entry.target.parentNode.querySelectorAll('.highlight-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = 'translateX(0)';
                            item.style.opacity = '1';
                        }, index * 150);
                    });
                }
                
                // Unobserve element after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements that should animate
    const animatedElements = document.querySelectorAll('.team-member, .md-card, .highlight-item, .contact-btn');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// STAT COUNTERS
// ========================================

function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-value');
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
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const number = parseInt(target.replace(/[^\d]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) displayValue += '%';
        if (isPlus) displayValue += '+';
        
        element.textContent = displayValue;
    }, 16);
}

// ========================================
// ADVANCED INTERACTIONS
// ========================================

function initializeAdvancedInteractions() {
    // Enhanced contact interactions with sound feedback
    const contactItems = document.querySelectorAll('.contact-btn, .contact-link');
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            createAdvancedRippleEffect(e, item);
            addHapticFeedback();
        });
        
        // Add magnetic effect on hover
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            item.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
    
    // Advanced team member interactions
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        let hoverTimeout;
        
        member.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            
            // Animate role icon
            const roleIcon = member.querySelector('.role-icon');
            if (roleIcon) {
                roleIcon.style.transform = 'scale(1.1) rotate(360deg)';
            }
            
            // Animate skill tags
            const skillTags = member.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px)';
                    tag.style.backgroundColor = 'rgba(208, 185, 109, 0.2)';
                }, index * 50);
            });
        });
        
        member.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                const roleIcon = member.querySelector('.role-icon');
                if (roleIcon) {
                    roleIcon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                const skillTags = member.querySelectorAll('.skill-tag');
                skillTags.forEach(tag => {
                    tag.style.transform = 'translateY(0px)';
                    tag.style.backgroundColor = 'rgba(208, 185, 109, 0.1)';
                });
            }, 100);
        });
    });
    
    // MD image advanced interactions
    const mdImage = document.querySelector('.md-image');
    if (mdImage) {
        mdImage.addEventListener('mouseenter', () => {
            mdImage.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        mdImage.addEventListener('mouseleave', () => {
            mdImage.style.transform = 'scale(1) rotateY(0deg)';
        });
    }
}

function createAdvancedRippleEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // Create main ripple
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(208, 185, 109, 0.4) 0%, rgba(208, 185, 109, 0.1) 50%, transparent 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: advancedRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
        z-index: 10;
    `;
    
    // Create secondary ring effect
    const ring = document.createElement('span');
    ring.style.cssText = `
        position: absolute;
        width: ${size * 0.6}px;
        height: ${size * 0.6}px;
        left: ${x + size * 0.2}px;
        top: ${y + size * 0.2}px;
        border: 2px solid rgba(208, 185, 109, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ringExpand 0.6s ease-out 0.1s;
        pointer-events: none;
        z-index: 11;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    element.appendChild(ring);
    
    setTimeout(() => {
        ripple.remove();
        ring.remove();
    }, 800);
}

// Add haptic feedback for supported devices
function addHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate([10, 5, 5]);
    }
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        // Hero parallax effect
        const heroBackground = document.querySelector('.leadership-hero::before');
        if (heroBackground) {
            const heroSection = document.querySelector('.leadership-hero');
            if (heroSection) {
                const rate = scrollY * -0.5;
                heroSection.style.backgroundPositionY = `${rate}px`;
            }
        }
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.role-icon');
        floatingElements.forEach((element, index) => {
            const rate = Math.sin(scrollY * 0.01 + index) * 10;
            element.style.transform = `translateY(${rate}px)`;
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
        // Throttled scroll handler for performance
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
        
        // Enhanced click handler with animation feedback
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            backToTopBtn.style.transform = 'translateY(-1px) scale(0.9)';
            setTimeout(() => {
                backToTopBtn.style.transform = '';
            }, 150);
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([10]);
            }
        });
        
        // Add keyboard accessibility
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backToTopBtn.click();
            }
        });
        
        // Ensure button is focusable for accessibility
        backToTopBtn.setAttribute('tabindex', '0');
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.setAttribute('title', 'Back to top');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
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

// Enhanced scroll performance
const optimizedScroll = throttle(() => {
    const scrolled = window.scrollY;
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, 16);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// CSS ANIMATIONS (Added via JavaScript)
// ========================================

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Animation Classes */
    .aos-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .aos-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-badge,
    .hero-title,
    .hero-subtitle,
    .leadership-stats {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .hero-badge.animate-in,
    .hero-title.animate-in,
    .hero-subtitle.animate-in,
    .leadership-stats.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Ripple Animation */
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Back to Top Button */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #D0B96D, #e6c980);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(208, 185, 109, 0.3);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(208, 185, 109, 0.4);
    }
    
    /* Loading State */
    body:not(.loaded) .aos-element {
        opacity: 0;
        transform: translateY(30px);
    }
    
    /* Enhanced Hover Effects */
    .team-card,
    .executive-card {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .pillar-card {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .pillar-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(208, 185, 109, 0.1), transparent);
        transition: left 0.5s ease;
    }
    
    .pillar-card:hover::before {
        left: 100%;
    }
    
    /* Mobile Responsive Adjustments */
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 16px;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Leadership page error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Performance timing (for development)
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Leadership page loaded in ${Math.round(loadTime)}ms`);
    
    // Check if all critical resources loaded
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
window.LeadershipPage = {
    initializeNavigation,
    initializeScrollAnimations,
    initializeStatCounters,
    initializeContactInteractions,
    createRippleEffect,
    debounce,
    throttle
};