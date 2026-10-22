const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    id: String,
    iname: String
  },
  { _id: false }
);

const toppingSchema = new mongoose.Schema(
  {
    id: String,
    tname: String,
    price: String
  },
  { _id: false }
);

const pizzaSchema = new mongoose.Schema(
  {
    id: String,
    type: String,
    price: String,
    name: String,
    image: String,
    description: String,
    ingredients: [ingredientSchema],
    topping: [toppingSchema]
  },
  { collection: "pizza" }
);

module.exports = mongoose.model("Pizza", pizzaSchema);
