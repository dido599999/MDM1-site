// ── 1. سكريبت توليد غبار الذهب الكوني بشكل ديناميكي دون إثقال الصفحة ──
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("particles-container");
  const particleCount = 60; // عدد مناسب جداً للأداء وسرعة الهواتف

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("gold-dust");
    
    // مقاسات عشوائية ومواقع توزيع متباينة
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    
    // توقيتات أنيميشن متباعدة لتبدو كفيلم واقعي
    particle.style.animationDuration = `${Math.random() * 12 + 6}s`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    
    container.appendChild(particle);
  }
});

// ── 2. محرك التمرير الذكي (Intersection Observer) للفيلم التفاعلي ──
const scenes = document.querySelectorAll(".chapter-scene");
const globalHub = document.getElementById("globalHub");

const sceneObserverOptions = {
  threshold: 0.2, // يظهر الأنيميشن بمجرد دخول 20% من الفصل للشاشة
  rootMargin: "0px 0px -10% 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
      
      // تأثير بصري حركي عند الدخول (تكبير رمزي خفيف)
      const visual = entry.target.querySelector(".story-visual");
      if (visual) {
        visual.style.transform = "scale(1.15) rotate(5deg)";
        setTimeout(() => {
          visual.style.transform = "scale(1) rotate(0deg)";
        }, 600);
      }

      // إذا وصل المستخدم لآخر مشهد، تظهر واجهة الـ Hub تلقائياً بانسجام وتذوب الخلفية
      if (entry.target.id === "sec-ch6") {
        globalHub.classList.add("view-active");
      }
    }
  });
}, sceneObserverOptions);

scenes.forEach((scene) => observer.observe(scene));

// مراقبة الـ Hub مباشرة أيضاً للتأكيد البصري عند النزول لأسفل تماماً
const hubObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      globalHub.classList.add("view-active");
    }
  });
}, { threshold: 0.05 });

hubObserver.observe(globalHub);

// ── 3. دوال التنقل المباشر والنسخ ──
function goToHub() {
  globalHub.scrollIntoView({ behavior: "smooth" });
  globalHub.classList.add("view-active");
}

function replayMovie() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function copyTokenAddress() {
  const addressText = document.getElementById("tokenAddress").innerText;
  navigator.clipboard.writeText(addressText).then(() => {
    alert("🚀 تم نسخ عنوان عقد MDM1 بنجاح إلى الحافظة!");
  }).catch(() => {
    alert("فشل النسخ التلقائي، برجاء نسخه يدوياً.");
  });
}
