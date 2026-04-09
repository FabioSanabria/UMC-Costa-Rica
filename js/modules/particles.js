/* particles.js — Animación de partículas en el canvas de fondo */

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 10;
      this.r     = Math.random() * 1.5 + .5;
      this.vx    = (Math.random() - .5) * .4;
      this.vy    = -(Math.random() * .6 + .2);
      this.alpha = Math.random() * .6 + .2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > .5 ? '#00c6ff' : '#7b2ff7';
      ctx.fill();
      ctx.restore();
    }
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 90; i++) particles.push(new Particle());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
}
