/* 📱 FIX ALTURA REAL EN MOBILE (barra de direcciones cambia el 100vh) */
function setRealVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setRealVH();
window.addEventListener("resize", setRealVH);
window.addEventListener("orientationchange", setRealVH);

const intro = document.getElementById("intro");
const content = document.getElementById("content");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const btnES = document.getElementById("btn-es");
const btnEN = document.getElementById("btn-en");

/* 🎭 SCROLL — un solo listener */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* TELÓN — top en vez de transform para no pisar el hover de la imagen */
  intro.style.top = `-${scrollY}px`;

  if (scrollY > 100) {
    content.classList.add("reveal");
  } else {
    content.classList.remove("reveal");
  }

  if (scrollY > window.innerHeight) {
    intro.style.opacity = "0";
    intro.style.pointerEvents = "none";
  } else {
    intro.style.opacity = "1";
  }

  if (scrollY > window.innerHeight * 0.8) {
    navbar.classList.add("show");
  } else {
    navbar.classList.remove("show");
  }

  if (scrollY > window.innerHeight) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* 🌐 IDIOMA */
function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-es]");
  elements.forEach(el => {
    el.textContent = lang === "es"
      ? el.getAttribute("data-es")
      : el.getAttribute("data-en");
  });
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  btnES.classList.toggle("active-lang", lang === "es");
  btnEN.classList.toggle("active-lang", lang === "en");
}

btnES.addEventListener("click", () => changeLanguage("es"));
btnEN.addEventListener("click", () => changeLanguage("en"));

/* Detecta idioma guardado, o si es la primera visita, el idioma del navegador */
const savedLang = localStorage.getItem("lang");
const browserLang = navigator.language?.startsWith("es") ? "es" : "en";
changeLanguage(savedLang || browserLang);

/* 🖼️ CARRUSEL de fondo */
const bgImages = document.querySelectorAll(".background-slider img");
let currentBg = 0;

if (bgImages.length > 0) {
  bgImages[0].classList.add("active");

  setInterval(() => {
    bgImages[currentBg].classList.remove("active");
    currentBg = (currentBg + 1) % bgImages.length;
    bgImages[currentBg].classList.add("active");
  }, 3000);
}

/* 🎓 LIGHTBOX DE CERTIFICACIONES */
const certCards = document.querySelectorAll(".cert-card");
const certLightbox = document.getElementById("certLightbox");
const certLightboxMedia = document.getElementById("certLightboxMedia");
const certLightboxTitle = document.getElementById("certLightboxTitle");
const certLightboxIssuer = document.getElementById("certLightboxIssuer");
const certLightboxLink = document.getElementById("certLightboxLink");
const certClose = document.getElementById("certLightboxClose");
const certPrev = document.getElementById("certPrev");
const certNext = document.getElementById("certNext");

let currentCertIndex = 0;

function renderCert(index) {
  const card = certCards[index];
  const image = card.getAttribute("data-image");
  const icon = card.getAttribute("data-icon");

  certLightboxMedia.innerHTML = image
    ? `<img src="${image}" alt="${card.getAttribute("data-title")}">`
    : `<div class="cert-lightbox-icon"><i class="${icon}"></i></div>`;

  certLightboxTitle.textContent = card.getAttribute("data-title");
  certLightboxIssuer.textContent = card.getAttribute("data-issuer");
  certLightboxLink.href = card.getAttribute("data-link");
}

function openCertLightbox(index) {
  currentCertIndex = index;
  renderCert(currentCertIndex);
  certLightbox.classList.add("open");
}

function closeCertLightbox() {
  certLightbox.classList.remove("open");
}

function showNextCert() {
  currentCertIndex = (currentCertIndex + 1) % certCards.length;
  renderCert(currentCertIndex);
}

function showPrevCert() {
  currentCertIndex = (currentCertIndex - 1 + certCards.length) % certCards.length;
  renderCert(currentCertIndex);
}

if (certCards.length) {
  certCards.forEach((card, index) => {
    card.addEventListener("click", () => openCertLightbox(index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCertLightbox(index);
      }
    });
  });

  certClose.addEventListener("click", closeCertLightbox);
  certNext.addEventListener("click", showNextCert);
  certPrev.addEventListener("click", showPrevCert);

  certLightbox.addEventListener("click", (e) => {
    if (e.target === certLightbox) closeCertLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!certLightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeCertLightbox();
    if (e.key === "ArrowRight") showNextCert();
    if (e.key === "ArrowLeft") showPrevCert();
  });
}

/* 🍔 MENÚ HAMBURGUESA (mobile) */
const navToggle = document.getElementById("navToggle");
const navLinksWrapper = document.getElementById("navLinksWrapper");

if (navToggle && navLinksWrapper) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinksWrapper.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinksWrapper.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinksWrapper.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* 🧭 NAVEGACIÓN SUAVE con animación */
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });

      target.style.transition = "none";
      target.style.opacity = "0";
      target.style.transform = "translateY(20px)";

      setTimeout(() => {
        target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        target.style.opacity = "1";
        target.style.transform = "translateY(0)";
      }, 100);
    }
  });
});

/* 🔦 LINK ACTIVO según sección visible */
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (link) {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));