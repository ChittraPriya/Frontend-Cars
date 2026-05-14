import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedWrapper = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedWrapper;