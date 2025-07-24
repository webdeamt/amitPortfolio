// ===== Dark Mode Toggle =====
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Load saved theme preference or system preference
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Theme toggle handler
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }

  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  // ===== Mobile Menu Toggle =====
  mobileMenuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // ===== Video Play/Pause Toggle =====
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const video = e.currentTarget.closest('.relative')?.querySelector('video');
      const icon = e.currentTarget;

      if (!video) return;

      if (video.paused) {
        video.play();
        video.muted = false;
        icon.innerHTML = '<i class="fas fa-pause text-2xl"></i>';
      } else {
        video.pause();
        icon.innerHTML = '<i class="fas fa-play text-2xl"></i>';
      }
    });
  });

  // ===== Star Rating =====
  document.querySelectorAll('.star-rating').forEach(button => {
    button.addEventListener('click', () => {
      const value = parseInt(button.getAttribute('data-value'));
      document.getElementById('rating').value = value;

      document.querySelectorAll('.star-rating i').forEach((icon, index) => {
        icon.classList.toggle('fas', index < value);
        icon.classList.toggle('far', index >= value);
      });
    });
  });

  // ===== Counter Animation =====
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
      }
    });
  }

  // Trigger counters only when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observer.observe(counter);
  });

  // ===== Contact Form Submission =====
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("🎉 Thank you! Your message has been received.");
        contactForm.reset();

        // Reset stars
        document.querySelectorAll('.star-rating i').forEach(star => {
          star.classList.remove('fas');
          star.classList.add('far');
        });
      } else {
        alert("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("⚠ Network error. Please check your internet connection.");
    }
  });

  // ===== Smooth Scrolling for Anchor Links =====
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
