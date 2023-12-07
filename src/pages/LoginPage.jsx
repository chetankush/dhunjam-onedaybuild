
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../Api'; // Import the API function
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      const { id } = response.data;

      setUserId(id);

      navigate(`/dashboard/${id}`);
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };


  if (userId && token) {
    return <Dashboard userId={userId} token={token} />;
  }

  return (
    <div className='login-wrapper'>
    <div className="login-container">
      <h2>Venue Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="login-input"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className='password-box'>
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="login-input"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='eyebox' onClick={togglePasswordVisibility}>
            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
        <button type="submit" className="login-button">Sign in</button>
      </form>
      <a href="register_page_url" className="register-link">New Registration ?</a>
    </div>
    </div>
  );
};

export default LoginPage;