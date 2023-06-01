import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      // code
    }
  }, [isLoggedIn, navigate]);

  const handleRedirectLogin = () => {
    navigate('/login');
  };

  const handleRedirectRegister = () => {
    navigate('/register');
  };

  const handleRedirectDashboard = () => {
    navigate('/dashboard');
  };

  const handleRedirectCreate = () => {
    navigate('/create');
  };

  const handleLogout = () => {
    // code
  };

  return (
    <header className="flex items-center justify-between px-5 py-2">
      <div className="logo">
        {isLoggedIn ? (
          <>
            <h1
              onClick={handleRedirectDashboard}
              className="text-xl font-bold cursor-pointer mx-auto text-center ml-6 mr-6"
            >
              AlanBlog
            </h1>

          </>
        ) : (
          <h1
            onClick={handleRedirectDashboard}
            className="text-xl font-bold cursor-pointer mx-auto text-center ml-6 mr-6"
          >
            AlanBlog
          </h1>
        )}
      </div>
      <nav>
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center">
              <h2
                onClick={handleRedirectCreate}
                className="mr-4 text-lg cursor-pointer hover:text-blue-500"
              >
                Create Post
              </h2>
              <h2
                onClick={handleLogout}
                className="text-lg cursor-pointer hover:text-blue-500"
              >
                Logout
              </h2>
            </div>
          ) : (
            <>
              <h2
                onClick={handleRedirectLogin}
                className="mr-4 text-lg cursor-pointer hover:text-blue-500"
              >
                Login
              </h2>
              <h2
                onClick={handleRedirectRegister}
                className="text-lg cursor-pointer hover:text-blue-500"
              >
                Register
              </h2>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
