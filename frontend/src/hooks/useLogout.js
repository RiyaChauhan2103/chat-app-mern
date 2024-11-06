import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data = res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
