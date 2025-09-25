// =====================
// Services Page Specific Scripts
// =====================

// =====================
// Smooth Reveal Animation
// =====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS-like animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items
                if (entry.target.closest('.categories-grid') || 
                    entry.target.closest('.packages-grid') || 
                    entry.target.closest('.cert-grid')) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('[data-aos]').forEach(element => {
        animateOnScroll.observe(element);
        element.classList.add('aos-init');
    });
});

// =====================
// Service Card Hover Effects
// =====================
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// =====================
// Package Card Hover Effects
// =====================
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// =====================
// Animated Counter for Stats
// =====================
const animateServiceStats = () => {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = stat.innerText;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isFraction = target.includes('/');
        
        if (!isNaN(parseInt(target))) {
            const finalValue = parseInt(target);
            let current = 0;
            const increment = finalValue / 50;
            
            const updateCounter = () => {
                current += increment;
                if (current < finalValue) {
                    stat.innerText = Math.ceil(current) + (isPlus ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            
            updateCounter();
        }
    });
};

// Trigger animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateServiceStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const serviceStats = document.querySelector('.service-stats');
if (serviceStats) {
    statsObserver.observe(serviceStats);
}

// =====================
// Price Animation on Hover
// =====================
document.querySelectorAll('.package-card').forEach(card => {
    const amount = card.querySelector('.amount');
    
    card.addEventListener('mouseenter', () => {
        if (amount) {
            amount.style.transform = 'scale(1.1)';
            amount.style.color = '#D0B96D';
            amount.style.transition = 'all 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (amount) {
            amount.style.transform = 'scale(1)';
            amount.style.color = '#FFFFFF';
        }
    });
});

// =====================
// Certification Card Tilt Effect
// =====================
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// =====================
// Smooth Scroll to Contact
// =====================
document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Redirect to home page contact section
        window.location.href = 'index.html#contact';
    });
});

// =====================
// Add Loading Animation
// =====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.services-hero .hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// =====================
// Dynamic Badge Animation
// =====================
const badges = document.querySelectorAll('.badge-premium, .package-badge');
badges.forEach(badge => {
    badge.style.animation = 'shimmer 3s infinite';
});

// Add shimmer keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% {
            background-position: -100% 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
    
    .badge-premium,
    .package-badge {
        background: linear-gradient(
            90deg,
            #D0B96D 0%,
            #F5E9C9 50%,
            #D0B96D 100%
        );
        background-size: 200% 100%;
        animation: shimmer 3s infinite;
    }
    
    .aos-init {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .aos-init.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// =====================
// Interactive CTA Button
// =====================
document.querySelectorAll('.services-cta .btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add ripple effect on click
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('Services page loaded successfully');