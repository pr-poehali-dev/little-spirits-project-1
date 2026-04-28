import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ORDER_URL = "https://functions.poehali.dev/119cd058-54f2-4013-b08c-9573f9d6d7c6";

const HEROES = [
  {
    id: 1,
    name: "Король Шишун",
    role: "Хранитель дома",
    emotion: "тревога",
    description: "Создаёт уют, защищает пространство от хаоса и возвращает чувство спокойствия.",
    power: "Стабильность",
    price: 3200,
    accentColor: "#8a6a3a",
    emoji: "🏡",
    sign: "Телец, Рак, Дева",
    icon: "Crown",
    image: "https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/f1f4ad1f-5641-4df2-888b-62a05c22a591.jpg",
  },
  {
    id: 2,
    name: "Айрея",
    role: "Хранитель лёгкости",
    emotion: "запутался",
    description: "Помогает отпустить лишние мысли, вдохнуть свободно и почувствовать внутреннюю ясность.",
    power: "Свобода",
    price: 3200,
    accentColor: "#4a7aaa",
    emoji: "🌬️",
    sign: "Близнецы, Весы, Водолей",
    icon: "Wind",
    image: "https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/54b1b4ba-0f18-40aa-b13d-12b4a399017e.jpg",
  },
  {
    id: 3,
    name: "Нерелий",
    role: "Хранитель сердца",
    emotion: "тяжело",
    description: "Напоминает о любви к себе, мягкости, тепле и доверии.",
    power: "Любовь",
    price: 3200,
    accentColor: "#b06080",
    emoji: "🌿",
    sign: "Рак, Скорпион, Рыбы",
    icon: "Heart",
    image: "https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/bucket/28dd189f-d141-40dc-a8d2-49742dda9731.png",
  },
  {
    id: 4,
    name: "Листорог",
    role: "Хранитель пути",
    emotion: "усталость",
    description: "Даёт силу двигаться вперёд даже тогда, когда не видно дороги.",
    power: "Рост",
    price: 3200,
    accentColor: "#5a8a45",
    emoji: "🌱",
    sign: "Козерог, Телец, Дева",
    icon: "Leaf",
    image: "https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/49ea3f56-c7cc-4789-90ed-bc22cd9b885b.jpg",
  },
  {
    id: 5,
    name: "Древлин",
    role: "Хранитель покоя",
    emotion: "закрылся",
    description: "Учит замедляться, заземляться и находить опору внутри себя.",
    power: "Спокойствие",
    price: 3200,
    accentColor: "#6b8a5a",
    emoji: "🌳",
    sign: "Телец, Дева, Козерог",
    icon: "TreePine",
    image: "https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/8f6a3b8c-66ef-4e20-84bd-352e148f428c.jpg",
  },
  {
    id: 6,
    name: "Игнитрис",
    role: "Хранитель огня",
    emotion: "энергия",
    description: "Пробуждает энергию, смелость, желание жить и действовать.",
    power: "Огонь",
    price: 3200,
    accentColor: "#d4783a",
    emoji: "🔥",
    sign: "Овен, Лев, Стрелец",
    icon: "Flame",
    image: "https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/98f54da6-05de-4f30-89f5-20930bba8c6d.jpg",
  },
];

const QUIZ_OPTIONS = [
  { label: "Мне тревожно", hero: 0, icon: "Wind" },
  { label: "Я устал(а)", hero: 1, icon: "Battery" },
  { label: "Мне тяжело", hero: 2, icon: "Mountain" },
  { label: "Я запутался(ась)", hero: 3, icon: "HelpCircle" },
  { label: "Я закрылся(ась)", hero: 4, icon: "Lock" },
  { label: "Нужна энергия", hero: 5, icon: "Zap" },
];

const FAQ = [
  {
    q: "Из каких материалов сделаны фигурки?",
    a: "Все фигурки создаются вручную из натуральных материалов: экологичная смола, натуральные красители, лён, шерсть. Каждая — уникальная. Безопасно для детей от 3 лет.",
  },
  {
    q: "Сколько фигурок в первой коллекции?",
    a: "Первая коллекция включает 6 уникальных хранителей. Тираж ограничен — каждая фигурка имеет собственный номер.",
  },
  {
    q: "Есть ли книга или карточки к фигурке?",
    a: "Да! Каждый хранитель поставляется с карточкой-историей и мини-руководством для родителей: как использовать в разговорах с ребёнком об эмоциях.",
  },
  {
    q: "Как выбрать героя для ребёнка?",
    a: "Пройдите интерактивный тест или выберите по эмоциональной теме, которая сейчас актуальна. Можно и просто дать ребёнку выбрать самому — дети чувствуют интуитивно.",
  },
  {
    q: "Доставка и упаковка?",
    a: "Доставляем по всей России. Каждый хранитель упакован в фирменную коробку из крафт-картона с бархатным мешочком. Подходит как подарок.",
  },
  {
    q: "Можно ли вернуть или обменять?",
    a: "Да, в течение 14 дней с момента получения, если фигурка не повреждена и сохранена упаковка.",
  },
];

export default function Index() {
  const [activePage, setActivePage] = useState("home");
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timerDays] = useState(12);
  const [timerHours] = useState(8);
  const [timerMins, setTimerMins] = useState(34);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", email: "", address: "", comment: "" });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    const t = setInterval(() => setTimerMins(m => m > 0 ? m - 1 : 59), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activePage]);

  const addToCart = (hero: typeof HEROES[0]) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === hero.id);
      if (ex) return prev.map(i => i.id === hero.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: hero.id, name: hero.name, price: hero.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const handleQuiz = (idx: number) => {
    setQuizSelected(idx);
    setTimeout(() => setQuizAnswer(QUIZ_OPTIONS[idx].hero), 400);
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "heroes", label: "Герои" },
    { id: "catalog", label: "Каталог" },
    { id: "quiz", label: "Тест" },
    { id: "about", label: "О проекте" },
    { id: "faq", label: "Вопросы" },
    { id: "contacts", label: "Контакты" },
  ];

  const navigate = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendOrder = async () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      setOrderError("Пожалуйста, заполни имя, телефон и адрес");
      return;
    }
    setOrderLoading(true);
    setOrderError("");
    try {
      const res = await fetch(ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderForm,
          items: cart.map(item => ({
            name: item.name,
            emoji: HEROES.find(h => h.id === item.id)?.emoji || "✦",
            price: item.price,
            qty: item.qty,
          })),
          total: totalPrice,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setOrderSubmitted(true);
      } else {
        setOrderError(data.error || "Что-то пошло не так, попробуй ещё раз");
      }
    } catch {
      setOrderError("Ошибка сети. Проверь интернет и попробуй ещё раз.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(150, 25%, 5%)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(8, 20, 12, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <button onClick={() => navigate("home")} className="flex flex-col leading-none">
          <span className="font-heading text-xl tracking-[0.15em]"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(42,70%,65%)" }}>
            LITTLE SPIRITS
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "hsl(40,20%,55%)", fontFamily: "'Golos Text', sans-serif" }}>
            маленькие хранители
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}
              className={`nav-link ${activePage === item.id ? "active" : ""}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setCartOpen(true)} className="relative p-2 transition-colors"
            style={{ color: "hsl(40,25%,70%)" }}>
            <Icon name="ShoppingBag" size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <button className="md:hidden p-2" style={{ color: "hsl(40,25%,70%)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8"
          style={{ background: "rgba(8, 20, 12, 0.97)" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}
              className="py-4 text-left border-b nav-link text-base"
              style={{ borderColor: "rgba(212,175,55,0.1)" }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md h-full flex flex-col overflow-y-auto"
            style={{ background: "hsl(150, 18%, 7%)", borderLeft: "1px solid rgba(212,175,55,0.15)", animation: "slideInRight 0.3s ease" }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
              <span className="font-heading text-2xl"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(42,70%,65%)" }}>
                Корзина
              </span>
              <button onClick={() => setCartOpen(false)} style={{ color: "hsl(40,20%,55%)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="text-5xl">🌿</span>
                <p style={{ color: "hsl(40,20%,55%)", fontFamily: "'Golos Text', sans-serif" }}>Корзина пуста</p>
                <p className="text-sm" style={{ color: "hsl(40,15%,40%)", fontFamily: "'Golos Text', sans-serif" }}>Выбери своего хранителя</p>
                <button onClick={() => { setCartOpen(false); navigate("catalog"); }}
                  className="btn-gold px-6 py-2 rounded-lg text-sm mt-2">
                  Смотреть коллекцию
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl forest-card">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ background: "rgba(212,175,55,0.08)" }}>
                        {HEROES.find(h => h.id === item.id)?.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm" style={{ color: "hsl(40,35%,88%)", fontFamily: "'Golos Text', sans-serif" }}>{item.name}</p>
                        <p className="text-sm" style={{ color: "hsl(42,60%,60%)", fontFamily: "'Golos Text', sans-serif" }}>{item.price.toLocaleString()} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-3 py-1 rounded-md"
                          style={{ background: "rgba(212,175,55,0.08)", color: "hsl(40,35%,88%)", fontFamily: "'Golos Text', sans-serif" }}>
                          {item.qty}
                        </span>
                        <button onClick={() => removeFromCart(item.id)}
                          style={{ color: "hsl(40,15%,40%)" }} className="hover:text-red-400 transition-colors">
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t space-y-4" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                  <div className="flex justify-between items-center">
                    <span style={{ color: "hsl(40,20%,60%)", fontFamily: "'Golos Text', sans-serif" }}>Итого</span>
                    <span className="font-heading text-2xl"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(42,70%,65%)" }}>
                      {totalPrice.toLocaleString()} ₽
                    </span>
                  </div>
                  <button onClick={() => { setCartOpen(false); navigate("checkout"); }}
                    className="btn-gold w-full py-3 rounded-xl font-medium">
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* ===== HOME ===== */}
        {activePage === "home" && (
          <>
            {/* HERO SECTION */}
            <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">
              <div className="magic-ring absolute" style={{ width: 700, height: 700, top: "50%", right: "-200px", transform: "translateY(-50%)", opacity: 0.25 }} />
              <div className="magic-ring absolute" style={{ width: 450, height: 450, top: "50%", right: "-50px", transform: "translateY(-50%)", opacity: 0.18 }} />
              <div className="magic-ring absolute" style={{ width: 250, height: 250, top: "50%", right: "150px", transform: "translateY(-50%)", opacity: 0.12 }} />

              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute rounded-full animate-float"
                  style={{
                    width: 3 + (i % 3) * 2,
                    height: 3 + (i % 3) * 2,
                    background: `rgba(212, 175, 55, ${0.2 + i * 0.05})`,
                    left: `${8 + i * 11}%`,
                    top: `${20 + (i % 4) * 18}%`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${5 + i}s`,
                  }} />
              ))}

              <div className="container max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="animate-fade-in-up">
                    <p className="text-xs tracking-[0.35em] uppercase mb-4"
                      style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>
                      ✦ первая коллекция ✦
                    </p>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.1, color: "hsl(40,35%,90%)" }}>
                      У каждого есть <br />
                      <em className="gold-shimmer not-italic">свой хранитель</em>
                    </h1>
                  </div>

                  <p className="animate-fade-in-up delay-200 text-base leading-relaxed max-w-md"
                    style={{ color: "hsl(40,20%,65%)", fontFamily: "'Golos Text', sans-serif" }}>
                    Little Spirits — это первая встреча ребёнка со своими чувствами.<br />
                    И напоминание взрослому о себе настоящем.
                  </p>

                  <div className="animate-fade-in-up delay-400 flex flex-wrap gap-4">
                    <button onClick={() => navigate("quiz")}
                      className="btn-gold px-8 py-4 rounded-xl text-sm font-medium tracking-wide">
                      Найти своего героя
                    </button>
                    <button onClick={() => navigate("catalog")}
                      className="btn-outline-gold px-8 py-4 rounded-xl text-sm tracking-wide">
                      Смотреть коллекцию
                    </button>
                  </div>

                  <div className="animate-fade-in-up delay-600 flex items-center gap-8 pt-2">
                    {[{ n: "6", l: "хранителей" }, { n: "100%", l: "ручная работа" }, { n: "∞", l: "истории" }].map(s => (
                      <div key={s.n}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "hsl(42,70%,65%)" }}>{s.n}</p>
                        <p className="text-xs tracking-widest uppercase"
                          style={{ color: "hsl(40,15%,45%)", fontFamily: "'Golos Text', sans-serif" }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative animate-fade-in delay-300 flex items-center justify-start overflow-visible">
                  <div className="relative z-10 animate-float" style={{ width: "1700px" }}>
                    <img
                      src="https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/bucket/78899b48-1b18-41b1-bd9a-7f1fc6360787.png"
                      alt="Коллекция Little Spirits"
                      className="w-full object-cover"
                      style={{
                        aspectRatio: "16/9",
                        maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 45%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 45%, transparent 80%)",
                      }}
                    />
                  </div>
                  <div className="hidden md:block absolute bottom-6 right-6 z-20 px-4 py-2 rounded-xl text-xs backdrop-blur-md"
                    style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", color: "hsl(42,70%,70%)", fontFamily: "'Golos Text', sans-serif" }}>
                    ✦ Ограниченный тираж
                  </div>
                </div>
                <div className="md:hidden flex justify-center mt-2">
                  <span className="px-4 py-2 rounded-xl text-xs"
                    style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", color: "hsl(42,70%,70%)", fontFamily: "'Golos Text', sans-serif" }}>
                    ✦ Ограниченный тираж
                  </span>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
                style={{ color: "hsl(40,15%,35%)" }}>
                <span className="text-[0.65rem] tracking-widest uppercase" style={{ fontFamily: "'Golos Text', sans-serif" }}>прокрути</span>
                <Icon name="ChevronDown" size={16} />
              </div>
            </section>

            {/* SECTION: Ребёнок чувствует */}
            <section className="py-24 px-6">
              <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16 scroll-reveal">
                  <p className="text-xs tracking-[0.3em] uppercase mb-4"
                    style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ почему это работает ✦</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "hsl(40,35%,90%)" }}>
                    Ребёнок чувствует раньше,<br />чем умеет объяснить
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 items-center">
                  <div className="scroll-reveal">
                    <img
                      src="https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/4b52b209-acbf-49b5-8913-52c5bea578c6.jpg"
                      alt="Ребёнок с игрушкой"
                      className="w-full rounded-2xl object-cover"
                      style={{ aspectRatio: "4/5", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
                    />
                  </div>

                  <div className="scroll-reveal delay-200 text-center space-y-6">
                    <div className="section-divider mb-6" />
                    <p className="italic text-xl leading-relaxed"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,25%,70%)" }}>
                      Иногда он не может сказать:
                    </p>
                    <div className="space-y-3">
                      {["мне тревожно", "мне грустно", "мне страшно", "мне нужна поддержка"].map(e => (
                        <p key={e} className="text-sm tracking-wide"
                          style={{ color: "hsl(40,15%,45%)", fontFamily: "'Golos Text', sans-serif" }}>— {e}</p>
                      ))}
                    </div>
                    <div className="section-divider mt-6" />
                  </div>

                  <div className="scroll-reveal delay-400">
                    <div className="p-8 rounded-2xl forest-card text-center">
                      <p className="italic text-lg mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,25%,70%)" }}>
                        Но он может сказать:
                      </p>
                      <p className="text-2xl"
                        style={{ fontFamily: "Caveat, cursive", color: "hsl(42,70%,65%)" }}>
                        «Сегодня мне нужен Нерелий»
                      </p>
                      <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                        <p className="text-sm leading-relaxed"
                          style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                          Игрушка становится языком эмоций — безопасным и понятным
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: Как работает */}
            <section className="py-24 px-6" style={{ background: "hsl(150,20%,7%)" }}>
              <div className="container max-w-5xl mx-auto">
                <div className="text-center mb-16 scroll-reveal">
                  <p className="text-xs tracking-[0.3em] uppercase mb-4"
                    style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ как это работает ✦</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "hsl(40,35%,90%)" }}>
                    Три шага к хранителю
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { n: "01", title: "Выбери героя", text: "По состоянию или знаку зодиака. Пройди тест или доверься интуиции.", icon: "Compass" },
                    { n: "02", title: "Играй и проживай", text: "Через героя ребёнок понимает свои чувства безопасно и с интересом.", icon: "Heart" },
                    { n: "03", title: "Расти вместе", text: "Хранители становятся частью важных разговоров дома. Это работает годами.", icon: "TreePine" },
                  ].map((step, i) => (
                    <div key={step.n} className={`scroll-reveal delay-${i * 200} p-8 rounded-2xl forest-card text-center group`}>
                      <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                        <Icon name={step.icon} size={22} style={{ color: "hsl(42,70%,62%)" }} />
                      </div>
                      <p className="text-4xl mb-2" style={{ fontFamily: "Caveat, cursive", color: "rgba(212,175,55,0.2)" }}>{step.n}</p>
                      <h3 className="text-xl mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,35%,88%)" }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed"
                        style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: Превью каталога */}
            <section className="py-24 px-6">
              <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16 scroll-reveal">
                  <p className="text-xs tracking-[0.3em] uppercase mb-4"
                    style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ первая коллекция ✦</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "hsl(40,35%,90%)" }}>
                    Шесть хранителей
                  </h2>
                  <p className="mt-4 text-sm max-w-md mx-auto"
                    style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                    Каждый несёт свою эмоцию. Каждый — ручная работа с историей.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {HEROES.map((hero, i) => (
                    <div key={hero.id}
                      className={`scroll-reveal delay-${(i % 3) * 100} product-card rounded-2xl overflow-hidden cursor-pointer flex`}
                      onClick={() => navigate("catalog")}
                      style={{ background: "linear-gradient(160deg, hsl(35,18%,14%), hsl(35,12%,11%))", border: "1px solid hsl(35,18%,20%)", minHeight: 220 }}>
                      <div className="relative overflow-hidden flex-shrink-0" style={{ width: "50%" }}>
                        <img src={hero.image} alt={hero.name} className="w-full h-full object-cover object-top"
                          style={{ transition: "transform 0.4s ease" }}
                          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                      </div>
                      <div className="flex flex-col justify-center p-4 flex-1" style={{ background: `linear-gradient(135deg, ${hero.accentColor}10 0%, transparent 100%)` }}>
                        <p className="text-xs tracking-[0.15em] uppercase mb-1"
                          style={{ color: hero.accentColor, fontFamily: "'Golos Text', sans-serif" }}>{hero.role}</p>
                        <h3 className="mb-1 leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "hsl(35,35%,90%)", fontWeight: 400 }}>{hero.name}</h3>
                        <p className="text-xs leading-relaxed mb-2"
                          style={{ color: "hsl(35,12%,55%)", fontFamily: "'Golos Text', sans-serif" }}>{hero.description}</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "hsl(38,55%,65%)" }}>
                          {hero.price.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12 scroll-reveal">
                  <button onClick={() => navigate("catalog")} className="btn-gold px-10 py-4 rounded-xl text-sm font-medium tracking-wide">
                    Весь каталог
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION: Это больше чем игрушка */}
            <section className="py-24 px-6" style={{ background: "hsl(150,20%,7%)" }}>
              <div className="container max-w-5xl mx-auto">
                <div className="text-center mb-16 scroll-reveal">
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "hsl(40,35%,90%)" }}>
                    Это больше, чем игрушка
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: "Для детей", text: "Инструмент эмоционального интеллекта. Помогает называть и проживать чувства через игру.", icon: "Baby", accent: "#5ba8a0" },
                    { title: "Для родителей", text: "Мост для разговоров о сложном. Когда слова не находятся — хранитель находит их за вас.", icon: "Users", accent: "#c8a840" },
                    { title: "Для взрослых", text: "Символ внутренней опоры. Напоминание о своём настоящем «я» в моменты потери себя.", icon: "Sparkles", accent: "#8a5ab8" },
                  ].map((item, i) => (
                    <div key={item.title} className={`scroll-reveal delay-${i * 200} p-8 rounded-2xl text-center`}
                      style={{ background: `${item.accent}0d`, border: `1px solid ${item.accent}25` }}>
                      <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}35` }}>
                        <Icon name={item.icon} size={22} style={{ color: item.accent }} />
                      </div>
                      <h3 className="text-2xl mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,35%,88%)" }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed"
                        style={{ color: "hsl(40,15%,52%)", fontFamily: "'Golos Text', sans-serif" }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: FOMO timer */}
            <section className="py-24 px-6">
              <div className="container max-w-3xl mx-auto text-center scroll-reveal">
                <div className="p-12 rounded-3xl relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, hsl(150,20%,8%), hsl(150,18%,10%))", border: "1px solid rgba(212,175,55,0.15)" }}>
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                  <p className="text-xs tracking-[0.3em] uppercase mb-4"
                    style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ первая коллекция ✦</p>
                  <h2 className="mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "hsl(40,35%,90%)" }}>
                    Ограниченный тираж<br />закрывается через
                  </h2>
                  <div className="flex justify-center gap-6 mb-10">
                    {[{ v: timerDays, l: "дней" }, { v: timerHours, l: "часов" }, { v: timerMins, l: "минут" }].map(t => (
                      <div key={t.l} className="text-center">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "hsl(42,70%,65%)" }}>
                          {String(t.v).padStart(2, "0")}
                        </div>
                        <p className="text-xs tracking-widest uppercase mt-2"
                          style={{ color: "hsl(40,15%,40%)", fontFamily: "'Golos Text', sans-serif" }}>{t.l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm"
                    style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                    {["Ручная работа", "Ограниченный тираж", "Натуральные материалы", "Нумерованные фигурки"].map(f => (
                      <span key={f} className="flex items-center gap-2">
                        <span style={{ color: "hsl(42,70%,55%)" }}>✦</span> {f}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => navigate("catalog")} className="btn-gold px-10 py-4 rounded-xl font-medium">
                    Успеть купить
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION: Подписка */}
            <section className="py-20 px-6" style={{ background: "hsl(150,20%,7%)" }}>
              <div className="container max-w-2xl mx-auto text-center scroll-reveal">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ будь первым ✦</p>
                <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "hsl(40,35%,90%)" }}>
                  Входи в мир Little Spirits
                </h2>
                <p className="text-sm mb-8"
                  style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                  Вдохновение, новые истории и предложения только для своих
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                  <input type="email" placeholder="Твой email"
                    className="input-forest flex-1 px-4 py-3 rounded-xl text-sm" />
                  <button className="btn-gold px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap">
                    Войти в мир
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== HEROES PAGE ===== */}
        {activePage === "heroes" && (
          <section className="py-24 px-6 min-h-screen">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-20 animate-fade-in-up">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ знакомься ✦</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "hsl(40,35%,90%)" }}>
                  Хранители леса
                </h1>
                <p className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
                  style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                  Шесть уникальных существ, каждое из которых несёт свою эмоцию и историю
                </p>
              </div>

              <div className="space-y-16">
                {HEROES.map((hero, i) => (
                  <div key={hero.id} className={`scroll-reveal grid md:grid-cols-2 gap-12 items-center`}>
                    <div className={i % 2 === 1 ? "md:order-2" : ""}>
                      <div className="w-20 h-20 rounded-3xl mb-6 flex items-center justify-center text-4xl"
                        style={{ background: `${hero.accentColor}22`, border: `1px solid ${hero.accentColor}35` }}>
                        {hero.emoji}
                      </div>
                      <p className="text-xs tracking-[0.3em] uppercase mb-2"
                        style={{ color: hero.accentColor, fontFamily: "'Golos Text', sans-serif" }}>{hero.role}</p>
                      <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "hsl(40,35%,90%)" }}>
                        {hero.name}
                      </h2>
                      <p className="text-base leading-relaxed mb-6"
                        style={{ color: "hsl(40,15%,55%)", fontFamily: "'Golos Text', sans-serif" }}>{hero.description}</p>
                      <p className="text-sm mb-6"
                        style={{ color: "hsl(40,15%,40%)", fontFamily: "'Golos Text', sans-serif" }}>
                        <span style={{ color: "hsl(42,60%,55%)" }}>Знак: </span>{hero.sign}
                      </p>
                      <div className="flex items-center gap-6">
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "hsl(42,70%,65%)" }}>
                          {hero.price.toLocaleString()} ₽
                        </span>
                        <button onClick={() => { addToCart(hero); setCartOpen(true); }}
                          className="btn-gold px-6 py-2 rounded-xl text-sm">
                          В корзину
                        </button>
                      </div>
                    </div>

                    <div className={i % 2 === 1 ? "md:order-1" : ""}>
                      <div className="relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${hero.accentColor}12, hsl(150,18%,8%))`, border: `1px solid ${hero.accentColor}20` }}>
                        <span className="text-[140px] opacity-30">{hero.emoji}</span>
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md"
                          style={{ background: "rgba(8,20,12,0.75)", border: "1px solid rgba(212,175,55,0.1)" }}>
                          <p className="text-sm italic"
                            style={{ color: "hsl(40,20%,65%)", fontFamily: "'Cormorant Garamond', serif" }}>
                            «{hero.role}»
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CATALOG PAGE ===== */}
        {activePage === "catalog" && (
          <section className="py-24 px-6 min-h-screen" style={{ background: "linear-gradient(180deg, hsl(35,18%,10%) 0%, hsl(35,12%,8%) 100%)" }}>
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-20 animate-fade-in-up">
                <p className="text-xs tracking-[0.35em] uppercase mb-4"
                  style={{ color: "hsl(35,40%,55%)", fontFamily: "'Golos Text', sans-serif", letterSpacing: "0.35em" }}>✦ первая коллекция ✦</p>
                <h1 className="mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "hsl(35,30%,90%)", fontWeight: 300 }}>
                  Шесть хранителей
                </h1>
                <p className="max-w-lg mx-auto text-sm leading-relaxed"
                  style={{ color: "hsl(35,15%,52%)", fontFamily: "'Golos Text', sans-serif" }}>
                  Каждый — ручная работа. Тираж ограничен. Выбери того, кто созвучен твоему состоянию прямо сейчас.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {HEROES.map((hero, i) => (
                  <div
                    key={hero.id}
                    className={`scroll-reveal delay-${(i % 3) * 100} group rounded-3xl overflow-hidden flex flex-col`}
                    style={{
                      background: "linear-gradient(160deg, hsl(35,18%,14%) 0%, hsl(35,12%,11%) 100%)",
                      border: "1px solid hsl(35,18%,20%)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                      transition: "transform 0.35s ease, box-shadow 0.35s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${hero.accentColor}30`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.35)";
                    }}
                  >
                    {/* Фото */}
                    <div className="relative overflow-hidden" style={{ background: `linear-gradient(145deg, hsl(35,22%,18%), hsl(35,14%,13%))` }}>
                      <img
                        src={hero.image}
                        alt={hero.name}
                        className="w-full object-cover"
                        style={{ height: 280, objectPosition: "center top", transition: "transform 0.5s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      {/* Роль — бейдж */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                        style={{
                          background: "rgba(20,14,8,0.72)",
                          border: `1px solid ${hero.accentColor}45`,
                          color: hero.accentColor,
                          fontFamily: "'Golos Text', sans-serif",
                          letterSpacing: "0.08em",
                        }}>
                        {hero.role}
                      </div>
                      {/* Иконка стихии */}
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        style={{
                          background: "rgba(20,14,8,0.72)",
                          border: `1px solid ${hero.accentColor}35`,
                        }}>
                        <Icon name={hero.icon} size={16} style={{ color: hero.accentColor }} />
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="mb-1 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.65rem", color: "hsl(35,35%,90%)", fontWeight: 400 }}>
                        {hero.name}
                      </h3>

                      <p className="text-sm leading-relaxed mb-5 flex-1"
                        style={{ color: "hsl(35,12%,55%)", fontFamily: "'Golos Text', sans-serif" }}>
                        {hero.description}
                      </p>

                      <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
                        style={{ background: `${hero.accentColor}10`, border: `1px solid ${hero.accentColor}22` }}>
                        <Icon name={hero.icon} size={13} style={{ color: hero.accentColor }} />
                        <span className="text-xs tracking-[0.15em] uppercase"
                          style={{ color: hero.accentColor, fontFamily: "'Golos Text', sans-serif" }}>
                          Сила · {hero.power}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", color: "hsl(38,55%,65%)", fontWeight: 400 }}>
                          {hero.price.toLocaleString()} ₽
                        </span>
                        <button
                          onClick={() => addToCart(hero)}
                          className="btn-gold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 flex-shrink-0"
                          style={{ letterSpacing: "0.06em" }}>
                          <Icon name="ShoppingBag" size={13} />
                          Выбрать
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 scroll-reveal">
                <img
                  src="https://cdn.poehali.dev/projects/c6d9f74d-4013-41c8-8d30-08b98562c318/files/7b452d69-e258-426c-9f7a-d3779fcf1b51.jpg"
                  alt="Коллекция хранителей"
                  className="w-full rounded-3xl object-cover"
                  style={{ maxHeight: 480, boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}
                />
              </div>
            </div>
          </section>
        )}

        {/* ===== QUIZ PAGE ===== */}
        {activePage === "quiz" && (
          <section className="py-24 px-6 min-h-screen">
            <div className="container max-w-3xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ тест ✦</p>
                <h1 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "hsl(40,35%,90%)" }}>
                  Какой герой нужен тебе сейчас?
                </h1>
                <p className="text-sm" style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                  Выбери то, что ближе всего к твоему состоянию прямо сейчас
                </p>
              </div>

              {quizAnswer === null ? (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {QUIZ_OPTIONS.map((opt, i) => (
                    <button key={opt.label} onClick={() => handleQuiz(i)}
                      className={`quiz-option p-6 rounded-2xl forest-card text-left`}
                      style={quizSelected === i ? { background: "rgba(212,175,55,0.08)", borderColor: "rgba(212,175,55,0.5)" } : {}}>
                      <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                        <Icon name={opt.icon} size={18} style={{ color: "hsl(42,60%,60%)" }} />
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "hsl(40,35%,88%)" }}>
                        {opt.label}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center" style={{ animation: "fadeInUp 0.5s ease forwards" }}>
                  <p className="text-sm mb-6" style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                    Твой хранитель:
                  </p>
                  <div className="p-10 rounded-3xl forest-card mb-8 relative overflow-hidden"
                    style={{ border: `1px solid ${HEROES[quizAnswer].accentColor}30` }}>
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${HEROES[quizAnswer].accentColor}60, transparent)` }} />
                    <div className="text-8xl mb-6 inline-block animate-float">{HEROES[quizAnswer].emoji}</div>
                    <h2 className="mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "hsl(40,35%,90%)" }}>
                      {HEROES[quizAnswer].name}
                    </h2>
                    <p className="text-sm tracking-widest uppercase mb-4"
                      style={{ color: HEROES[quizAnswer].accentColor, fontFamily: "'Golos Text', sans-serif" }}>
                      {HEROES[quizAnswer].role}
                    </p>
                    <p className="text-base leading-relaxed max-w-md mx-auto"
                      style={{ color: "hsl(40,15%,55%)", fontFamily: "'Golos Text', sans-serif" }}>
                      {HEROES[quizAnswer].description}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => addToCart(HEROES[quizAnswer])}
                      className="btn-gold px-8 py-3 rounded-xl font-medium">
                      Забрать {HEROES[quizAnswer].name}
                    </button>
                    <button onClick={() => { setQuizAnswer(null); setQuizSelected(null); }}
                      className="btn-outline-gold px-8 py-3 rounded-xl">
                      Пройти снова
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===== ABOUT PAGE ===== */}
        {activePage === "about" && (
          <section className="py-24 px-6 min-h-screen">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-20 animate-fade-in-up">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ наша история ✦</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "hsl(40,35%,90%)" }}>
                  О проекте
                </h1>
              </div>

              <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                <div className="scroll-reveal space-y-6">
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "hsl(42,70%,65%)" }}>
                    Откуда появился этот мир
                  </h2>
                  {[
                    "Little Spirits родился из простого наблюдения: дети часто не могут объяснить, что с ними происходит. Слова ещё не найдены, но чувства уже есть — большие, настоящие, требующие признания.",
                    "Мы создали шестерых хранителей — существ из магического леса, каждый из которых воплощает определённое чувство. Через них ребёнок находит язык для своего внутреннего мира.",
                    "Но мы быстро поняли: это нужно не только детям. Взрослые тоже иногда теряют себя. Тоже не находят слов. Тоже нуждаются в хранителе.",
                  ].map((text, i) => (
                    <p key={i} className="leading-relaxed"
                      style={{ color: "hsl(40,15%,55%)", fontFamily: "'Golos Text', sans-serif" }}>{text}</p>
                  ))}
                </div>
                <div className="scroll-reveal delay-200">
                  <div className="p-10 rounded-3xl text-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, hsl(150,20%,8%), hsl(150,18%,10%))", border: "1px solid rgba(212,175,55,0.15)" }}>
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                    <p className="text-2xl mb-6 leading-relaxed"
                      style={{ fontFamily: "Caveat, cursive", color: "hsl(42,70%,65%)" }}>
                      «Маленькие хранители<br />большого внутреннего мира»
                    </p>
                    <div className="section-divider" />
                    <p className="mt-6 text-sm" style={{ color: "hsl(40,15%,45%)", fontFamily: "'Golos Text', sans-serif" }}>
                      — девиз, который стал нашей миссией
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 scroll-reveal">
                {[
                  { icon: "Leaf", title: "Натуральность", text: "Только экологичные материалы. Безопасно для детей, бережно к природе." },
                  { icon: "Scissors", title: "Ручная работа", text: "Каждая фигурка создаётся вручную. Ни одна не похожа на другую." },
                  { icon: "Heart", title: "С намерением", text: "В каждого хранителя вложена история, смысл и любовь мастера." },
                ].map((v, i) => (
                  <div key={v.title} className={`delay-${i * 200} p-6 rounded-2xl forest-card text-center`}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                      <Icon name={v.icon} size={20} style={{ color: "hsl(42,70%,62%)" }} />
                    </div>
                    <h3 className="text-xl mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,35%,88%)" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed"
                      style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== FAQ PAGE ===== */}
        {activePage === "faq" && (
          <section className="py-24 px-6 min-h-screen">
            <div className="container max-w-3xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ ответы ✦</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "hsl(40,35%,90%)" }}>
                  Часто задают
                </h1>
              </div>

              <div className="space-y-0 animate-fade-in">
                {FAQ.map((item, i) => (
                  <div key={i} className="faq-item">
                    <button className="w-full flex items-center justify-between py-6 text-left gap-4"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: openFaq === i ? "hsl(42,70%,65%)" : "hsl(40,30%,82%)" }}>
                        {item.q}
                      </span>
                      <Icon name={openFaq === i ? "Minus" : "Plus"} size={18}
                        style={{ color: "hsl(42,60%,55%)", flexShrink: 0 }} />
                    </button>
                    {openFaq === i && (
                      <div className="pb-6 animate-fade-in">
                        <p className="leading-relaxed text-sm"
                          style={{ color: "hsl(40,15%,55%)", fontFamily: "'Golos Text', sans-serif" }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CONTACTS PAGE ===== */}
        {activePage === "contacts" && (
          <section className="py-24 px-6 min-h-screen">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ связь ✦</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "hsl(40,35%,90%)" }}>
                  Напиши нам
                </h1>
                <p className="mt-4 text-sm" style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                  Ответим в течение одного рабочего дня
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="animate-fade-in-up space-y-8">
                  {[
                    { icon: "Mail", label: "Email", value: "hello@littlespirits.ru" },
                    { icon: "MessageCircle", label: "Telegram", value: "@littlespirits" },
                    { icon: "Instagram", label: "Instagram", value: "@little.spirits.ru" },
                    { icon: "MapPin", label: "Россия", value: "Доставка по всей стране" },
                  ].map(c => (
                    <div key={c.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                        <Icon name={c.icon} size={18} style={{ color: "hsl(42,70%,62%)" }} />
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-1"
                          style={{ color: "hsl(40,15%,40%)", fontFamily: "'Golos Text', sans-serif" }}>{c.label}</p>
                        <p style={{ color: "hsl(40,30%,80%)", fontFamily: "'Golos Text', sans-serif" }}>{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="animate-fade-in-up delay-200 p-8 rounded-3xl forest-card space-y-4">
                  <h3 className="text-2xl mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,35%,88%)" }}>Задай вопрос</h3>
                  <input type="text" placeholder="Твоё имя" className="input-forest w-full px-4 py-3 rounded-xl text-sm" />
                  <input type="email" placeholder="Email" className="input-forest w-full px-4 py-3 rounded-xl text-sm" />
                  <textarea rows={4} placeholder="Твой вопрос..."
                    className="input-forest w-full px-4 py-3 rounded-xl text-sm resize-none" />
                  <button className="btn-gold w-full py-3 rounded-xl font-medium">Отправить</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== CHECKOUT PAGE ===== */}
        {activePage === "checkout" && (
          <section className="py-24 px-6 min-h-screen">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in-up">
                <p className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(85,30%,48%)", fontFamily: "'Golos Text', sans-serif" }}>✦ оформление ✦</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "hsl(40,35%,90%)" }}>
                  Оформление заказа
                </h1>
              </div>

              {orderSubmitted ? (
                <div className="text-center py-20" style={{ animation: "fadeInUp 0.5s ease forwards" }}>
                  <div className="text-7xl mb-6">🌿</div>
                  <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "hsl(42,70%,65%)" }}>
                    Заказ принят!
                  </h2>
                  <p className="text-sm mb-8" style={{ color: "hsl(40,15%,50%)", fontFamily: "'Golos Text', sans-serif" }}>
                    Мы свяжемся с тобой в течение одного рабочего дня
                  </p>
                  <button onClick={() => { navigate("home"); setCart([]); setOrderSubmitted(false); }}
                    className="btn-gold px-8 py-3 rounded-xl">На главную</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="animate-fade-in space-y-4">
                    <h3 className="text-xl mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,35%,88%)" }}>Данные для доставки</h3>
                    <input type="text" placeholder="Имя и фамилия *"
                      className="input-forest w-full px-4 py-3 rounded-xl text-sm"
                      value={orderForm.name} onChange={e => setOrderForm({ ...orderForm, name: e.target.value })} />
                    <input type="tel" placeholder="Телефон *"
                      className="input-forest w-full px-4 py-3 rounded-xl text-sm"
                      value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} />
                    <input type="email" placeholder="Email"
                      className="input-forest w-full px-4 py-3 rounded-xl text-sm"
                      value={orderForm.email} onChange={e => setOrderForm({ ...orderForm, email: e.target.value })} />
                    <textarea rows={3} placeholder="Адрес доставки *"
                      className="input-forest w-full px-4 py-3 rounded-xl text-sm resize-none"
                      value={orderForm.address} onChange={e => setOrderForm({ ...orderForm, address: e.target.value })} />
                    <textarea rows={2} placeholder="Комментарий к заказу"
                      className="input-forest w-full px-4 py-3 rounded-xl text-sm resize-none"
                      value={orderForm.comment} onChange={e => setOrderForm({ ...orderForm, comment: e.target.value })} />
                  </div>

                  <div className="animate-fade-in delay-200">
                    <h3 className="text-xl mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(40,35%,88%)" }}>Твои хранители</h3>
                    <div className="space-y-3 mb-6">
                      {cart.length === 0 ? (
                        <p className="text-sm text-center py-8" style={{ color: "hsl(40,15%,45%)", fontFamily: "'Golos Text', sans-serif" }}>
                          Корзина пуста
                        </p>
                      ) : cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl forest-card">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{HEROES.find(h => h.id === item.id)?.emoji}</span>
                            <div>
                              <p className="font-medium text-sm" style={{ color: "hsl(40,35%,88%)", fontFamily: "'Golos Text', sans-serif" }}>{item.name}</p>
                              <p className="text-xs" style={{ color: "hsl(40,15%,45%)", fontFamily: "'Golos Text', sans-serif" }}>× {item.qty}</p>
                            </div>
                          </div>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "hsl(42,70%,62%)" }}>
                            {(item.price * item.qty).toLocaleString()} ₽
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t py-4 flex justify-between items-center mb-6"
                      style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                      <span style={{ color: "hsl(40,20%,55%)", fontFamily: "'Golos Text', sans-serif" }}>Итого</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "hsl(42,70%,65%)" }}>
                        {totalPrice.toLocaleString()} ₽
                      </span>
                    </div>
                    {orderError && (
                      <div className="px-4 py-3 rounded-xl text-sm mb-2"
                        style={{ background: "rgba(180,60,60,0.12)", border: "1px solid rgba(180,60,60,0.25)", color: "hsl(0,65%,70%)", fontFamily: "'Golos Text', sans-serif" }}>
                        {orderError}
                      </div>
                    )}
                    <button
                      onClick={sendOrder}
                      disabled={orderLoading}
                      className="btn-gold w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                      style={{ opacity: orderLoading ? 0.7 : 1, cursor: orderLoading ? "not-allowed" : "pointer" }}>
                      {orderLoading ? (
                        <>
                          <Icon name="Loader" size={16} style={{ animation: "spin-slow 1s linear infinite" }} />
                          Отправляем заказ...
                        </>
                      ) : "Подтвердить заказ"}
                    </button>
                    <p className="text-center text-xs mt-3"
                      style={{ color: "hsl(40,15%,38%)", fontFamily: "'Golos Text', sans-serif" }}>
                      Оплата при получении или по реквизитам
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: "rgba(212,175,55,0.08)", background: "hsl(150,22%,4%)" }}>
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <p className="text-xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(42,70%,65%)" }}>
                LITTLE SPIRITS
              </p>
              <p className="text-xs tracking-wide mb-4"
                style={{ color: "hsl(40,15%,40%)", fontFamily: "'Golos Text', sans-serif" }}>
                маленькие хранители большого внутреннего мира
              </p>
              <div className="flex gap-3">
                {["Instagram", "MessageCircle", "Mail"].map(icon => (
                  <button key={icon} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)" }}>
                    <Icon name={icon} size={14} style={{ color: "hsl(42,60%,55%)" }} />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Магазин", links: [{ l: "Каталог", p: "catalog" }, { l: "Герои", p: "heroes" }, { l: "Тест", p: "quiz" }] },
              { title: "О мире", links: [{ l: "О проекте", p: "about" }, { l: "Вопросы", p: "faq" }] },
              { title: "Поддержка", links: [{ l: "Контакты", p: "contacts" }, { l: "FAQ", p: "faq" }] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ color: "hsl(40,15%,35%)", fontFamily: "'Golos Text', sans-serif" }}>{col.title}</p>
                <div className="space-y-2">
                  {col.links.map(link => (
                    <button key={link.l} onClick={() => navigate(link.p)}
                      className="block text-sm nav-link">{link.l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(212,175,55,0.06)" }}>
            <p className="text-xs" style={{ color: "hsl(40,10%,28%)", fontFamily: "'Golos Text', sans-serif" }}>
              © 2024 Little Spirits. Все права защищены.
            </p>
            <p className="text-xs" style={{ color: "hsl(40,10%,28%)", fontFamily: "'Golos Text', sans-serif" }}>
              Ручная работа · Натуральные материалы · Россия
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}