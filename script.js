(function() {
  const timeEl = document.getElementById('timeMs');
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
        
    timeEl.textContent = formattedTime
  }

setInterval(updateClock, 1000); // Update every 1000 milliseconds (1 second)
})();

(function() {
  const avatarImg = document.getElementById('avatarImage');
  const urlInput = document.getElementById('avatarUrl');
  const fileInput = document.getElementById('avatarFile');

  urlInput.addEventListener('change', () => {
    if (urlInput.value.trim()) avatarImg.src = urlInput.value.trim();
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => avatarImg.src = e.target.result;
    reader.readAsDataURL(file);
  });
})();

(function() {
  const emailInput = document.getElementById('userEmail');
  emailInput.addEventListener('blur', () => {
    if (!emailInput.checkValidity()) {
      emailInput.style.borderColor = 'red';
    } else {
      emailInput.style.borderColor = '#e6e9ef';
    }
  });
})();