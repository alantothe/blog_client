import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  // grabs user from auth.js and fetches username from server
  useEffect(() => {
    if (user && user.id) {
      console.log("User object:", user);
    }
  }, [user]);

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  const handleRedirectDashboard = () => {
    navigate("/dashboard");
  };

  const handleRedirectCreate = () => {
    navigate("/create");
  };

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
  };

  return (
    <header className="flex items-center justify-between px-5 py-2 bg-black">
      <div className="logo">
        <h1
          onClick={handleRedirectDashboard}
          className="text-xl font-bold cursor-pointer mx-auto text-center ml-6 mr-6 text-white"
        >
          AlanBlog
        </h1>
      </div>
      <nav>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <h2
                onClick={handleRedirectCreate}
                className="mr-4 text-lg cursor-pointer hover:text-blue-500"
              >
                Create Post
              </h2>
              <h2
                onClick={handleLogout}
                className="text-lg cursor-pointer text-white hover:text-blue-500"
              >
                Logout ({user ? user.username : "Unknown User"})
              </h2>
            </>
          ) : (
            <>
              <h2
                onClick={handleRedirectLogin}
                className="mr-4 text-lg cursor-pointer text-black hover:text-blue-500"
              >
                Login
              </h2>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
