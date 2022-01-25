import { useMemo, useState } from "react";

import { userRequest } from "../utils/axiosInstanse";

export const useUserStats = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userStats, setUserStats] = useState([]);

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

  const getStats = async () => {
    try {
      setError(false);
      setisLoading(true);
      const res = await userRequest.get("/users/stats");

      res.data.stats.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], "Active User": item.total },
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
    userStats,
    getStats,
  };
};
