// ═══════════════════════════════════════════
//  MDm1 — بوابة الفراعنة | game.js
//  المنطق الكامل للعبة
// ═══════════════════════════════════════════

const GAME = (() => {

  // ── حالة اللعبة ──
  let state = {
    level: 1,
    score: 0,
    lives: CONFIG.MAX_LIVES,
    streak: 0,           // إجابات صح متتالية
    hintsUsed: 0,
    questionsAnswered: 0,
    currentQuestion: null,
    currentType: null,
    lang: "ar",
    playerName: "",
    isRegistered: false,
    gamePhase: "intro",  // intro | playing | transition | gameover | win
    usedQuestionIds: new Set(),
    aiAvailable: false
  };

  // ── كشف اللغة ──
  function detectLang() {
    const lang = navigator.language || navigator.userLanguage || "ar";
    if (lang.startsWith("ar")) return "ar";
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("tr")) return "tr";
    return "en";
  }

  // ── النصوص متعددة اللغات ──
  const T = {
    ar: {
      correct: "✨ إجابة صحيحة!",
      wrong: "❌ إجابة خاطئة",
      hint: "💡 تلميح",
      levelUp: "🏛️ باب جديد يفتح...",
      gameOver: "💀 انتهت المحاولات",
      lives: "أرواح",
      score: "نقاط",
      level: "المستوى",
      nextLevel: "المضي قُدُماً",
      tryAgain: "المحاولة مجدداً",
      backHome: "العودة للموقع",
      loading: "الكاهن يستدعي سؤالاً...",
      register: "سجّل لحفظ تقدمك",
      skip: "تخطي",
      hintUsed: "تلميح واحد فقط لكل سؤال",
      streak2: "🔥 سلسلة صواب!",
      streak5: "⚡ لا يُوقَف!",
    },
    en: {
      correct: "✨ Correct!",
      wrong: "❌ Wrong answer",
      hint: "💡 Hint",
      levelUp: "🏛️ A new door opens...",
      gameOver: "💀 No lives left",
      lives: "Lives",
      score: "Score",
      level: "Level",
      nextLevel: "Move Forward",
      tryAgain: "Try Again",
      backHome: "Back to Site",
      loading: "The priest summons a question...",
      register: "Register to save progress",
      skip: "Skip",
      hintUsed: "Only one hint per question",
      streak2: "🔥 On a streak!",
      streak5: "⚡ Unstoppable!",
    },
    fr: {
      correct: "✨ Bonne réponse!",
      wrong: "❌ Mauvaise réponse",
      hint: "💡 Indice",
      levelUp: "🏛️ Une nouvelle porte s'ouvre...",
      gameOver: "💀 Plus de vies",
      lives: "Vies",
      score: "Score",
      level: "Niveau",
      nextLevel: "Avancer",
      tryAgain: "Réessayer",
      backHome: "Retour au site",
      loading: "Le prêtre invoque une question...",
      register: "Inscrivez-vous pour sauvegarder",
      skip: "Passer",
      hintUsed: "Un seul indice par question",
      streak2: "🔥 En série!",
      streak5: "⚡ Inarrêtable!",
    }
  };

  function t(key) {
    return (T[state.lang] || T.en)[key] || T.en[key] || key;
  }

  // ── طلب سؤال من الذكاء الاصطناعي ──
  async function fetchAIQuestion(level, lang) {
    const levelData = LEVELS[Math.min(level - 1, LEVELS.length - 1)];
    const difficulty = levelData ? levelData.difficulty : Math.min(level, 10);

    const prompt = `أنت كاهن فرعوني حارس بوابة الهرم.
اصنع سؤالاً واحداً فريداً لمستوى الصعوبة ${difficulty}/10.
اللغة: ${lang === "ar" ? "العربية" : "الإنجليزية"}.
المستوى: ${level}.

القواعد:
- السؤال لم يُطرح من قبل
- 4 خيارات فقط (أ، ب، ج، د)
- الأسئلة الدينية: لا رعب، فقط حكمة وتذكير
- تنوع: تاريخ، علوم، جغرافيا، ألغاز، حضارات
- الصعوبة تزيد مع المستوى

أجب بـ JSON فقط هكذا:
{
  "text": "نص السؤال",
  "options": ["الخيار أ", "الخيار ب", "الخيار ج", "الخيار د"],
  "correct": 0,
  "type": "history|science|riddle|religious_reminder|death|heaven|hellfire|horror_allowed",
  "hint": "تلميح خفيف بدون إفساد الإجابة",
  "points": ${100 + (level * 10)}
}`;

    // جرب Gemini أولاً
    try {
      const res = await Promise.race([
        fetchGemini(prompt),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), CONFIG.AI_TIMEOUT_MS))
      ]);
      if (res) return res;
    } catch (e) { console.log("Gemini failed, trying OpenAI..."); }

    // جرب OpenAI ثانياً
    try {
      const res = await Promise.race([
        fetchOpenAI(prompt),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), CONFIG.AI_TIMEOUT_MS))
      ]);
      if (res) return res;
    } catch (e) { console.log("OpenAI failed, trying DeepSeek..."); }

    // جرب DeepSeek ثالثاً
    try {
      const res = await Promise.race([
        fetchDeepSeek(prompt),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), CONFIG.AI_TIMEOUT_MS))
      ]);
      if (res) return res;
    } catch (e) { console.log("All AI failed, using fallback."); }

    // Fallback — أسئلة محلية
    return getFallbackQuestion(lang);
  }

  // ── Gemini ──
  async function fetchGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.AI_MODEL_GEMINI}:generateContent?key=${CONFIG.GEMINI_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return parseAIResponse(text);
  }

  // ── OpenAI ──
  async function fetchOpenAI(prompt) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONFIG.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.AI_MODEL_OPENAI,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400
      })
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return parseAIResponse(text);
  }

  // ── DeepSeek ──
  async function fetchDeepSeek(prompt) {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONFIG.DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.AI_MODEL_DEEPSEEK,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400
      })
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return parseAIResponse(text);
  }

  // ── تحليل رد الذكاء الاصطناعي ──
  function parseAIResponse(text) {
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      const json = JSON.parse(clean);
      if (json.text && json.options && json.options.length === 4 && typeof json.correct === "number") {
        return json;
      }
    } catch (e) {}
    return null;
  }

  // ── سؤال احتياطي ──
  function getFallbackQuestion(lang) {
    const pool = FALLBACK_QUESTIONS[lang] || FALLBACK_QUESTIONS.ar;
    const available = pool.filter(q => !state.usedQuestionIds.has(q.text));
    if (available.length === 0) {
      state.usedQuestionIds.clear();
      return pool[Math.floor(Math.random() * pool.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
  }

  // ── عرض السؤال ──
  async function loadNextQuestion() {
    UI.showLoading(t("loading"));

    const question = await fetchAIQuestion(state.level, state.lang);
    state.currentQuestion = question;
    state.currentType = QUESTION_TYPES[question.type] || QUESTION_TYPES.history;
    state.usedQuestionIds.add(question.text);

    SCENE.applyAtmosphere(state.currentType);
    UI.renderQuestion(question, state);
  }

  // ── تقييم الإجابة ──
  function answerQuestion(index) {
    if (state.gamePhase !== "playing") return;
    const q = state.currentQuestion;
    const correct = index === q.correct;

    if (correct) {
      state.score += q.points || 100;
      state.streak++;
      state.questionsAnswered++;
      SCENE.playCorrect();
      UI.showFeedback(true, t("correct"), state);
      if (state.streak === 2) UI.showStreakMsg(t("streak2"));
      if (state.streak === 5) UI.showStreakMsg(t("streak5"));
      checkLevelUp();
    } else {
      state.lives--;
      state.streak = 0;
      SCENE.playWrong(state.currentType);
      UI.showFeedback(false, t("wrong"), state);
      if (state.lives <= 0) {
        setTimeout(() => gameOver(), 1200);
        return;
      }
    }

    // سؤال تالٍ بعد تأخير
    setTimeout(() => {
      if (state.gamePhase === "playing") loadNextQuestion();
    }, 1800);
  }

  // ── تلميح ──
  function useHint() {
    if (state.hintsUsed > 0) { UI.showMsg(t("hintUsed")); return; }
    state.hintsUsed++;
    state.score = Math.max(0, state.score - CONFIG.HINT_PENALTY * 10);
    const hint = state.currentQuestion?.hint || "...";
    UI.showHint(hint);
  }

  // ── الترقي للمستوى التالي ──
  function checkLevelUp() {
    if (state.questionsAnswered > 0 && state.questionsAnswered % CONFIG.QUESTIONS_PER_LEVEL === 0) {
      state.level++;
      state.hintsUsed = 0;
      state.gamePhase = "transition";
      SCENE.playLevelUp(state.level);
      UI.showLevelUp(state.level, t("levelUp"), () => {
        state.gamePhase = "playing";
        // عرض نافذة التسجيل بعد المستوى المجاني
        if (state.level > CONFIG.FREE_LEVELS && !state.isRegistered) {
          UI.showRegisterPrompt(t("register"));
        } else {
          loadNextQuestion();
        }
      });
    }
  }

  // ── نهاية اللعبة ──
  function gameOver() {
    state.gamePhase = "gameover";
    SCENE.playGameOver();
    UI.showGameOver(state.score, t("gameOver"), t("tryAgain"), t("backHome"), () => resetGame());
  }

  // ── إعادة تشغيل ──
  function resetGame() {
    state.level = 1;
    state.score = 0;
    state.lives = CONFIG.MAX_LIVES;
    state.streak = 0;
    state.hintsUsed = 0;
    state.questionsAnswered = 0;
    state.currentQuestion = null;
    state.gamePhase = "playing";
    state.usedQuestionIds.clear();
    SCENE.reset();
    UI.resetUI(state);
    loadNextQuestion();
  }

  // ── بدء اللعبة ──
  function init() {
    state.lang = detectLang();
    state.gamePhase = "playing";
    UI.init(state, { answer: answerQuestion, hint: useHint, reset: resetGame, t });
    SCENE.init();
    loadNextQuestion();
  }

  // وظائف مكشوفة لـ GAME_UI في HTML
  function _answer(idx)  { answerQuestion(idx); }
  function _hint()       { useHint(); }
  function _continueAfterRegister() { loadNextQuestion(); }

  return { init, state, t, _answer, _hint, _continueAfterRegister };

})();

// ── تشغيل عند تحميل الصفحة ──
window.addEventListener("DOMContentLoaded", () => GAME.init());
