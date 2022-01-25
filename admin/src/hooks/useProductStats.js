import { useMemo, useState } from "react";

import { userRequest } from "../utils/axiosInstanse";

export const useProductStats = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [productStats, setproductStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ],
    []
  );

  const getStats = async (pid) => {
    try {
      setError(false);
      setisLoading(true);
      const res = await userRequest.get(`/orders/income?productId=${pid}`);

      const list = res.data.income.sort((a, b) => {
        return a._id - b._id;
      });

      list.map((item) =>
        setproductStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );

      setisLoading(false);
    } catch (err) {
      setError(true);
    }
    setisLoading(false);
  };

  return {
    isLoading,
    error,
    productStats,
    getStats,
  };
};
