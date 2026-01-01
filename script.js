// ===== Dark Mode Logic =====
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

// Check Local Storage or System Preference
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

// ===== Mobile Menu =====
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const links = menu.querySelectorAll('a'); 

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// ===== Video Play/Pause =====
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Find the specific video container for this button
        const container = e.currentTarget.closest('.group');
        const video = container.querySelector('video');
        
        if (video.paused) {
            video.play();
            video.muted = false; // Unmute when playing
            e.currentTarget.style.opacity = '0'; // Hide button while playing
        } else {
            video.pause();
            e.currentTarget.style.opacity = '1'; // Show button when paused
        }
    });
});

// Reset play button when video ends
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('ended', (e) => {
        const container = e.currentTarget.closest('.group');
        const btn = container.querySelector('.play-button');
        btn.style.opacity = '1';
    });
    
    // Show button if video is clicked to pause
    video.addEventListener('click', (e) => {
        const container = e.currentTarget.closest('.group');
        const btn = container.querySelector('.play-button');
        
        if (video.paused) {
            video.play();
            btn.style.opacity = '0';
        } else {
            video.pause();
            btn.style.opacity = '1';
        }
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target;
        }
    });
};

// Trigger animation when stats come into view
let ranAnimation = false;
window.addEventListener('scroll', () => {
    const section = document.querySelector('.counter');
    if(section && !ranAnimation) {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight;
        
        if(sectionPos < screenPos) {
            animateCounters();
            ranAnimation = true;
        }
    }
});
