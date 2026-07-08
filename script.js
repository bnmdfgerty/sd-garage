/* ═══════════════════════════════════════════
   SD Garage — Minimal JS
   Mobile menu toggle, smooth scroll
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
      burgerIcon.textContent = isOpen ? '✕' : '☰';
    });

    // Close mobile menu when a link is clicked
    var mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burgerIcon.textContent = '☰';
      });
    });
  }

  /* ─── FAQ accordion: rotate + to × is handled via CSS (details[open]) ─── */
  /* No additional JS needed — native <details>/<summary> with CSS rotation */

  /* ─── Smooth scroll is handled by CSS scroll-behavior: smooth ─── */
  /* Fallback for older browsers: */
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
})();