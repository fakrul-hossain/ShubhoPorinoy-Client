import axios from "axios";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  });

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(error.message);

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Unauthorized or Forbidden",
            showConfirmButton: false,
            timer: 1000,
          });
          logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function to remove the interceptor
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
