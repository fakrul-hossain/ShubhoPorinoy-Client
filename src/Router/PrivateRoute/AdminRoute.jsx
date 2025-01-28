import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// import useRole from "../Hooks/UseRole";
import LoadingPage from "../Pages/LoadingPage";
import useRole from "../../hooks/UseRole";
import UseAuth from "../../hooks/UseAuth";
// import UseAuth from "../Hooks/UseAuth";

const AdminRoute = ({ children }) => {
  const { Loading } = UseAuth();
  const [role, isLoading] = useRole();

  if (Loading) return <LoadingPage />;
  if (isLoading) return <LoadingPage />;
  // if (!Loading && isLoading) return <LoadingPage />;

  if (role === "Admin") return children;
}
export default AdminRoute 