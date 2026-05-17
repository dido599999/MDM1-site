// ═══════════════════════════════════════
// MDM1 — app.js  |  المنطق الأساسي
// ═══════════════════════════════════════

// ── INTRO ──
var introT = setTimeout(skipIntro, 6500);
function skipIntro() {
  clearTimeout(introT);
  var el = document.getElementById('intro');
  if (el) el.classList.add('gone');
}

// ── CLOCK ──
function updateClock() {
  var el = document.getElementById('clk');
  if (el) el.textContent = '🕒 ' + new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh', hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// ── NAVBAR ──
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      document.getElementById('navMenu').classList.toggle('open');
    });
  }
  // scroll reveal
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
});

function toggleDD(id) {
  var item = document.getElementById(id);
  var isOpen = item.classList.contains('open');
  closeDD();
  if (!isOpen) item.classList.add('open');
}
function closeDD() {
  document.querySelectorAll('.nav-item').forEach(function (el) { el.classList.remove('open'); });
}
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-item')) closeDD();
  var nm = document.getElementById('navMenu');
  if (nm && !e.target.closest('nav')) nm.classList.remove('open');
});

// ── PARTICLES ──
(function () {
  var cv = document.getElementById('bg');
  if (!cv) return;
  var cx = cv.getContext('2d');
  var W, H, pts = [];
  function sz() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  window.addEventListener('resize', sz); sz();
  for (var i = 0; i < 65; i++)
    pts.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + 0.4, sx: (Math.random() - .5) * .26, sy: (Math.random() - .5) * .26, a: Math.random() * .42 + .12, g: true });
  function draw() {
    cx.clearRect(0, 0, W, H);
    pts.forEach(function (p) {
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = 'rgba(212,175,55,' + p.a + ')'; cx.fill();
      p.x += p.sx; p.y += p.sy;
      if (p.x < 0 || p.x > W) p.sx *= -1;
      if (p.y < 0 || p.y > H) p.sy *= -1;
      if (p.g) { p.a += .0014; if (p.a >= .6) p.g = false; }
      else     { p.a -= .0014; if (p.a <= .12) p.g = true; }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── PARALLAX ──
window.addEventListener('scroll', function () {
  var y = window.scrollY;
  document.querySelectorAll('.msec-bg').forEach(function (bg, i) {
    bg.style.transform = 'translateY(' + (y * .045 * (i % 3 + 1)) + 'px)';
  });
});

// ── MARKET DATA ──
(async function () {
  try {
    var r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=mdm1&vs_currencies=usd');
    if (r.ok) {
      var d = await r.json();
      if (d.mdm1 && d.mdm1.usd) {
        var el = document.getElementById('livePrice');
        if (el) el.textContent = '💰 السعر: $' + d.mdm1.usd;
      }
    }
  } catch (e) {}
})();

