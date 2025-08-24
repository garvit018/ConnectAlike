import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../util/UserContext.jsx";
import { Menu } from "@headlessui/react";

const UserProfileDropdown = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    try {
      await axios.get("/api/v1/users/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center cursor-pointer">
        <img
          src={user?.picture}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        ▼
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => navigate(`/profile/${user.username}`)}
              className={`block w-full text-left px-4 py-2 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Profile
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`block w-full text-left px-4 py-2 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

const Header = () => {
  const { user } = useUser();
  const [discover, setDiscover] = useState(false);

  useEffect(() => {
    const temp = window.location.href.split("/");
    const url = temp.pop();
    setDiscover(url.startsWith("discover"));
  }, [window.location.href]);

  return (
    <header className="bg-[#e10f0f] shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="font-josefin text-xl font-semibold text-black font-bold"
        >
          SKILL SPHERE
        </Link>

        <nav className="flex space-x-6">
          {user ? (
            <>
              <Link
                className="text-black font-bold font-montserrat hover:text-white transition-colors duration-200"
                to="/discover"
              >
                Discover
              </Link>
              <Link
                className="text-black font-bold font-montserrat hover:text-white transition-colors duration-200"
                to="/chats"
              >
                Your Chats
              </Link>
              {discover && (
                <>
                  <a
                    href="#for-you"
                    className="text-black font-bold md:hidden hover:text-white transition-colors duration-200"
                  >
                    For You
                  </a>
                  <a
                    href="#popular"
                    className="text-black font-bold md:hidden hover:text-white transition-colors duration-200"
                  >
                    Popular
                  </a>
                  <a
                    href="#web-development"
                    className="text-black font-bold md:hidden hover:text-white transition-colors duration-200"
                  >
                    Web Development
                  </a>
                  <a
                    href="#machine-learning"
                    className="text-black font-bold md:hidden hover:text-white transition-colors duration-200"
                  >
                    Machine Learning
                  </a>
                  <a
                    href="#others"
                    className="text-black font-bold md:hidden hover:text-white transition-colors duration-200"
                  >
                    Others
                  </a>
                </>
              )}
              <UserProfileDropdown />
            </>
          ) : (
            <>
              <Link
                className="text-black font-bold font-montserrat hover:text-white transition-colors duration-200"
                to="/about_us"
              >
                About Us
              </Link>
              <Link
                className="text-black font-bold font-montserrat hover:text-white transition-colors duration-200"
                to="/#why-skill-sphere"
              >
                Why SkillSphere
              </Link>
              <Link
                className="text-black font-bold font-montserrat hover:text-white transition-colors duration-200"
                to="/login"
              >
                Login/Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
