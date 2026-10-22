import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPizzas } from "../api";
import { useCart } from "../context/CartContext";

const FALLBACK_PIZZA_IMG = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80";

export default function OrderPizza() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cart, addToCart, removeFromCart, getId } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getPizzas()
      .then((res) => {
        if (isMounted) {
          setPizzas(res.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load pizzas:", err);
          setError("Could not load pizzas. Please ensure the backend server is running.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getCartItem = (pizza) => {
    const id = getId(pizza);
    return cart.find((item) => getId(item) === id);
  };

  return (
    <div className="container-fluid py-3 px-2">
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading pizzas...</span>
          </div>
          <p className="mt-2 text-muted">Loading delicious pizzas...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <header className="pizza-menu-heading mb-4">
            <div>
              <span className="pizza-menu-eyebrow">THE PIZZA MENU</span>
              <h1 className="h2 fw-bold mb-2">Made fresh. Made for you.</h1>
              <p className="text-secondary mb-0">Find your new favorite, baked fresh to order.</p>
            </div>
            <span className="pizza-count-badge">{pizzas.length} pizzas</span>
          </header>

          <div className="pizza-grid-container mb-4">
            <div className="row g-3">
              {pizzas.map((pizza) => {
                const cartItem = getCartItem(pizza);
                const inCart = Boolean(cartItem);
                const ingredientsList = pizza.ingredients?.map((i) => i.iname).join(", ") || "Fresh ingredients";
                const toppingsList = pizza.topping?.map((t) => t.tname).join(", ") || "Standard toppings";

                return (
                  <div
                    key={getId(pizza) || pizza.name}
                    className="col-md-6 pizza-grid-item"
                  >
                    <div className="pizza-card-layout h-100">
                      <div className="pizza-img-wrapper">
                        <img
                          src={pizza.image}
                          alt={pizza.name}
                          className="pizza-thumbnail"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = FALLBACK_PIZZA_IMG;
                          }}
                        />
                      </div>

                      <div className="pizza-card-content">
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                          <h2 className="fw-bold mb-0 text-capitalize text-dark pizza-name">
                            {pizza.name}
                          </h2>
                          <span className={`pizza-type-label ${pizza.type === "veg" ? "is-veg" : "is-nonveg"}`}>
                            <img
                              src={pizza.type === "veg" ? "/assets/veg.png" : "/assets/nonveg.png"}
                              alt=""
                              width="16"
                              height="16"
                            />
                            <span>{pizza.type === "veg" ? "Veg" : "Non-veg"}</span>
                          </span>
                        </div>
                        <p className="text-secondary small mb-3 pizza-desc">{pizza.description}</p>
                        <div className="pizza-card-details">
                          <div className="small mb-1 text-dark pizza-meta">
                            <b>Ingredients: </b>
                            <span className="text-secondary">{ingredientsList}</span>
                          </div>
                          <div className="small text-dark pizza-meta">
                            <b>Toppings: </b>
                            <span className="text-secondary">{toppingsList}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pizza-card-footer">
                        <div className="fw-bold text-dark pizza-price">
                          {"\u20B9"}{Number(pizza.price).toFixed(2)}
                        </div>
                        {inCart ? (
                          <button
                            type="button"
                            onClick={() => removeFromCart(pizza)}
                            className="btn btn-danger fw-semibold pizza-order-button"
                          >
                            Remove ({cartItem.qty})
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(pizza)}
                            className="btn btn-warning-custom fw-semibold pizza-order-button"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Pizza CTA */}
          <div className="custom-pizza-cta text-center my-4 p-4 bg-light rounded border">
            <span className="pizza-menu-eyebrow">MAKE IT YOURS</span>
            <h2 className="h4 fw-bold text-dark mt-2 mb-2">Create your own pizza</h2>
            <p className="text-secondary small mb-3">
              Choose from fresh crusts, gourmet toppings, and custom cheeses.
            </p>
            <Link to="/build" className="btn btn-dark fw-bold px-4 py-2 cta-button">
              Build Ur Pizza
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
