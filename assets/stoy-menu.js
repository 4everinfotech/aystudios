(function () {
  'use strict';

  function getMenu() {
    return document.querySelector('.stoy-mobile-menu');
  }

  function resetMenu() {
    var menu = getMenu();

    if (!menu) return;

    menu.querySelectorAll('details').forEach(function (details) {
      details.open = false;
    });

    menu.setAttribute('aria-hidden', 'true');
  }

  function openMenu() {
    var menu = getMenu();

    if (!menu) return;

    menu.setAttribute('aria-hidden', 'false');
  }

  /* Native details toggle: submenu navigation */
  document.addEventListener('toggle', function (event) {
    var details = event.target;

    if (!details.matches('.stoy-mobile-menu details')) return;

    if (details.open) {
      var menu = getMenu();

      if (menu) {
        menu.setAttribute('aria-hidden', 'false');
      }
    }
  }, true);

  /* Back button closes its current submenu */
  document.addEventListener('click', function (event) {
    var backButton = event.target.closest('.stoy-nav-back');

    if (!backButton) return;

    event.preventDefault();

    var details = backButton.closest('details');

    if (details) {
      details.open = false;
    }
  });

  /* Hamburger button */
  document.addEventListener('click', function (event) {
    var hamburger = event.target.closest('.menu_middle');

    if (!hamburger) return;

    window.setTimeout(function () {
      var header = document.querySelector('.header-top');

      if (!header) return;

      if (header.classList.contains('open-menu')) {
        openMenu();
      } else {
        resetMenu();
      }
    }, 0);
  });

  /* Overlay closes/reset menu */
  document.addEventListener('click', function (event) {
    if (!event.target.closest('#vl-overlay')) return;

    resetMenu();
  });

  /* Escape key closes submenu levels first, then main menu */
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    var menu = getMenu();

    if (!menu) return;

    var openDetails = menu.querySelectorAll('details[open]');

    if (openDetails.length) {
      openDetails[openDetails.length - 1].open = false;
      event.preventDefault();
      event.stopPropagation();
    }
  });

  /* Reset if menu is closed by other header actions */
  document.addEventListener('click', function (event) {
    var closeTrigger = event.target.closest('.search, .show_open, .search-close');

    if (!closeTrigger) return;

    resetMenu();
  });

  /* Initialize */
  document.addEventListener('DOMContentLoaded', function () {
    resetMenu();
  });

})();