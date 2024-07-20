import { Navigate } from "react-router-dom";
import { auth } from "../../lib/firebase";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return auth.currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
