function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = "Current time (ms): " + Date.now().toString();
  }
}

updateTime();
setInterval(updateTime, 1000);

const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
const urlInput = document.getElementById('avatar-url');
const enterPrompt = document.getElementById('enter-prompt');

if (urlInput) {
  urlInput.addEventListener('change', () => {
    const url = urlInput.value.trim();
    if (url) {
      avatarImg.src = url;
      avatarImg.alt = "Profile picture from user-provided URL";
    }
  });
}

if (urlInput && enterPrompt) {
  urlInput.addEventListener('input', () => {
    enterPrompt.style.opacity = urlInput.value.trim() ? '1' : '0';
  });
  
  urlInput.addEventListener('change', () => {
    enterPrompt.style.opacity = '1';
  });
}

const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const pageId = link.getAttribute('data-page');
    pages.forEach(page => {
      page.classList.toggle('active', page.id === `${pageId}-page`);
    });
  });
});

const contactForm = document.querySelector('[data-testid="test-contact-form"]');
const successMessage = document.querySelector('[data-testid="test-contact-success"]');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
      el.classList.remove('show');
      el.textContent = '';
    });

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    let isValid = true;

    if (!name) showError('name', 'Full name is required'), isValid = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    if (!subject) showError('subject', 'Subject is required'), isValid = false;

    if (!message) {
      showError('message', 'Message is required');
      isValid = false;
    } else if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters long');
      isValid = false;
    }

    if (isValid) {
      successMessage.classList.add('show');
      contactForm.reset();
      setTimeout(() => successMessage.classList.remove('show'), 5000);
    }
  });

  function showError(field, message) {
    const errorElement = document.getElementById(`error-${field}`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }
}