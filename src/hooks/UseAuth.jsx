import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const UseAuth = () => {
  const Auth = useContext(AuthContext);
  return Auth;
};

export default UseAuth;