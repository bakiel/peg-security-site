// Contact Page JavaScript - Interactive Booking System & Contact Forms

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeContactPage();
    initializeBookingSystem();
    initializeContactForm();
    initializeMapFunctionality();
    initializeScrollAnimations();
    initializeBackToTop();
    
    // Start page animations
    setTimeout(() => {
        startPageAnimations();
    }, 100);
});

// ========================================
// PAGE INITIALIZATION
// ========================================

function initializeContactPage() {
    // Initialize navigation functionality
    initializeNavigation();
    
    // Set minimum date for booking to tomorrow
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        bookingDateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    const alternativeDateInput = document.getElementById('alternativeDate');
    if (alternativeDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        alternativeDateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Add click handlers for emergency buttons
    const emergencyButtons = document.querySelectorAll('a[href^="tel:"]');
    emergencyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
}

function startPageAnimations() {
    // Animate contact stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((number, index) => {
        setTimeout(() => {
            number.style.opacity = '1';
            number.style.transform = 'translateY(0)';
            animateStatCounter(number);
        }, 200 * index);
    });
    
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 * index);
    });
}

function animateStatCounter(element) {
    const text = element.textContent;
    const isTime = text.includes(':');
    
    if (isTime) return; // Skip time format animations
    
    const hasPercent = text.includes('%');
    const target = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(target)) return;
    
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPercent) displayValue += '%';
        
        element.textContent = displayValue;
    }, 16);
}

// ========================================
// BOOKING SYSTEM FUNCTIONALITY
// ========================================

let currentBookingStep = 1;
const totalSteps = 4;
let bookingData = {};

function initializeBookingSystem() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;
    
    // Initialize step visibility
    showBookingStep(1);
    
    // Add event listeners for service selection
    const serviceOptions = document.querySelectorAll('input[name="bookingService"]');
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateServiceSelection();
        });
    });
    
    // Add event listeners for form inputs to update summary
    const formInputs = bookingForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updateBookingSummary);
        input.addEventListener('change', updateBookingSummary);
    });
    
    // Form submission handler
    bookingForm.addEventListener('submit', handleBookingSubmission);
}

function openBookingSystem() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentBookingStep = 1;
        showBookingStep(1);
        updateProgressIndicators();
    }
}

function closeBookingSystem() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetBookingForm();
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentBookingStep < totalSteps) {
            currentBookingStep++;
            showBookingStep(currentBookingStep);
            updateProgressIndicators();
            updateNavigationButtons();
            
            if (currentBookingStep === totalSteps) {
                updateBookingSummary();
            }
        }
    }
}

function previousStep() {
    if (currentBookingStep > 1) {
        currentBookingStep--;
        showBookingStep(currentBookingStep);
        updateProgressIndicators();
        updateNavigationButtons();
    }
}

function showBookingStep(step) {
    // Hide all steps
    const allSteps = document.querySelectorAll('.booking-step');
    allSteps.forEach(stepElement => {
        stepElement.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${step}"]`);
    if (currentStepElement && currentStepElement.classList.contains('booking-step')) {
        currentStepElement.classList.add('active');
    }
    
    updateNavigationButtons();
}

function updateProgressIndicators() {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentBookingStep) {
            step.classList.add('active');
        } else if (stepNumber < currentBookingStep) {
            step.classList.add('completed');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show/hide previous button
    if (prevBtn) {
        prevBtn.style.display = currentBookingStep > 1 ? 'inline-flex' : 'none';
    }
    
    // Show/hide next and submit buttons
    if (currentBookingStep < totalSteps) {
        if (nextBtn) nextBtn.style.display = 'inline-flex';
        if (submitBtn) submitBtn.style.display = 'none';
    } else {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'inline-flex';
    }
}

function validateCurrentStep() {
    switch (currentBookingStep) {
        case 1:
            return validateServiceSelection();
        case 2:
            return validateContactDetails();
        case 3:
            return validateScheduleSelection();
        case 4:
            return validateTermsAgreement();
        default:
            return true;
    }
}

function validateServiceSelection() {
    const selectedService = document.querySelector('input[name="bookingService"]:checked');
    if (!selectedService) {
        showNotification('Please select a service', 'warning');
        return false;
    }
    return true;
}

function validateContactDetails() {
    const requiredFields = ['bookingName', 'bookingEmail', 'bookingPhone', 'bookingLocation'];
    const missingFields = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            missingFields.push(fieldId);
        }
    });
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields', 'warning');
        // Highlight missing fields
        missingFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.style.borderColor = '#E74C3C';
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 3000);
            }
        });
        return false;
    }
    
    // Validate email format
    const email = document.getElementById('bookingEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showNotification('Please enter a valid email address', 'warning');
        email.style.borderColor = '#E74C3C';
        setTimeout(() => {
            email.style.borderColor = '';
        }, 3000);
        return false;
    }
    
    return true;
}

function validateScheduleSelection() {
    const date = document.getElementById('bookingDate');
    const time = document.querySelector('input[name="bookingTime"]:checked');
    
    if (!date.value) {
        showNotification('Please select a preferred date', 'warning');
        return false;
    }
    
    if (!time) {
        showNotification('Please select a preferred time slot', 'warning');
        return false;
    }
    
    return true;
}

function validateTermsAgreement() {
    const termsCheckbox = document.getElementById('agreeTerms');
    if (!termsCheckbox.checked) {
        showNotification('Please agree to the terms and conditions', 'warning');
        return false;
    }
    return true;
}

function updateServiceSelection() {
    const selectedService = document.querySelector('input[name="bookingService"]:checked');
    if (selectedService) {
        // Add visual feedback
        const serviceCard = selectedService.closest('.service-option');
        const allCards = document.querySelectorAll('.service-option');
        
        allCards.forEach(card => {
            card.style.transform = 'scale(1)';
        });
        
        serviceCard.style.transform = 'scale(1.02)';
        
        // Store selection
        bookingData.service = selectedService.value;
        bookingData.serviceLabel = serviceCard.querySelector('h5').textContent;
        bookingData.serviceDuration = serviceCard.querySelector('.duration').textContent;
    }
}

function updateBookingSummary() {
    // Service details
    const summaryService = document.getElementById('summaryService');
    const summaryDuration = document.getElementById('summaryDuration');
    
    if (summaryService && bookingData.serviceLabel) {
        summaryService.textContent = bookingData.serviceLabel;
    }
    
    if (summaryDuration && bookingData.serviceDuration) {
        summaryDuration.textContent = bookingData.serviceDuration;
    }
    
    // Contact information
    const summaryName = document.getElementById('summaryName');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryPhone = document.getElementById('summaryPhone');
    
    const nameField = document.getElementById('bookingName');
    const emailField = document.getElementById('bookingEmail');
    const phoneField = document.getElementById('bookingPhone');
    
    if (summaryName && nameField) {
        summaryName.textContent = nameField.value || '-';
    }
    
    if (summaryEmail && emailField) {
        summaryEmail.textContent = emailField.value || '-';
    }
    
    if (summaryPhone && phoneField) {
        summaryPhone.textContent = phoneField.value || '-';
    }
    
    // Appointment details
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    
    const dateField = document.getElementById('bookingDate');
    const selectedTime = document.querySelector('input[name="bookingTime"]:checked');
    
    if (summaryDate && dateField.value) {
        const date = new Date(dateField.value);
        summaryDate.textContent = date.toLocaleDateString('en-ZA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    if (summaryTime && selectedTime) {
        summaryTime.textContent = selectedTime.value;
    }
}

function handleBookingSubmission(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.submit-btn');
    const originalContent = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Collect all form data
    const formData = collectBookingData();
    
    // Simulate email sending (replace with actual email service)
    setTimeout(() => {
        sendBookingEmail(formData)
            .then(() => {
                showSuccessModal();
                closeBookingSystem();
                resetBookingForm();
            })
            .catch((error) => {
                console.error('Booking submission failed:', error);
                showNotification('There was an error submitting your booking. Please try calling us directly.', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
            });
    }, 1000);
}

function collectBookingData() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    const data = {
        service: formData.get('bookingService'),
        name: formData.get('bookingName'),
        company: formData.get('bookingCompany'),
        email: formData.get('bookingEmail'),
        phone: formData.get('bookingPhone'),
        location: formData.get('bookingLocation'),
        requirements: formData.get('bookingRequirements'),
        date: formData.get('bookingDate'),
        time: formData.get('bookingTime'),
        alternativeDate: formData.get('alternativeDate'),
        timestamp: new Date().toISOString()
    };
    
    return data;
}

async function sendBookingEmail(data) {
    // Email template
    const emailSubject = `New Security Consultation Booking - ${data.name}`;
    const emailBody = `
New Security Consultation Booking Request

SERVICE DETAILS:
Service: ${getServiceDisplayName(data.service)}
Date: ${formatDate(data.date)}
Time: ${data.time}
${data.alternativeDate ? `Alternative Date: ${formatDate(data.alternativeDate)}` : ''}

CONTACT INFORMATION:
Name: ${data.name}
${data.company ? `Company: ${data.company}` : ''}
Email: ${data.email}
Phone: ${data.phone}

LOCATION:
${data.location}

${data.requirements ? `REQUIREMENTS:\n${data.requirements}` : ''}

Submitted: ${new Date().toLocaleString('en-ZA')}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:vusiz@pegholdings.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // For demonstration, we'll simulate success
    // In production, you would integrate with an email service
    return new Promise((resolve, reject) => {
        // Simulate API call
        console.log('Booking data:', data);
        console.log('Email body:', emailBody);
        
        // Create a hidden link to open email client
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Small delay to ensure link is added to DOM
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
            resolve();
        }, 100);
    });
}

function getServiceDisplayName(service) {
    const serviceMap = {
        'security-assessment': 'Security Assessment',
        'consultation': 'Security Consultation',
        'quote-meeting': 'Quote & Proposal Meeting',
        'emergency-planning': 'Emergency Planning Session'
    };
    return serviceMap[service] || service;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function resetBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
        currentBookingStep = 1;
        bookingData = {};
        showBookingStep(1);
        updateProgressIndicators();
        updateNavigationButtons();
    }
}

// ========================================
// SUCCESS MODAL
// ========================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        
        // Add celebration animation
        confetti();
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Simple confetti effect
function confetti() {
    const colors = ['#D0B96D', '#E74C3C', '#27AE60', '#3498DB'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${color};
        top: -10px;
        left: ${Math.random() * 100}%;
        z-index: 10001;
        border-radius: 50%;
        pointer-events: none;
        animation: confetti-fall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add confetti animation to CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
@keyframes confetti-fall {
    to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(confettiStyle);

// ========================================
// CONTACT FORM FUNCTIONALITY
// ========================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactFormSubmission);
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.btn-submit');
    
    // Show loading state
    const originalContent = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Validate form
    if (!validateContactForm(form)) {
        submitButton.innerHTML = originalContent;
        submitButton.disabled = false;
        return;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Send email
    sendContactEmail(contactData)
        .then(() => {
            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
        })
        .catch((error) => {
            console.error('Contact form submission failed:', error);
            showNotification('There was an error sending your message. Please try calling us directly.', 'error');
        })
        .finally(() => {
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
        });
}

async function sendContactEmail(data) {
    const emailSubject = `Contact Form Submission - ${data.name}`;
    const emailBody = `
New Contact Form Submission

CONTACT INFORMATION:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Interest: ${data.service}

MESSAGE:
${data.message}

Submitted: ${new Date().toLocaleString('en-ZA')}
    `;
    
    const mailtoLink = `mailto:vusiz@pegholdings.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    return new Promise((resolve) => {
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
            resolve();
        }, 100);
    });
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
    } else {
        clearFieldError(field);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#E74C3C';
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.cssText = `
        color: #E74C3C;
        font-size: 0.85rem;
        margin-top: 5px;
        animation: fadeInUp 0.3s ease;
    `;
    error.textContent = message;
    
    field.parentNode.appendChild(error);
}

function clearFieldError(field) {
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
    field.style.borderColor = '';
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ========================================
// MAP FUNCTIONALITY
// ========================================

function initializeMapFunctionality() {
    // Placeholder for Google Maps integration
    console.log('Map functionality initialized');
}

function loadGoogleMap() {
    const mapContainer = document.getElementById('google-map');
    const placeholder = mapContainer.querySelector('.map-placeholder');
    
    if (placeholder) {
        placeholder.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--gold); margin-bottom: 15px;"></i>
                <p style="color: var(--grey);">Loading interactive map...</p>
            </div>
        `;
        
        // Simulate map loading
        setTimeout(() => {
            // Replace with actual Google Maps embed or API
            placeholder.innerHTML = `
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.123456789!2d28.123456!3d-26.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBethal%2C+South+Africa!5e0!3m2!1sen!2sza!4v1234567890"
                    width="100%" 
                    height="100%" 
                    style="border:0; border-radius: 12px;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            `;
        }, 1500);
    }
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('contact-card')) {
                    animateContactCard(entry.target);
                } else if (entry.target.classList.contains('info-card')) {
                    animateInfoCard(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.contact-card, .info-card, .form-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
}

function animateContactCard(card) {
    const icon = card.querySelector('.card-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
}

function animateInfoCard(card) {
    card.addEventListener('animationend', () => {
        card.style.transform = 'translateX(0)';
    });
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
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let bgColor, textColor, icon;
    switch (type) {
        case 'success':
            bgColor = '#27AE60';
            textColor = '#FFFFFF';
            icon = 'fas fa-check-circle';
            break;
        case 'warning':
            bgColor = '#F39C12';
            textColor = '#FFFFFF';
            icon = 'fas fa-exclamation-triangle';
            break;
        case 'error':
            bgColor = '#E74C3C';
            textColor = '#FFFFFF';
            icon = 'fas fa-times-circle';
            break;
        default:
            bgColor = '#3498DB';
            textColor = '#FFFFFF';
            icon = 'fas fa-info-circle';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10002;
        background: ${bgColor};
        color: ${textColor};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        max-width: 400px;
        word-wrap: break-word;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentNode.remove()" style="
            background: none;
            border: none;
            color: ${textColor};
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
            opacity: 0.8;
        ">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
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
document.head.appendChild(notificationStyle);

// ========================================
// EVENT LISTENERS
// ========================================

// Modal close handlers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeBookingSystem();
        closeSuccessModal();
    }
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingSystem();
        closeSuccessModal();
    }
});

// Prevent modal close when clicking inside modal content
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-content')) {
        e.stopPropagation();
    }
});

// Export functions for global access
window.ContactPage = {
    openBookingSystem,
    closeBookingSystem,
    nextStep,
    previousStep,
    loadGoogleMap,
    showNotification
};

// Error handling
window.addEventListener('error', (e) => {
    console.error('Contact page error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});