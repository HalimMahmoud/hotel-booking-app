import { useContext } from "react";
import NavBar from "../../Shared/NavBar/NavBar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./../../../contexts/AuthContext";

export default function LandingPage() {
  const { token, isManager } = useContext(AuthContext);

  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
