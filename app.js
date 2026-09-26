// Interações comuns aos templates: menu mobile, scroll suave, animação de entrada.
(function () {
  var topbar = document.querySelector('.topbar');
  var toggle = document.querySelector('[data-menu-toggle]');
  if (toggle && topbar) {
    toggle.addEventListener('click', function () {
      topbar.classList.toggle('is-open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      if (topbar) topbar.classList.remove('is-open');
      var top = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) {
      el.classList.add('is-in');
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  items.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 70 + 'ms';
    io.observe(el);
  });
})();
