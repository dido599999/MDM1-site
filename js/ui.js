// ═══ نظام التنقل بين الصفحات والأقسام (Single Page Router) ═══
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // إذا كان رابط خارجي مثل صفحة الـ Whitepaper لا توقفه
        if (!targetId.startsWith('#')) return;
        
        e.preventDefault();
        
        // إزالة الكلاس النشط من التبويبات والصفحات السابقة
        document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // تفعيل التبويب والصفحة الجديدة
        this.classList.add('active');
        const targetPage = document.querySelector(targetId);
        if(targetPage) targetPage.classList.add('active');
        
        // إغلاق قائمة الموبايل تلقائياً عند النقر على خيار
        const navLinks = document.getElementById('navLinks');
        if(navLinks) navLinks.classList.remove('open');
    });
});

// ═══ تفعيل قائمة الموبايل التجاوبية (Hamburger Menu) ═══
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ═══ زر نسخ عنوان العقد الذكي ═══
function copyContract() {
    const addressText = document.getElementById('contractAddress').innerText;
    navigator.clipboard.writeText(addressText).then(() => {
        alert('تم نسخ عنوان العقد بنجاح لاستيراده بالمحفظة!');
    }).catch(err => {
        console.error('فشل في النسخ: ', err);
    });
}

// ═══ محاكي المبادلة الفورية الذكية (Swap Calculator) ═══
const swapInput = document.getElementById('swapInput');
const swapOutput = document.getElementById('swapOutput');
if(swapInput && swapOutput) {
    swapInput.addEventListener('input', function() {
        const val = parseFloat(this.value);
        if(!isNaN(val) && val > 0) {
            // بافتراض أن السعر التقريبي 1.15 دولار لكل وحدة MDM1
            swapOutput.value = (val / 1.15).toFixed(2);
        } else {
            swapOutput.value = '0.0';
        }
    });
}

// ═══ مساعد الذكاء الاصطناعي (AI Chatbot Logic) ═══
const aiToggle = document.getElementById('aiToggle');
const aiChatbox = document.getElementById('aiChatbox');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');
const chatLogs = document.getElementById('chatLogs');

if(aiToggle && aiChatbox) {
    aiToggle.addEventListener('click', () => {
        aiChatbox.classList.toggle('open');
    });
}

if(chatSend && chatInput && chatLogs) {
    const handleSend = () => {
        const text = chatInput.value.trim();
        if(!text) return;
        
        // إضافة رسالة المستخدم للدردشة
        appendMessage(text, 'user');
        chatInput.value = '';
        
        // رد آلي ذكي تجريبي يحاكي الفحص الشرعي والفني للمنظومة
        setTimeout(() => {
            let reply = "بصفتي مستشار MDM1، نؤكد أن جميع عقودنا مبنية بالكامل على التبادل الحقيقي المباشر وتجنب المشتقات الربوية والخداع الصوري وموثقة برمجياً.";
            if(text.includes('شريعة') || text.includes('حلال') || text.includes('شرعي')) {
                reply = "بالتأكيد، المنظومة خضعت لتدقيق مالي إسلامي صارم؛ حيث تبتعد كلياً عن الإقراض بفائدة أو عقود الغرر والخيارات الوهمية.";
            } else if (text.includes('شراء') || text.includes('كيف')) {
                reply = "يمكنك شراء الأصول عن طريق ربط محفظتك الرقمية (مثل MetaMask) ببوابة التبادل في قسم الـ Hub واستخدام عملة USDT عبر Polygon.";
            }
            appendMessage(reply, 'bot');
        }, 800);
    };

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSend(); });
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender);
    msgDiv.textContent = text;
    chatLogs.appendChild(msgDiv);
    chatLogs.scrollTop = chatLogs.scrollHeight; // النزول التلقائي لأسفل الشات
}

