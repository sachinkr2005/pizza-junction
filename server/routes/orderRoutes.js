const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders - Create a new order
router.post("/", async (req, res, next) => {
  try {
    const { items, customToppings, pizzaTotal, toppingTotal, grandTotal, paymentMethod } = req.body;

    const hasPizzas = Array.isArray(items) && items.length > 0;
    const hasToppings = Array.isArray(customToppings) && customToppings.length > 0;

    if (!hasPizzas && !hasToppings) {
      return res.status(400).json({ message: "Cart cannot be empty when placing an order." });
    }

    const order = new Order({
      items: items || [],
      customToppings: customToppings || [],
      pizzaTotal: Number(pizzaTotal) || 0,
      toppingTotal: Number(toppingTotal) || 0,
      grandTotal: Number(grandTotal) || 0,
      status: "Completed",
      paymentMethod: paymentMethod || "Online"
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders - Get all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id - Get order by ID
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
