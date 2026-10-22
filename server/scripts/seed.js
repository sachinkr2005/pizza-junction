require("dotenv").config();
const mongoose = require("mongoose");
const Pizza = require("../models/Pizza");
const Topping = require("../models/Topping");
const pizzaData = require("../data/pizza.json");
const toppingData = require("../data/toppingsandingredients.json");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pizzeria";

async function runSeed() {
  try {
    console.log(`Connecting to ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    await Pizza.deleteMany({});
    await Topping.deleteMany({});

    await Pizza.insertMany(pizzaData);
    await Topping.insertMany(toppingData);

    console.log(`Successfully seeded ${pizzaData.length} pizzas and ${toppingData.length} toppings.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

runSeed();
