import React, { useState, useRef, useEffect } from "react";
import { Menu, Settings, LogOut, UserCircle } from "lucide-react";
import axios from "axios";

const Header = ({ onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/me", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Sidebar Toggle + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <Menu className="h-6 w-6 text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MovieMate
          </h1>
        </div>

        {/* Right: Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <img
              src={
                user?.image ||
                "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150"
              }
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-purple-400"
            />
            <span className="text-gray-300 font-medium hidden md:block">
              {user?.fullName || "Loading..."}
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium text-white">
                  {user?.fullName || "Guest"}
                </p>
                <p className="text-xs text-gray-400">{user?.email || ""}</p>
              </div>

              {/* Dropdown Items */}
              <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <UserCircle className="h-4 w-4 mr-3" />
                Profile
              </button>

              <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </button>

              {/* Logout */}
              <div className="border-t border-gray-700 mt-2 pt-2">
                <button className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200">
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
