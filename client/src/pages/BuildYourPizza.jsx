import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToppings } from "../api";
import { useCart } from "../context/CartContext";

const FALLBACK_TOPPING_IMG = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80";

export default function BuildYourPizza() {
  const navigate = useNavigate();
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toppings: selected, addTopping, removeTopping, toppingTotal, getId } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getToppings()
      .then((res) => {
        if (isMounted) {
          setToppings(res.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load toppings:", err);
          setError("Could not load toppings. Please ensure the backend server is running.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isSelected = (topping) => selected.some((item) => getId(item) === getId(topping));

  const handleBuildUrPizza = () => {
    navigate("/cart");
  };

  return (
    <div className="container py-3 max-w-860">
      <p className="text-center text-secondary my-3">
        PizzaJunction gives you the freedom to build your own custom pizza. Select your favorite ingredients and toppings below.
      </p>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading toppings...</span>
          </div>
          <p className="mt-2 text-muted">Loading ingredients...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="table-responsive border bg-white shadow-sm mb-4 rounded">
            <table className="table table-bordered align-middle mb-0 toppings-table">
              <tbody>
                {toppings.map((topping, idx) => {
                  const checked = isSelected(topping);
                  return (
                    <tr
                      key={getId(topping) || idx}
                      className={checked ? "table-warning-subtle" : ""}
                    >
                      {/* Image Column */}
                      <td className="topping-img-cell text-center p-2">
                        <img
                          src={topping.image}
                          alt={topping.tname}
                          className="rounded object-fit-contain topping-thumbnail"
                          onError={(e) => {
                            e.target.src = FALLBACK_TOPPING_IMG;
                          }}
                        />
                      </td>

                      {/* Name Column */}
                      <td className="px-3 fw-semibold text-dark">
                        {topping.tname}
                      </td>

                      {/* Price Column */}
                      <td className="px-3 fw-semibold text-dark topping-price-cell">
                        ₹{Number(topping.price).toFixed(2)}
                      </td>

                      {/* Checkbox Column */}
                      <td className="text-center topping-action-cell">
                        <label className="d-inline-flex align-items-center gap-2 m-0 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-check-input m-0 custom-checkbox"
                            checked={checked}
                            onChange={(e) => (e.target.checked ? addTopping(topping) : removeTopping(topping))}
                          />
                          <span className="text-warning-custom fw-semibold small">
                            Add
                          </span>
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Total Cost & Build Ur Pizza Button */}
          <div className="d-flex flex-column align-items-center justify-content-center my-3">
            <h5 className="fw-bold mb-3 text-dark">
              Total Cost : ₹{toppingTotal}
            </h5>

            <button
              type="button"
              className="btn btn-dark fw-bold px-4 py-2 cta-button"
              onClick={handleBuildUrPizza}
            >
              Build Ur Pizza
            </button>
          </div>
        </>
      )}
    </div>
  );
}
