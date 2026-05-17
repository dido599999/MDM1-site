// js/whitepaper.js — الورقة البيضاء

function openWhitepaperModal() {
  var m = document.getElementById('wpModal');
  if (m) { m.style.display = 'block'; document.body.style.overflow = 'hidden'; }
}
function closeWP() {
  var m = document.getElementById('wpModal');
  if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeWP(); });
