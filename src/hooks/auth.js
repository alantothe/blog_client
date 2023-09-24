import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/apiConfig.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const login = async (formData) => {
    try {
      const response = await api.post("/user/login", formData);
      console.log(response);
      console.log(formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); // Update the user state here
        console.log("User set:", response.data.user);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, message: "Login failed" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,

        login,
        logout,
        checkLoginStatus,
        user,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
