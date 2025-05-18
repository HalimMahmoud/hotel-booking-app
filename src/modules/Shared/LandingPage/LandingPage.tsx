import { useContext } from "react";
import { AuthContext } from "./../../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const { token, isManager } = useContext(AuthContext);

  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <NavBar />
    </>
  );
}
