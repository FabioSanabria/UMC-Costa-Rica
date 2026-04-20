/* form.js — Formulario de contacto con Web3Forms */

function showToast(msg, isError = false) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${isError ? '❌' : '✅'}</span> ${msg}`;
  toast.style.borderColor = isError ? 'rgba(255,80,80,.4)' : 'rgba(0,198,255,.3)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');

    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;animation:spin .8s linear infinite">⏳</span> Enviando…';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (json.success) {
        showToast('Mensaje enviado correctamente. ¡Nos pondremos en contacto pronto!');
        form.reset();
      } else {
        showToast('Hubo un problema al enviar. Por favor intentá de nuevo.', true);
      }
    } catch {
      showToast('Error de conexión. Verificá tu internet e intentá de nuevo.', true);
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Enviar mensaje →';
    }
  });
}
