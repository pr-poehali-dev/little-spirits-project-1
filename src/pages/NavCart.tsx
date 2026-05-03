import Icon from "@/components/ui/icon";
import { HEROES, CartItem } from "./data";

interface NavCartProps {
  activePage: string;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  totalItems: number;
  totalPrice: number;
  navigate: (page: string) => void;
  removeFromCart: (id: number) => void;
}

const navItems = [
  { id: "home", label: "Главная" },
  { id: "heroes", label: "Герои" },
  { id: "catalog", label: "Каталог" },
  { id: "quiz", label: "Тест" },
  { id: "about", label: "О проекте" },
  { id: "faq", label: "Вопросы" },
  { id: "contacts", label: "Контакты" },
];

export default function NavCart({
  activePage,
  cart,
  cartOpen,
  setCartOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  totalItems,
  totalPrice,
  navigate,
  removeFromCart,
}: NavCartProps) {
  return (
    <>
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
                    Оформить предзаказ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}