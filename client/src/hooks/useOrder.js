import { useState } from "react";
import { useHistory } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { refreshCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
export const useOrder = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const createOrder = async (pOder) => {
    try {
      setError(false);
      setisLoading(true);
      const res = await userRequest.post("/orders", pOder);
      setisLoading(false);
      setOrder(res.data.order);

      history.push("/success", {
        orderId: res.data.order._id,
      });

      dispatch(refreshCart());
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
