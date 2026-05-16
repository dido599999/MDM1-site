// ═══ جلب سعر العملة المباشر ═══
(function(){
    try {
        // يمكنك مستقبلاً استبدال هذا برابط API حقيقي لـ Polygon
        var mockPrice = (Math.random() * (1.25 - 1.10) + 1.10).toFixed(4);
        var el = document.getElementById('livePrice');
        if(el) el.textContent = '💰 سعر التداول المباشر لـ MDM1: $' + mockPrice;
    } catch(e) {
        console.error("خطأ في جلب البيانات الاقتصادية", e);
    }
})();

// ═══ حركية جزيئات الخلفية CANVAS PARTICLES ═══
(function(){
    var cv = document.getElementById('bg');
    if (!cv) return;
    var cx = cv.getContext('2d');
    var W, H, pts = [];
    
    function sz(){
        W = cv.width = window.innerWidth;
        H = cv.height = window.innerHeight;
    }
    window.addEventListener('resize', sz);
    sz();
    
    for(var i=0; i<65; i++) {
        pts.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + 0.4,
            sx: (Math.random() - 0.5) * 0.26,
            sy: (Math.random() - 0.5) * 0.26,
            a: Math.random() * 0.42 + 0.12
        });
    }
    
    function draw(){
        cx.clearRect(0, 0, W, H);
        pts.forEach(function(p){
            cx.beginPath();
            cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            cx.fillStyle = 'rgba(212,175,55,' + p.a + ')';
            cx.fill();
            p.x += p.sx;
            p.y += p.sy;
            if(p.x < 0 || p.x > W) p.sx *= -1;
            if(p.y < 0 || p.y > H) p.sy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

