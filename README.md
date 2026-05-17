# MDm1 — صراع الأزل | Official Website

## هيكل المشروع

```
mdm1-site/
├── index.html          ← الصفحة الرئيسية
├── images/             ← مجلد الصور (PNG أصلية)
│   ├── hero-mountain.png       → الفصل 0: البطل على القمة
│   ├── hoodie-eye-horus.png    → الفصل 1: الوريث الرقمي
│   ├── dark-creature.png       → الفصل 2: المضلل الأعور
│   ├── portal-cloaked.png      → الفصل 3: الإنسان على المفترق
│   ├── magic-book-cave.png     → الفصل 4: الصراع الأعظم (يسار)
│   ├── white-owl.png           → الفصل 4: الصراع الأعظم (يمين)
│   ├── inner-light-poster.png  → الفصل 5: الجسر بين الحضارتين
│   ├── gold-coin-mdm.png       → الفصل 6: الخاتمة (دائرة)
│   └── md111-token.png         → الفصل 6: الخاتمة (عريضة)
└── README.md           ← هذا الملف
```

## كيفية التعديل

- **تغيير صورة**: ضع الصورة الجديدة في مجلد `images/` بنفس الاسم
- **تغيير النص**: ابحث عن `Chapter I` أو رقم الفصل في `index.html`
- **إضافة صفحة**: أنشئ ملف HTML جديد وربطه من القائمة

## الرفع على GitHub

```bash
git init
git add .
git commit -m "MDm1 website initial commit"
git remote add origin https://github.com/USERNAME/mdm1-site.git
git push -u origin main
```
