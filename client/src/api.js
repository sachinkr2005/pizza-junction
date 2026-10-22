import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api"
});

export const getPizzas = () => api.get("/pizzas");
export const getToppings = () => api.get("/toppings");
export const createOrder = (orderData) => api.post("/orders", orderData);
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);

export default api;
