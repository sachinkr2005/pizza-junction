require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const pizzaRoutes = require("./routes/pizzaRoutes");
const toppingRoutes = require("./routes/toppingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const Pizza = require("./models/Pizza");
const Topping = require("./models/Topping");
const pizzaData = require("./data/pizza.json");
const toppingData = require("./data/toppingsandingredients.json");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pizzeria";

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Pizzeria API is running" });
});

// API Routes
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/toppings", toppingRoutes);
app.use("/api/orders", orderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("API Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

let mongod = null;

async function seedDataIfEmpty() {
  try {
    const pizzaCount = await Pizza.countDocuments();
    if (pizzaCount === 0) {
      await Pizza.insertMany(pizzaData);
      console.log(`Seeded ${pizzaData.length} pizzas.`);
    }

    const toppingCount = await Topping.countDocuments();
    if (toppingCount === 0) {
      await Topping.insertMany(toppingData);
      console.log(`Seeded ${toppingData.length} toppings.`);
    }
  } catch (err) {
    console.error("Data seed error:", err.message);
  }
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
  } catch (err) {
    console.warn("Primary MongoDB connection unavailable, starting in-memory database fallback...");
    const { MongoMemoryServer } = require("mongodb-memory-server");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log("Connected to in-memory MongoDB.");
  }
}

async function startServer() {
  try {
    await connectDB();
    await seedDataIfEmpty();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
}

async function shutdown() {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
