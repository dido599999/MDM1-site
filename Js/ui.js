// ═══════════════════════════════════════
// MDM1 — ui.js  |  واجهة المستخدم
// ═══════════════════════════════════════

// ── LIGHTBOX ──
function openLB(img, cap) {
  document.getElementById('lb-img').src = img;
  document.getElementById('lb-cap').textContent = cap;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ── FAQ ──
function toggleFaq(el) {
  var ans = el.nextElementSibling;
  var ico = el.querySelector('.faq-icon');
  var isOpen = !!ans.style.maxHeight && ans.style.maxHeight !== '0px';
  document.querySelectorAll('.faq-a').forEach(function (a) { a.style.maxHeight = ''; });
  document.querySelectorAll('.faq-icon').forEach(function (i) { i.textContent = '+'; i.style.transform = ''; });
  if (!isOpen) {
    ans.style.maxHeight = ans.scrollHeight + 'px';
    ico.textContent = '−'; ico.style.transform = 'rotate(180deg)';
  }
}

// ── TOAST ──
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg; t.style.display = 'block';
  setTimeout(function () { t.style.display = 'none'; }, 3000);
}

// ── CONTRACT ──
function copyContract() {
  navigator.clipboard.writeText(document.getElementById('contractAddr').textContent.trim())
    .then(function () { showToast('✅ تم نسخ عنوان العقد'); })
    .catch(function () { showToast('❌ فشل النسخ — انسخ يدوياً'); });
}

// ── WALLET ──
async function connectWallet() {
  if (window.ethereum) {
    try {
      var acc = await ethereum.request({ method: 'eth_requestAccounts' });
      try {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x89' }] });
      } catch (se) {
        if (se.code === 4902) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: '0x89', chainName: 'Polygon Mainnet', nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }, rpcUrls: ['https://polygon-rpc.com/'], blockExplorerUrls: ['https://polygonscan.com/'] }]
          });
        }
      }
      showToast('✅ تم الربط: ' + acc[0].slice(0, 10) + '...');
    } catch (e) { showToast('❌ تم إلغاء الاتصال'); }
  } else {
    window.open('https://metamask.io/download/', '_blank');
  }
}

// ── AI CHAT ──
function toggleChat() { document.getElementById('chatbox').classList.toggle('open'); }

var chatReplies = {
  'عقد':     'العقد: 0x0a4E17e4F9c179a310069711069c346CFCf13c3f على Polygon.',
  'contract':'Contract: 0x0a4E17e4F9c179a310069711069c346CFCf13c3f on Polygon.',
  'شراء':    'اشترِ MDM1 عبر QuickSwap على Polygon. الرابط في صفحة HUB.',
  'buy':     'Buy MDM1 via QuickSwap on Polygon network.',
  'حلال':    'نعم، MDM1 متوافق مع الشريعة — بدون ربا أو غرر.',
  'شريعة':   'MDM1 متوافق مع الشريعة الإسلامية.',
  'سعر':     'السعر قيد التحديث فور الإدراج الرسمي.',
  'polygon': 'MDM1 على Polygon POS — سريعة ورسوم منخفضة.',
  'مشاركة': 'نظام المشاركة يطلق في المرحلة الثانية.',
  'whitepaper': 'الورقة البيضاء متاحة على: mdm1.org/pages/whitepaper.html',
};

function sendMsg() {
  var inp = document.getElementById('chatIn');
  var msg = inp.value.trim(); if (!msg) return;
  var box = document.getElementById('chatMsgs');
  var uDiv = document.createElement('div');
  uDiv.className = 'chat-msg user'; uDiv.textContent = msg; box.appendChild(uDiv);
  inp.value = '';
  setTimeout(function () {
    var bDiv = document.createElement('div'); bDiv.className = 'chat-msg';
    var rep = 'شكراً لسؤالك. تصفح مكتبة MDM1 أو انضم لمجتمعنا على X.';
    for (var k in chatReplies) { if (msg.includes(k)) { rep = chatReplies[k]; break; } }
    bDiv.textContent = rep; box.appendChild(bDiv); box.scrollTop = box.scrollHeight;
  }, 500);
  box.scrollTop = box.scrollHeight;
}

