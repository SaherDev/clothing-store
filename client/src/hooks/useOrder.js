import { useState } from "react";
import { userRequest } from "../requestMethods";

export const useOrder = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState([]);

  const createOrder = async (pOder) => {
    try {
      setError(false);
      setisLoading(true);
      const res = await userRequest.post("/orders", pOder);
      setisLoading(false);
      setOrder(res.data.order);
    } catch (err) {
      setError(true);
    }
    setisLoading(false);
  };

  return {
    isLoading,
    error,
    order,
    createOrder,
  };
};
