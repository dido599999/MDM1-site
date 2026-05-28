// ═══════════════════════════════════════════
//  MDm1 — بوابة الفراعنة | levels.js
//  بيانات المستويات والغرف والأجواء
// ═══════════════════════════════════════════

const LEVELS = [

  // ══ المستوى 1 — مدخل الهرم ══
  {
    id: 1,
    nameAr: "مدخل الهرم",
    nameEn: "Pyramid Gate",
    scene: "entrance",
    atmosphere: "dawn",       // فجر — نور ذهبي هادئ
    guardian: "guide",        // المرشد — ليس عدواً
    difficulty: 1,
    bgGradient: ["#1a0a00", "#3d1f00", "#6b3a00"],
    ambientSound: "desert_wind",
    particles: "sand",
    priestMessage: {
      ar: "مرحباً أيها الوريث... الهرم يفتح أبوابه لمن يعرف.",
      en: "Welcome, Heir... The pyramid opens for those who know."
    }
  },

  // ══ المستوى 2 — ممر الكهنة ══
  {
    id: 2,
    nameAr: "ممر الكهنة",
    nameEn: "Priests' Corridor",
    scene: "corridor",
    atmosphere: "dusk",       // غروب — غموض خفيف
    guardian: "priest",
    difficulty: 2,
    bgGradient: ["#0a0a1a", "#1a0a2a", "#0d1a0d"],
    ambientSound: "torches",
    particles: "smoke",
    priestMessage: {
      ar: "الكاهن يراقبك... أجب بحكمة.",
      en: "The priest watches... Answer wisely."
    }
  },

  // ══ المستوى 3 — قاعة الآلهة ══
  {
    id: 3,
    nameAr: "قاعة الآلهة",
    nameEn: "Hall of Gods",
    scene: "gods_hall",
    atmosphere: "night",
    guardian: "anubis",
    difficulty: 3,
    bgGradient: ["#050510", "#0a0520", "#050a15"],
    ambientSound: "mystical",
    particles: "stars",
    priestMessage: {
      ar: "أنوبيس يزن قلبك... الحقيقة وحدها تنجيك.",
      en: "Anubis weighs your heart... Only truth saves you."
    }
  },

  // ══ المستوى 4 — غرفة المومياوات ══
  {
    id: 4,
    nameAr: "غرفة المومياوات",
    nameEn: "Chamber of Mummies",
    scene: "mummy_chamber",
    atmosphere: "dark",
    guardian: "mummy",
    difficulty: 4,
    bgGradient: ["#030308", "#080308", "#030803"],
    ambientSound: "deep_silence",
    particles: "dust",
    priestMessage: {
      ar: "الأموات يسمعون... لا تُزعج راحتهم.",
      en: "The dead listen... Do not disturb their rest."
    }
  },

  // ══ المستوى 5 — قلب الهرم ══
  {
    id: 5,
    nameAr: "قلب الهرم",
    nameEn: "Heart of the Pyramid",
    scene: "pyramid_heart",
    atmosphere: "sacred",     // مقدس — نور وظلام معاً
    guardian: "horus",
    difficulty: 5,
    bgGradient: ["#0a0500", "#1a0a00", "#251500"],
    ambientSound: "sacred_hum",
    particles: "golden_light",
    priestMessage: {
      ar: "عين حورس تراك... أنت على المفترق.",
      en: "The Eye of Horus sees you... You stand at the crossroads."
    }
  }

  // المستوى 6+ يُولَّد بالذكاء الاصطناعي تلقائياً في game.js
];

// ═══ تصنيف أنواع الأسئلة وردود الفعل ═══
const QUESTION_TYPES = {

  death: {
    // سؤال عن الموت — تذكرة بهدوء — لا رعب
    sceneOverlay: "dark_mist",
    guardian: "mummy",
    sound: "wind_hollow",
    priestTone: "solemn",      // رصين هادئ
    lightLevel: 0.2,
    allowJump: false           // لا مومياء تقفز — مجرد ظهور بطيء
  },

  heaven: {
    // سؤال عن الجنة — نور وسكينة
    sceneOverlay: "golden_light",
    guardian: "guide",
    sound: "peaceful_hum",
    priestTone: "gentle",
    lightLevel: 0.9,
    allowJump: false
  },

  hellfire: {
    // سؤال عن النار — تحذير حازم لا رعب
    sceneOverlay: "red_glow",
    guardian: "priest",
    sound: "low_warning",
    priestTone: "stern",       // حازم لا مخيف
    lightLevel: 0.3,
    allowJump: false
  },

  religious_reminder: {
    // تذكير ديني — جدي مع احترام
    sceneOverlay: "amber_glow",
    guardian: "priest",
    sound: "silence",
    priestTone: "respectful",
    lightLevel: 0.5,
    allowJump: false
  },

  history: {
    // تاريخ وحضارة
    sceneOverlay: "none",
    guardian: "guide",
    sound: "ambient",
    priestTone: "curious",
    lightLevel: 0.7,
    allowJump: false
  },

  riddle: {
    // لغز منطقي — ترقب وتشويق
    sceneOverlay: "pulse_light",
    guardian: "anubis",
    sound: "tension_pulse",
    priestTone: "mysterious",
    lightLevel: 0.4,
    allowJump: false
  },

  science: {
    sceneOverlay: "blue_shimmer",
    guardian: "guide",
    sound: "ambient",
    priestTone: "curious",
    lightLevel: 0.8,
    allowJump: false
  },

  horror_allowed: {
    // رعب مسموح — غير ديني — مومياء ممكن تظهر
    sceneOverlay: "dark_pulse",
    guardian: "mummy",
    sound: "creak_moan",
    priestTone: "eerie",
    lightLevel: 0.1,
    allowJump: true            // هنا فقط المومياء تتحرك
  }
};

// ═══ أسئلة افتراضية (تعمل بدون AI) ═══
const FALLBACK_QUESTIONS = {
  ar: [
    {
      text: "من هو أول فرعون وحّد مصر العليا والسفلى؟",
      options: ["مينا", "رمسيس", "تحتمس", "أخناتون"],
      correct: 0,
      type: "history",
      points: 100
    },
    {
      text: "ما هو رمز الحياة في الحضارة الفرعونية؟",
      options: ["عنخ", "أوجات", "دجد", "تت"],
      correct: 0,
      type: "history",
      points: 100
    },
    {
      text: "كم يبلغ عدد كواكب المجموعة الشمسية؟",
      options: ["8", "9", "7", "10"],
      correct: 0,
      type: "science",
      points: 100
    },
    {
      text: "ما الذي يزيد كلما أخذت منه؟",
      options: ["الحفرة", "الماء", "النور", "الوقت"],
      correct: 0,
      type: "riddle",
      points: 150
    },
    {
      text: "في أي بلد يقع الهرم الأكبر؟",
      options: ["مصر", "العراق", "المكسيك", "السودان"],
      correct: 0,
      type: "history",
      points: 100
    }
  ],
  en: [
    {
      text: "Who was the first pharaoh to unify Upper and Lower Egypt?",
      options: ["Menes", "Ramesses", "Thutmose", "Akhenaten"],
      correct: 0,
      type: "history",
      points: 100
    },
    {
      text: "What is the symbol of life in ancient Egyptian civilization?",
      options: ["Ankh", "Oudjat", "Djed", "Tyet"],
      correct: 0,
      type: "history",
      points: 100
    },
    {
      text: "How many planets are in our solar system?",
      options: ["8", "9", "7", "10"],
      correct: 0,
      type: "science",
      points: 100
    }
  ]
};
