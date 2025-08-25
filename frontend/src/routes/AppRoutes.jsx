import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Discover from "../pages/Discover.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/discover" element={<Discover/>}/>

      {/* Default redirects */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
