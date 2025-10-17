function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent =  "Current time (ms):" + Date.now().toString();
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
