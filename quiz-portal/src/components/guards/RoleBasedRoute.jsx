import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, loading, role } = useAuth();


  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== requiredRole) {
   
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
