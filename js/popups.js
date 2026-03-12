/* ============================================================
   PARAMOUNT DIGITAL SERVICES — popups.js
   ============================================================ */

/* ── OPEN / CLOSE ─────────────────────────────────────────── */
function openPopup (name) {
  document.body.style.overflow = 'hidden';
  const el = document.getElementById('popup-' + name);
  if (el) el.classList.add('active');
}

function closePopup (name) {
  const el = document.getElementById('popup-' + name);
  if (el) el.classList.remove('active');
  document.body.style.overflow = '';
}

function closePopupOnOverlay (e, name) {
  if (e.target === e.currentTarget) closePopup(name);
}

/* ── ESC KEY ─────────────────────────────────────────────── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup-overlay.active').forEach(function (p) {
      p.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

/* ── WORK DETAIL DATA ─────────────────────────────────────── */
var workData = {
  'brand-overhaul': {
    icon  : '🎨',
    tags  : ['Branding', 'Identity', 'Logo Design', 'Print'],
    title : 'LuxCore Brand Overhaul',
    desc  : 'LuxCore approached us with a dated identity that no longer reflected their premium positioning. We rebuilt their brand from the ground up — new logo, colour system, typography, and a full brand guideline document — resulting in a 40 % increase in perceived brand value and a 25 % conversion uplift on their sales decks.',
    scope : 'Full Brand Identity',
    dur   : '3 Weeks',
    result: '+40% Brand Equity'
  },
  'social-campaign': {
    icon  : '📱',
    tags  : ['Social Media', 'Content Strategy', 'Growth'],
    title : 'NovaTrend Social Campaign',
    desc  : 'A 3-month full-service social media management project for NovaTrend, a lifestyle brand targeting Gen Z. We created a cohesive content calendar, produced all visual assets, and executed a targeted growth strategy that grew their Instagram from 2 K to 18 K followers with an average engagement rate of 8.4 %.',
    scope : 'Social Media Management',
    dur   : '3 Months',
    result: '16K+ New Followers'
  },
  'web-launch': {
    icon  : '💻',
    tags  : ['Web Design', 'Development', 'UX/UI'],
    title : 'Vertex Agency Website',
    desc  : 'A complete web design and development project for Vertex, a boutique consulting agency. We designed and built a multi-page, fully responsive website with custom animations, a CMS, and conversion-optimised landing pages. Site load time came in under 1.2 seconds and inquiry submissions increased by 300 % vs. their old site.',
    scope : 'Web Design & Dev',
    dur   : '5 Weeks',
    result: '+300% Inquiries'
  },
  'video-series': {
    icon  : '🎬',
    tags  : ['Video Production', 'Content', 'Editing'],
    title : 'Apex Product Video Series',
    desc  : 'Apex needed a compelling video content series to launch three new product lines simultaneously. We scripted, directed, and edited a 6-part series optimised for YouTube, Instagram Reels, and TikTok. The series accumulated over 2 million organic views in the first month, driving a 60 % spike in online sales.',
    scope : 'Video Production',
    dur   : '4 Weeks',
    result: '2M+ Organic Views'
  }
};

function openWorkDetail (key) {
  var d = workData[key];
  if (!d) return;

  document.getElementById('work-popup-title').textContent = d.title;
  document.getElementById('work-popup-body').innerHTML = [
    '<div class="work-detail-img">' + d.icon + '</div>',
    '<div class="work-detail-tags">',
      d.tags.map(function (t) { return '<span class="work-detail-tag">' + t + '</span>'; }).join(''),
    '</div>',
    '<div class="work-detail-title">' + d.title + '</div>',
    '<p class="work-detail-desc">' + d.desc + '</p>',
    '<div class="work-detail-meta">',
      '<div class="meta-item"><div class="meta-label">Scope</div><div class="meta-value">' + d.scope + '</div></div>',
      '<div class="meta-item"><div class="meta-label">Duration</div><div class="meta-value">' + d.dur + '</div></div>',
      '<div class="meta-item"><div class="meta-label">Outcome</div><div class="meta-value">' + d.result + '</div></div>',
    '</div>'
  ].join('');

  openPopup('work');
}

/* ── CONTACT FORM ─────────────────────────────────────────── */
function handleFormSubmit (e) {
  e.preventDefault();
  closePopup('contact');
  showToast('Message sent — we\'ll reply within 24 hours.');
  e.target.reset();
}

/* ── TOAST ────────────────────────────────────────────────── */
function showToast (msg) {
  var toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 4200);
}
