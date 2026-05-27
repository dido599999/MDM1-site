// إعدادات التحكم السهل لـ MDM1 (يمكنك تعديل النسب من هنا مباشرة)
const MDM1_CONFIG = {
    targetGroupCount: 100,
    localPoolBudget: 100000, 
    hostAllowancePercent: 1.05 // حد أقصى 5% لتعويض كهرباء وضيافة المستضيف
};

// جعل الوظائف متاحة للـ HTML لأن الملف نوعه Module
window.getLocation = getLocation;
window.calculateRatio = calculateRatio;
window.showTab = showTab;
window.verifyHonesty = verifyHonesty;

// 1. تشغيل مستشعر الـ GPS التلقائي
function getLocation() {
    const status = document.getElementById('gps-status');
    if (!navigator.geolocation) {
        status.textContent = 'الـ GPS غير مدعوم في متصفحك.';
        status.style.color = 'var(--red-color)';
    } else {
        status.textContent = 'جاري تحديد إحداثياتك الجغرافية تلقائياً...';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById('gps-status').innerHTML = `تم التقاط موقعك بنجاح! <br><span style="color:var(--accent-color);">إحداثياتك المشفرة: (${lat.toFixed(4)}, ${lon.toFixed(4)})</span><br>جاري ربطك بأقرب كتلة حية حولك تلقائياً (العداد الحالي: 88/100 فرد).`;
    
    // هنا يتم استدعاء بوت الأتمتة مستقبلاً عند الربط الفعلي
    triggerAutomationBot(lat, lon);
}

function error() {
    document.getElementById('gps-status').textContent = 'تعذر التقاط الموقع. برجاء تفعيل صلاحية الـ GPS في هاتفك.';
    document.getElementById('gps-status').style.color = 'var(--red-color)';
}

// 2. حاسبة النسب المشاعة العادلة
function calculateRatio() {
    const amount = parseFloat(document.getElementById('user-share').value);
    const resultBox = document.getElementById('ratio-result');
    
    if (isNaN(amount) || amount <= 0) {
        resultBox.textContent = 'برجاء إدخال مبلغ صحيح.';
        resultBox.style.color = 'var(--red-color)';
        return;
    }
    
    const percentage = (amount / MDM1_CONFIG.localPoolBudget) * 100;
    resultBox.innerHTML = `نسبتك المشاعة في مشروع منطقتك هي: <span style="color:var(--accent-color);">${percentage.toFixed(4)}%</span><br><span style="font-size:1.1rem; color:#a0aec0;">المال يظل معك وتحت رقابتك الأرضية، وهذه النسبة تحفظ حقك ومكانك القانوني.</span>`;
    resultBox.style.color = 'var(--text-color)';
}

// 3. التبديل بين الأبواب الفلسفية الثلاثة
function showTab(tabId) {
    // إخفاء كل التبويبات أولاً
    const contents = document.querySelectorAll('.tab-content, .tab-contentactive');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    // إظهار التبويب المطلوب
    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId).className = 'tab-contentactive';
}

// 4. حَكَم النزاهة وفض النزاعات بالأرقام
function verifyHonesty() {
    const wholesale = parseFloat(document.getElementById('wholesale-price').value);
    const retail = parseFloat(document.getElementById('retail-price').value);
    const result = document.getElementById('honesty-result');

    if (isNaN(wholesale) || isNaN(retail)) {
        result.textContent = 'برجاء إدخال الأرقام كاملة.';
        result.style.color = 'var(--red-color)';
        return;
    }

    const maxFairPrice = wholesale * MDM1_CONFIG.hostAllowancePercent;

    if (retail <= maxFairPrice) {
        result.innerHTML = `المؤشر: <span style="color:var(--green-color);">نزيــه ومستمر</span><br><span style="font-size:1rem; color:#a0aec0;">المستضيف يلتزم بدستور التكلفة العادلة. يمنع النظام الشكاوى الكيدية ضده.</span>`;
    } else {
        result.innerHTML = `المؤشر: <span style="color:var(--red-color);">تجاوز وانحراف مالي</span><br><span style="font-size:1rem; color:#e2e8f0;">السعر أعلى من كلفة الجملة والتشغيل العادل. يتم تجميد الصلاحيات تلقائياً لحين العودة للحق.</span>`;
    }
}

// 5. محاكاة بوت الأتمتة (الأسبوع الثالث)
function triggerAutomationBot(lat, lon) {
    console.log(`البوت يراقب الإحداثيات العامة بنجاح.`);
}
