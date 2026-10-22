const mongoose = require("mongoose");

const toppingSchema = new mongoose.Schema(
  {
    id: Number,
    image: String,
    price: Number,
    tname: String
  },
  { collection: "toppingsandingredients" }
);

module.exports = mongoose.model("Topping", toppingSchema);
