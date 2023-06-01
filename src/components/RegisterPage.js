import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        password: password
      };

      const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/api/user/register`, user);

      if (response.data.success) {
        navigate('/login');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log('Error');
    }
  };




  return (


    <div className="container">
        <header>

        </header>
      <h1>Registration Page</h1>

      <div className="formGroup">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <button type="submit" onClick={handleRegister} className="button">
        Register
      </button>

    </div>
  );
}

export default RegistrationPage;


