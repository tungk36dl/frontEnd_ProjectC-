// import * as React from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { useTheme } from '@mui/material/styles';
// import SERVER_URL from '../../Constant';





// const providers = [{ id: 'credentials', name: 'Email and Password' }];

// const signIn = async (provider, formData, setIsAuthenticated, navigate) => {
//   try {
//     console.log("Call login ....");
//     const response = await fetch(
//       SERVER_URL + '/api/NoAuth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: formData.get('email'),
//         password: formData.get('password'),
//         rememberMe: true,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Login failed');
//     }

//     const data = await response.json();
//     localStorage.setItem('jwtToken', data.jwtToken);
//     setIsAuthenticated(true); // Cập nhật trạng thái đăng nhập
//     navigate('/home'); // Chuyển về trang chủ

//     // Gọi API lấy roles
//     const rolesResponse = await fetch(
//       SERVER_URL + '/get-roles-by-user', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${data.jwtToken}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!rolesResponse.ok) {
//       throw new Error('Failed to fetch roles');
//     }

//     const roles = await rolesResponse.json();
//     localStorage.setItem('userRoles', JSON.stringify(roles));

//   } catch (error) {
//     alert(`Login error: ${error.message}`);
//   }
// };

// export default function LoginSignup({ setIsAuthenticated }) {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={(provider, formData) => signIn(provider, formData, setIsAuthenticated, navigate)}
//         providers={providers}
//         slotProps={{ emailField: { autoFocus: false } }}
//       />
//     </AppProvider>
//   );
// }

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import SERVER_URL from '../../Constant';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
});

const loginUser = async (email, password) => {
  try {
    console.log("Call login ....");

    const response = await apiClient.post('/api/NoAuth/login', {
      email,
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
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignIn = useCallback(
    async (provider, formData) => {
      try {
        const email = formData.get('email');
        const password = formData.get('password');

        const data = await loginUser(email, password);
        localStorage.setItem('jwtToken', data.jwtToken);
        setIsAuthenticated(true);
        navigate('/home');

        const roles = await fetchUserRoles(data.jwtToken);
        if (roles) {
          localStorage.setItem('userRoles', JSON.stringify(roles));
        }
      } catch (error) {
        alert(error.message);
      }
    },
    [setIsAuthenticated, navigate]
  );

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
    </AppProvider>
  );
}

