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

    // Modal functionality
    // Get all buttons with learn-more-btn class
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    // Add click event listener to each button
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });

    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Add click event listener to each close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close modal on escape key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style="display: block;"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            });
        }
    });
}); 