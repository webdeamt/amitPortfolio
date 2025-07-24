 // Dark Mode Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        // Check for saved user preference or OS preference
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Toggle theme
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('color-theme', 'dark');
            } else {
                localStorage.setItem('color-theme', 'light');
            }
        }

        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);

        // Mobile menu toggle
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Play video buttons
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const video = e.target.closest('.relative').querySelector('video');
                if (video.paused) {
                    video.play();
                    video.muted = false;
                    e.target.innerHTML = '<i class="fas fa-pause text-2xl"></i>';
                } else {
                    video.pause();
                    e.target.innerHTML = '<i class="fas fa-play text-2xl"></i>';
                }
            });
        });

        // Star rating
        document.querySelectorAll('.star-rating').forEach(button => {
    button.addEventListener('click', () => {
        const value = parseInt(button.getAttribute('data-value'));
        document.getElementById('rating').value = value;

        // Update star display
        document.querySelectorAll('.star-rating i').forEach((icon, index) => {
            if (index < value) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
});
        // Counter animation
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        function animateCounters() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                    // For decimal numbers
                    if (target % 1 !== 0) {
                        counter.innerText = target;
                    }
                }
            });
        }

        // Only animate when the section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter').forEach(counter => {
            observer.observe(counter);
        });

        // Form submissions
        dodocument.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("🎉 Thank you! Your message has been received. Our team will reach out soon.");
      form.reset();

      // Reset stars
      document.querySelectorAll('.star-rating i').forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
      });
    } else {
      alert("❌ Something went wrong. Please try again later.");
    }
  } catch (error) {
    alert("⚠️ Network error. Please check your internet connection.");
  }
});

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your message has been sent successfully! I will get back to you soon.');
            e.target.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });