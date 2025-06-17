import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, isManager } = useContext(AuthContext);
  console.log(token && isManager);

  if (!token && !isManager) {
    return <Navigate to="/" />;
  }

  return children;
}
