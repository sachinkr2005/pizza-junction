import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api";

const FALLBACK_PIZZA_IMG = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80";
const FALLBACK_TOPPING_IMG = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80";

export default function Cart() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    cart,
    toppings,
    pizzaTotal,
    toppingTotal,
    removeFromCart,
    removeTopping,
    increase,
    decrease,
    clearCart,
    getId
  } = useCart();

  const grandTotal = pizzaTotal + toppingTotal;
  const isCartEmpty = cart.length === 0 && toppings.length === 0;

  const handleCheckout = async () => {
    if (isCartEmpty || submitting) return;

    setSubmitting(true);
    setError("");

    const orderPayload = {
      items: cart,
      customToppings: toppings,
      pizzaTotal,
      toppingTotal,
      grandTotal,
      paymentMethod: "Online",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await createOrder(orderPayload);
      clearCart();
      navigate("/pay", { state: { order: res.data } });
    } catch (err) {
      console.warn("Backend order submission failed, proceeding in offline mode:", err.message);
      clearCart();
      navigate("/pay", { state: { order: orderPayload } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid border border-1 p-3 bg-white">
      <div className="section-title">
        <hr /><h4 className="text-capitalize text-center m-0">My Cart</h4><hr />
      </div>

      {isCartEmpty ? (
        <div className="text-center py-5 bg-light rounded border my-3">
          <h3 className="text-secondary mb-3">🛒 Your Cart is Empty</h3>
          <p className="text-muted mb-4">
            You have not added any pizzas or toppings to your cart yet.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/order" className="btn btn-warning-custom fw-semibold px-4">
              🍕 Order Pizza
            </Link>
            <Link to="/build" className="btn btn-dark fw-semibold px-4">
              🧀 Build Your Pizza
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4 mt-1">
          {/* Main Cart Items Column */}
          <div className="col-lg-8">
            {/* Ordered Pizzas */}
            {cart.length > 0 && (
              <div className="card shadow-sm mb-4 border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-semibold">🍕 Ordered Pizzas ({cart.length})</h6>
                  <span className="badge bg-warning text-dark">₹{pizzaTotal}</span>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th scope="col" style={{ width: "80px" }}>Item</th>
                        <th scope="col" style={{ width: "45px" }}>Type</th>
                        <th scope="col">Pizza & Price</th>
                        <th scope="col" style={{ width: "130px" }} className="text-center">Qty</th>
                        <th scope="col">Total</th>
                        <th scope="col" style={{ width: "60px" }} className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={getId(item)}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded object-fit-cover"
                              width="65"
                              height="65"
                              onError={(e) => {
                                e.target.src = FALLBACK_PIZZA_IMG;
                              }}
                            />
                          </td>
                          <td>
                            <img
                              src={item.type === "veg" ? "/assets/veg.png" : "/assets/nonveg.png"}
                              alt={item.type}
                              width="22"
                              height="22"
                            />
                          </td>
                          <td>
                            <div className="fw-semibold text-capitalize">{item.name}</div>
                            <div className="text-muted small">₹{item.price} each</div>
                          </td>
                          <td className="text-center">
                            <div className="input-group input-group-sm justify-content-center qty-group">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => decrease(item)}
                              >
                                −
                              </button>
                              <input
                                type="text"
                                className="form-control text-center bg-white"
                                value={item.qty}
                                readOnly
                              />
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => increase(item)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className="fw-bold">₹{item.qty * Number(item.price)}</span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeFromCart(item)}
                              title="Remove item"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="table-light">
                        <td colSpan="6" className="text-end fw-bold">
                          Pizzas Subtotal: ₹{pizzaTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Custom Toppings */}
            {toppings.length > 0 && (
              <div className="card shadow-sm mb-4 border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-semibold">🧀 Custom Toppings ({toppings.length})</h6>
                  <span className="badge bg-warning text-dark">₹{toppingTotal}</span>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th scope="col" style={{ width: "80px" }}>Item</th>
                        <th scope="col">Topping / Ingredient</th>
                        <th scope="col">Price</th>
                        <th scope="col" style={{ width: "60px" }} className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toppings.map((item) => (
                        <tr key={getId(item)}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.tname}
                              className="rounded object-fit-cover"
                              width="55"
                              height="55"
                              onError={(e) => {
                                e.target.src = FALLBACK_TOPPING_IMG;
                              }}
                            />
                          </td>
                          <td>
                            <span className="fw-semibold">{item.tname}</span>
                          </td>
                          <td>
                            <span className="fw-bold">₹{item.price}</span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeTopping(item)}
                              title="Remove topping"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="table-light">
                        <td colSpan="4" className="text-end fw-bold">
                          Toppings Subtotal: ₹{toppingTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Payment Summary Column */}
          <div className="col-lg-4">
            <div className="card shadow-sm border sticky-top summary-card">
              <div className="card-header bg-warning text-dark py-3">
                <h6 className="mb-0 fw-bold">💳 Payment Summary</h6>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span className="text-muted">Pizza Subtotal</span>
                    <span className="fw-semibold">₹{pizzaTotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span className="text-muted">Toppings Subtotal</span>
                    <span className="fw-semibold">₹{toppingTotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-top pt-3">
                    <span className="fs-5 fw-bold">Grand Total</span>
                    <span className="fs-5 fw-bold text-success">₹{grandTotal}</span>
                  </li>
                </ul>

                {error && (
                  <div className="alert alert-danger py-2 small mb-3" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-warning-custom btn-lg fw-bold shadow-sm"
                    onClick={handleCheckout}
                    disabled={isCartEmpty || submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        Processing...
                      </>
                    ) : (
                      `Proceed To Pay (₹${grandTotal})`
                    )}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={clearCart}
                    disabled={isCartEmpty || submitting}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
