# PizzaJunction - MERN Application

A full-stack pizza ordering and customization web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

- **Frontend**: React 18, Vite, React Router 7, Axios, Bootstrap 5
- **Backend**: Node.js, Express, Mongoose, MongoDB (with `mongodb-memory-server` fallback for zero-config local development)
- **Database**: MongoDB

---

## Project Structure

```text
Pizzeria-MERN/
├── client/                     # React Frontend (Vite)
│   ├── public/assets/          # Static assets & icons
│   ├── src/
│   │   ├── context/            # Shopping cart state management
│   │   ├── pages/              # Home, OrderPizza, BuildYourPizza, Cart, Payment
│   │   ├── api.js              # Axios API service
│   │   ├── App.jsx             # Root layout & routing
│   │   ├── main.jsx            # React entry point
│   │   └── styles.css          # Core stylesheet
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── data/                   # Initial JSON datasets (pizzas, toppings)
│   ├── models/                 # Mongoose schemas (Pizza, Topping, Order)
│   ├── routes/                 # API route handlers
│   ├── scripts/                # Database seed script
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── server.js               # Express application entry point
│
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (optional; the server includes an in-memory database fallback for instant local testing)

---

### 1. Server Setup

Navigate to the `server/` directory and install dependencies:

```bash
cd server
npm install
```

Start the backend server in development mode:

```bash
npm run dev
```

The API will start at `http://localhost:3000`.

#### Optional: Seed MongoDB Database
To manually re-seed the pizza and topping collections into a running MongoDB instance:

```bash
npm run seed
```

---

### 2. Client Setup

Open a new terminal, navigate to the `client/` directory, and install dependencies:

```bash
cd client
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the displayed URL in your browser (typically `http://localhost:5173`).

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/pizzas` | List all available pizzas |
| `GET` | `/api/toppings` | List all available toppings |
| `GET` | `/api/orders` | List order history |
| `GET` | `/api/orders/:id` | Get specific order details |
| `POST` | `/api/orders` | Create a new pizza order |

---

## Features

- **Home Page**: Brand story, quality ingredients showcase, and delivery guarantee.
- **Order Pizza**: Browse pizzas with veg/non-veg indicators, ingredients breakdown, and instant cart toggle.
- **Build Ur Pizza**: Custom pizza builder with dynamic toppings selection and real-time cost calculation.
- **Shopping Cart**: Manage pizza quantities, review custom toppings, calculate grand total, and checkout.
- **Payment / Confirmation**: Real-time order placement with MongoDB persistence and itemized receipt.
- **Zero-Config Fallback**: Automatic in-memory database fallback so developers can run the full application without a local MongoDB service pre-installed.
