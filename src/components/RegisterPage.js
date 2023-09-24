import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const user = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL_ENDPOINT}/api/user/register`,
        user
      );

      if (response.data.success) {
        navigate("/login");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-start justify-center pt-20">
      <section className="bg-gray-300 p-10 rounded-lg w-11/12 sm:w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-200">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-10 text-black">
            Registration Page
          </h1>
        </header>

        <form onSubmit={handleRegister} className="flex flex-col items-center">
          <label htmlFor="username" className="text-black mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="bg-white rounded px-3 py-2 mb-6 w-full"
          />

          <label htmlFor="email" className="text-black mb-1">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="bg-white rounded px-3 py-2 mb-6 w-full"
          />

          <label htmlFor="password" className="text-black mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-white rounded px-3 py-2 mb-6 w-full"
          />

          <button
            type="submit"
            className="bg-gray-500 text-white rounded px-5 py-2 mb-6 w-full"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}

export default RegistrationPage;
