// ===================== PAGE NAVIGATION =====================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('[data-page]');
  const pages = document.querySelectorAll('.page');
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const footer = document.getElementById('site-footer');

  function showPage(pageId) {
    pages.forEach(function(page) {
      page.classList.remove('active');
    });

    var target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
    }

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      }
    });

    window.scrollTo(0, 0);

    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      mobileToggle.classList.remove('active');
    }
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var pageId = this.getAttribute('data-page');
      showPage(pageId);
      history.pushState(null, '', '#' + pageId);
    });
  });

  if (window.location.hash) {
    var pageId = window.location.hash.substring(1);
    var validPages = Array.from(pages).map(function(p) { return p.id; });
    if (validPages.indexOf(pageId) !== -1) {
      showPage(pageId);
    }
  }

  window.addEventListener('popstate', function() {
    if (window.location.hash) {
      var pageId = window.location.hash.substring(1);
      showPage(pageId);
    } else {
      showPage('home');
    }
  });

  // ===================== MOBILE TOGGLE =====================
  mobileToggle.addEventListener('click', function() {
    mainNav.classList.toggle('open');
    mobileToggle.classList.toggle('active');
  });

  // ===================== HEADER SCROLL EFFECT =====================
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===================== FOOTER VISIBILITY =====================
  function updateFooterVisibility() {
    var activePage = document.querySelector('.page.active');
    if (activePage) {
      footer.style.display = 'block';
    }
  }

  var observer = new MutationObserver(updateFooterVisibility);
  pages.forEach(function(page) {
    observer.observe(page, { attributes: true, attributeFilter: ['class'] });
  });
  updateFooterVisibility();
});

// ===================== LIGHTBOX =====================
var currentLightboxIndex = 0;
var galleryItems = [];

function openLightbox(element) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');

  galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  currentLightboxIndex = galleryItems.indexOf(element);

  var img = element.querySelector('img');
  var caption = element.querySelector('.gallery-caption h3');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightbox(direction) {
  currentLightboxIndex += direction;

  if (currentLightboxIndex < 0) {
    currentLightboxIndex = galleryItems.length - 1;
  } else if (currentLightboxIndex >= galleryItems.length) {
    currentLightboxIndex = 0;
  }

  var item = galleryItems[currentLightboxIndex];
  var img = item.querySelector('img');
  var caption = item.querySelector('.gallery-caption h3');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : '';
}

document.addEventListener('keydown', function(e) {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeLightbox(-1);
  if (e.key === 'ArrowRight') changeLightbox(1);
});

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('lightbox-content')) {
    closeLightbox();
  }
});
