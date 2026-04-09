/* form.js — Formulario de contacto y notificación toast */

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">💬</span> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');

    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;animation:spin .8s linear infinite">⏳</span> Enviando…';

    setTimeout(() => {
      showToast('✅ Mensaje enviado. ¡Nos pondremos en contacto pronto!');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Enviar mensaje →';
    }, 1400);
  });
}
