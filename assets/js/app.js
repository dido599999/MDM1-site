// ========================
// UI Functions
// ========================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    window.scrollTo(0, 0);
}
function toggleDD(id) {
    document.getElementById(id).classList.toggle('open');
}
function closeDD() {
    document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
}
document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navMenu')?.classList.remove('open'));
});
function skipIntro() {
    document.getElementById('intro').classList.add('gone');
}
setTimeout(() => document.getElementById('intro')?.classList.add('gone'), 4200);
function connectWallet() {
    alert("🔗 سيتم تفعيل ربط المحفظة بعد الإدراج مباشرة.");
}
function copyContract() {
    navigator.clipboard.writeText("0x0a4E17e4F9c179a310069711069c346CFCf13c3f");
    document.getElementById('toast').style.display = 'block';
    setTimeout(() => document.getElementById('toast').style.display = 'none', 2000);
}
function openLB(imgSrc, caption) {
    document.getElementById('lb-img').src = imgSrc;
    document.getElementById('lb-cap').innerText = caption;
    document.getElementById('lightbox').classList.add('open');
}
function closeLB() {
    document.getElementById('lightbox').classList.remove('open');
}
function toggleFaq(element) {
    element.classList.toggle('open');
    const answer = element.nextElementSibling;
    if (answer.style.maxHeight) answer.style.maxHeight = null;
    else answer.style.maxHeight = answer.scrollHeight + "px";
}
function toggleChat() {
    document.getElementById('chatbox').classList.toggle('open');
}
function sendChatMsg() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    const container = document.querySelector('.chat-msgs');
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.innerText = msg;
    container.appendChild(userDiv);
    input.value = '';
    container.scrollTop = container.scrollHeight;
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-msg';
        botDiv.innerText = "شكراً لتواصلك. هذا نموذج توضيحي، سيتم ربط المساعد الفعلي بعد الإدراج.";
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 500);
}
function closeWpModal() {
    document.getElementById('wpModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
// ========================
// Clock
// ========================
function updateClock() {
    const now = new Date();
    document.getElementById('clk').innerHTML = `🕒 ${now.toLocaleTimeString('ar-EG')}`;
}
setInterval(updateClock, 1000);
updateClock();
// ========================
// Reveal on scroll
// ========================
const reveals = document.querySelectorAll('.reveal');
function checkReveal() {
    for (let el of reveals) {
        const top = el.getBoundingClientRect().top;
        const winHeight = window.innerHeight;
        if (top < winHeight - 100) el.classList.add('on');
    }
}
window.addEventListener('scroll', checkReveal);
checkReveal();
// ========================
// Ticker animation
// ========================
const tickerInner = document.querySelector('.ticker-inner');
if (tickerInner) {
    const clone = tickerInner.cloneNode(true);
    tickerInner.parentElement.appendChild(clone);
}
// ========================
// Init
// ========================
showPage('mystic');
