

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../../Constant';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
});

const loginUser = async (userName, password) => {
  try {
    console.log("Call login ....");
    const response = await apiClient.post('/api/NoAuth/login', {
      userName,
      password,
      rememberMe: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const fetchUserRoles = async (jwtToken) => {
  try {
    const response = await apiClient.get('/get-roles-by-user', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch roles error:', error);
    return null;
  }
};

export default function LoginSignup({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = useCallback(async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(userName, password);
      localStorage.setItem('jwtToken', data.jwtToken);
      setIsAuthenticated(true);
      navigate('/home');
      
      const roles = await fetchUserRoles(data.jwtToken);
      if (roles) {
        localStorage.setItem('userRoles', JSON.stringify(roles));
      }
    } catch (error) {
      setError(error.message);
    }
  }, [userName, password, setIsAuthenticated, navigate]);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div>
          <label>Username:</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
