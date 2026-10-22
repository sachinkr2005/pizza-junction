import { Link, useLocation } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="container payment-container py-4">
      <div className="row g-4 bg-light p-4 rounded shadow-sm align-items-center">
        {/* Left Column: Image & Status */}
        <div className="col-lg-5 text-center">
          <img
            className="img-fluid rounded shadow-sm mb-3 payment-hero-img"
            src="https://images.unsplash.com/photo-1552539618-7eec9b4d1796?auto=format&fit=crop&w=1200&q=80"
            alt="Order confirmed"
          />
          <div className="alert alert-success d-inline-block py-2 px-3 fw-semibold mb-0 shadow-xs">
            Order Confirmed & Placed Successfully
          </div>
        </div>

        {/* Right Column: Order Details */}
        <div className="col-lg-7">
          <h2 className="text-success fw-bold mb-2">🎉 Thank You For Your Order!</h2>
          <p className="text-secondary mb-3">
            Your pizza is being freshly baked and will arrive hot within 45 minutes.
          </p>

          {order ? (
            <div className="card border-0 bg-white shadow-sm p-3 mb-3">
              {order._id && (
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                  <span className="text-muted small">Order ID:</span>
                  <span className="badge bg-dark font-monospace">{order._id}</span>
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                <span className="text-muted small">Status:</span>
                <span className="badge bg-success">{order.status || "Confirmed"}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                <span className="text-muted small">Pizzas:</span>
                <span className="fw-semibold text-end">
                  {order.items && order.items.length > 0
                    ? order.items.map((i) => `${i.name} (x${i.qty})`).join(", ")
                    : "None"}
                </span>
              </div>
              {order.customToppings && order.customToppings.length > 0 && (
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                  <span className="text-muted small">Custom Toppings:</span>
                  <span className="fw-semibold text-end">
                    {order.customToppings.map((t) => t.tname).join(", ")}
                  </span>
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center pt-2">
                <span className="fw-bold fs-5">Amount Paid:</span>
                <span className="fw-bold fs-5 text-success">₹{order.grandTotal}</span>
              </div>
            </div>
          ) : (
            <div className="alert alert-info py-2 small mb-3">
              Your pizza order details have been recorded.
            </div>
          )}

          <div className="d-flex gap-2">
            <Link to="/order" className="btn btn-warning-custom fw-semibold px-4">
              🍕 Order More
            </Link>
            <Link to="/home" className="btn btn-outline-dark px-4">
              🏠 Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
