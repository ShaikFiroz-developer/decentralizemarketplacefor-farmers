import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/sessionverify",
          {},
          { withCredentials: true }
        );
        if (response.data.message === "Session verified") {
          setUser({ email: response.data.email });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        setIsLoggedIn(false);
      }
    };
    verifySession();
  }, []);

  const handleLogin = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("Missing credentials in localStorage.");
      return false;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/setsession",
        { email },
        { withCredentials: true }
      );

      if (response.data.message.includes("Session created")) {
        setUser({ email });
        setIsLoggedIn(true);
        return true;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoggedIn(false);
      return false;
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    Cookies.remove("token");
    console.log(Cookies.get("token"));
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, handleLogin, handlelogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
