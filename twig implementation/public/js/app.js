document.addEventListener('DOMContentLoaded', () => {

  const toggleButton = document.querySelector('.js-mobile-toggle');
  const navLinks = document.querySelector('.js-nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
      toggleButton.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleButton.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      modal.onclick = (e) => {
        if (e.target === modal) {
          window.closeModal(modalId);
        }
      };
      modal.querySelector('.modal-card').onclick = (e) => e.stopPropagation();
    }
  };

  window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      modal.onclick = null;     
    }
  };

  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-target');
      window.openModal(modalId);
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-backdrop');
      if (modal) {
        window.closeModal(modal.id);
      }
    });
  });


  document.querySelectorAll('.flash-message').forEach(flash => {
    setTimeout(() => {
      flash.style.opacity = '0';
      flash.style.transition = 'opacity 0.5s ease';
      setTimeout(() => flash.remove(), 500); 
    }, 4000);
  });

});
