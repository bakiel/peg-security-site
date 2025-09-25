// =====================
// Navigation Scroll Effect
// =====================
const navbar = document.getElementById('navbar');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =====================
// Smooth Scroll for Navigation Links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// Mobile Menu Toggle
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    const isActive = hamburger.classList.contains('active');
    
    if (!isActive) {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = ''; // Re-enable scrolling
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        body.style.overflow = ''; // Re-enable scrolling
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            body.style.overflow = ''; // Re-enable scrolling
        }
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            body.style.overflow = ''; // Re-enable scrolling
        }
    }, 250);
});

// =====================
// Counter Animation
// =====================
const counters = document.querySelectorAll('.stat-number[data-target]');
const speed = 200;

const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;
    
    const updateCount = () => {
        const count = +counter.innerText;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
            
            // Add appropriate suffix
            const parent = counter.parentElement;
            const label = parent.querySelector('.stat-label')?.innerText.toLowerCase();
            
            if (label?.includes('hours')) {
                counter.innerText = target + '/7';
            } else if (label?.includes('officers')) {
                counter.innerText = target + '+';
            } else if (label?.includes('response')) {
                counter.innerText = target + '%';
            }
        }
    };
    
    updateCount();
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// =====================
// Back to Top Button
// =====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================
// Form Submission
// =====================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted with data:', data);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! We will get back to you within 24 hours.');
    
    // Reset form
    contactForm.reset();
});

// =====================
// Parallax Effect for Hero Section
// =====================
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroSection && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroSection.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// =====================
// Add Animation on Scroll (AOS-like effect)
// =====================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('aos-animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// =====================
// Service Cards Hover Effect
// =====================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.service-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('.service-icon i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// =====================
// Typing Effect for Hero Title
// =====================
const addTypingEffect = () => {
    const titleLines = document.querySelectorAll('.hero-title span');
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });
};

window.addEventListener('load', addTypingEffect);

// =====================
// Emergency Button Pulse
// =====================
const emergencyBtn = document.querySelector('.emergency-btn');

setInterval(() => {
    if (emergencyBtn) {
        emergencyBtn.classList.add('pulse-animation');
        setTimeout(() => {
            emergencyBtn.classList.remove('pulse-animation');
        }, 1000);
    }
}, 5000);

// =====================
// Add CSS for pulse animation
// =====================
const style = document.createElement('style');
style.textContent = `
    .pulse-animation {
        animation: pulse-btn 1s ease-in-out;
    }
    
    @keyframes pulse-btn {
        0% {
            box-shadow: 0 0 0 0 rgba(208, 185, 109, 0.7);
        }
        70% {
            box-shadow: 0 0 0 20px rgba(208, 185, 109, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(208, 185, 109, 0);
        }
    }
    
    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-icon i {
        transition: transform 0.3s ease;
    }
    
    .nav-menu.active {
        position: fixed;
        left: 0;
        top: 70px;
        flex-direction: column;
        background-color: rgba(26, 26, 26, 0.98);
        width: 100%;
        text-align: center;
        padding: 20px 0;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// =====================
// Lazy Load Images
// =====================
const images = document.querySelectorAll('img');

const imageObserverOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, imageObserverOptions);

images.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// =====================
// Hero Carousel Management
// =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// Auto-advance carousel
const nextSlide = () => {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
};

// Start carousel auto-advance
const carouselInterval = setInterval(nextSlide, 5000);

// Manual slide navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        clearInterval(carouselInterval);
        
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Restart auto-advance after 10 seconds
        setTimeout(() => {
            setInterval(nextSlide, 5000);
        }, 10000);
    });
});

// =====================
// Video Modal Management
// =====================
const videoPlayBtn = document.getElementById('video-play-btn');
const videoModal = document.getElementById('video-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const videoIframe = document.getElementById('video-iframe');

const youtubeVideoId = 'N-HAIC6YVSo';
const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`;

// Open video modal
const openVideoModal = () => {
    videoIframe.src = youtubeEmbedUrl;
    videoModal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

// Close video modal
const closeVideoModal = () => {
    videoIframe.src = '';
    videoModal.classList.remove('show');
    document.body.style.overflow = '';
};

// Event listeners
videoPlayBtn?.addEventListener('click', openVideoModal);
modalClose?.addEventListener('click', closeVideoModal);
modalOverlay?.addEventListener('click', closeVideoModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        closeVideoModal();
    }
});

// =====================
// Initialize on Load
// =====================
window.addEventListener('load', () => {
    console.log('PEG Security Website Loaded Successfully');
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    // Initialize animations
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate');
    }, 100);
});

// =====================
// Prevent Right Click (Optional - for security theme)
// =====================
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//     return false;
// });