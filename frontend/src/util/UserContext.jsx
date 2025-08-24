import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleUrlChange = () => {
      console.log("URL has changed:", window.location.href);
    };
    window.addEventListener("popstate", handleUrlChange);

    const userInfoString = localStorage.getItem("userInfo");

    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        setUser(userInfo);
      } catch (error) {
        console.error("Error parsing userInfo:", error);
      }
    } else {
      const temp = window.location.href.split("/");
      const url = temp.pop();
      if (
        url !== "about_us" &&
        url !== "#why-skill-sphere" &&
        url !== "" &&
        url !== "discover" &&
        url !== "register"
      ) {
        navigate("/login");
      }
    }

    setLoading(false);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUser };
