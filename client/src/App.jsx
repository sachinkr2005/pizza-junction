import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import Home from "./pages/Home";
import OrderPizza from "./pages/OrderPizza";
import BuildYourPizza from "./pages/BuildYourPizza";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

export default function App() {
  const { cartCount } = useCart();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("pizzeria-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("pizzeria-theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark rounded px-3">
        <div className="container-fluid px-0">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen((isOpen) => !isOpen)}
            aria-controls="navbarNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <NavLink className="navbar-brand d-flex align-items-center me-4 brand-link" to="/home">
            <img
              src="/assets/PizzaJunctionLogo.svg"
              alt="PizzaJunction Logo"
              width="50"
              height="50"
              className="brand-mark"
            />
            <span className="brand-wordmark">
              <span className="brand-name"><span>Pizza</span><span className="brand-name-accent">Junction</span></span>
              <span className="brand-tagline">FRESH · HOT · DELICIOUS</span>
            </span>
          </NavLink>

          <div className={`collapse navbar-collapse${isNavOpen ? " show" : ""}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link px-3" to="/order" onClick={() => setIsNavOpen(false)}>
                  Order Pizza
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link px-3" to="/build" onClick={() => setIsNavOpen(false)}>
                  Build Ur Pizza
                </NavLink>
              </li>
            </ul>
            <div className="navbar-actions d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-light btn-sm theme-toggle text-nowrap"
              type="button"
                onClick={() => {
                  setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
                  setIsNavOpen(false);
                }}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-pressed={theme === "dark"}
            >
              <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
              <span className="ms-1">{theme === "light" ? "Dark" : "Light"}</span>
            </button>
            <NavLink
              className="btn btn-warning-custom btn-sm text-nowrap fw-semibold px-3 d-flex align-items-center gap-1"
              to="/cart"
                onClick={() => setIsNavOpen(false)}
            >
              <span>🛒 Shopping cart</span>
              {cartCount > 0 && (
                <span className="badge rounded-pill bg-light text-dark ms-1">
                  {cartCount}
                </span>
              )}
            </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main App Content */}
      <main className="app-main my-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<OrderPizza />} />
          <Route path="/build" element={<BuildYourPizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <p className="footer-copyright">&copy; Copyrights 2026 PizzaJunction. All rights reserved.</p>
        <p className="footer-author">
          Created By: Sachin❤️ (
          <a href="mailto:rishabhtripathi1710@gmail.com">sk9140086@gmail.com</a>)
        </p>
      </footer>
    </div>
  );
}
