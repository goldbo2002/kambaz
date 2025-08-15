import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState, selectIsAuthenticated } from "../../redux/store";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? children : <Navigate to="/Kambaz/Signin" replace />;
};

export default PrivateRoute;