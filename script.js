// Mobile navigation, theme switching, active links, back-to-top, and scroll animations.
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const themeText = document.querySelector(".theme-text");
const backToTopButton = document.querySelector(".back-to-top");
const sections = document.querySelectorAll("main section[id]");

// Restore saved theme on load.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeText.textContent = "Light Mode";
}

// Mobile menu toggle.
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a link is clicked.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Dark / light mode switch.
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light");
});

// Scroll-reveal animation via IntersectionObserver.
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
);

animatedElements.forEach((el) => revealObserver.observe(el));

// Highlight the active nav link based on scroll position.
function updateActiveNavigation() {
  let currentSectionId = "home";
  const bottomOffset = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  // When the page reaches the bottom, highlight the final section.
  if (bottomOffset >= pageHeight - 8) {
    currentSectionId = "contact";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSectionId}`
    );
  });
}

// Show or hide the back-to-top button.
function updateBackToTopButton() {
  backToTopButton.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", () => {
  updateActiveNavigation();
  updateBackToTopButton();
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Run once on load.
updateActiveNavigation();
updateBackToTopButton();
