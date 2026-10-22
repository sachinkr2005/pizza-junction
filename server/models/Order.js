const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
    type: { type: String },
    image: { type: String },
    description: { type: String },
    ingredients: [{ type: String }],
    topping: [{ type: String }]
  },
  { _id: false }
);

const orderToppingSchema = new mongoose.Schema(
  {
    id: { type: String },
    tname: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    customToppings: [orderToppingSchema],
    pizzaTotal: { type: Number, required: true, default: 0 },
    toppingTotal: { type: Number, required: true, default: 0 },
    grandTotal: { type: Number, required: true },
    status: { type: String, default: "Completed" },
    paymentMethod: { type: String, default: "Online" },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
