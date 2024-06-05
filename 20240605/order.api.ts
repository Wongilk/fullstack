import { Order, OrderItemDetail, OrderSheet } from "../models/order.model";
import { httpClient } from "./http";

export const order = async (orderSheet: OrderSheet) => {
  const response = await httpClient.post("/orders", orderSheet);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>("/orders");
  return response.data;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderItemDetail[]>(
    `/orders/${orderId}`
  );
  return response.data;
};
