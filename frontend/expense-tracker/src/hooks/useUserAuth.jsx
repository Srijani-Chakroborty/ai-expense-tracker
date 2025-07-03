import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstanse";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);

  return { user, loading };
};
