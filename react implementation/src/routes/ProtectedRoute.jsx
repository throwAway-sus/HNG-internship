import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { isAuthenticated } from "../utils/session";

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    toast.error("Your session has expired — please log in again.");
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};