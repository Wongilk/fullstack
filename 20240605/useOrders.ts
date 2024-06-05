import { useEffect, useState } from "react";
import { OrderWithDetail } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderWithDetail[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectOrderItem = async (orderId: number) => {
    if (selectedItemId === orderId) {
      setSelectedItemId(null);
      return;
    }

    if (orders.filter((order) => order.orderId === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }

    const orderDetail = await fetchOrder(orderId);
    setSelectedItemId(orderId);
    setOrders(
      orders.map((order) => {
        if (order.orderId === orderId) {
          return {
            ...order,
            detail: orderDetail,
          };
        }
        return order;
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return { orders, selectedItemId, selectOrderItem };
};
