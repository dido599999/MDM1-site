// ═══════════════════════════════════════════
//  MDm1 — بوابة الفراعنة | config.js
//  ضع مفاتيحك هنا فقط — لا ترسلها لأحد
// ═══════════════════════════════════════════

const CONFIG = {

  // ── مفاتيح الذكاء الاصطناعي ──
  GEMINI_KEY:   "AIzaSyB1Ih_qTN2FGqBgfUc3jXpPGvZa0VMoB1M",
  OPENAI_KEY:   "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",
  DEEPSEEK_KEY: "sk-120793c9eed14f528c70c0956c5510b8",
  TELEGRAM_TOKEN: "8897865760:AAFaZcYzjw5DTirFReAQ2-nVzxgZ0dplbgY",

  // ── إعدادات اللعبة ──
  MAX_LIVES: 3,
  QUESTIONS_PER_LEVEL: 3,
  HINT_PENALTY: 1,        // نقاط تُخصم عند طلب تلميح
  FREE_LEVELS: 5,         // مستويات مجانية قبل التسجيل

  // ── إعدادات الذكاء الاصطناعي ──
  AI_MODEL_GEMINI:   "gemini-1.5-flash",
  AI_MODEL_OPENAI:   "gpt-4o-mini",
  AI_MODEL_DEEPSEEK: "deepseek-chat",
  AI_TIMEOUT_MS: 8000,    // 8 ثوانٍ حد أقصى للرد

  // ── Firebase (اختياري - للتسجيل لاحقاً) ──
  FIREBASE: {
    apiKey:            "",
    authDomain:        "",
    projectId:         "",
    storageBucket:     "",
    messagingSenderId: "",
    appId:             ""
  }
};
