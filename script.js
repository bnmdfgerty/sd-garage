/* ═══════════════════════════════════════════
   SD Garage — JS v4
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Мобильное меню ─── */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');
  var burgerLines = document.getElementById('burger-icon');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen);
      if (burgerLines) {
        if (isOpen) {
          burgerLines.classList.add('is-open');
        } else {
          burgerLines.classList.remove('is-open');
        }
      }
    });

    var mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        if (burgerLines) burgerLines.classList.remove('is-open');
      });
    });
  }

  /* ─── Эффект хедера при скролле ─── */
  var header = document.getElementById('header');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Плавный скролл ─── */
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

  /* ─── Появление элементов при скролле ─── */
  var revealElements = document.querySelectorAll(
    '.section__header, .cards, .step, .faq__item, .contacts-card, .discount-banner'
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
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();