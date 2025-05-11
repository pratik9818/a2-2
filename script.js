// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navbar Toggle
    const navToggle = document.querySelector('.navbar__toggle');
    const navLinks = document.querySelector('.navbar__links');

    if (navToggle && navLinks) {
        // Toggle menu when clicking the hamburger icon
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document
            navLinks.classList.toggle('mobile-active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                navToggle.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                navToggle.classList.remove('active');
            });
        });
    }

    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            // Close other open items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem !== item) openItem.classList.remove('open');
            });
            // Toggle current
            item.classList.toggle('open');
        });
    });

    // Stats bar count-up animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat__number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const isPlus = target > 4;
            let count = 0;
            const duration = 1200;
            const step = Math.ceil(target / (duration / 16));
            function update() {
                count += step;
                if (count >= target) {
                    stat.textContent = isPlus ? `${target}+` : `${target}`;
                } else {
                    stat.textContent = isPlus ? `${count}+` : `${count}`;
                    requestAnimationFrame(update);
                }
            }
            update();
        });
    }

    let statsAnimated = false;
    function handleStatsBar() {
        const bar = document.querySelector('.stats-bar__container');
        if (!bar || statsAnimated) return;
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            animateStats();
            statsAnimated = true;
        }
    }

    window.addEventListener('scroll', handleStatsBar);
    handleStatsBar(); // Check on page load
}); 