import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export const getItemId = (item) => String(item?.id ?? item?._id ?? "");

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("pizzeria_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toppings, setToppings] = useState(() => {
    try {
      const saved = localStorage.getItem("pizzeria_toppings");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pizzeria_cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to persist cart:", err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("pizzeria_toppings", JSON.stringify(toppings));
    } catch (err) {
      console.error("Failed to persist toppings:", err);
    }
  }, [toppings]);

  const addToCart = (pizza) => {
    const id = getItemId(pizza);
    if (!id) return;

    setCart((prev) => {
      const index = prev.findIndex((item) => getItemId(item) === id);
      if (index > -1) {
        return prev.map((item, i) =>
          i === index ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prev, { ...pizza, qty: 1 }];
    });
  };

  const removeFromCart = (pizza) => {
    const id = getItemId(pizza);
    setCart((prev) => prev.filter((item) => getItemId(item) !== id));
  };

  const increase = (pizza) => {
    const id = getItemId(pizza);
    setCart((prev) =>
      prev.map((item) =>
        getItemId(item) === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decrease = (pizza) => {
    const id = getItemId(pizza);
    setCart((prev) =>
      prev
        .map((item) => {
          if (getItemId(item) === id) {
            const newQty = (item.qty || 1) - 1;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const addTopping = (topping) => {
    const id = getItemId(topping);
    if (!id) return;
    setToppings((prev) => {
      if (prev.some((item) => getItemId(item) === id)) return prev;
      return [...prev, topping];
    });
  };

  const removeTopping = (topping) => {
    const id = getItemId(topping);
    setToppings((prev) => prev.filter((item) => getItemId(item) !== id));
  };

  const clearCart = () => {
    setCart([]);
    setToppings([]);
  };

  const pizzaTotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price || 0) * (item.qty || 1), 0),
    [cart]
  );

  const toppingTotal = useMemo(
    () => toppings.reduce((sum, item) => sum + Number(item.price || 0), 0),
    [toppings]
  );

  const cartCount = useMemo(() => {
    const pizzaCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    return pizzaCount + toppings.length;
  }, [cart, toppings]);

  const value = {
    cart,
    toppings,
    cartCount,
    pizzaTotal,
    toppingTotal,
    addToCart,
    removeFromCart,
    increase,
    decrease,
    addTopping,
    removeTopping,
    clearCart,
    getId: getItemId
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
