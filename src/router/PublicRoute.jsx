import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import Spinner from "../Components/Spinner/Spinner";

import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";
import Loading from "../Loading";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
