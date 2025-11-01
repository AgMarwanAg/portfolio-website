// Mobile Navigation Toggle with enhanced animation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Add ripple effect to nav toggle
    createRipple(navToggle, event);
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    
    // Add ripple effect to nav links
    createRipple(e.target, e);
}));

// Create ripple effect function
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show a success message
        alert('Message sent successfully! (This is a demo, no actual message was sent)');
        
        // Reset form
        contactForm.reset();
    });
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 20, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 20, 0.8)';
    }
});

// Enhanced Animation on scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animation for children
            const children = entry.target.querySelectorAll('.skill, .project-card, .stat-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.glass-card, .hero-content, .hero-image, .section-title, .skill-container, .projects-grid');
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Enhanced scroll effects
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    
    // Parallax effect for hero background
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Update navbar background opacity
    const navbar = document.querySelector('.navbar');
    const opacity = Math.min(scrolled / 100, 0.95);
    navbar.style.background = `rgba(10, 10, 20, ${0.8 + opacity * 0.15})`;
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    animateOnScroll();
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.classList.add('typing-text');
    }
    
    // Add shimmer effect to glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('shimmer');
        }, index * 200);
    });
    
    // Initialize particle cursor effect
    initParticleCursor();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Listen for scroll events with throttling
window.addEventListener('scroll', requestScrollUpdate);

// Enhanced particle cursor effect
function initParticleCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);
    
    const particles = [];
    const particleCount = 15;
    
    // Create particle pool
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            life: 0
        });
    }
    
    let mouseX = 0, mouseY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Create particle trail
        if (Math.random() < 0.3) {
            const particle = particles.find(p => p.life <= 0);
            if (particle) {
                particle.x = mouseX;
                particle.y = mouseY;
                particle.vx = (Math.random() - 0.5) * 2;
                particle.vy = (Math.random() - 0.5) * 2;
                particle.life = 1;
            }
        }
        
        setTimeout(() => { isMoving = false; }, 100);
    });
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            if (particle.life > 0) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.02;
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.life;
                particle.element.style.transform = `scale(${particle.life})`;
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Enhanced interactive elements effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .glass-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            element.classList.add('element-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            element.classList.remove('element-hover');
        });
        
        element.addEventListener('click', (e) => {
            createClickEffect(e.clientX, e.clientY);
        });
    });
}

// Click effect animation
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.classList.add('click-effect');
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 600);
}

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add transition effect
                document.body.classList.add('transitioning');
                
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    setTimeout(() => {
                        document.body.classList.remove('transitioning');
                    }, 300);
                }, 100);
            }
        });
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
});

// Add loading screen animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
            document.body.classList.add('page-loaded');
        }, 500);
    }, 1000);
});

// Mouse-following gradient effect
function initMouseGradient() {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth) * 100;
        targetY = (e.clientY / window.innerHeight) * 100;
    });
    
    // Smooth animation for gradient following
    function updateGradient() {
        // Smooth interpolation for fluid movement
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;
        
        // Update CSS custom properties
        document.documentElement.style.setProperty('--mouse-x', mouseX + '%');
        document.documentElement.style.setProperty('--mouse-y', mouseY + '%');
        
        requestAnimationFrame(updateGradient);
    }
    
    // Start the animation loop
    updateGradient();
    
    // Initialize gradient position at center
    document.documentElement.style.setProperty('--mouse-x', '50%');
    document.documentElement.style.setProperty('--mouse-y', '50%');
}

// Initialize mouse gradient effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMouseGradient();
});
