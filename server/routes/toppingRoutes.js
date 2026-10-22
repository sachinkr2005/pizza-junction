const express = require("express");
const router = express.Router();
const Topping = require("../models/Topping");

// GET /api/toppings - List all available toppings
router.get("/", async (req, res, next) => {
  try {
    const toppings = await Topping.find({});
    res.json(toppings);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
