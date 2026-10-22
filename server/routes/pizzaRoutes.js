const express = require("express");
const router = express.Router();
const Pizza = require("../models/Pizza");

// GET /api/pizzas - List all pizzas
router.get("/", async (req, res, next) => {
  try {
    const pizzas = await Pizza.find({});
    res.json(pizzas);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
