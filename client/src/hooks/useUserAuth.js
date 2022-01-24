import { useState } from "react";
import { publicRequest } from "..//utils/axiosInstanse";

export const useUserAuth = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);

  const registerUser = async (user) => {
    try {
      setError(false);
      setisLoading(true);
      const res = await publicRequest.post("auth/register", user);
      setisLoading(false);
      setUser(res.data.user);
    } catch (err) {
      setError(true);
    }
    setisLoading(false);
  };

  return {
    isLoading,
    error,
    user,
    registerUser,
  };
};
