// Modern Anniversary Page JavaScript with Enhanced Animations

document.addEventListener('DOMContentLoaded', function() {
    const celebrateBtn = document.getElementById('celebrate-btn');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    const typedMessage = document.getElementById('typed-message');

    // Typing effect with enhanced speed
    const message = "Three years of joy, three years of togetherness. Here's to many more adventures!";
    let index = 0;
    function typeWriter() {
        if (index < message.length) {
            typedMessage.innerHTML += message.charAt(index);
            index++;
            setTimeout(typeWriter, 30); // Faster typing
        } else {
            typedMessage.classList.remove('typing');
        }
    }
    typedMessage.classList.add('typing');
    setTimeout(typeWriter, 1000); // Delay start

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized confetti particles - reduced complexity
    let particles = [];
    const colors = ['#ff6b6b', '#feca57', '#48cae4', '#e91e63'];

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * -6 - 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2,
            life: 80
        };
    }

    function updateParticles() {
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // reduced gravity
            p.life--;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 80;
            ctx.fillRect(p.x, p.y, p.size, p.size); // simplified to rectangles only
        });
        ctx.globalAlpha = 1;
    }

    // Throttled animation loop
    let animationId;
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    animate();

    // Simplified celebrate button
    celebrateBtn.addEventListener('click', function() {
        // Create confetti burst
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = canvas.height;
            particles.push(createParticle(x, y));
        }

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('specialModal'));
        modal.show();

        // Button effects
        celebrateBtn.textContent = 'Yay! 🎉';
        celebrateBtn.style.transform = 'scale(1.1)';

        setTimeout(() => {
            celebrateBtn.textContent = 'Click me!';
            celebrateBtn.style.transform = 'scale(1)';
        }, 2000);
    });

    // Auto-start confetti on load with delay
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = canvas.height;
            particles.push(createParticle(x, y));
        }
    }, 2000);

    // Simplified heart click effects
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.addEventListener('click', function() {
            this.style.transform = 'rotate(-45deg) scale(1.2)';
            this.style.filter = 'brightness(1.1)';

            setTimeout(() => {
                this.style.transform = 'rotate(-45deg) scale(1)';
                this.style.filter = 'brightness(1)';
            }, 300);
        });
    });

    // Enhanced carousel with pause on hover
    const carousel = new bootstrap.Carousel(document.getElementById('memoryCarousel'), {
        interval: 4000,
        wrap: true,
        pause: 'hover'
    });

    // Smooth scrolling with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add love cards class for enhanced animations
    document.querySelectorAll('.love .card').forEach(card => {
        card.classList.add('love-card');
    });

    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        document.body.style.backgroundPosition = `center ${rate}px`;
    });

    // Enhanced modal animation
    const modal = document.getElementById('specialModal');
    modal.addEventListener('show.bs.modal', function() {
        setTimeout(() => {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.style.animation = 'bounceIn 0.8s ease-out';
        }, 300);
    });

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
