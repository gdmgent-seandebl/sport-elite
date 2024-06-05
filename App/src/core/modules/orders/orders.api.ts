import { API } from "../../../core/network/api";
import { Order, CreateOrderBody } from "./order.types";

const getOrders = () => {
  return API.get<Order[]>(`/orders`);
};

const createOrder = (products: CreateOrderBody) => {
  return API.post<Order>(`/orders`, products);
};

export { getOrders, createOrder };
