// ==========================================
// NAVIGATION BAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.nav-bar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuToggle.querySelector('i');
    if (navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ==========================================
// PARTICLE ANIMATION
// ==========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Random delay
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        25% {
            transform: translate(10px, -20px) scale(1.1);
        }
        50% {
            transform: translate(-10px, -40px) scale(0.9);
        }
        75% {
            transform: translate(15px, -20px) scale(1.05);
        }
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: left 0.3s ease-in-out;
            z-index: 999;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links li {
            margin: 1.5rem 0;
        }
        
        .nav-link {
            font-size: 1.5rem;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ==========================================
// SKILL BAR ANIMATION
// ==========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.getAttribute('data-progress') || progressBar.style.width;
            
            // Reset width first
            progressBar.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
                progressBar.style.width = targetWidth + (targetWidth.includes('%') ? '' : '%');
            }, 100);
            
            // Stop observing after animation
            skillObserver.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==========================================
// TYPING EFFECT (Enhanced)
// ==========================================
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '2px solid var(--accent-color)';
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Keep blinking cursor after typing is done
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1500);
}

// ==========================================
// SCROLL REVEAL ON LOAD
// ==========================================
window.addEventListener('load', () => {
    // Hide scroll indicator after some time
    setTimeout(() => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.transition = 'opacity 1s';
            scrollIndicator.style.opacity = '0';
        }
    }, 5000);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
}, 10));

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show notification
    const notification = document.createElement('div');
    notification.textContent = '🎉 You found the secret! 🎉';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00d4ff, #ff006e);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: slideInScale 0.5s ease-out;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    `;
    
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInScale {
            from {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
            document.body.style.animation = '';
        }, 500);
    }, 10000);
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👋 Hello, Developer!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? Check out my GitHub!', 'color: #ff006e; font-size: 14px;');
console.log('%chttps://github.com/theKREAZ', 'color: #00d4ff; font-size: 14px; text-decoration: underline;');
console.log('%c💡 Tip: Try the Konami Code (↑↑↓↓←→←→BA)', 'color: #aaa; font-size: 12px; font-style: italic;');

// ==========================================
// THEME PERSISTENCE
// ==========================================
// Future implementation for theme switching
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'dark'); // Currently always dark

// ==========================================
// ANALYTICS (Placeholder)
// ==========================================
// Add your analytics tracking code here
// Example: Google Analytics, Plausible, etc.

console.log('🚀 Website loaded successfully!');