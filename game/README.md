# MDM1 · Rites of the Duat

لعبة أسئلة ثنائية اللغة (عربي/إنجليزي) بطابع مصري قديم، مبنية بـ React + Tailwind + Supabase في ملف HTML واحد.

## التشغيل المحلي
افتح `index.html` مباشرة في المتصفح. لا يحتاج build أو npm.

## النشر على GitHub Pages
1. أنشئ repository جديد على GitHub.
2. ارفع `index.html` للـ root.
3. من **Settings → Pages** اختر branch `main` ومجلد `/ (root)` ثم Save.
4. الموقع سيكون متاح على `https://<username>.github.io/<repo>/`.

## عن المفاتيح
- `SUPABASE_ANON_KEY` الموجود في الملف هو مفتاح **عام (publishable)** ومصمم للاستخدام في المتصفح. آمن للرفع على GitHub.
- الحماية الفعلية تتم عبر **Row Level Security (RLS)** في Supabase. تأكد أن policies مفعّلة على الجداول: `profiles`, `questions`, `imprints`, `faction_scores`.
- لا ترفع أبداً `SERVICE_ROLE_KEY` (غير مستخدم هنا).

## الجداول المطلوبة في Supabase
- `profiles` (id, display_name, force, credits, streak, imprints, total_score, last_login, last_submission_date, submission_count)
- `questions` (id, text_en, text_ar, options_en, options_ar, correct, category, hint_en, hint_ar, is_active, submitted_by, votes_for, votes_against, approved_at)
- `imprints` (question_id PK, player_name, force, timestamp)
- `faction_scores` (faction PK, score)

## الإصلاحات المُطبَّقة على الكود الأصلي
- إعادة بناء قسم render في `App` الذي كان مقطوعاً.
- إصلاح ترتيب reset للـ timer بين الأسئلة.
- استبدال React development build بـ production build.
- ضمان عرض FULL_SEED حتى لو فشل الاتصال بـ Supabase.
- استكمال نموذج إرسال السؤال (خيارات + رقم الصحيح).
- معالجة أفضل لحالة `user_metadata.display_name` عند التسجيل.
