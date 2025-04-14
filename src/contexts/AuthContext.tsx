import { privateApiInstance } from "../services/api/apiInstance";
import { users_endpoints } from "../services/api/apiConfig";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorge";
import { jwtDecode } from "jwt-decode";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  AuthContextType,
  CustomJwtPayload,
  User,
} from "../interfaces/interfaces";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(users_endpoints.GET_USER);
      setUser(response.data);
    } catch (error) {
      console.log("❌ Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && !user) {
      getUserData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const decodedToken = token ? (jwtDecode(token) as CustomJwtPayload) : "";
  const isManager = decodedToken
    ? decodedToken?.userGroup === "Manager"
    : false;

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        logout,
        isManager,
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
