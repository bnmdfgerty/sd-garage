/* ═══════════════════════════════════════════
   SD Garage — JS v2
   Mobile menu, scroll header, reveal animations
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Mobile menu toggle ─── */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');
  var burgerIcon = document.getElementById('burger-icon');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen);
      burgerIcon.textContent = isOpen ? '\u2715' : '\u2630';
    });

    /* Закрыть мобильное меню при клике на ссылку */
    var mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burgerIcon.textContent = '\u2630';
      });
    });
  }

  /* ─── Header scroll effect ─── */
  var header = document.getElementById('header');
  var scrollThreshold = 50;

  function onScroll() {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Smooth scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─── Reveal on scroll (Intersection Observer) ─── */
  var revealElements = document.querySelectorAll(
    '.section__header, .card, .step, .faq__item, .contacts-card, .contacts-card__banner'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Фоллбэк — показать всё сразу */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();