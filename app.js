// ============================================================
// AiTril Landing Page - Interactive Features
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    initCopyButtons();
    initDemoTabs();
    initScrollAnimations();
    initParallaxEffects();
});

// ============================================================
// Copy to Clipboard
// ============================================================
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy], .install-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy || button.previousElementSibling.textContent;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Visual feedback
                const originalText = button.innerHTML;
                button.innerHTML = '<span class="cta-text">✓ Copied!</span>';
                button.style.background = 'linear-gradient(135deg, #90BE6D, #52B788)';

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// ============================================================
// Demo Tabs
// ============================================================
function initDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    const contents = document.querySelectorAll('.demo-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('demo-tab-active'));
            contents.forEach(c => c.classList.remove('demo-content-active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('demo-tab-active');
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('demo-content-active');
            }
        });
    });
}

// ============================================================
// Scroll Animations
// ============================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe install steps
    const installSteps = document.querySelectorAll('.install-step');
    installSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });
}

// ============================================================
// Parallax Effects
// ============================================================
function initParallaxEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Parallax on code window
                const codeWindow = document.querySelector('.code-window');
                if (codeWindow) {
                    codeWindow.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                // Parallax on DNA background
                const dnaBackground = document.querySelector('.dna-background');
                if (dnaBackground) {
                    dnaBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

// ============================================================
// Smooth Scroll for Anchor Links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href !== '#' && href !== '#demo') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================================
// Code Typing Animation (Optional Enhancement)
// ============================================================
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============================================================
// Easter Egg: Konami Code
// ============================================================
(function() {
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
        const logo = document.querySelector('.logo-emoji');
        if (logo) {
            logo.style.animation = 'rotate3d 0.5s ease-in-out 10';

            // Add rainbow effect
            const colors = ['#4A5FD9', '#E94C89', '#00D9FF', '#90BE6D', '#F9C74F'];
            let colorIndex = 0;

            const interval = setInterval(() => {
                logo.style.filter = `hue-rotate(${colorIndex * 72}deg)`;
                colorIndex++;
                if (colorIndex > 10) {
                    clearInterval(interval);
                    logo.style.filter = '';
                }
            }, 100);
        }
    }
})();

// ============================================================
// Performance Monitoring (Development)
// ============================================================
if (performance && performance.measure) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`🧬 AiTril Landing Page Performance:`);
            console.log(`   DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
            console.log(`   Total Load Time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}
