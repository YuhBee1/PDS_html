/* ============================================================
   PARAMOUNT DIGITAL SERVICES — background.js
   Logo particles with fully organic, randomised motion.
   ============================================================ */

(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');

  /* ── CONFIG ─────────────────────────────────────────────── */
  const CFG = {
    particleCount : 8,       // number of logo instances
    minScale      : 0.05,     // smallest ghost
    maxScale      : 0.35,     // largest ghost
    minOpacity    : 0.018,
    maxOpacity    : 0.065,
    minSpeed      : 0.6,     // pixels per frame
    maxSpeed      : 1,
    rotateRange   : 0.008,   // max rotation delta per frame
    driftChange   : 0.004,   // how quickly direction wanders
    logoImage     : '',    // updated fallback text mark
    logoFont      : '900 100px "Bebas Neue", sans-serif',
    logoColor     : '#ffffff',
    // Updated to your specific local PC path
    logoImageSrc  : 'file:///C:/Users/Mr Paramount/Downloads/Telegram Desktop/paramount-digital-services/paramount/images/logo.png', 
  };
  /* ─────────────────────────────────────────────────────────── */

  let W, H, particles = [], logoImg = null, logoReady = false;

  /* ── RESIZE ─────────────────────────────────────────────── */
  function resize () {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── LOGO IMAGE LOADER ──────────────────────────────────── */
  function loadLogoImage () {
    if (!CFG.logoImageSrc) { 
      logoReady = true; 
      return; 
    }
    logoImg = new Image();
    logoImg.onload  = () => { 
      logoReady = true; 
    };
    logoImg.onerror = () => { 
      console.error("Logo failed to load. Using fallback text.");
      logoImg = null; 
      logoReady = true; 
    };
    logoImg.src = CFG.logoImageSrc;
  }
  loadLogoImage();

  /* ── PARTICLE CLASS ─────────────────────────────────────── */
  class Particle {
    constructor () { this.reset(true); }

    reset (initial) {
      this.x      = Math.random() * W;
      this.y      = initial ? Math.random() * H : (Math.random() < 0.5 ? -80 : H + 80);
      this.scale  = rand(CFG.minScale, CFG.maxScale);
      this.alpha  = rand(CFG.minOpacity, CFG.maxOpacity);
      this.angle  = Math.random() * Math.PI * 2;
      this.speed  = rand(CFG.minSpeed, CFG.maxSpeed);
      this.dir    = Math.random() * Math.PI * 2;   // direction of travel
      this.rotVel = (Math.random() - 0.5) * CFG.rotateRange * 2;
      this.drift  = (Math.random() - 0.5) * CFG.driftChange * 2;

      // Gentle breathing effect
      this.breathPhase = Math.random() * Math.PI * 2;
      this.breathAmp   = rand(0.003, 0.012);
      this.breathSpeed = rand(0.003, 0.009);

      this.flipTimer = Math.floor(rand(200, 800));
    }

    update () {
      this.dir   += (Math.random() - 0.5) * this.drift * 6;
      this.angle += this.rotVel;
      this.breathPhase += this.breathSpeed;

      this.x += Math.cos(this.dir) * this.speed;
      this.y += Math.sin(this.dir) * this.speed;

      this.flipTimer--;
      if (this.flipTimer <= 0) {
        this.speed  = rand(CFG.minSpeed, CFG.maxSpeed);
        this.dir   += (Math.random() - 0.5) * Math.PI; 
        this.flipTimer = Math.floor(rand(200, 800));
      }

      // Seamless wrap
      if (this.x < -150) this.x = W + 150;
      if (this.x > W+150) this.x = -150;
      if (this.y < -150) this.y = H + 150;
      if (this.y > H+150) this.y = -150;
    }

    draw () {
      const breathAlpha = this.alpha + Math.sin(this.breathPhase) * this.breathAmp;
      ctx.save();
      ctx.globalAlpha = Math.max(0, breathAlpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(this.scale, this.scale);

      if (logoImg && logoReady) {
        // Render logo image centred
        const w = logoImg.naturalWidth  || 200;
        const h = logoImg.naturalHeight || 80;
        
        // Apply filter for a clean white "ghost" look
        ctx.filter = 'grayscale(1) brightness(2)'; 
        ctx.drawImage(logoImg, -w / 2, -h / 2, w, h);
        ctx.filter = 'none';
      } else {
        // Fallback text mark if image fails
        ctx.font      = CFG.logoFont;
        ctx.fillStyle = CFG.logoColor;
        ctx.textAlign  = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(CFG.logoImage, 0, 0);
      }

      ctx.restore();
    }
  }

  /* ── UTILITY ─────────────────────────────────────────────── */
  function rand (min, max) { return min + Math.random() * (max - min); }

  /* ── INIT PARTICLES ─────────────────────────────────────── */
  function init () {
    particles = [];
    for (let i = 0; i < CFG.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  /* ── RENDER LOOP ─────────────────────────────────────────── */
  function render () {
    ctx.clearRect(0, 0, W, H);

    if (logoReady) {
      particles.forEach(p => { p.update(); p.draw(); });
    }

    requestAnimationFrame(render);
  }

  /* ── START ANIMATION ────────────────────────────────────── */
  init(); 
  render();

  /* ── PUBLIC METHODS ─────────────────────────────────────── */
  window.PDS_setBgLogo = function (src) {
    CFG.logoImageSrc = src;
    logoReady = false;
    loadLogoImage();
  };

  window.PDS_setBgText = function (text) {
    CFG.logoImage = text;
    CFG.logoImageSrc = null;
    logoImg = null;
    logoReady = true;
  };

})();