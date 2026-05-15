const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;
const storedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('portfolio-theme', theme);
}

function initializeTheme() {
  if (storedTheme) {
    setTheme(storedTheme);
    return;
  }
  setTheme(prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  setTheme(nextTheme);
}

function createObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
  });

  document.querySelectorAll('.content-section, .hero-section, .card-grid article, .timeline li, .site-footer').forEach((element) => {
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

initializeTheme();
createObserver();
